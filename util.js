'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getFileTypeLabel = exports.getFileTypeLabel = function getFileTypeLabel(fileType) {
    switch (fileType) {
        case 'chart':
            return 'chart';
        case 'reportTable':
            return 'pivot table';
        case 'map':
            return 'map';
        case 'eventChart':
            return 'event chart';
        case 'eventReport':
            return 'event report';
        default:
            return 'file';
    }
};