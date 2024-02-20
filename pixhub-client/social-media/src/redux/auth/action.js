
export const login = (name, id, token, img) => (dispatch, getState) => {
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    localStorage.setItem('img', img);
    localStorage.setItem('token', token);
    return dispatch({
        type: 'LOGIN',
        payload: { name, id, token, img }
    })
}

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('img');
    localStorage.removeItem('id');
    return dispatch({
        type: 'LOGOUT'
    })
}