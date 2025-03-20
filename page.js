import { create } from "zustand";
const useCart = create((set) => ({
    count: 0,
    herek: new Map(),
    cartItems: [],
    increase: () => set((state) => ({
        count: state.count + 1
    })),
    decrease: () => set((state) => ({
        count: state.count > 0 ? state.count - 1 : 0,
    })),

    put: (data) =>
        set((state) => {
            const newCartItems = [...state.cartItems, data];
            const newHerek = new Map(state.herek);

            if (newHerek.has(data)) {
                newHerek.set(data, newHerek.get(data) + 1);
            } else {
                newHerek.set(data, 1);
            }
            return {
                cartItems: newCartItems,
                herek: newHerek,
            };
        }),

    cutdown: (data) =>
        set((state) => {
            const newHerek = new Map(state.herek);
            let newCartItems = [...state.cartItems];

            if (newHerek.has(data)) {
                if (newHerek.get(data) > 1) {
                    newHerek.set(data, newHerek.get(data) - 1);
                } else {
                    newHerek.delete(data);
                    const index = newCartItems.indexOf(data);
                    if (index !== -1) {
                        newCartItems.splice(index, 1);
                    }
                }
            }
            return {
                herek: newHerek,
                cartItems: newCartItems,
            };
        }),

})
);

export default useCart;