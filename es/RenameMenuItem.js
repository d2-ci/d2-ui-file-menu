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
import Edit from '@material-ui/icons/Edit';

import i18n from '@dhis2/d2-i18n';
import RenameDialog from './RenameDialog';

var RenameMenuItem = function (_Component) {
    _inherits(RenameMenuItem, _Component);

    function RenameMenuItem(props) {
        _classCallCheck(this, RenameMenuItem);

        var _this = _possibleConstructorReturn(this, (RenameMenuItem.__proto__ || _Object$getPrototypeOf(RenameMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleRenameDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onDialogReturn = function (success) {
            return function (args) {
                var _this$props = _this.props,
                    onRename = _this$props.onRename,
                    onRenameError = _this$props.onRenameError;


                _this.toggleRenameDialog();

                if (success && onRename) {
                    onRename(args);
                } else if (onRenameError) {
                    onRenameError(args);
                }
            };
        };

        _this.toggleRenameDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(RenameMenuItem, [{
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
                    { disabled: !enabled, onClick: this.toggleRenameDialog },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(Edit, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Rename') })
                ),
                fileModel ? React.createElement(RenameDialog, {
                    open: this.state.dialogIsOpen,
                    fileType: fileType,
                    fileModel: fileModel,
                    onRequestClose: this.onClose,
                    onRequestRename: this.onDialogReturn(true),
                    onRequestRenameError: this.onDialogReturn(false)
                }) : null
            );
        }
    }]);

    return RenameMenuItem;
}(Component);

RenameMenuItem.contextTypes = {
    d2: PropTypes.object
};

RenameMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onRename: null,
    onRenameError: null,
    onClose: null
};

RenameMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRename: PropTypes.func,
    onRenameError: PropTypes.func,
    onClose: PropTypes.func
};

export default RenameMenuItem;