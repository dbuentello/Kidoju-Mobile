/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';
import 'kendo.core';
import assert from '../common/window.assert.es6';
import CONSTANTS from '../common/window.constants.es6';
import PageComponent from '../data/models.pagecomponent.es6';
import ReadOnlyAdapter from './adapters.readonly.es6';
import NumberAdapter from './adapters.number.es6';
import QuestionAdapter from './adapters.question.es6';
import ValidationAdapter from './adapters.validation.es6';
import tools from './tools.es6';
import BaseTool from './tools.base.es6';
import { LIB_COMMENT, textLibrary } from './util.libraries.es6';

const {
    attr,
    format
} = window.kendo;
const ScoreAdapter = NumberAdapter;

/**
 * i18n
 * @returns {*|{}}
 */
function i18n() {
    return (
        (((window.app || {}).i18n || {}).tools || {}).textarea || {
            // TODO
        }
    );
}


var TEXTAREA = '<textarea id="#: properties.name #" class="k-textbox kj-interactive" style="#: attributes.style #" {0}></textarea>';
/**
 * @class Textarea tool
 * @type {void|*}
 */
var Textarea = BaseTool.extend({
    id: 'textarea',
    icon: 'text_area',
    description: i18n.textarea.description,
    cursor: CONSTANTS.CROSSHAIR_CURSOR,
    weight: 2,
    templates: {
        design: format(TEXTAREA, ''),
        play: format(TEXTAREA, 'data-#= ns #bind="value: #: properties.name #.value"'),
        review: format(TEXTAREA, 'data-#= ns #bind="value: #: properties.name #.value"') + BaseTool.fn.getHtmlCheckMarks()
    },
    height: 300,
    width: 500,
    attributes: {
        style: new StyleAdapter({ title: i18n.textarea.attributes.style.title, defaultValue: 'font-size:40px;resize:none;' })
    },
    properties: {
        name: new ReadOnlyAdapter({ title: i18n.textarea.properties.name.title }),
        question: new QuestionAdapter({ title: i18n.textarea.properties.question.title }),
        solution: new TextAreaAdapter({ title: i18n.textarea.properties.solution.title }),
        validation: new ValidationAdapter({
            defaultValue: LIB_COMMENT + textLibrary.defaultValue,
            library: textLibrary.library,
            title: i18n.textarea.properties.validation.title
        }),
        success: new ScoreAdapter({ title: i18n.textarea.properties.success.title, defaultValue: 1 }),
        failure: new ScoreAdapter({ title: i18n.textarea.properties.failure.title, defaultValue: 0 }),
        omit: new ScoreAdapter({ title: i18n.textarea.properties.omit.title, defaultValue: 0 })
    },

    /**
     * onEnable event handler
     * @class Textarea
     * @method onEnable
     * @param e
     * @param component
     * @param enabled
     */
    onEnable: function (e, component, enabled) {
        var stageElement = $(e.currentTarget);
        if (stageElement.is(`${CONSTANTS.DOT}${CONSTANTS.ELEMENT_CLASS}`) && component instanceof PageComponent) {
            stageElement.children('textarea')
            .prop({
                // disabled: !enabled, // disabled elements do not receive mousedown events in Edge and cannot be selected in design mode
                readonly: !enabled
            });
        }
    },

    /**
     * onResize Event Handler
     * @method onResize
     * @param e
     * @param component
     */
    onResize: function (e, component) {
        var stageElement = $(e.currentTarget);
        assert.ok(stageElement.is(`${CONSTANTS.DOT}${CONSTANTS.ELEMENT_CLASS}`), format('e.currentTarget is expected to be a stage element'));
        assert.instanceof(PageComponent, component, assert.format(assert.messages.instanceof.default, 'component', 'kidoju.data.PageComponent'));
        var content = stageElement.children('textarea');
        if ($.type(component.width) === CONSTANTS.NUMBER) {
            content.outerWidth(component.get('width') - content.outerWidth(true) + content.outerWidth());
        }
        if ($.type(component.height) === CONSTANTS.NUMBER) {
            content.outerHeight(component.get('height') - content.outerHeight(true) + content.outerHeight());
        }
        // prevent any side effect
        e.preventDefault();
        // prevent event to bubble on stage
        e.stopPropagation();
    },

    /**
     * Component validation
     * @param component
     * @param pageIdx
     */
    validate: function (component, pageIdx) {
        var ret = BaseTool.fn.validate.call(this, component, pageIdx);
        var description = this.description; // tool description
        var messages = this.i18n.messages;
        if (!component.attributes ||
            // Styles are only checked if there is any (optional)
            (component.attributes.style && !RX_STYLE.test(component.attributes.style))) {
            ret.push({
                type: CONSTANTS.ERROR,
                index: pageIdx,
                message: format(messages.invalidStyle, description, pageIdx + 1)
            });
        }
        return ret;
    }

});

/**
 * Registration
 */
tools.register(Textarea);