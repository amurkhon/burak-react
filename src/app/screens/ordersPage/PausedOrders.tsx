import { TabPanel } from "@mui/lab";
import { Box, Button, Container, Stack } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrdersPage } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const pausedOrdersRetriver = createSelector(
    retrievePausedOrdersPage,
    (pausedOrders) => ({pausedOrders})
); 

export default function PausedOrders() {
    const { pausedOrders } = useSelector(pausedOrdersRetriver);
    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((orderItem: OrderItem) => {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => orderItem.productId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return(
                                        <Box key={orderItem._id} className={"orders-name-price"}>
                                            <img
                                                src={imagePath}
                                                className={"order-dish-img"}
                                            />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${orderItem.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderItem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{marginLeft: "15px"}}>${orderItem.itemPrice * orderItem.itemQuantity}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Products price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}} />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{marginLeft: "20px"}}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <Button variant="contained" color="secondary" className={"cancel-button"}>
                                    Cancel
                                </Button>
                                <Button variant="contained" className={"cancel-button"}>
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!pausedOrders || (pausedOrders.length === 0) && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                            src={"/icons/noimage-list.svg"}
                            style={{width:300, height: 300}}
                        />
                    </Box>
                )}
            </Stack>
        </TabPanel>
    );
}