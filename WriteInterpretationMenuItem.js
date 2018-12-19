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
import isEqual from 'lodash/fp/isEqual';

import WriteInterpretationDialog from './WriteInterpretationDialog';

var WriteInterpretationMenuItem = function (_Component) {
    _inherits(WriteInterpretationMenuItem, _Component);

    function WriteInterpretationMenuItem(props) {
        _classCallCheck(this, WriteInterpretationMenuItem);

        var _this = _possibleConstructorReturn(this, (WriteInterpretationMenuItem.__proto__ || _Object$getPrototypeOf(WriteInterpretationMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleWriteInterpretationDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onDialogReturn = function (success) {
            return function () {
                var _this$props = _this.props,
                    onWriteInterpretation = _this$props.onWriteInterpretation,
                    onWriteInterpretationError = _this$props.onWriteInterpretationError;


                _this.toggleWriteInterpretationDialog();

                if (success && onWriteInterpretation) {
                    onWriteInterpretation();
                } else if (onWriteInterpretationError) {
                    onWriteInterpretationError();
                }
            };
        };

        _this.toggleWriteInterpretationDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(WriteInterpretationMenuItem, [{
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
                fileType = _props.fileType,
                fileModel = _props.fileModel;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MenuItem,
                    { disabled: !enabled, onClick: this.toggleWriteInterpretationDialog },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(Edit, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Write interpretation') })
                ),
                fileModel ? React.createElement(WriteInterpretationDialog, {
                    open: this.state.dialogIsOpen,
                    fileType: fileType,
                    fileModel: fileModel,
                    onRequestClose: this.onClose,
                    onRequestWriteInterpretation: this.onDialogReturn(true),
                    onRequestWriteInterpretationError: this.onDialogReturn(false)
                }) : null
            );
        }
    }]);

    return WriteInterpretationMenuItem;
}(Component);

WriteInterpretationMenuItem.contextTypes = {
    d2: PropTypes.object
};

WriteInterpretationMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onWriteInterpretation: null,
    onWriteInterpretationError: null,
    onClose: null
};

WriteInterpretationMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onWriteInterpretation: PropTypes.func,
    onWriteInterpretationError: PropTypes.func,
    onClose: PropTypes.func
};

export default WriteInterpretationMenuItem;