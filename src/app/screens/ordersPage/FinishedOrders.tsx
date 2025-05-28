import { TabPanel } from "@mui/lab";
import { Box, Button, Container, Stack } from "@mui/material";
import { retrieveFinishedOrdersPage } from "./selector";
import { createSelector } from "reselect";
import { Order, OrderItem } from "../../../lib/types/order";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const finishedOrdersRetriver = createSelector(
    retrieveFinishedOrdersPage,
    (finishedOrders) => ({finishedOrders})
); 

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriver);
    return  (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems.map((orderItem: OrderItem) => {
                                    const product: Product = order.productData.filter(
                                        (ele: Product) => orderItem.productId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${product.productImages[0]}`
                                    return(
                                        <Box key={orderItem._id} className={"orders-name-price"}>
                                            <img
                                                src={imagePath}
                                                className={"order-dish-img"}
                                            />
                                            <p className={"title-dish"}>Lavash</p>
                                            <Box className={"price-box-process"}>
                                                <p>${product.productPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderItem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{marginLeft: "15px"}}>${product.productPrice * orderItem.itemQuantity}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box-finished"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
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
                            </Box>
                        </Box>
                    );
                })}

                {!finishedOrders || (finishedOrders.length === 0) && (
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