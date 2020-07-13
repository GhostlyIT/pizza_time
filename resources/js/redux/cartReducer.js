const initialState = {
    items: []
}

export const cartState = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PIZZA_TO_CART':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'REMOVE_PIZZA_FROM_CART':
            let index = state.items.findIndex(item => item.id == action.payload);
            state.items.splice(index, 1);
            return {
                ...state,
                items: [...state.items]
            };
        case 'REMOVE_ALL_FROM_CART':
            return {
                items: []
            }
        default:
            return state;
    }
}
