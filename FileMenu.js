import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import i18n from '@dhis2/d2-i18n';

import NewMenuItem from './NewMenuItem';
import OpenMenuItem from './OpenMenuItem';
import SaveMenuItem from './SaveMenuItem';
import SaveAsMenuItem from './SaveAsMenuItem';
import RenameMenuItem from './RenameMenuItem';
import TranslateMenuItem from './TranslateMenuItem';
import ShareMenuItem from './ShareMenuItem';
import GetLinkMenuItem from './GetLinkMenuItem';
import DeleteMenuItem from './DeleteMenuItem';

export var FileMenu = function (_Component) {
    _inherits(FileMenu, _Component);

    function FileMenu(props) {
        var _this2 = this;

        _classCallCheck(this, FileMenu);

        var _this = _possibleConstructorReturn(this, (FileMenu.__proto__ || _Object$getPrototypeOf(FileMenu)).call(this, props));

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

        _this.setFileModel = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
                var model;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
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

        _this.state = {
            menuIsOpen: false,
            anchorEl: null,
            fileModel: null,
            refreshDialogData: false
        };
        return _this;
    }

    _createClass(FileMenu, [{
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


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    Button,
                    { className: classes.menuButton, onClick: this.toggleMenu },
                    i18n.t('File')
                ),
                React.createElement(
                    Menu,
                    {
                        disableEnforceFocus: true,
                        open: this.state.menuIsOpen,
                        onClose: this.closeMenu,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        getContentAnchorEl: null
                    },
                    React.createElement(NewMenuItem, { enabled: true, onNew: this.onNew }),
                    React.createElement(Divider, { light: true }),
                    React.createElement(OpenMenuItem, {
                        enabled: true,
                        fileType: fileType,
                        refreshDialogData: this.state.refreshDialogData,
                        onOpen: this.onOpen,
                        onClose: this.onAction(),
                        onRename: this.onRename,
                        onDelete: this.onDelete
                    }),
                    React.createElement(Divider, null),
                    React.createElement(SaveMenuItem, {
                        enabled: Boolean(!this.state.fileModel || this.state.fileModel && this.state.fileModel.access.update),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onSave: this.onAction(onSave, true),
                        onSaveAs: this.onAction(onSaveAs, true),
                        onClose: this.onAction()
                    }),
                    React.createElement(SaveAsMenuItem, {
                        enabled: Boolean(this.state.fileModel),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onSaveAs: this.onAction(onSaveAs, true),
                        onClose: this.onAction()
                    }),
                    React.createElement(Divider, null),
                    React.createElement(RenameMenuItem, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.update),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onRename: this.onRename,
                        onRenameError: this.onAction(onError),
                        onClose: this.onAction()
                    }),
                    React.createElement(TranslateMenuItem, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.update),
                        fileModel: this.state.fileModel,
                        onTranslate: this.onAction(onTranslate),
                        onTranslateError: this.onAction(onError),
                        onClose: this.onAction()
                    }),
                    React.createElement(Divider, null),
                    React.createElement(ShareMenuItem, {
                        enabled: Boolean(this.state.fileModel && this.state.fileModel.access.manage),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onShare: this.onAction(onShare),
                        onClose: this.onAction()
                    }),
                    React.createElement(GetLinkMenuItem, {
                        enabled: Boolean(this.state.fileModel),
                        fileType: fileType,
                        fileModel: this.state.fileModel,
                        onClose: this.onAction()
                    }),
                    React.createElement(Divider, null),
                    React.createElement(DeleteMenuItem, {
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
}(Component);

FileMenu.childContextTypes = {
    d2: PropTypes.object
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
    d2: PropTypes.object,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileId: PropTypes.string,
    onNew: PropTypes.func,
    onOpen: PropTypes.func,
    onSave: PropTypes.func,
    onSaveAs: PropTypes.func,
    onRename: PropTypes.func,
    onTranslate: PropTypes.func,
    onShare: PropTypes.func,
    onDelete: PropTypes.func,
    onError: PropTypes.func
};

var styles = function styles(theme) {
    return {
        menuButton: {
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 400
        }
    };
};

export default withStyles(styles)(FileMenu);