import { Box, CardCover, Container, CssVarsProvider, Stack } from "@mui/joy";
import { OutlinedInput, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from '@mui/icons-material/Paid';
import Pagination from '@mui/material/Pagination';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';



const products = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp", productPrice: "10" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp", productPrice: "8" },
    { productName: "Kebab", imagePath: "/img/kebab.webp", productPrice: "6" },
    { productName: "Lavash", imagePath: "/img/lavash.webp", productPrice: "12" },
    { productName: "Lavash", imagePath: "/img/lavash.webp", productPrice: "12" },
    { productName: "Cutlet", imagePath: "/img/cutlet.webp", productPrice: "10" },
    { productName: "Kebab", imagePath: "/img/kebab.webp", productPrice: "6" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp", productPrice: "8" },
];



export default function Products() {
    return (
        <div className={"productspage"}>
            <Container>
                <Stack className={"menu"}>
                    <Stack className={"title"}>
                        <Box className={"title-text"}>
                            Burak Restaurant
                        </Box>
                        <Stack className={"search-section"}>
                            <OutlinedInput className="input"  placeholder="Type in here…" />
                            <Button className="search-button">Serach <SearchIcon sx={{ml:"5px"}} /> </Button>
                        </Stack>
                    </Stack>
                    <Stack className={"filter"}>
                        <Box className={"filter-buttons"}><Button variant="contained" color={"primary"} className={"order"}>New</Button></Box>
                        <Box className={"filter-buttons"}><Button variant="contained" color={"secondary"} className={"order"}>Price</Button></Box>
                        <Box className={"filter-buttons"}><Button variant="contained" color={"secondary"} className={"order"}>Views</Button></Box>
                    </Stack>
                    <Stack className={"product-list-section"}>
                        <Stack className={"categories"}>
                            <Box className={"category-button"}><Button variant="contained" color={"primary"} className={"order"}>Dish</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={"secondary"} className={"order"}>salad</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={"secondary"} className={"order"}>drink</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={"secondary"} className={"order"}>desert</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={"secondary"} className={"order"}>other</Button></Box>
                        </Stack>
                        <Stack className={"product-cards"}>
                            <CssVarsProvider>
                                { products.length !== 0 ? (
                                products.map((ele, index) => {
                                    return (
                                        <Card key={index} className={"card"} variant="soft">
                                            <CardOverflow>
                                                <div className="product-sale">LARGE size</div>
                                                <AspectRatio ratio="1">
                                                    <img className="card-picture" src={ele.imagePath} />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className="product-detail">
                                                <Box className={"product-name"}>{ele.productName}</Box>
                                                <Box className={"icon-box"}><PaidIcon sx={{fontSize: "25px", color:"gold" }} className="dollar-icon" />{ele.productPrice}</Box>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })) : <Box className="no-data">New Product Are Not Available!</Box> }
                            </CssVarsProvider>
                        </Stack>
                    </Stack>
                    <Stack className={"pagination"}>
                        <Pagination count={3} color="secondary" />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brand-board"}>
                <Box className={"title"}>Our Family Brands</Box>
                <Stack className={"brands"}>
                    <Box className={"image-box"}>
                        <img className="image" src="/img/gurme.webp" />
                    </Box>
                    <Box className={"image-box"}>
                        <img className="image" src="/img/seafood.webp" />
                    </Box>
                    <Box className={"image-box"}>
                        <img className="image" src="/img/sweets.webp" />
                    </Box>
                    <Box className={"image-box"}>
                        <img className="image" src="/img/doner.webp" />
                    </Box>
                </Stack>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe
                            style={{ marginTop:"80px",marginBottom: "60px"  }}
                            src="https://map.kakao.com/?urlX=948101.0000002324&urlY=452258.00000000396&urlLevel=3&itemId=571870271&q=%EC%82%AC%EB%9F%AC%EC%9D%B4(Saroy)&srcid=571870271&map_type=TYPE_MAP"
                            width={"100%"}
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    )
}