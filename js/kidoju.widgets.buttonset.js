/**
 * Copyright (c) 2013-2017 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    define([
        './window.assert',
        './window.logger',
        './vendor/kendo/kendo.binder'
    ], f);
})(function () {

    'use strict';

    (function ($, undefined) {

        var kendo = window.kendo;
        var ui = kendo.ui;
        var Widget = ui.Widget;
        var assert = window.assert;
        var logger = new window.Logger('kidoju.widgets.buttonset');
        var UNDEFINED = 'undefined';
        var NUMBER = 'number';
        var STATE_ACTIVE = 'k-state-active km-state-active';
        var STATE_DISABLED = 'k-state-disabled km-state-disabled';
        var NS = '.kendoButtonSet';
        var CLICK = 'click' + NS;
        var BUTTON_TEMPLATE = '<li class="k-button km-button"><span class="k-text km-text">{0}</span></li>';
        var ICON_TEMPLATE = '<span class="k-icon k-i-{0}"></span>';
        var UL_CLASS = 'km-widget km-buttongroup k-widget k-button-group kj-buttonset';
        var CHANGE = 'change';

        /*******************************************************************************************
         * ButtonSet
         *******************************************************************************************/

        /**
         * ButtonSet (kendoButtonSet)
         * @class ButtonSet
         * @extend Widget
         */
        var ButtonSet = Widget.extend({

            /**
             * Initializes the widget
             * @method init
             * @param element
             * @param options
             */
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                logger.debug({ method: 'init', message: 'widget initialized' });
                that._layout();
                that.enable(!!options.enabled || !that.element.prop('disabled'));
                that.value(options.value || 0);
                that.refresh();
                kendo.notify(that);
            },

            /**
             * Widget events
             * @property events
             */
            events: [
                CHANGE // Changing the flagbuttons value by clicking a star raises the change event
            ],

            /**
             * Widget options
             * @property options
             */
            options: {
                name: 'ButtonSet',
                value: 0, // Nothing selected
                enabled: true,
                selection: 'multiple',
                buttons: [
                    // { text: 'Option 1' },
                    // { text: 'Option 2' }
                ]
            },

            /**
             * Gets a sets the value
             * @method value
             * @param value
             * @return {*}
             */
            value: function (value) {
                var that = this;
                if ($.type(value) === UNDEFINED) {
                    return that._value;
                } else if ($.type(value) === NUMBER) {
                    if (that._value !== value) {
                        that._value = value;
                        that._setStateAsBits(that._value);
                    }
                } else {
                    throw new TypeError('`value` is expected to be a number that is a sum of powers of 2 where the max exponential is the total number of buttons minus 1');
                }
            },

            /**
             * Builds the widget layout
             * @method _layout
             * @private
             */
            _layout: function () {
                var that = this;
                var element = that.element;
                var buttons = that.options.buttons;
                that.wrapper = element;
                if (element.is('ul')) {
                    that.ul = that.element;
                } else {
                    that.ul = $('<ul/>').appendTo(that.element);
                }
                that.ul.addClass(UL_CLASS);
                if ($.isArray(buttons) && buttons.length) {
                    // We have buttons in options so discard ul content
                    that.ul.empty();
                    for (var i = 0, length = buttons.length; i < length; i++) {
                        var item = $(kendo.format(BUTTON_TEMPLATE, buttons[i].text));
                        if (buttons[i].icon) {
                            item.prepend(kendo.format(ICON_TEMPLATE, buttons[i].icon));
                            item.addClass('k-button-icontext');
                        }
                        // TODO consider also imageUrl
                        that.ul.append(item);
                    }
                } else {
                    // Without buttons in options, parse ul for any li
                    that.ul.children('li').each(function (index, element) {
                        element = $(element);
                        that.ul.append(kendo.format(BUTTON_TEMPLATE, element.text()));
                        element.remove();
                    });
                }
            },

            /**
             * Function called by the enabled/disabled bindings
             * @param enable
             */
            enable: function (enable) {
                var that = this;
                var buttonList = that.ul;
                var enabled = that._enabled = !!enable;
                buttonList.off(NS);
                buttonList.toggleClass(STATE_DISABLED, !enabled);
                if (enabled) {
                    buttonList.on(CLICK + NS, 'li.k-button.km-button', $.proxy(that._onButtonClick, that));
                }
            },

            /**
             * Event handler for clicking/tapping a button
             * @param e
             * @private
             */
            _onButtonClick: function (e) {
                assert.instanceof($.Event, e, kendo.format(assert.messages.instanceof.default, 'e', 'jQuery.Event'));
                e.preventDefault();
                if (this.options.selection !== 'multiple') {
                    this._reset();
                }
                $(e.currentTarget).toggleClass(STATE_ACTIVE);
                this._value = this._getStateAsBits();
                this.trigger(CHANGE);
            },

            /**
             * Get button states as bits (value)
             * @private
             */
            _getStateAsBits: function () {
                assert.instanceof($, this.ul, kendo.format(assert.messages.instanceof.default, 'this.ul', 'jQuery'));
                var ret = 0;
                this.ul.children('li').each(function (index, element) {
                    if ($(element).hasClass(STATE_ACTIVE)) {
                        ret =  ret | Math.pow(2, index);
                    }
                });
                return ret;
            },

            /**
             * Set button states as bits (value)
             * @param value
             * @private
             */
            _setStateAsBits: function (value) {
                assert.type(NUMBER, value, kendo.format(assert.messages.type.default, 'value', NUMBER));
                assert.instanceof($, this.ul, kendo.format(assert.messages.instanceof.default, 'this.ul', 'jQuery'));
                this.ul.children('li').each(function (index, element) {
                    var pow2 = Math.pow(2, index);
                    $(element).toggleClass(STATE_ACTIVE, (value & pow2) === pow2);
                });
            },

            /**
             * Reset selection
             * @private
             */
            _reset: function () {
                this._value = 0;
                this.ul.children('li').removeClass(STATE_ACTIVE);
            },

            /**
             * Refreshes the widget from value
             * @method refresh
             */
            refresh: function () {
                assert.instanceof($, this.ul, kendo.format(assert.messages.instanceof.default, 'this.ul', 'jQuery'));
                this._setStateAsBits(this._value);
            },

            /**
             * Destroys the widget
             * @method destroy
             */
            destroy: function () {
                var that = this;
                var element = this.element;
                that.ul.off(NS);
                that.ul = undefined;
                Widget.fn.destroy.call(that);
                kendo.destroy(that.element);
            }
        });

        ui.plugin(ButtonSet);

    } (window.jQuery));

    return window.kendo;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
