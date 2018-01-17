/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */


(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './window.pongodb',
        './app.constants'
    ], f);
})(function () {

    'use strict';

    var app = window.app = window.app || {};

    /* This function has too many statements. */
    /* jshint -W071 */

    (function ($, undefined) {

        var pongodb = window.pongodb;
        var assert = window.assert;
        var logger = new window.Logger('app.db');
        var constants = app.constants;
        var NUMBER = 'number';
        var UNDEFINED = 'undefined';
        var LEVEL_CHARS = 4;
        var RX_ZEROS = new RegExp ('0{' + LEVEL_CHARS + '}', 'g');
        var ROOT_CATEGORY_ID = {
            en: (constants.rootCategoryId.en || '').replace(RX_ZEROS, ''),
            fr: (constants.rootCategoryId.fr || '').replace(RX_ZEROS, '')
        };
        var DB_NAME = 'KidojuDB';
        var COLLECTION = {
            ACTIVITIES: 'activities',
            SUMMARIES: 'summaries',
            USERS: 'users',
            VERSIONS: 'versions'
        };
        var TRIGGER = {
            INSERT: 'insert',
            UPDATE: 'update',
            REMOVE: 'remove'
        };

        /**
         * Database definition
         */
        var db = app.db = new pongodb.Database({
            name: DB_NAME,
            size: 10 * 1024 * 1024,
            collections: [COLLECTION.ACTIVITIES, COLLECTION.SUMMARIES, COLLECTION.USERS, COLLECTION.VERSIONS]
        });

        /**
         * Full-text indexes
         */
        db.addFullTextIndex(COLLECTION.SUMMARIES, ['author.lastName', 'description', 'tags', 'title']);

        /**
         * Trigger to create/update version from activity
         */
        db.createTrigger(COLLECTION.ACTIVITIES, [TRIGGER.INSERT, TRIGGER.UPDATE], function (activity) {
            var dfd = new $.Deferred();
            var language = activity.version.language;
            var activityId = activity.id;
            var summaryId = activity.version.summaryId;
            var versionId = activity.version.versionId;

            /* This function's cyclomatic complexity is too high. */
            /* jshint -W074 */

            function upsert(activity, version, deferred) {
                /* jshint maxcomplexity: 11 */
                // TODO Remove test on type - https://github.com/kidoju/Kidoju-Mobile/issues/154
                if ((activity.type.toLowerCase() === 'score' && version.type.toLowerCase() === 'test') &&
                    ($.type(constants.authorId) === UNDEFINED || constants.authorId === version.userId) &&
                    ($.type(constants.language) === UNDEFINED || constants.language === language) &&
                    ($.type(constants.rootCategoryId[language]) === UNDEFINED || version.categoryId.startsWith(ROOT_CATEGORY_ID[language]))) {
                    // The activity belongs here
                    version.activities = version.activities || []; // We need an array considering we possibly have several users
                    var found;
                    for (var i = 0, length = version.activities.length; i < length; i++) {
                        if (version.activities[i].actorId === activity.actor.userId) {
                            found = i; // There is already an activity for the current user
                        }
                    }
                    var update = true;
                    if ($.type(found) === NUMBER && new Date(version.activities[found].updated) > activity.updated) {
                        // Keep existing version activity which is more recent
                        update = false;
                    } else if ($.type(found) === NUMBER) {
                        // Update version activity
                        version.activities[found] = { activityId: activity.id, actorId: activity.actor.userId, score: activity.score, updated: activity.updated }; // TODO replace updated with an activity date
                    } else {
                        // Create new version activity
                        version.activities.push({ activityId: activity.id, actorId: activity.actor.userId, score: activity.score, updated: activity.updated });
                    }
                    if (update) {
                        app.db.versions.update({ id: versionId }, version, { upsert: true }).done(deferred.resolve).fail(deferred.reject);
                    } else {
                        deferred.resolve(version);
                    }
                } else {
                    window.alert('Oops! activity is being removed!');
                    // The activity (especially from synchronization does not belong here)
                    app.db.activities.remove({ id: activityId }).done(function () { deferred.resolve(version); }).fail(deferred.reject);
                }
            }

            /* jshint +W074 */

            if (('Connection' in window && window.navigator.connection.type === window.Connection.NONE) ||
                (window.device && window.device.platform === 'browser' && !window.navigator.onLine)) {
                app.db.versions.findOne({ id: versionId })
                    .done(function (local) {
                        upsert(activity, local, dfd);
                    })
                    .fail(function (err) {
                        dfd.reject(err);
                    });
            } else {
                var versions = app.rapi.v2.versions({ language: language, summaryId: summaryId });
                versions.get(versionId)
                    .done(function (remote) {
                        app.db.versions.findOne({ id: versionId })
                            .done(function (local) {
                                var version = $.extend(remote, local);
                                // TODO This can be removed after updating Kidoju-Server as this fixes test vs. Test and score vs. Score - https://github.com/kidoju/Kidoju-Mobile/issues/154
                                version.type = version.type.substr(0, 1).toUpperCase() + version.type.substr(1).toLowerCase();
                                upsert(activity, version, dfd);
                            })
                            .fail(function (err) {
                                // Not found
                                upsert(activity, remote, dfd);
                            });
                    })
                    .fail(dfd.reject);
            }
            return dfd.promise();
        });

        /**
         * Trigger to create/update summary from version
         */
        db.createTrigger(COLLECTION.VERSIONS, [TRIGGER.INSERT, TRIGGER.UPDATE], function (version) {
            var dfd = new $.Deferred();
            var language = version.language;
            var summaryId = version.summaryId;
            if (('Connection' in window && window.navigator.connection.type === window.Connection.NONE) ||
                (window.device && window.device.platform === 'browser' && !window.navigator.onLine)) {
                // Update local summary
                app.db.summaries.update({ id: summaryId }, { activities: version.activities }).done(dfd.resolve).fail(dfd.reject);
            } else {
                // Get remote summary
                var summaries = app.rapi.v2.summaries({ language: language }); // TODO , type: 'Test' }); https://github.com/kidoju/Kidoju-Mobile/issues/154
                summaries.get(summaryId)
                    .done(function (summary) {
                        // TODO This can be removed after updating Kidoju-Server as this fixes test vs. Test and score vs. Score - https://github.com/kidoju/Kidoju-Mobile/issues/154
                        summary.type = summary.type.substr(0, 1).toUpperCase() + summary.type.substr(1).toLowerCase();
                        // Propagate activities from version to summary
                        if (Array.isArray(version.activities)) {
                            summary.activities = version.activities;
                        }
                        app.db.summaries.update({ id: summaryId }, summary, { upsert: true }).done(dfd.resolve).fail(dfd.reject);
                    }).fail(dfd.reject);
            }
            return dfd.promise();
        });

        // TODO We could also use a trigger to create/update/remove MobileUser picture

        /**
         * Migration to v0.3.4 (initial)
         */
        db.upgrade.push(new pongodb.Migration({
            version: '0.3.4',
            scripts: [
                function (db) {
                    logger.info({
                        method: 'migration.execute',
                        message: 'Migrating database to ' + db._version
                    });
                    // Basically this first script initializes the database to version 0.3.4
                    // return $.Deferred().notify({ version: db._version, pass: 1, percent: 1 }).reject(new Error('oops')).promise();
                    return $.Deferred().notify({ version: db._version, pass: 1, percent: 1 }).resolve().promise();
                }
            ]
        }));

    }(window.jQuery));

    /* jshint +W071 */

    return app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
