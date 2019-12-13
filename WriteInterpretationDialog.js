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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WriteInterpretationDialog = function (_Component) {
    (0, _inherits3.default)(WriteInterpretationDialog, _Component);

    function WriteInterpretationDialog(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, WriteInterpretationDialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WriteInterpretationDialog.__proto__ || (0, _getPrototypeOf2.default)(WriteInterpretationDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual favorite
            _this.setState({ interpretationText: '' });

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
                var _this$props, fileType, fileModel, onRequestWriteInterpretation, onRequestWriteInterpretationError, form, url, headers;

                return _regenerator2.default.wrap(function _callee$(_context) {
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

    (0, _createClass3.default)(WriteInterpretationDialog, [{
        key: 'render',
        value: function render() {
            var open = this.props.open;


            return _react2.default.createElement(
                _Dialog2.default,
                { open: open, onClose: this.onRequestClose, maxWidth: 'md' },
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        _DialogTitle2.default,
                        null,
                        _d2I18n2.default.t('Write interpretation')
                    ),
                    _react2.default.createElement(
                        _DialogContent2.default,
                        null,
                        _react2.default.createElement(
                            _FormControl2.default,
                            { fullWidth: true },
                            _react2.default.createElement(_TextField2.default, {
                                value: this.state.interpretationText,
                                required: true,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('interpretationText')
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
                            {
                                type: 'submit',
                                onClick: this.handleSubmit,
                                color: 'primary'
                            },
                            _d2I18n2.default.t('Post')
                        )
                    )
                )
            );
        }
    }]);
    return WriteInterpretationDialog;
}(_react.Component);

WriteInterpretationDialog.contextTypes = {
    d2: _propTypes2.default.object
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
    open: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map', 'visualization']),
    fileModel: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func,
    onRequestWriteInterpretation: _propTypes2.default.func,
    onRequestWriteInterpretationError: _propTypes2.default.func
};

exports.default = WriteInterpretationDialog;