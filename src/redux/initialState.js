import { DEFAULT_STYLES_CELL, DEFAULT_TITLE } from '../const';
import { clone } from '@core/utils';

const defaultState = {
    title: DEFAULT_TITLE,
    colState: {},
    rowState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES_CELL,
    dataState: {},
    stylesState: {},
    openedDate: new Date().toJSON(),
}

function normalize(state) {
    return {
        ...state,
        currentStyles: DEFAULT_STYLES_CELL,
        currentText: '',
    }
}

export function normalizeInitialState(state) {
    return state
    ? normalize(state)
    : clone(defaultState);
}