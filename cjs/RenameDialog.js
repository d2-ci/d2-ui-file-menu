'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenameDialog = function (_Component) {
    (0, _inherits3.default)(RenameDialog, _Component);

    function RenameDialog(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, RenameDialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RenameDialog.__proto__ || (0, _getPrototypeOf2.default)(RenameDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual file
            _this.setState({ newName: '', newDescription: '' });

            _this.props.onRequestClose();
        };

        _this.handleChange = function (field) {
            return function (event) {
                event.preventDefault();

                _this.setState((0, _defineProperty3.default)({}, field, event.target.value));
            };
        };

        _this.handleSubmit = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                var _this$props, fileModel, onRequestRename, onRequestRenameError, form, payload, response;

                return _regenerator2.default.wrap(function _callee$(_context) {
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
                                onRequestRename(payload, fileModel.id);

                            case 16:
                                _context.next = 21;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](4);

                                onRequestRenameError(_context.t0);

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

    (0, _createClass3.default)(RenameDialog, [{
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


            return _react2.default.createElement(
                _Dialog2.default,
                { open: open, onClose: this.onRequestClose, maxWidth: 'md' },
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        _DialogTitle2.default,
                        null,
                        _d2I18n2.default.t('Rename {{what}}', { what: (0, _util.getFileTypeLabel)(fileType) })
                    ),
                    _react2.default.createElement(
                        _DialogContent2.default,
                        null,
                        _react2.default.createElement(
                            _FormControl2.default,
                            { fullWidth: true },
                            _react2.default.createElement(_TextField2.default, {
                                label: _d2I18n2.default.t('Name'),
                                value: this.state.newName,
                                required: true,
                                margin: 'normal',
                                onChange: this.handleChange('newName')
                            })
                        ),
                        _react2.default.createElement(
                            _FormControl2.default,
                            { fullWidth: true },
                            _react2.default.createElement(_TextField2.default, {
                                label: _d2I18n2.default.t('Description'),
                                value: this.state.newDescription,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('newDescription')
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _DialogActions2.default,
                        null,
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: this.onRequestClose, color: 'primary' },
                            _d2I18n2.default.t('Cancel')
                        ),
                        _react2.default.createElement(
                            _Button2.default,
                            { type: 'submit', onClick: this.handleSubmit, color: 'primary' },
                            _d2I18n2.default.t('Rename')
                        )
                    )
                )
            );
        }
    }]);
    return RenameDialog;
}(_react.Component);

RenameDialog.contextTypes = {
    d2: _propTypes2.default.object
};

RenameDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: Function.prototype,
    onRequestRename: Function.prototype,
    onRequestRenameError: Function.prototype
};

RenameDialog.propTypes = {
    open: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func,
    onRequestRename: _propTypes2.default.func,
    onRequestRenameError: _propTypes2.default.func
};

exports.default = RenameDialog;