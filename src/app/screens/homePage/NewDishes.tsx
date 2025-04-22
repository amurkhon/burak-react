import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from "../../components/divider"
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import VisiblityIcon from "@mui/icons-material/Visibility"

const list = [
    {productName: "Cutlet", imagePath: "/img/cutlet.webp"},
    {productName: "Lavash", imagePath: "/img/lavash.webp"},
    {productName: "Kebab", imagePath: "/img/kebab-fresh.webp"},
    {productName: "Kebab", imagePath: "/img/kebab.webp"},
]

export default function NewDishes() {
    return (
        <div className="new-dishes-frame">
            <Container>
                <Stack className="new-dishes">
                    <Box className="category-title">Fresh Menu</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            {list.map((ele, index) => {
                                return (
                                    <Card key={index} className={"card"} variant="outlined" sx={{ width: 320 }}>
                                        <CardOverflow>
                                            <div className="product-sale">Normal size</div>
                                            <AspectRatio ratio="1">
                                                <img src={ele.imagePath} />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="product-detail">
                                            <Stack className="info">
                                                <Stack flexDirection={"row"}>
                                                    <Typography className={"title"} level="body-xs">{ele.productName}</Typography>
                                                    <Divider width="1" height="18" bg="#d9d9d9" />
                                                    <Typography className={"price"} level="body-xs">7$</Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography className="views">
                                                        20
                                                        <VisiblityIcon sx={{fontSize: 25, marginLeft: "5px"}} />
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardOverflow>
                                    </Card>
                                );
                            })}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}