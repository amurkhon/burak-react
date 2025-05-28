import { TabPanel } from "@mui/lab";
import { Box, Button, Container, Stack } from "@mui/material";
import moment from 'moment'
import { retrieveProcessOrdersPage } from "./selector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderSrevice from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const processOrdersRetriver = createSelector(
    retrieveProcessOrdersPage,
    (processOrders) => ({processOrders})
);

interface ProcessOrders{
    setValue: (input: string) => void;
};

export default function ProcessOrders(props: ProcessOrders) {
    const { processOrders } = useSelector(processOrdersRetriver);
    const {authMember, setOrderBuilder} = useGlobals();
    const {setValue} = props;

    /* HANDLERS */
    
    const finishOrderHandler = async (e: T) => {
            try {
                if(!authMember) throw new Error(Messages.error2);
                const orderId = e.target.value;
                const input: OrderUpdateInput = {
                    orderId: orderId,
                    orderStatus: OrderStatus.FINISH,
                };
    
                const confirmation = window.confirm("Have you recieved your order?");
                if(confirmation) {
                    const order = new OrderSrevice();
                    await order.updateOrder(input);
                    setValue("3");
                    setOrderBuilder(new Date());
                }
            } catch (err) {
                console.log(err);
                sweetErrorHandling(err);
            }
        }

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
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className={"verify-button"}
                                    onClick={finishOrderHandler}
                                >
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