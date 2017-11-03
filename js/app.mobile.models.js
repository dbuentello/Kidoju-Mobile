/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define([
        './vendor/blueimp/md5', // Keep at the top considering function arguments
        './vendor/kendo/kendo.core',
        './vendor/kendo/kendo.data',
        './window.assert',
        './window.logger',
        './kidoju.data',
        './kidoju.tools',
        './app.logger',
        './app.rapi',
        './app.cache',
        './app.db',
        './app.fs',
        './app.models'
    ], f);
})(function (md5H) {

    'use strict';

    /* This function has too many statements. */
    /* jshint -W071 */

    /* This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    (function ($, undefined) {

        /* jshint maxcomplexity: 8 */

        /**
         * IMPORTANT NOTE 1
         * Lazy models are simplified/flattened readonly models (all properties are non-editable) to load in Lazy datasources
         * Other models are used for CRUD operations and might have nested models like MongoDB schemas
         *
         * IMPORTANT NOTE 2
         * All calculated fields used in MVVM to display properly formatted data are marked with an appended $
         * The reason is to recognize them in kendo templates where they should be used as functions with trailing ()
         * whereas they should be used as properties without trailing () in data-bind attributes
         */

        var app = window.app = window.app || {};
        var models = app.models = app.models || {};
        var kendo = window.kendo;
        var kidoju = window.kidoju;
        var Model = kidoju.data.Model;
        var DataSource = kidoju.data.DataSource;
        var assert = window.assert;
        var logger = new window.Logger('app.mobile.models');
        var fileSystem = new app.FileSystem();
        var md5 = md5H || window.md5;
        var pongodb = window.pongodb;
        var db = app.db = new pongodb.Database({
            name: 'KidojuDB',
            size: 5 * 1024 * 1024,
            collections: ['_meta', 'activities', 'users']
        });
        // var i18n = app.i18n = app.i18n || { };
        // This is for testing only because we should get values from config files (see ./js/app.config.jsx)
        var uris = app.uris = app.uris || {};
        uris.cdn = uris.cdn || {};
        uris.cdn.icons = uris.cdn.icons || 'https://cdn.kidoju.com/images/o_collection/svg/office/{0}.svg';
        uris.mobile = uris.mobile || {};
        uris.mobile.icons = uris.mobile.icons || './img/{0}.svg';
        uris.mobile.pictures = uris.mobile.pictures || '{0}users/{1}';
        var DATE = 'date';
        var FUNCTION = 'function';
        var NUMBER = 'number';
        var STRING = 'string';
        var UNDEFINED = 'undefined';
        var RX_LANGUAGE = /^[a-z]{2}$/;
        var RX_MONGODB_ID = /^[a-f0-9]{24}$/;
        var DOT_JPEG = '.jpg';
        var DEFAULT = {
            CATEGORY_ID: {
                en: '000100010000000000000000',
                fr: '000100020000000000000000'
            },
            DATE: new Date(2000, 0, 1), // 1/1/2000
            LANGUAGE: 'en',
            THEME: 'flat' // The default theme is actually defined in app.theme.js - make sure they match!
        };

        /**
         * An error helper that converts an error into an array [xhr, status, error]
         * @param error
         * @returns {[*,string,*]}
         * @constructor
         */
        function ErrorXHR(error) {
            assert.instanceof(Error, error, kendo.format(assert.messages.instanceof.default, 'error', 'Error'));
            assert.type(STRING, error.message, kendo.format(assert.messages.type.default, 'error.message', STRING));
            // JSON.stringify(error) is always {} - $.extend is a workaround to collect non-undefined error properties
            var obj = $.extend({}, {
                message: error.message,
                type: error.type,
                code: error.code,
                stack: error.stack && error.stack.toString()
            });
            return [
                { responseText: JSON.stringify({ error: obj }) },
                'error',
                error.message
            ];
        }

        /**
         * MobileUser model
         * @type {kidoju.data.Model}
         */
        models.MobileUser = Model.define({
            id: 'id', // the identifier of the model, which is required for isNew() to work
            fields: {
                id: { // mobile id, which cannot be the same as server id otherwise isNew won't work and appropriate transports won't be triggered in DataSource
                    type: STRING,
                    editable: false,
                    nullable: true
                },
                sid: { // mongodb server id
                    type: STRING,
                    editable: false
                },
                categoryId: {
                    type: STRING,
                    defaultValue: DEFAULT.CATEGORY_ID[DEFAULT.LANGUAGE]
                },
                firstName: {
                    type: STRING,
                    editable: false
                },
                /*
                language: {
                    type: STRING,
                    defaultValue: DEFAULT.LANGUAGE
                },
                */
                lastName: {
                    type: STRING,
                    editable: false
                },
                // Last time when the mobile device was synchronized with the server for that specific user
                lastSync: {
                    type: DATE,
                    defaultValue: DEFAULT.DATE
                },
                // The current user is the user with the most recent lastUse
                lastUse: {
                    type: DATE,
                    defaultValue: DEFAULT.DATE
                },
                md5pin: {
                    type: STRING,
                    nullable: true
                },
                picture: {
                    type: STRING,
                    editable: false
                }
                /*
                theme: {
                    type: STRING,
                    defaultValue: DEFAULT.THEME
                }
                */
                // consider locale (for display of numbers, dates and currencies)
                // consider timezone (for display of dates), born (for searches)
            },
            fullName$: function () {
                return ((this.get('firstName') || '').trim() + ' ' + (this.get('lastName') || '').trim()).trim();
            },
            /**
             * Facebook
             * --------
             * Small:  https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12509115_942778785793063_9199238178311708429_n.jpg?oh=af39b0956408500676ee12db7bf5ea31&oe=58B8E1A9
             * Large:  https://scontent.xx.fbcdn.net/v/t1.0-1/p160x160/12509115_942778785793063_9199238178311708429_n.jpg?oh=333006a975ce0fbebcd1ad7519f1bc45&oe=58CACE38
             * Larger: https://scontent.xx.fbcdn.net/t31.0-8/12487039_942778785793063_9199238178311708429_o.jpg
             * Small and large images cannot be accessed without query string but there is also https://graph.facebook.com/username_or_id/picture?width=9999
             *
             * Google
             * --------
             * Small: https://lh3.googleusercontent.com/-nma3Tmew9CI/AAAAAAAAAAI/AAAAAAAAAAA/AEMOYSCbFzy-DifyDo-I9xTQ6EUh8cQ4Xg/s64-c-mo/photo.jpg
             * Large: https://lh3.googleusercontent.com/-nma3Tmew9CI/AAAAAAAAAAI/AAAAAAAAAAA/AEMOYSCbFzy-DifyDo-I9xTQ6EUh8cQ4Xg/mo/photo.jpg
             *
             * Live
             * --------
             * Small: https://apis.live.net/v5.0/USER_ID/picture?type=small (96x96)
             * Medium: https://apis.live.net/v5.0/cid-bad501d98dfe21b3/picture?type=medium (160x160)
             * Large: https://apis.live.net/v5.0/USER_ID/picture?type=large (360x360)
             * If your user id is cid-bad501d98dfe21b3 use bad501d98dfe21b3 as USER_ID
             *
             * Twitter
             * --------
             * Small: https://pbs.twimg.com/profile_images/681812478876119042/UQ6KWVL8_normal.jpg
             * Large: https://pbs.twimg.com/profile_images/681812478876119042/UQ6KWVL8_400x400.jpg
             *
             */
            picture$: function () {
                var picture = this.get('picture');
                if ($.type(picture) === STRING && picture.length) {
                    return picture;
                } else {
                    return kendo.format(uris.mobile.icons, 'user');
                }
            },
            largerPicture$: function () {
                var that = this;
                var picture = that instanceof models.MobileUser ? that.get('picture') : that.picture;
                if ($.type(picture) === STRING && picture.length) {
                    return picture
                        .replace('/p50x50/', '/p160x160/') // Facebook
                        .replace('/s64-c-mo/', '/s160-c-mo/') // Google
                        .replace('?type=small', '?type=medium') // Live
                        .replace('_normal.', '_400x400.'); // Twitter
                } else {
                    return kendo.format(uris.mobile.icons, 'user');
                }
            },
            mobilePicture$: function () {
                var that = this;
                var picture = that instanceof models.MobileUser ? that.get('picture') : that.picture;
                var sid = that instanceof models.MobileUser ? that.get('sid') : that.sid;
                var persistent = fileSystem._persistent;
                // To have a mobile picture, there needs to have been a valid picture in the first place and a persistent file system to save it to
                if ($.type(persistent) !== UNDEFINED && RX_MONGODB_ID.test(sid) && $.type(picture) === STRING && picture.length) {
                    // Facebook, Google, Live and Twitter all use JPG images
                    // In the browser:
                    // - toURL returns a url starting with filesystem://
                    // - toInternalURL returns a url starting with cdvfile:// but the url scheme is not recognized by the browser
                    // On Android,
                    // - we get "Uncaught TypeError: FileSystem.encodeURIPath is not a function"
                    // On iOS
                    // - toURL returns a url starting with file://
                    // - toInternalURL returns a url starting with cdvfile://

                    // Note: cdvfile urls do not work in the browser and in WKWebViewEngine - https://issues.apache.org/jira/browse/CB-10141
                    // and the way to test WkWebView against UIWebView is to test window.indexedDB
                    var rootUrl = window.cordova && window.device && window.device.platform !== 'browser' && !window.indexedDB ?
                        persistent.root.toInternalURL() : persistent.root.toURL();
                    // var path = kendo.format(uris.mobile.pictures, persistent.root.toInternalURL(), sid + DOT_JPEG);
                    var path = kendo.format(uris.mobile.pictures, rootUrl, sid + DOT_JPEG);
                    logger.debug({
                        message: 'binding to mobilePicture$',
                        method: 'MobileUser.mobilePicture$',
                        data: { path: path }
                    });
                    return path;
                } else {
                    return kendo.format(uris.mobile.icons, 'user');
                }
            },
            /**
             * _saveMobilePicture should not be used directly
             * This is called from within MobileUserDataSource transport CRUD methods
             * @returns {*}
             * @private
             */
            _saveMobilePicture: function () {
                var that = this;
                var dfd = $.Deferred();
                // The following allows app.models.MobileUser.fn._saveMobilePicture.call(user) in MobileUserDataSource
                // where user is a plain object with a sid and picture
                var sid = that instanceof models.MobileUser ? that.get('sid') : that.sid;
                var remoteUrl = that instanceof models.MobileUser ? that.largerPicture$() : models.MobileUser.fn.largerPicture$.call(that);
                if (remoteUrl === kendo.format(uris.mobile.icons, 'user')) {
                    dfd.resolve();
                } else {
                    assert.match(RX_MONGODB_ID, sid, kendo.format(assert.messages.match.default, 'sid', RX_MONGODB_ID));
                    // Note: this may fail if user does not allow storage space
                    fileSystem.init()
                        .done(function () {
                            var directoryPath = kendo.format(uris.mobile.pictures, '', '');
                            var fileName = sid + DOT_JPEG;
                            fileSystem.getDirectoryEntry(directoryPath, window.PERSISTENT)
                                .done(function (directoryEntry) {
                                    fileSystem.getFileEntry(directoryEntry, fileName)
                                        .done(function (fileEntry) {
                                            fileSystem.download(remoteUrl, fileEntry)
                                                .done(dfd.resolve)
                                                .fail(dfd.reject);
                                        })
                                        .fail(dfd.reject);
                                })
                                .fail(dfd.reject);
                        })
                        .fail(dfd.reject);
                }
                return dfd.promise();
            },
            /**
             * Add a pin
             * @param pin
             */
            addPin: function (pin) {
                assert.type(STRING, pin, kendo.format(assert.messages.type.default, 'pin', STRING));
                assert.type(FUNCTION, md5, kendo.format(assert.messages.type.default, 'md5', FUNCTION));
                var salt = this.get('sid');
                assert.match(RX_MONGODB_ID, salt, kendo.format(assert.messages.match.default, 'salt', RX_MONGODB_ID));
                var md5pin = md5(salt + pin);
                this.set('md5pin', md5pin);
            },
            /**
             * Reset pin
             * @param pin
             */
            /*
            resetPin: function () {
                this.set('md5pin', null);
            },
            */
            /**
             * Verify pin
             * @param pin
             */
            verifyPin: function (pin) {
                assert.type(STRING, pin, kendo.format(assert.messages.type.default, 'pin', STRING));
                assert.type(FUNCTION, md5, kendo.format(assert.messages.type.default, 'md5', FUNCTION));
                var salt = this.get('sid');
                assert.match(RX_MONGODB_ID, salt, kendo.format(assert.messages.match.default, 'salt', RX_MONGODB_ID));
                var md5pin = md5(salt + pin);
                return this.get('md5pin') === md5pin;
            },
            /**
             * Load user from Kidoju-Server
             * @returns {*}
             */
            load: function () {
                var that = this;
                assert.ok(that.isNew(), 'Cannot load a new user into an existing user!');
                app.cache.removeMe();
                return app.cache.getMe()
                    .done(function (data) {
                        if ($.isPlainObject(data) && RX_MONGODB_ID.test(data.id)) {
                            // Since we have marked fields as non editable, we cannot use 'that.set',
                            // This should raise a change event on the parent viewModel
                            that.accept({
                                id: that.defaults.id,
                                sid: data.id,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                lastSync: that.defaults.lastSync,
                                lastUse: new Date(),
                                md5pin: that.defaults.md5pin,
                                picture: data.picture
                            });
                        } else {
                            that.reset();
                        }
                    });

            },
            /**
             * Reset user
             */
            reset: function () {
                // Since we have marked fields as non editable, we cannot use 'that.set'
                this.accept({
                    id: this.defaults.id,
                    sid: this.defaults.sid,
                    firstName: this.defaults.firstName,
                    lastName: this.defaults.lastName,
                    lastSync: this.defaults.lastSync,
                    lastUse: this.defaults.lastUse,
                    md5pin: this.defaults.md5pin,
                    picture: this.defaults.picture
                });
            }
        });

        /**
         * MobileUserDataSource model (stored localy)
         * @type {kidoju.data.Model}
         */
        models.MobileUserDataSource = DataSource.extend({

            /**
             * Datasource constructor
             * @param options
             */
            init: function (options) {

                var that = this;

                DataSource.fn.init.call(that, $.extend(true, {}, {
                    transport: {
                        create: $.proxy(that._transport._create, that),
                        destroy: $.proxy(that._transport._destroy, that),
                        read: $.proxy(that._transport._read, that),
                        update: $.proxy(that._transport._update, that)
                    },
                    // no serverFiltering, serverSorting or serverPaging considering the limited number of users
                    schema: {
                        data: 'data',
                        total: 'total',
                        errors: 'error',
                        modelBase: models.MobileUser,
                        model: models.MobileUser
                        /**
                        // This is for debugging only
                        parse: function(response) {
                            // debugger;
                            return response;
                        }
                        */
                    }
                }, options));

            },

            /**
             * Validate user before saving
             * @param user
             */
            _validate: function (user) {
                var errors = [];
                if ($.type(user.md5pin) !== STRING) {
                    errors.push('Missing user pin');
                }
                return errors;
            },

            /**
             * Setting _transport here with a reference above is a trick
             * so as to be able to replace these CRUD function in mockup scenarios
             */
            _transport: {

                /**
                 * Create transport
                 * @param options
                 * @returns {*}
                 * @private
                 */
                _create: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'User data creation',
                        method: 'app.models.MobileUserDataSource.transport.create'
                    });
                    // Clean object to avoid DataCloneError: Failed to execute 'put' on 'IDBObjectStore': An object could not be cloned.
                    var user = JSON.parse(JSON.stringify(options.data));
                    var errors = this._validate(user);
                    if (errors.length) {
                        return options.error.apply(this, ErrorXHR(new Error('Invalid user')));
                    }
                    // This replaces the machine id in the mongoDB server id by MACHINE_ID
                    // This ensures uniqueness of user in mobile app when sid is unique without further checks
                    // i.e. same user with the same sid recorded twice under different ids in mobile device
                    user.id = new pongodb.ObjectId(user.sid).toMobileId();
                    // Start with saving the picture to avoid a broken image in UI if user is saved without
                    models.MobileUser.fn._saveMobilePicture.call(user)
                        .done(function () {
                            db.users.insert(user)
                                .done(function () {
                                    options.success({ total: 1, data: [user] });
                                })
                                .fail(function (error) {
                                    options.error.apply(this, ErrorXHR(error));
                                });
                        })
                        .fail(function (error) {
                            options.error.apply(this, ErrorXHR(error));
                        });
                },

                /**
                 * Destroy transport
                 * @param options
                 * @private
                 */
                _destroy: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'User data deletion',
                        method: 'app.models.MobileUserDataSource.transport.destroy'
                    });
                    var user = options.data;
                    var id = user.id;
                    if (RX_MONGODB_ID.test(id)) {
                        db.users.remove({ id: id })
                            .done(function (result) {
                                if (result && result.nRemoved === 1) {
                                    options.success({ total: 1, data: [user] });
                                } else {
                                    options.error.apply(this, ErrorXHR(new Error('User not found')));
                                }
                            })
                            .fail(function (error) {
                                options.error.apply(this, ErrorXHR(error));
                            });
                    } else {
                        // No need to hit the database, it won't be found
                        options.error.apply(this, ErrorXHR(new Error('User not found')));
                    }
                },

                /**
                 * Read transport
                 * @param options
                 * @private
                 */
                _read: function (options) {
                    logger.debug({
                        message: 'User data read',
                        method: 'app.models.MobileUserDataSource.transport.read'
                    });
                    // Initialize the file system for mobilePicture$
                    fileSystem.init()
                        .done(function () {
                            // Query the database of all users
                            db.users.find()
                                .done(function (result) {
                                    if ($.isArray(result)) {
                                        options.success({ total: result.length, data: result });
                                    } else {
                                        options.error.apply(this, ErrorXHR(new Error('Database should return an array')));
                                    }
                                })
                                .fail(function (error) {
                                    options.error.apply(this, ErrorXHR(error));
                                });
                        })
                        .fail(function (error) {
                            options.error.apply(this, ErrorXHR(error));
                        });
                },

                /**
                 * Update transport
                 * @param options
                 * @returns {*}
                 * @private
                 */
                _update: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'User data update',
                        method: 'app.models.MobileUserDataSource.transport.update'
                    });
                    // Clean object to avoid DataCloneError: Failed to execute 'put' on 'IDBObjectStore': An object could not be cloned.
                    var user = JSON.parse(JSON.stringify(options.data));
                    var errors = this._validate(user);
                    if (errors.length) {
                        return options.error.apply(this, ErrorXHR(new Error('Invalid user')));
                    }
                    var id = user.id;
                    if (RX_MONGODB_ID.test(id)) {
                        // pongodb does not allow the id to be part of the update
                        user.id = undefined;
                        db.users.update({ id: id }, user)
                            .done(function (result) {
                                if (result && result.nMatched === 1 && result.nModified === 1) {
                                    // Update the image from time to time
                                    if (Math.floor(4 * Math.random()) === 0) {
                                        // We discard success/failure because the user is saved
                                        models.MobileUser.fn._saveMobilePicture.call(user);
                                    }
                                    // Restore id and return updated user to datasource
                                    user.id = id;
                                    options.success({ total: 1, data: [user] });
                                } else {
                                    options.error.apply(this, ErrorXHR(new Error('User not found')));
                                }
                            })
                            .fail(function (error) {
                                options.error.apply(this, ErrorXHR(error));
                            });
                    } else {
                        // No need to hit the database, it won't be found
                        options.error.apply(this, ErrorXHR(new Error('User not found')));
                    }
                }
            }
        });

        /**
         * MobileVersion model
         * @type {kidoju.data.Model}
         */
        models.MobileActivity = Model.define({
            id: 'id', // the identifier of the model, which is required for isNew() to work
            fields: {
                id: {
                    type: STRING,
                    nullable: true
                },
                // An activity without a sid does not exist on our servers
                sid: {
                    type: STRING,
                    nullable: true
                },
                actor: { // <--- models.UserReference
                    // For complex types, the recommendation is to leave the type undefined and set a default value
                    // See: http://www.telerik.com/forums/model---complex-model-with-nested-objects-or-list-of-objects
                    // See: http://demos.telerik.com/kendo-ui/grid/editing-custom
                    defaultValue: null,
                    parse: function (value) {
                        // Important: foreign keys use sids
                        return (value instanceof models.UserReference || value === null) ? value : new models.UserReference(value);
                    }
                },
                // score is used for activities of type score
                score: {
                    type: NUMBER,
                    editable: false,
                    nullable: true
                },
                // test is used for activities of type score
                test: {
                    // For complex types, the recommendation is to leave the type undefined and set a default value
                    defaultValue: null
                },
                type: {
                    type: STRING,
                    editable: false
                },
                updated: {
                    type: DATE
                },
                version: { // <--- models.VersionReference
                    // For complex types, the recommendation is to leave the type undefined and set a default value
                    // See: http://www.telerik.com/forums/model---complex-model-with-nested-objects-or-list-of-objects
                    // See: http://demos.telerik.com/kendo-ui/grid/editing-custom
                    defaultValue: null,
                    // TODO Add category!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    parse: function (value) {
                        // Important: foreign keys use sids
                        return (value instanceof models.VersionReference || value === null) ? value : new models.VersionReference(value);
                    }
                }
            },
            category$: function () {
                return ''; // TODO
            },
            period$: function () {
                // Time zones ????
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                var startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()); // Previous Sunday
                var startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // It won't show within a week of begining of the month
                var updated = this.get('updated');
                if (updated >= today) {
                    return today;
                } else if (updated >= yesterday) {
                    return yesterday;
                } else if (updated >= startOfWeek) {
                    return startOfWeek;
                } else if (updated >= startOfMonth) {
                    return startOfMonth;
                } else {
                    return new Date(updated.getFullYear(), updated.getMonth(), 1);
                }
            },
            title$: function () {
                return this.get('version.title'); // Flattens data depth
            },
            queryString$: function () {
                return '?language=' + window.encodeURIComponent(this.get('version.language')) +
                    '&summaryId=' + window.encodeURIComponent(this.get('version.summaryId')) +
                    '&versionId=' + window.encodeURIComponent(this.get('version.versionId')) +
                    '&activityId=' + window.encodeURIComponent(this.get('id'));
            }
            // TODO: See validateTestFromProperties in kidoju.data
            /**
            getScoreArray: function () {
                function matchPageConnectors (pageIdx) {
                    // Connectors are a match if they have the same solution
                    var ret = {};
                    var connectors = pageCollectionDataSource.at(pageIdx).components.data().filter(function (component) {
                        return component.tool === 'connector';
                    });
                    for (var i = 0, length = connectors.length; i < length; i++) {
                        var connector = connectors[i];
                        var name = connector.properties.name;
                        assert.match(RX_VALID_NAME, name, kendo.format(assert.messages.match.default, 'name', RX_VALID_NAME));
                        var solution = connector.properties.solution;
                        var found = false;
                        for (var prop in ret) {
                            if (ret.hasOwnProperty(prop)) {
                                if (prop === name) {
                                    // already processed
                                    found = true;
                                    break;
                                } else if (ret[prop] === solution) {
                                    // found matching connector, point to name
                                    ret[prop] = name;
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (!found) {
                            // Add first connector, waiting to find a matching one
                            ret[name] = solution;
                        }
                    }
                    return ret;
                }
                function matchConnectors () {
                    // We need a separate function because matching connectors neded to have the same solution on the same page (not a different page)
                    var ret = {};
                    for (var pageIdx = 0, pageTotal = pageCollectionDataSource.total(); pageIdx < pageTotal; pageIdx++) {
                        ret = $.extend(ret, matchPageConnectors(pageIdx));
                    }
                    return ret;
                }
                assert.instanceof(kendo.data.ObservableObject, this, kendo.format(assert.messages.instanceof.default, 'this', 'kendo.data.ObservableObject'));
                var that = this; // this is variable `result`
                var matchingConnectors = matchConnectors();
                var redundantConnectors = {};
                var scoreArray = [];
                for (var name in that) {
                    // Only display valid names in the form val_xxxxxx that are not redundant connectors
                    if (that.hasOwnProperty(name) && RX_VALID_NAME.test(name) && !redundantConnectors.hasOwnProperty(name)) {
                        var testItem = that.get(name);
                        var scoreItem = testItem.toJSON();
                        // Improved display of values in score grids
                        scoreItem.value = testItem.value$();
                        scoreItem.solution = testItem.solution$();
                        // Aggregate score of redundant items (connectors)
                        var redundantName = matchingConnectors[name];
                        if (that.hasOwnProperty(redundantName) && RX_VALID_NAME.test(redundantName)) {
                            // If there is a redundancy, adjust scores
                            var redundantItem = that.get(redundantName);
                            scoreItem.failure += redundantItem.failure;
                            scoreItem.omit += redundantItem.omit;
                            scoreItem.score += redundantItem.score;
                            scoreItem.success += redundantItem.success;
                            redundantConnectors[redundantName] = true;
                        }
                        scoreArray.push(scoreItem);
                    }
                }
                return scoreArray;
            },
            **/
        });

        /**
         * MobileActivityDataSource datasource (stored localy and sycnhronized)
         * @type {kidoju.data.DataSource}
         */
        models.MobileActivityDataSource = DataSource.extend({

            /**
             * Datasource constructor
             * @param options
             */
            init: function (options) {

                var that = this;

                // Get the language and userId from options (if available at this stage)
                var language = options && options.language;
                var userId = options && options.userId;

                // Let's make them optional as we might want to load
                if (RX_LANGUAGE.test(language)) {
                    that._language = language;
                }
                if (RX_MONGODB_ID.test(userId)) {
                    assert.ok(!new pongodb.ObjectId(userId).isMobileId(), '`options.userId` is expected to be a sid');
                    that._userId = userId;
                }

                DataSource.fn.init.call(that, $.extend(true, {}, {
                    transport: {
                        create: $.proxy(that._transport._create, that),
                        destroy: $.proxy(that._transport._destroy, that),
                        read: $.proxy(that._transport._read, that),
                        update: $.proxy(that._transport._update, that)
                    },
                    // serverFiltering: true,
                    // serverSorting: true,
                    // pageSize: 5,
                    // serverPaging: true,
                    group: {
                        dir: 'desc',
                        field: 'period$()'
                    },
                    sort: {
                        dir: 'desc',
                        field: 'updated'
                    },
                    schema: {
                        data: 'data',
                        total: 'total',
                        errors: 'error', // <--------------------- TODO: look at this properly for error reporting
                        modelBase: models.MobileActivity,
                        model: models.MobileActivity
                        /**
                         // This is for debugging only
                         parse: function(response) {
                            // debugger;
                            return response;
                        }
                         */
                    }
                }, options));

            },

            /**
             * Load possibly with a new userId
             * @param userId
             */
            load: function (options) {
                var that = this;
                var dfd = $.Deferred();
                if (that.hasChanges()) {
                    dfd.reject(undefined, 'error', 'Cannot load with pending changes.');
                } else {
                    var language = options && options.language;
                    var userId = options && options.userId;
                    assert.ok(!new pongodb.ObjectId(userId).isMobileId(), '`options.userId` is expected to be a sid'); // A sid is a server id
                    that._language = language;
                    that._userId = userId;
                    that.read() // Calls _transport._read
                        .done(function (a) {
                            debugger;
                            dfd.resolve(a);
                        })
                        .fail(dfd.reject);
                }
                return dfd.promise();
            },

            /**
             * Validate activity
             * @param activity
             * @private
             */
            _validate: function (activity) {
                var errors = [];
                var actorId = activity.actor.userId;
                if (!RX_MONGODB_ID.test(actorId) || actorId !== this._userId) {
                    errors.push('Cannot delegate the creation of activities.');
                }
                return errors;
            },

            /**
             * Setting _transport here with a reference above is a trick
             * so as to be able to replace these CRUD function in mockup scenarios
             */
            _transport: {

                /**
                 * Create transport
                 * @param options
                 * @returns {*}
                 * @private
                 */
                _create: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'Activity data creation',
                        method: 'app.models.MobileActivityDataSource.transport.create'
                    });
                    // Clean object to avoid DataCloneError: Failed to execute 'put' on 'IDBObjectStore': An object could not be cloned.
                    var activity = JSON.parse(JSON.stringify(options.data));
                    var errors = this._validate(activity);
                    if (errors.length) {
                        return options.error.apply(this, ErrorXHR(new Error('Invalid activity')));
                    }
                    // The database will give us an id (but not a date)
                    db.activities.insert(activity)
                        .done(function () {
                            options.success({ total: 1, data: [activity] });
                        })
                        .fail(function (error) {
                            options.error.apply(this, ErrorXHR(error));
                        });
                },

                /**
                 * Destroy transport
                 * @param options
                 * @private
                 */
                _destroy: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'Activity data deletion',
                        method: 'app.models.MobileActivityDataSource.transport.destroy'
                    });
                    var activity = options.data;
                    var id = activity.id;
                    if (RX_MONGODB_ID.test(id)) {
                        db.activities.remove({ id: id })
                            .done(function (result) {
                                if (result && result.nRemoved === 1) {
                                    options.success({ total: 1, data: [activity] });
                                } else {
                                    options.error.apply(this, ErrorXHR(new Error('Activity not found')));
                                }
                            })
                            .fail(function (error) {
                                options.error.apply(this, ErrorXHR(error));
                            });
                    } else {
                        // No need to hit the database, it won't be found
                        options.error.apply(this, ErrorXHR(new Error('Activity not found')));
                    }
                },

                /**
                 * Read transport
                 * @param options
                 * @private
                 */
                _read: function (options) {
                    logger.debug({
                        message: 'Activity data read',
                        method: 'app.models.MobileActivityDataSource.transport.read'
                    });
                    // TODO: use options to build query
                    var query = {};
                    if ($.type(this._language) !== UNDEFINED) {
                        query['version.language'] = this._language;
                    }
                    if ($.type(this._userId) !== UNDEFINED) {
                        query['actor.userId'] = this._userId;
                    }
                    db.activities.find(query)
                        .done(function (result) {
                            if ($.isArray(result)) {
                                options.success({ total: result.length, data: result });
                            } else {
                                options.error.apply(this, ErrorXHR(new Error('Database should return an array')));
                            }
                        })
                        .fail(function (error) {
                            options.error.apply(this, ErrorXHR(error));
                        });
                },

                /**
                 * Update transpoort
                 * @param options
                 * @returns {*}
                 * @private
                 */
                _update: function (options) {
                    assert.isPlainObject(options, kendo.format(assert.messages.isPlainObject.default, 'options'));
                    assert.isPlainObject(options.data, kendo.format(assert.messages.isPlainObject.default, 'options.data'));
                    logger.debug({
                        message: 'Activity data update',
                        method: 'app.models.MobileActivityDataSource.transport.update'
                    });

                    // Clean object to avoid DataCloneError: Failed to execute 'put' on 'IDBObjectStore': An object could not be cloned.
                    var activity = JSON.parse(JSON.stringify(options.data));
                    var errors = this._validate(activity);
                    if (errors.length) {
                        return options.error.apply(this, ErrorXHR(new Error('Invalid activity')));
                    }
                    var id = activity.id;
                    if (RX_MONGODB_ID.test(id)) {
                        activity.id = undefined;
                        // TODO: check userId?
                        db.activities.update({ id: id }, activity)
                            .done(function (result) {
                                if (result && result.nMatched === 1 && result.nModified === 1) {
                                    activity.id = id;
                                    options.success({ total: 1, data: [activity] });
                                    // TODO serverSync if connected
                                } else {
                                    options.error.apply(this, ErrorXHR(new Error('Activity not found')));
                                }
                            })
                            .fail(function (error) {
                                options.error.apply(this, ErrorXHR(error));
                            });
                    } else {
                        // No need to hit the database, it won't be found
                        options.error.apply(this, ErrorXHR(new Error('Activity not found')));
                    }
                }
            },

            /**
             * Synchronizes user activities with the server
             */
            serverSync: function () {
                var that = this;
                /*
                return $.when(
                    that._uploadPendingActivities(),
                    that._purgeOldActivities(),
                    that._downloadRecentActivities()
                );
                */
                var dfd = $.Deferred();
                // First, upload all new activities
                that._uploadPendingActivities()
                    .progress(function (progress) {
                        dfd.notify($.extend({ step: 1 }, progress));
                    })
                    .done(function () {
                        // Second, purge old activities (including possibly some just uploaded new activities if last serverSync is very old)
                        that._purgeOldActivities()
                            .progress(function (progress) {
                                dfd.notify($.extend({ step: 2 }, progress));
                            })
                            .done(function () {
                                // Third, download recently added and updated activities (considering activities are always created, never updated, on the mobile device.
                                that._downloadRecentActivities()
                                    .progress(function (progress) {
                                        dfd.notify($.extend({ step: 3 }, progress));
                                    })
                                    .done(function () {
                                        dfd.resolve(); // Add statistics { nUploaded, nPurged, nDownloaded }
                                    })
                                    .fail(dfd.reject);
                            })
                            .fail(dfd.reject);
                    })
                    .fail(dfd.reject);
                return dfd.promise();
            },

            /**
             * Upload new activities and update sid
             * @returns {*}
             * @private
             */
            _uploadPendingActivities: function () {
                var dfd = $.Deferred();
                // TODO $.when.apply($, my_array);
                dfd.notify({ percent: 1 });
                // IMPORTANT update sid once done
                dfd.resolve();
                return dfd.promise();
            },

            /**
             * Purge old activities
             * @returns {*}
             * @private
             */
            _purgeOldActivities: function () {
                var dfd = $.Deferred();
                // TODO $.when.apply($, my_array);
                dfd.notify({ percent: 1 });
                dfd.resolve();
                return dfd.promise();
            },

            /**
             * Download recently updated activities
             * @returns {*}
             * @private
             */
            _downloadRecentActivities: function () {
                var dfd = $.Deferred();
                // TODO $.when.apply($, my_array);
                // IMPORTANT doanload from oldest to most recent and update lastSync accordingly
                // Nevertheless check whether activity does not already exist using sid
                dfd.notify({ percent: 1 });
                dfd.resolve();
                return dfd.promise();
            }

        });

        /**
         * MobileDownload model
         * @type {kidoju.data.Model}
         */
        // models.MobileDownload = Model.define({});

        /**
         * MobileDownload datasource (stored localy)
         * @type {kidoju.data.Model}
         */
        // models.MobileDownload = DataSource.define({});

        /**
         * Database migration
         */
        models.Upgrades = kendo.Class.extend({

            init: function (version) {
                // The application version as in app.version;
                this._version = version;
            },

            /**
             * Check application version against server version
             */
            checkApplication: function () {
                var dfd = $.Deferred();
                app.rapi.test.ping()
                    .done(function (result) {
                        dfd.resolve()
                    })
                    .fail(dfd.reject);
                return dfd.promise();
            },

            /**
             * Check database version against application version
             */
            checkDatabase: function () {
                var dfd = $.Deferred();
                db._meta.findOne({ _id: 'version'})
                    .done(function (result) {
                        debugger;
                    })
                    .fail(dfd.reject);
                return dfd.promise();
            },

            /**
             * Dummy migration for testing only
             */
            _dummy: function () {
                var dfd = $.Deferred();
                var count = 0;
                var interval = setInterval(function () {
                    count++;
                    dfd.progress(count / 10);
                    if (count === 10) {
                        clearInterval(interval);
                        dfd.resolve();
                    }
                }, 500);
                return dfd.promise();
            },

            /**
             * Execute database migrations
             */
            migrate: function () {
                // progress through versions
                return this._dummy();
            }

            // _migration1
            // _migration2
            // _migtation3

        });

    }(window.jQuery));

    /* jshint +W074 */
    /* jshint +W071 */

    return window.app;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
