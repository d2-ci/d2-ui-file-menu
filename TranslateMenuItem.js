'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Translate = require('@material-ui/icons/Translate');

var _Translate2 = _interopRequireDefault(_Translate);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiTranslationDialog = require('@dhis2/d2-ui-translation-dialog');

var _d2UiTranslationDialog2 = _interopRequireDefault(_d2UiTranslationDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TranslateMenuItem = function (_Component) {
    (0, _inherits3.default)(TranslateMenuItem, _Component);

    function TranslateMenuItem(props) {
        (0, _classCallCheck3.default)(this, TranslateMenuItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TranslateMenuItem.__proto__ || (0, _getPrototypeOf2.default)(TranslateMenuItem)).call(this, props));

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

    (0, _createClass3.default)(TranslateMenuItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                enabled = _props.enabled,
                fileModel = _props.fileModel;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _MenuItem2.default,
                    { disabled: !enabled, onClick: this.toggleTranslationDialog },
                    _react2.default.createElement(
                        _ListItemIcon2.default,
                        null,
                        _react2.default.createElement(_Translate2.default, null)
                    ),
                    _react2.default.createElement(_ListItemText2.default, { primary: _d2I18n2.default.t('Translate') })
                ),
                fileModel ? _react2.default.createElement(_d2UiTranslationDialog2.default, {
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
}(_react.Component);

TranslateMenuItem.contextTypes = {
    d2: _propTypes2.default.object
};

TranslateMenuItem.defaultProps = {
    enabled: false,
    fileModel: null,
    onTranslate: null,
    onTranslateError: null,
    onClose: null
};

TranslateMenuItem.propTypes = {
    enabled: _propTypes2.default.bool,
    fileModel: _propTypes2.default.object,
    onTranslate: _propTypes2.default.func,
    onTranslateError: _propTypes2.default.func,
    onClose: _propTypes2.default.func
};

exports.default = TranslateMenuItem;