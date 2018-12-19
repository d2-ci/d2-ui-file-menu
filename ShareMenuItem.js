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
import Share from '@material-ui/icons/Share';

import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import isEqual from 'lodash/fp/isEqual';

var ShareMenuItem = function (_Component) {
    _inherits(ShareMenuItem, _Component);

    function ShareMenuItem(props) {
        _classCallCheck(this, ShareMenuItem);

        var _this = _possibleConstructorReturn(this, (ShareMenuItem.__proto__ || _Object$getPrototypeOf(ShareMenuItem)).call(this, props));

        _this.onClose = function () {
            _this.toggleSharingDialog();

            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onShare = function () {
            _this.toggleSharingDialog();

            if (_this.props.onShare) {
                _this.props.onShare();
            }
        };

        _this.toggleSharingDialog = function () {
            _this.setState({ dialogIsOpen: !_this.state.dialogIsOpen });
        };

        _this.state = {
            dialogIsOpen: false
        };
        return _this;
    }

    _createClass(ShareMenuItem, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            //check state first, then props. If state has changed we don't need to deepcompare props too as it 
            //would be a performance hit doing both if we already know that state was changed.

            var shouldUpdate = this.state.dialogIsOpen !== nextState.dialogIsOpen;
            if (!shouldUpdate) {
                //if state wasnt changed, check if props changed
                shouldUpdate = !isEqual(nextProps, this.props);
            }

            return shouldUpdate;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                enabled = _props.enabled,
                fileModel = _props.fileModel,
                fileType = _props.fileType;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    MenuItem,
                    { disabled: !enabled, onClick: this.toggleSharingDialog },
                    React.createElement(
                        ListItemIcon,
                        null,
                        React.createElement(Share, null)
                    ),
                    React.createElement(ListItemText, { primary: i18n.t('Share') })
                ),
                fileModel ? React.createElement(SharingDialog, {
                    open: this.state.dialogIsOpen,
                    onRequestClose: this.onShare,
                    d2: this.context.d2,
                    id: fileModel.id,
                    type: fileType
                }) : null
            );
        }
    }]);

    return ShareMenuItem;
}(Component);

ShareMenuItem.contextTypes = {
    d2: PropTypes.object
};

ShareMenuItem.defaultProps = {
    enabled: false,
    fileType: null,
    fileModel: null,
    onShare: null,
    onClose: null
};

ShareMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onShare: PropTypes.func,
    onClose: PropTypes.func
};

export default ShareMenuItem;