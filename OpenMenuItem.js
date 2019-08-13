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

var _OpenInBrowser = require('@material-ui/icons/OpenInBrowser');

var _OpenInBrowser2 = _interopRequireDefault(_OpenInBrowser);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiFavoritesDialog = require('@dhis2/d2-ui-favorites-dialog');

var _d2UiFavoritesDialog2 = _interopRequireDefault(_d2UiFavoritesDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenMenuItem = function (_Component) {
    (0, _inherits3.default)(OpenMenuItem, _Component);

    function OpenMenuItem(props) {
        (0, _classCallCheck3.default)(this, OpenMenuItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OpenMenuItem.__proto__ || (0, _getPrototypeOf2.default)(OpenMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleFavoritesDialog();

            _this.props.onClose();
        };

        _this.onOpen = function (id) {
            _this.toggleFavoritesDialog();

            _this.props.onOpen(id);
        };

        _this.toggleFavoritesDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    (0, _createClass3.default)(OpenMenuItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                refreshDialogData = _props.refreshDialogData,
                fileType = _props.fileType,
                onRename = _props.onRename,
                onDelete = _props.onDelete;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _MenuItem2.default,
                    { button: true, onClick: this.toggleFavoritesDialog },
                    _react2.default.createElement(
                        _ListItemIcon2.default,
                        null,
                        _react2.default.createElement(_OpenInBrowser2.default, null)
                    ),
                    _react2.default.createElement(_ListItemText2.default, { primary: _d2I18n2.default.t('Open') })
                ),
                _react2.default.createElement(_d2UiFavoritesDialog2.default, {
                    open: this.state.dialogIsOpen,
                    refreshData: refreshDialogData,
                    type: fileType,
                    d2: this.context.d2,
                    onRequestClose: this.onClose,
                    onFavoriteSelect: this.onOpen,
                    onFavoriteRename: onRename,
                    onFavoriteDelete: onDelete
                })
            );
        }
    }]);
    return OpenMenuItem;
}(_react.Component);

OpenMenuItem.contextTypes = {
    d2: _propTypes2.default.object
};

OpenMenuItem.defaultProps = {
    fileType: null,
    refreshDialogData: false,
    onOpen: Function.prototype,
    onClose: Function.prototype,
    onRename: Function.prototype,
    onDelete: Function.prototype
};

OpenMenuItem.propTypes = {
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    refreshDialogData: _propTypes2.default.bool,
    onOpen: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onRename: _propTypes2.default.func,
    onDelete: _propTypes2.default.func
};

exports.default = OpenMenuItem;