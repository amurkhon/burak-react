import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";



const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveProductsPage = createSelector(
    selectProductsPage,
    (ProductsPage) => {return ProductsPage.products},
);

export const retrieveRestaurant = createSelector(
    selectProductsPage,
    (ProductsPage) => {return ProductsPage.restaurant},
);

export const retrieveChosenProductPage = createSelector(
    selectProductsPage,
    (ProductsPage) => {return ProductsPage.chosenProduct},
);