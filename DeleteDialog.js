import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';
import { getFileTypeLabel } from './util';

var DeleteDialog = function DeleteDialog(props) {
    var open = props.open,
        fileType = props.fileType,
        fileModel = props.fileModel,
        onRequestClose = props.onRequestClose,
        onRequestDelete = props.onRequestDelete,
        onRequestDeleteError = props.onRequestDeleteError;


    var deleteFavorite = function deleteFavorite() {
        if (fileModel) {
            fileModel.delete().then(function () {
                return onRequestDelete(fileModel.id);
            }).catch(onRequestDeleteError);
        }
    };

    return React.createElement(
        Dialog,
        { open: open, onClose: onRequestClose, maxWidth: 'sm' },
        React.createElement(
            DialogTitle,
            null,
            i18n.t('Delete {{what}}', { what: getFileTypeLabel(fileType) })
        ),
        React.createElement(
            DialogContent,
            null,
            React.createElement(
                DialogContentText,
                null,
                i18n.t('This {{what}} will be deleted. Continue?', {
                    what: getFileTypeLabel(fileType)
                })
            )
        ),
        React.createElement(
            DialogActions,
            null,
            React.createElement(
                Button,
                { onClick: onRequestClose, color: 'primary' },
                'Cancel'
            ),
            React.createElement(
                Button,
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
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestDelete: PropTypes.func,
    onRequestDeleteError: PropTypes.func
};

export default DeleteDialog;