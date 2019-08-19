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

var _Edit = require('@material-ui/icons/Edit');

var _Edit2 = _interopRequireDefault(_Edit);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _RenameDialog = require('./RenameDialog');

var _RenameDialog2 = _interopRequireDefault(_RenameDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenameMenuItem = function (_Component) {
    (0, _inherits3.default)(RenameMenuItem, _Component);

    function RenameMenuItem(props) {
        (0, _classCallCheck3.default)(this, RenameMenuItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RenameMenuItem.__proto__ || (0, _getPrototypeOf2.default)(RenameMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleRenameDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onDialogReturn = function (success) {
            return function () {
                var _this$props = _this.props,
                    onRename = _this$props.onRename,
                    onRenameError = _this$props.onRenameError;


                _this.toggleRenameDialog();

                if (success) {
                    onRename.apply(undefined, arguments);
                } else {
                    onRenameError.apply(undefined, arguments);
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

    (0, _createClass3.default)(RenameMenuItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                enabled = _props.enabled,
                fileType = _props.fileType,
                fileModel = _props.fileModel;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _MenuItem2.default,
                    { disabled: !enabled, onClick: this.toggleRenameDialog },
                    _react2.default.createElement(
                        _ListItemIcon2.default,
                        null,
                        _react2.default.createElement(_Edit2.default, null)
                    ),
                    _react2.default.createElement(_ListItemText2.default, { primary: _d2I18n2.default.t('Rename') })
                ),
                fileModel ? _react2.default.createElement(_RenameDialog2.default, {
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
}(_react.Component);

RenameMenuItem.contextTypes = {
    d2: _propTypes2.default.object
};

RenameMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onRename: Function.prototype,
    onRenameError: Function.prototype,
    onClose: Function.prototype
};

RenameMenuItem.propTypes = {
    enabled: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: _propTypes2.default.object,
    onRename: _propTypes2.default.func,
    onRenameError: _propTypes2.default.func,
    onClose: _propTypes2.default.func
};

exports.default = RenameMenuItem;