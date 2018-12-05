import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import i18n from '@dhis2/d2-i18n';
import { getFileTypeLabel } from './util';

var SaveAsDialog = function (_Component) {
    _inherits(SaveAsDialog, _Component);

    function SaveAsDialog(props) {
        _classCallCheck(this, SaveAsDialog);

        var _this = _possibleConstructorReturn(this, (SaveAsDialog.__proto__ || _Object$getPrototypeOf(SaveAsDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual favorite
            _this.setState({ name: '', description: '' });

            _this.props.onRequestClose();
        };

        _this.handleChange = function (field) {
            return function (event) {
                event.preventDefault();

                _this.setState(_defineProperty({}, field, event.target.value));
            };
        };

        _this.handleSubmit = function (event) {
            event.preventDefault();

            if (_this.props.onRequestSaveAs) {
                _this.props.onRequestSaveAs(_this.state);
            }
        };

        _this.state = {
            name: '',
            description: ''
        };
        return _this;
    }

    _createClass(SaveAsDialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // reset form to initial value when reopening the save as dialog
            if (nextProps.open === true && nextProps.fileModel && !this.state.name) {
                this.setState({
                    name: nextProps.fileModel.displayName || '',
                    description: nextProps.fileModel.displayDescription || ''
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                open = _props.open,
                fileType = _props.fileType;


            return React.createElement(
                Dialog,
                { open: open, onClose: this.onRequestClose, maxWidth: 'md' },
                React.createElement(
                    DialogTitle,
                    null,
                    i18n.t('Save {{what}} as', { what: getFileTypeLabel(fileType) })
                ),
                React.createElement(
                    DialogContent,
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.handleSubmit },
                        React.createElement(
                            FormControl,
                            { fullWidth: true },
                            React.createElement(TextField, {
                                label: i18n.t('Name'),
                                value: this.state.name,
                                required: true,
                                margin: 'normal',
                                onChange: this.handleChange('name')
                            })
                        ),
                        React.createElement(
                            FormControl,
                            { fullWidth: true },
                            React.createElement(TextField, {
                                label: i18n.t('Description'),
                                value: this.state.description,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('description')
                            })
                        )
                    )
                ),
                React.createElement(
                    DialogActions,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.onRequestClose, color: 'primary' },
                        i18n.t('Cancel')
                    ),
                    React.createElement(
                        Button,
                        { type: 'submit', onClick: this.handleSubmit, color: 'primary' },
                        i18n.t('Save')
                    )
                )
            );
        }
    }]);

    return SaveAsDialog;
}(Component);

SaveAsDialog.contextTypes = {
    d2: PropTypes.object
};

SaveAsDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestSaveAs: null
};

SaveAsDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestSaveAs: PropTypes.func
};

export default SaveAsDialog;