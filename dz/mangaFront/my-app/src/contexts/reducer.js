export const initialState = {
    mangas:[],
    cart:[],
    purchase:[],
    purchases:[],
    purchases_by_id:[],
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
        case 'GET_PURCHASE':
            return {
                purchase: action.payload
            }
        case 'GET_PURCHASES_BY_ID':
            return {
                purchases_by_id: action.payload
            }
        case 'GET_PURCHASES':
            return {
                purchases: action.payload
            }
        default:
            return state

    }
}