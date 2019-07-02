import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
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

var RenameDialog = function (_Component) {
    _inherits(RenameDialog, _Component);

    function RenameDialog(props) {
        var _this2 = this;

        _classCallCheck(this, RenameDialog);

        var _this = _possibleConstructorReturn(this, (RenameDialog.__proto__ || _Object$getPrototypeOf(RenameDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual file
            _this.setState({ newName: '', newDescription: '' });

            _this.props.onRequestClose();
        };

        _this.handleChange = function (field) {
            return function (event) {
                event.preventDefault();

                _this.setState(_defineProperty({}, field, event.target.value));
            };
        };

        _this.handleSubmit = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(event) {
                var _this$props, fileModel, onRequestRename, onRequestRenameError, form, payload, response;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                event.preventDefault();

                                _this$props = _this.props, fileModel = _this$props.fileModel, onRequestRename = _this$props.onRequestRename, onRequestRenameError = _this$props.onRequestRenameError;

                                if (!fileModel) {
                                    _context.next = 21;
                                    break;
                                }

                                form = _this.state;
                                _context.prev = 4;
                                payload = {
                                    description: form.newDescription
                                };


                                if (form.newName) {
                                    payload.name = form.newName;
                                }

                                if (!payload.name) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 10;
                                return _this.context.d2.Api.getApi().patch(fileModel.href, payload);

                            case 10:
                                response = _context.sent;

                                if (!(response.status === 'ERROR')) {
                                    _context.next = 15;
                                    break;
                                }

                                throw new Error(response);

                            case 15:
                                if (onRequestRename) {
                                    onRequestRename(payload);
                                }

                            case 16:
                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](4);

                                if (onRequestRenameError) {
                                    onRequestRenameError(_context.t0);
                                }

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[4, 18]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.state = {
            newName: '',
            newDescription: ''
        };
        return _this;
    }

    _createClass(RenameDialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // reset form to initial value when reopening the save as dialog
            if (nextProps.open === true && !this.state.newName) {
                this.setState({
                    newName: nextProps.fileModel.displayName || '',
                    newDescription: nextProps.fileModel.displayDescription || ''
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
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        DialogTitle,
                        null,
                        i18n.t('Rename {{what}}', { what: getFileTypeLabel(fileType) })
                    ),
                    React.createElement(
                        DialogContent,
                        null,
                        React.createElement(
                            FormControl,
                            { fullWidth: true },
                            React.createElement(TextField, {
                                label: i18n.t('Name'),
                                value: this.state.newName,
                                required: true,
                                margin: 'normal',
                                onChange: this.handleChange('newName')
                            })
                        ),
                        React.createElement(
                            FormControl,
                            { fullWidth: true },
                            React.createElement(TextField, {
                                label: i18n.t('Description'),
                                value: this.state.newDescription,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('newDescription')
                            })
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
                            i18n.t('Rename')
                        )
                    )
                )
            );
        }
    }]);

    return RenameDialog;
}(Component);

RenameDialog.contextTypes = {
    d2: PropTypes.object
};

RenameDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestRename: null,
    onRequestRenameError: null
};

RenameDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestRename: PropTypes.func,
    onRequestRenameError: PropTypes.func
};

export default RenameDialog;