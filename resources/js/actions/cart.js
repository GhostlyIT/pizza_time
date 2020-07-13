export const addPizzaToCart = obj => ({
    type: 'ADD_PIZZA_TO_CART',
    payload: obj
})

export const removePizzaFromCart = id => ({
    type: 'REMOVE_PIZZA_FROM_CART',
    payload: id
})

export const removeAllFromCart = () => ({
    type: 'REMOVE_ALL_FROM_CART',
    payload: ''
})
