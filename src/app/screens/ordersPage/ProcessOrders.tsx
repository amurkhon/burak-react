import { TabPanel } from "@mui/lab";
import { Box, Button, Container, Stack } from "@mui/material";
import moment from 'moment'
import { retrieveProcessOrdersPage } from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const processOrdersRetriver = createSelector(
    retrieveProcessOrdersPage,
    (processOrders) => ({processOrders})
);

export default function ProcessOrders() {
    const { processOrders } = useSelector(processOrdersRetriver);
    console.log("processOrders: ", processOrders);
    return  (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
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
                                            <Box className={"price-box-process"}>
                                                <p>{product.productPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderItem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{marginLeft: "15px"}}>${product.productPrice * orderItem.itemQuantity}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box-process"}>
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
                                    <p style={{width: "100px"}}>{moment().format("YY-MM-DD hh:mm")}</p>
                                </Box>
                                <Button variant="contained" color="secondary" className={"verify-button"}>
                                    Verify to fulfill
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!processOrders || (processOrders.length === 0) && (
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