export const initialState = {
    basket: []
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price*item.amount + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i].id === action.item.id) {
                    state.basket[i].amount++;
                    return {
                        ...state,
                        basket: [...state.basket]
                    };
                };
            };
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
            break;
        case 'DELETE_FROM_BASKET':
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove item with id: ${action.id} as it is not in the basket`);
            }
            return {
                ...state,
                basket: newBasket
            };
            break;
        case 'ADD_ITEM':
            let basketCopy = [...state.basket];
            const itemIndex = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            basketCopy[itemIndex].amount++;
            console.log(basketCopy[itemIndex])
            return {
                ...state,
                basket: basketCopy
            }
            break;
        case 'REMOVE_ITEM':
            let copiedBasket = [...state.basket];
            const indexItem = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            copiedBasket[indexItem].amount--;
            console.log(copiedBasket[indexItem])
            return {
                ...state,
                basket: copiedBasket
            }
            break;        
        default:
            return state;
    }
};

export default reducer;