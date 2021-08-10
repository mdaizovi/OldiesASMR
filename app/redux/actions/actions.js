const INCREMENT = "INCREMENT"

const DECREMENT = "DECREMENT"

const CHANGE_BY_AMOUNT = "CHANGE_BY_AMOUNT"

export const incrementAction = () => ({
    type: INCREMENT,
})

export const decrementAction = () => ({
    type: DECREMENT,
})

export const changeByAmount = (val) => ({
    type: CHANGE_BY_AMOUNT,
    payload: val,
})