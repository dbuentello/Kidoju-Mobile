/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
// import $ from 'jquery';
import app from '../common/window.global.es6';

/**
 * Categories feature
 */
const feature = {
    /**
     * Event handler triggered when showing the Categories view
     * Note: the view event is triggered each time the view is requested
     * @param e
     */
    onCategoriesViewShow(e) {
        return app.controller.onGenericViewShow(e);
    }
};

/**
 * Default export
 */
export default feature;