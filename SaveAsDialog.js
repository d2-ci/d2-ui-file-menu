'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var SaveAsDialog = function (_Component) {
    (0, _inherits3.default)(SaveAsDialog, _Component);

    function SaveAsDialog(props) {
        (0, _classCallCheck3.default)(this, SaveAsDialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SaveAsDialog.__proto__ || (0, _getPrototypeOf2.default)(SaveAsDialog)).call(this, props));

        _this.onRequestClose = function () {
            // reset form so when the dialog is reopened is consistent
            // with the actual favorite
            _this.setState({ name: '', description: '' });

            _this.props.onRequestClose();
        };

        _this.handleChange = function (field) {
            return function (event) {
                event.preventDefault();

                _this.setState((0, _defineProperty3.default)({}, field, event.target.value));
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

    (0, _createClass3.default)(SaveAsDialog, [{
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


            return _react2.default.createElement(
                _Dialog2.default,
                { open: open, onClose: this.onRequestClose, maxWidth: 'md' },
                _react2.default.createElement(
                    _DialogTitle2.default,
                    null,
                    _d2I18n2.default.t('Save {{what}} as', { what: (0, _util.getFileTypeLabel)(fileType) })
                ),
                _react2.default.createElement(
                    _DialogContent2.default,
                    null,
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.handleSubmit },
                        _react2.default.createElement(
                            _FormControl2.default,
                            { fullWidth: true },
                            _react2.default.createElement(_TextField2.default, {
                                label: _d2I18n2.default.t('Name'),
                                value: this.state.name,
                                required: true,
                                margin: 'normal',
                                onChange: this.handleChange('name')
                            })
                        ),
                        _react2.default.createElement(
                            _FormControl2.default,
                            { fullWidth: true },
                            _react2.default.createElement(_TextField2.default, {
                                label: _d2I18n2.default.t('Description'),
                                value: this.state.description,
                                margin: 'normal',
                                multiline: true,
                                rowsMax: 4,
                                onChange: this.handleChange('description')
                            })
                        )
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
                        _d2I18n2.default.t('Save')
                    )
                )
            );
        }
    }]);
    return SaveAsDialog;
}(_react.Component);

SaveAsDialog.contextTypes = {
    d2: _propTypes2.default.object
};

SaveAsDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestSaveAs: null
};

SaveAsDialog.propTypes = {
    open: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func,
    onRequestSaveAs: _propTypes2.default.func
};

exports.default = SaveAsDialog;