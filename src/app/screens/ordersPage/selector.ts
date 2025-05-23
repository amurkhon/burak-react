import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectOrdersPage = (state: AppRootState) => (state.ordersPage);

export const retrievePausedOrdersPage = createSelector(
    selectOrdersPage,
    OrdersPage => OrdersPage.pausedOrders
);

export const retrieveProcessOrdersPage = createSelector(
    selectOrdersPage,
    OrdersPage => OrdersPage.processOrders
);

export const retrieveFinishedOrdersPage = createSelector(
    selectOrdersPage,
    OrdersPage => OrdersPage.finishedOrders
);