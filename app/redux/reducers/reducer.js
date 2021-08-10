const initialState = {
    counter: { amount: 0 },
}

export default simpleCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { 
                ...state, counter: { amount: state.counter.amount + 1 }
            };
        case DECREMENT:
            return { 
                ...state, counter: { amount: state.counter.amount - 1 }
            };
        case CHANGE_BY_AMOUNT:
            return { 
                ...state, 
                counter: { amount: state.counter.amount + action.payload } 
            };
        default:
            return state;
    }
}