import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Translate from '@material-ui/icons/Translate';

import i18n from '@dhis2/d2-i18n';
import TranslationDialog from '@dhis2/d2-ui-translation-dialog';
import isEqual from 'lodash/fp/isEqual';

var TranslateMenuItem = function (_Component) {
    _inherits(TranslateMenuItem, _Component);

    function TranslateMenuItem(props) {
        _classCallCheck(this, TranslateMenuItem);

        var _this = _possibleConstructorReturn(this, (TranslateMenuItem.__proto__ || _Object$getPrototypeOf(TranslateMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleTranslationDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onDialogReturn = function (success) {
            return function (args) {
                var _this$props = _this.props,
                    onTranslate = _this$props.onTranslate,
                    onTranslateError = _this$props.onTranslateError;


                _this.toggleTranslationDialog();

                if (success && onTranslate) {
                    onTranslate(args);
                } else if (onTranslateError) {
                    onTranslateError(args);
                }
            };
        };

        _this.toggleTranslationDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(TranslateMenuItem, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            //check state first, then props. If state has changed we don't need to deepcompare props too as it 
            //would be a performance hit doing both if we already know that state was changed.

            var shouldUpdate = this.state.dialogIsOpen !== nextState.dialogIsOpen;
            if (!shouldUpdate) {
                //if state wasnt changed, check if props changed
                shouldUpdate = !isEqual(nextProps, this.props);
            }

            return shouldUpdate;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                enabled = _props.enabled,
                fileModel = _props.fileModel;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MenuItem,
                    { disabled: !enabled, onClick: this.toggleTranslationDialog },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(Translate, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Translate') })
                ),
                fileModel ? React.createElement(TranslationDialog, {
                    d2: this.context.d2,
                    open: this.state.dialogIsOpen,
                    onRequestClose: this.onClose,
                    objectToTranslate: fileModel,
                    fieldsToTranslate: ['name', 'description'],
                    onTranslationSaved: this.onDialogReturn(true),
                    onTranslationError: this.onDialogReturn(false)
                }) : null
            );
        }
    }]);

    return TranslateMenuItem;
}(Component);

TranslateMenuItem.contextTypes = {
    d2: PropTypes.object
};

TranslateMenuItem.defaultProps = {
    enabled: false,
    fileModel: null,
    onTranslate: null,
    onTranslateError: null,
    onClose: null
};

TranslateMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileModel: PropTypes.object,
    onTranslate: PropTypes.func,
    onTranslateError: PropTypes.func,
    onClose: PropTypes.func
};

export default TranslateMenuItem;