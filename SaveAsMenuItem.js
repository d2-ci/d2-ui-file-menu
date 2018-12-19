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
import Save from '@material-ui/icons/Save';

import i18n from '@dhis2/d2-i18n';
import isEqual from 'lodash/fp/isEqual';

import SaveAsDialog from './SaveAsDialog';

var SaveAsMenuItem = function (_Component) {
    _inherits(SaveAsMenuItem, _Component);

    function SaveAsMenuItem(props) {
        _classCallCheck(this, SaveAsMenuItem);

        var _this = _possibleConstructorReturn(this, (SaveAsMenuItem.__proto__ || _Object$getPrototypeOf(SaveAsMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleSaveAsDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onSaveAs = function (form) {
            _this.toggleSaveAsDialog();

            if (_this.props.onSaveAs) {
                _this.props.onSaveAs(form);
            }
        };

        _this.toggleSaveAsDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(SaveAsMenuItem, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

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
                fileType = _props.fileType,
                fileModel = _props.fileModel;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MenuItem,
                    { button: true, onClick: this.toggleSaveAsDialog, disabled: !enabled },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(Save, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Save as...') })
                ),
                fileModel ? React.createElement(SaveAsDialog, {
                    open: this.state.dialogIsOpen,
                    fileType: fileType,
                    fileModel: fileModel,
                    onRequestClose: this.onClose,
                    onRequestSaveAs: this.onSaveAs
                }) : null
            );
        }
    }]);

    return SaveAsMenuItem;
}(Component);

SaveAsMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onSaveAs: null,
    onClose: null
};

SaveAsMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onSaveAs: PropTypes.func,
    onClose: PropTypes.func
};

export default SaveAsMenuItem;