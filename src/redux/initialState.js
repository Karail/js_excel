import { storage } from '@core/utils';
import { DEFAULT_STYLES_CELL, DEFAULT_TITLE } from '../const';

const defaultState = {
    title: DEFAULT_TITLE,
    colState: {},
    rowState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES_CELL,
    dataState: {},
    stylesState: {},
}

function normalize(state) {
    return {
        ...state,
        currentStyles: DEFAULT_STYLES_CELL,
        currentText: '',
    }
}

export const initialState = storage('exel-state')
    ? normalize(storage('exel-state'))
    : defaultState;