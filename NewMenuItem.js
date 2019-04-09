'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _AddBox = require('@material-ui/icons/AddBox');

var _AddBox2 = _interopRequireDefault(_AddBox);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewMenuItem = function NewMenuItem(_ref) {
    var enabled = _ref.enabled,
        onNew = _ref.onNew;
    return _react2.default.createElement(
        _MenuItem2.default,
        { disabled: !enabled, onClick: onNew },
        _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_AddBox2.default, null)
        ),
        _react2.default.createElement(_ListItemText2.default, { primary: _d2I18n2.default.t('New') })
    );
};

NewMenuItem.defaultProps = {
    enabled: false,
    onNew: null
};

NewMenuItem.propTypes = {
    enabled: _propTypes2.default.bool,
    onNew: _propTypes2.default.func
};

exports.default = NewMenuItem;