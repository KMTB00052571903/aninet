

export enum ActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    FETCH_DATA = 'FETCH_DATA',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR',
    // Agrega aquí otros tipos de acciones 
}

export interface Action<T = any> {
    type: ActionTypes;
    payload?: T;
}

// Ejemplos de creadores de acciones (action creators):

export const setUser = (user: any): Action => ({
    type: ActionTypes.SET_USER,
    payload: user,
});

export const logout = (): Action => ({
    type: ActionTypes.LOGOUT,
});

export const updateProfile = (profile: any): Action => ({
    type: ActionTypes.UPDATE_PROFILE,
    payload: profile,
});

export const fetchData = (): Action => ({
    type: ActionTypes.FETCH_DATA,
});

export const fetchDataSuccess = (data: any): Action => ({
    type: ActionTypes.FETCH_DATA_SUCCESS,
    payload: data,
});

export const fetchDataError = (error: any): Action => ({
    type: ActionTypes.FETCH_DATA_ERROR,
    payload: error,
});

