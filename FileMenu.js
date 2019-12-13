'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileMenu = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _styles = require('@material-ui/core/styles');

var _Menu = require('@material-ui/core/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _NewMenuItem = require('./NewMenuItem');

var _NewMenuItem2 = _interopRequireDefault(_NewMenuItem);

var _OpenMenuItem = require('./OpenMenuItem');

var _OpenMenuItem2 = _interopRequireDefault(_OpenMenuItem);

var _SaveMenuItem = require('./SaveMenuItem');

var _SaveMenuItem2 = _interopRequireDefault(_SaveMenuItem);

var _SaveAsMenuItem = require('./SaveAsMenuItem');

var _SaveAsMenuItem2 = _interopRequireDefault(_SaveAsMenuItem);

var _RenameMenuItem = require('./RenameMenuItem');

var _RenameMenuItem2 = _interopRequireDefault(_RenameMenuItem);

var _TranslateMenuItem = require('./TranslateMenuItem');

var _TranslateMenuItem2 = _interopRequireDefault(_TranslateMenuItem);

var _ShareMenuItem = require('./ShareMenuItem');

var _ShareMenuItem2 = _interopRequireDefault(_ShareMenuItem);

var _GetLinkMenuItem = require('./GetLinkMenuItem');

var _GetLinkMenuItem2 = _interopRequireDefault(_GetLinkMenuItem);

var _DeleteMenuItem = require('./DeleteMenuItem');

var _DeleteMenuItem2 = _interopRequireDefault(_DeleteMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileMenu = exports.FileMenu = function (_Component) {
    (0, _inherits3.default)(FileMenu, _Component);

    function FileMenu(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, FileMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FileMenu.__proto__ || (0, _getPrototypeOf2.default)(FileMenu)).call(this, props));

        _this.getChildContext = function () {
            return {
                d2: _this.props.d2
            };
        };

        _this.componentDidMount = function () {
            if (_this.props.fileId) {
                _this.setFileModel(_this.props.fileId);
            }
        };

        _this.componentDidUpdate = function (prevProps) {
            if (_this.props.fileId && prevProps.fileId !== _this.props.fileId) {
                _this.setFileModel(_this.props.fileId);
            }
        };

        _this.onOpen = function (id) {
            _this.setFileModel(id);
            _this.setState({ refreshDialogData: false });

            _this.closeMenu();

            _this.props.onOpen(id);
        };

        _this.onRename = function (form, id) {
            if (_this.state.fileModel.id === id) {
                _this.setFileModel(_this.state.fileModel.id);
                _this.setState({ refreshDialogData: true });

                _this.closeMenu();

                _this.props.onRename(form, id);
            }
        };

        _this.onNew = function () {
            _this.clearFileModel();

            _this.closeMenu();

            _this.props.onNew();
        };

        _this.onDelete = function (id) {
            if (_this.state.fileModel.id === id) {
                _this.clearFileModel();
                _this.setState({ refreshDialogData: true });

                _this.closeMenu();

                _this.props.onDelete(id);
            }
        };

        _this.onAction = function (callback, refreshDialogData) {
            return function (args) {
                _this.closeMenu();

                if (refreshDialogData) {
                    _this.setState({ refreshDialogData: true });
                }

                if (callback) {
                    callback(args);
                }
            };
        };

        _this.setFileModel = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
                var model;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _this.props.d2.models[_this.props.fileType].get(id);

                            case 2:
                                model = _context.sent;

                                _this.setState({ fileModel: model });

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.clearFileModel = function () {
            _this.setState({ fileModel: null });
        };

        _this.toggleMenu = function (event) {
            _this.setState({
                menuIsOpen: !_this.state.menuIsOpen,
                anchorEl: _this.state.menuIsOpen ? null : event.currentTarget
            });
        };

        _this.closeMenu = function () {
            _this.setState({
                menuIsOpen: false,
                anchorEl: null
            });
        };

        _this.state = {
            menuIsOpen: false,
            anchorEl: null,
            fileModel: null,
            refreshDialogData: false
        };
        return _this;
    }

    (0, _createClass3.default)(FileMenu, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                fileType = _props.fileType,
                onSave = _props.onSave,
                onSaveAs = _props.onSaveAs,
                onTranslate = _props.onTranslate,
                onShare = _props.onShare,
                onError = _props.onError;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _Button2.default,
                    {
                        className: classes.menuButton,
                        onClick: this.toggleMenu
                    },
                    _d2I18n2.default.t('File')
                ),
                _react2.default.createElement(
                    _Menu2.default,
                    {
                        disableEnforceFocus: true,
                        open: this.state.menuIsOpen,
                        onClose: this.closeMenu,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        getContentAnchorEl: null
                    },
                    _react2.default.createElement(_NewMenuItem2.default, { enabled: true, onNew: this.onNew }),
                    _react2.default.createElement(_Divider2.default, { light: true }),
                    _react2.default.createElement(_OpenMenuItem2.default, {
                        enabled: true,
                        fileType: fileType,
                        refreshDialogData: this.state.refreshDialogData,
                        onOpen: this.onOpen,
                        onClose: this.onAction(),
                        onRename: this.onRename,
                        onDelete: this.onDelete
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(_SaveMenuItem2.default, {
                        enabled: Boolean(!this.state.fileModel || this.state.fileModel && this.state.fileModel.access.update),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onSave: this.onAction(onSave, true),
                        onSaveAs: this.onAction(onSaveAs, true),
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_SaveAsMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onSaveAs: this.onAction(onSaveAs, true),
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(_RenameMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.update),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onRename: this.onRename,
                        onRenameError: this.onAction(onError),
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_TranslateMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.update),
                        fileModel: this.state.fileModel,
                        onTranslate: this.onAction(onTranslate),
                        onTranslateError: this.onAction(onError),
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(_ShareMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.manage),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onShare: this.onAction(onShare),
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_GetLinkMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onClose: this.onAction()
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(_DeleteMenuItem2.default, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.delete),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onDelete: this.onDelete,
                        onDeleteError: this.onAction(onError),
                        onClose: this.onAction()
                    })
                )
            );
        }
    }]);
    return FileMenu;
}(_react.Component);

FileMenu.childContextTypes = {
    d2: _propTypes2.default.object
};

FileMenu.defaultProps = {
    d2: null,
    fileType: 'chart',
    fileId: null,
    onNew: Function.prototype,
    onOpen: Function.prototype,
    onSave: Function.prototype,
    onSaveAs: Function.prototype,
    onRename: Function.prototype,
    onTranslate: Function.prototype,
    onShare: Function.prototype,
    onDelete: Function.prototype,
    onError: Function.prototype
};

FileMenu.propTypes = {
    d2: _propTypes2.default.object,
    fileType: _propTypes2.default.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map', 'visualization']),
    fileId: _propTypes2.default.string,
    onNew: _propTypes2.default.func,
    onOpen: _propTypes2.default.func,
    onSave: _propTypes2.default.func,
    onSaveAs: _propTypes2.default.func,
    onRename: _propTypes2.default.func,
    onTranslate: _propTypes2.default.func,
    onShare: _propTypes2.default.func,
    onDelete: _propTypes2.default.func,
    onError: _propTypes2.default.func
};

var styles = function styles(theme) {
    return {
        menuButton: {
            textTransform: 'none',
            fontSize: 15,
            fontWeight: 400
        }
    };
};

exports.default = (0, _styles.withStyles)(styles)(FileMenu);