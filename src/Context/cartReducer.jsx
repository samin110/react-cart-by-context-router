const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const cloneState = [...state.cart];
			const extractIndex = cloneState.findIndex((item) => item.id === action.payload.id);
			if (extractIndex < 0) {
				cloneState.push({ ...action.payload, quantity: 1 });
			} else {
				const updatedIndex = { ...cloneState[extractIndex] };
				updatedIndex.quantity++;
				cloneState[extractIndex] = updatedIndex;
			}

			return { ...state, cart: cloneState, total: state.total + action.payload.offPrice };
		case "DECREMENT": {
			const cloneState = [...state.cart];
			const extractIndex = cloneState.findIndex((item) => item.id === action.payload.id);
			const update = { ...cloneState[extractIndex] };
			if (update.quantity === 1) {
				const filtered = cloneState.filter((item) => item.id !== action.payload.id);
				return { ...state, cart: filtered, total: state.total - action.payload.offPrice }
			} else {
				update.quantity--;
				cloneState[extractIndex] = update;
				return { ...state, cart: cloneState, total: state.total - action.payload.offPrice }
			}
		}

		default:
			return state;
	}
}

export default cartReducer;