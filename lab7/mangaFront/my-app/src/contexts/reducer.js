export const initialState = {
    mangas:[],
    cart:[],
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                mangas: action.payload
            }
        case 'GET_MANGA':
            return {
                mangas: action.payload
            }
        case 'GET_CART':
            return {
                cart: action.payload
            }
        default:
            return state

    }
}