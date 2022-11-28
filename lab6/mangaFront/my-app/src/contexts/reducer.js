export const initialState = {
    mangas:[]
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                mangas: action.payload
            }
        default:
            return state
    }
}