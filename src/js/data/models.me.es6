/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
// import $ from 'jquery';
import 'kendo.core';
import CONSTANTS from '../common/window.constants.es6';
import BaseModel from './models.base.es6';

const { i18n, uris } = window.app;
const { format } = window.kendo;

/**
 * Me (current user)
 * @class Me
 * @extends BaseModel
 */
const Me = BaseModel.define({
    id: CONSTANTS.ID, // the identifier of the model, which is required for isNew() to work
    fields: {
        id: {
            type: CONSTANTS.STRING,
            editable: false,
            nullable: true
        },
        firstName: {
            type: CONSTANTS.STRING,
            editable: false
        },
        lastName: {
            type: CONSTANTS.STRING,
            editable: false
        },
        picture: {
            type: CONSTANTS.STRING,
            editable: false,
            nullable: true
        }
        // TODO timezone (for display of dates), born (for searches)
        // TODO subscription
        // TODO User Group (sysadmin, ...)
    },
    fullName$() {
        return `${(this.get('firstName') || '').trim()} ${(this.get('lastName') || '').trim()}`.trim();
    },
    picture$() {
        return this.get('picture') || format(uris.cdn.icons, 'user');
    },
    isAuthenticated$() {
        return CONSTANTS.RX_MONGODB_ID.test(this.get('id'));
    },
    userUri$() {
        return format(uris.webapp.user, i18n.locale(), this.get('id'));
    },
    reset() {
        // Since we have marked fields as non editable, we cannot use 'that.set'
        this.accept({
            id: this.defaults.id,
            firstName: this.defaults.firstName,
            lastName: this.defaults.lastName,
            picture: this.defaults.picture
        });
    }
    /*
    // TODO Use transport mixin
    load() {
        const that = this;
        return app.cache.getMe().then(data => {
            if ($.isPlainObject(data) && CONSTANTS.RX_MONGODB_ID.test(data.id)) {
                // Since we have marked fields as non editable, we cannot use 'that.set',
                // This should raise a change event on the parent viewModel
                that.accept({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    picture: data.picture
                });
            } else {
                that.reset();
            }
        });
    }
    */
});

/**
 * Default export
 */
export default Me;
