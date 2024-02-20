
let defaultData = {
    isLoading: false,
    name: '',
    city: '',
    website: '',
    posts: []
}

const dataReducer = (state = defaultData, action) => {
    if(action.type === 'LOADING_ON'){
        return {
            ...state,
            isLoading: true
        }
    }else if(action.type === 'LOADING_OFF'){
        return {
            ...state,
            isLoading: false
        }
    }else if(action.type === 'USER_INFO'){
        return {
            ...state,
            ...action.payload
        }
    }else if(action.type === 'POSTS'){
        return {
            ...state,
            posts: action.payload
        }
    }
    return state;
}

export default dataReducer;