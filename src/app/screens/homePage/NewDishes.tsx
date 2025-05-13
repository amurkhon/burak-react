import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from "../../components/divider"
import Typography from '@mui/joy/Typography';
import VisiblityIcon from "@mui/icons-material/Visibility"

import { createSelector } from "@reduxjs/toolkit";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollelction } from "../../../lib/enums/product.enum";



/** REDUX SELECTOR **/ 
const newDishesRetriever = createSelector(retrieveNewDishes,
    (newDishes) => ({newDishes})
);

export default function NewDishes() {
    const { newDishes } = useSelector(newDishesRetriever);

    return (
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes">
                    <Box className="category-title">Fresh Menu</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { newDishes.length !== 0 ? (
                            newDishes.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume = product.productCollection === ProductCollelction.DRINK
                                    ? product.productVolume + ' l' 
                                    : product.productSize + ' size';
                                return (
                                    <Card key={product._id} className={"card"} variant="outlined" sx={{ width: 320 }}>
                                        <CardOverflow>
                                            <div className="product-sale">{`${sizeVolume}`}</div>
                                            <AspectRatio ratio="1">
                                                <img src={imagePath} />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="product-detail">
                                            <Stack className="info">
                                                <Stack flexDirection={"row"}>
                                                    <Typography className={"title"} level="body-xs">{product.productName}</Typography>
                                                    <Divider width="1" height="18" bg="#d9d9d9" />
                                                    <Typography className={"price"} level="body-xs">{`${product.productPrice} $`}</Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography className="views">
                                                        {product.productViews}
                                                        <VisiblityIcon sx={{fontSize: 25, marginLeft: "5px"}} />
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardOverflow>
                                    </Card>
                                );
                            })) : <Box className="no-data">New Product Are Not Available!</Box> }
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}