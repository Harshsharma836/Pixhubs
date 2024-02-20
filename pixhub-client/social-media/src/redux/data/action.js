
export const loadingOn = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_ON',
        payload: { name, id, token, img }
    })
}

export const loadingOff = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_OFF'
    })
}

export const addUserInfo = (name, city, website) => (dispatch, getState) => {
    return dispatch({
        type: 'USER_INFO',
        payload: {
            name: name,
            city: city,
            website: website
        }
    })
}

export const storePosts = (posts) => (dispatch, getState) => {
    return dispatch({
        type: 'POSTS',
        payload: posts
    })
}