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

var WriteInterpretationDialog = function (_Component) {
    _inherits(WriteInterpretationDialog, _Component);

    function WriteInterpretationDialog(props) {
        var _this2 = this;

        _classCallCheck(this, WriteInterpretationDialog);

        var _this = _possibleConstructorReturn(this, (WriteInterpretationDialog.__proto__ || _Object$getPrototypeOf(WriteInterpretationDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual favorite
            _this.setState({ interpretationText: '' });

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
                var _this$props, fileType, fileModel, onRequestWriteInterpretation, onRequestWriteInterpretationError, form, url, headers;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                event.preventDefault();

                                _this$props = _this.props, fileType = _this$props.fileType, fileModel = _this$props.fileModel, onRequestWriteInterpretation = _this$props.onRequestWriteInterpretation, onRequestWriteInterpretationError = _this$props.onRequestWriteInterpretationError;

                                if (!fileModel) {
                                    _context.next = 15;
                                    break;
                                }

                                form = _this.state;
                                url = '/interpretations/' + fileType + '/' + fileModel.id;
                                headers = { 'Content-Type': 'text/plain' };
                                _context.prev = 6;
                                _context.next = 9;
                                return _this.context.d2.Api.getApi().post(url, form.interpretationText, { headers: headers });

                            case 9:

                                if (onRequestWriteInterpretation) {
                                    onRequestWriteInterpretation();
                                }
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](6);

                                onRequestWriteInterpretationError(_context.t0);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[6, 12]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.state = {
            interpretationText: ''
        };
        return _this;
    }

    _createClass(WriteInterpretationDialog, [{
        key: 'render',
        value: function render() {
            var open = this.props.open;


            return React.createElement(
                Dialog,
                { open: open, onClose: this.onRequestClose, maxWidth: 'md' },
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        DialogTitle,
                        null,
                        i18n.t('Write interpretation')
                    ),
                    React.createElement(
                        DialogContent,
                        null,
                        React.createElement(
                            FormControl,
                            { fullWidth: true },
                            React.createElement(TextField, {
                                value: this.state.interpretationText,
                                required: true,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('interpretationText')
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
                            i18n.t('Post')
                        )
                    )
                )
            );
        }
    }]);

    return WriteInterpretationDialog;
}(Component);

WriteInterpretationDialog.contextTypes = {
    d2: PropTypes.object
};

WriteInterpretationDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestWriteInterpretation: null,
    onRequestWriteInterpretationError: null
};

WriteInterpretationDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestWriteInterpretation: PropTypes.func,
    onRequestWriteInterpretationError: PropTypes.func
};

export default WriteInterpretationDialog;