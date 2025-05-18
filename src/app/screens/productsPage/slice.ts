import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";



const initialState: ProductsPageState = {
    products: [],
    restaurant: null,
    chosenProduct: null,
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    
    }
});

export const { setProducts, setChosenProduct, setRestaurant } = productsPageSlice.actions;
const ProductsPageReducer = productsPageSlice.reducer;

export default ProductsPageReducer;