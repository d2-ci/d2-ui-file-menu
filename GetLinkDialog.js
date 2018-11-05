import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';

var getAppUrl = function getAppUrl(fileType, fileId, context) {
    var baseUrl = context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

    var appName = void 0;

    switch (fileType) {
        case 'chart':
            appName = 'dhis-web-visualizer';
            break;
        case 'reportTable':
            appName = 'dhis-web-pivot';
            break;
        case 'eventReport':
            appName = 'dhis-web-event-reports';
            break;
        case 'eventChart':
            appName = 'dhis-web-event-visualizer';
            break;
        case 'map':
            appName = 'dhis-web-maps';
            break;
        default:
            appName = '';
    }

    // DHIS2-4253: force URL to be absolute
    var url = new URL(baseUrl + '/' + appName + '/index.html?id=' + fileId, '' + window.location.origin + window.location.pathname);

    return url.href;
};

var GetLinkDialog = function GetLinkDialog(props, context) {
    var open = props.open,
        fileType = props.fileType,
        fileModel = props.fileModel,
        onRequestClose = props.onRequestClose;


    return React.createElement(
        Dialog,
        { open: open, onClose: onRequestClose },
        React.createElement(
            DialogContent,
            null,
            React.createElement(
                DialogContentText,
                null,
                i18n.t('Open in this app'),
                React.createElement('br', null),
                React.createElement(
                    'a',
                    { href: getAppUrl(fileType, fileModel.id, context) },
                    getAppUrl(fileType, fileModel.id, context)
                )
            ),
            fileType !== 'map' && React.createElement(
                DialogContentText,
                null,
                i18n.t('Open in web API'),
                React.createElement('br', null),
                React.createElement(
                    'a',
                    { href: fileModel.href + '/data.html+css' },
                    fileModel.href,
                    '/data.html+css'
                )
            )
        ),
        React.createElement(
            DialogActions,
            null,
            React.createElement(
                Button,
                { onClick: onRequestClose, color: 'primary' },
                i18n.t('Close')
            )
        )
    );
};

GetLinkDialog.contextTypes = {
    d2: PropTypes.object
};

GetLinkDialog.defaultProps = {
    open: false,
    fileModel: null,
    fileType: null,
    onRequestClose: null
};

GetLinkDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func
};

export default GetLinkDialog;