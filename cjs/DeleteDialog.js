'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteDialog = function DeleteDialog(props) {
    var open = props.open,
        fileType = props.fileType,
        fileModel = props.fileModel,
        onRequestClose = props.onRequestClose,
        onRequestDelete = props.onRequestDelete,
        onRequestDeleteError = props.onRequestDeleteError;


    var deleteFavorite = function deleteFavorite() {
        if (fileModel) {
            fileModel.delete().then(onRequestDelete).catch(onRequestDeleteError);
        }
    };

    return _react2.default.createElement(
        _Dialog2.default,
        { open: open, onClose: onRequestClose, maxWidth: false },
        _react2.default.createElement(
            _DialogTitle2.default,
            null,
            _d2I18n2.default.t('Delete {{what}}', { what: (0, _util.getFileTypeLabel)(fileType) })
        ),
        _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
                _DialogContentText2.default,
                null,
                _d2I18n2.default.t('This {{what}} will be deleted. Continue?', {
                    what: (0, _util.getFileTypeLabel)(fileType)
                })
            )
        ),
        _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
                _Button2.default,
                { onClick: onRequestClose, color: 'primary' },
                'Cancel'
            ),
            _react2.default.createElement(
                _Button2.default,
                { onClick: deleteFavorite, color: 'primary' },
                'Delete'
            )
        )
    );
};

DeleteDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestDelete: null,
    onRequestDeleteError: null
};

DeleteDialog.propTypes = {
    open: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func,
    onRequestDelete: _propTypes2.default.func,
    onRequestDeleteError: _propTypes2.default.func
};

exports.default = DeleteDialog;