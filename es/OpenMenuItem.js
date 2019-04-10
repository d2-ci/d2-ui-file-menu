import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

import i18n from '@dhis2/d2-i18n';
import FavoritesDialog from '@dhis2/d2-ui-favorites-dialog';

var OpenMenuItem = function (_Component) {
    _inherits(OpenMenuItem, _Component);

    function OpenMenuItem(props) {
        _classCallCheck(this, OpenMenuItem);

        var _this = _possibleConstructorReturn(this, (OpenMenuItem.__proto__ || _Object$getPrototypeOf(OpenMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleFavoritesDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onOpen = function (id) {
            _this.toggleFavoritesDialog();

            if (_this.props.onOpen) {
                _this.props.onOpen(id);
            }
        };

        _this.toggleFavoritesDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(OpenMenuItem, [{
        key: 'render',
        value: function render() {
            var fileType = this.props.fileType;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MenuItem,
                    { button: true, onClick: this.toggleFavoritesDialog },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(OpenInBrowser, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Open') })
                ),
                React.createElement(FavoritesDialog, {
                    open: this.state.dialogIsOpen,
                    type: fileType,
                    d2: this.context.d2,
                    onRequestClose: this.onClose,
                    onFavoriteSelect: this.onOpen
                })
            );
        }
    }]);

    return OpenMenuItem;
}(Component);

OpenMenuItem.contextTypes = {
    d2: PropTypes.object
};

OpenMenuItem.defaultProps = {
    fileType: null,
    onOpen: null,
    onClose: null
};

OpenMenuItem.propTypes = {
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default OpenMenuItem;