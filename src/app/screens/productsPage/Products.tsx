import { Badge, Box, Container, CssVarsProvider, Stack } from "@mui/joy";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from '@mui/icons-material/Paid';
import Pagination from '@mui/material/Pagination';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { createSelector } from "reselect";
import { retrieveProductsPage } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { setProducts } from "./slice";

import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollelction } from "../../../lib/enums/product.enum";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProductsPage, (products) => ({products}));

interface ProductsProps {
    onAdd: (item: CartItem) => void;
};

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState({
        order: "createdAt",
        page: 1,
        limit: 8,
        productCollection: ProductCollelction.DISH,
        search: '',
    });
    const [searchText, setSearchText] = useState<string>('');
    const history = useHistory();
    useEffect( () => {
        const product = new ProductService();

        product
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch(err => console.log(err));
    },[productSearch]);

    useEffect(() => {
        if(searchText === '') {
            productSearch.search = '';
            setProductSearch({ ...productSearch });
        }
    },[searchText]);

    /* HANDLERS */ 

    const searchCollectionHandler = (collection: ProductCollelction) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({ ...productSearch });
    };
    const paginationHandler =(event: ChangeEvent<any>, value: number ) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`);
    }

    return (
        <div className={"productspage"}>
            <Container>
                <Stack className={"menu"}>
                    <Stack className={"title"}>
                        <Box className={"title-text"}>
                            Burak Restaurant
                        </Box>
                        <Stack className={"search-section"}>
                            <input 
                                type={'search'}
                                className="input" 
                                value={searchText} 
                                onChange={(e) => setSearchText(e.target.value)} 
                                placeholder="Type in here…"
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') searchProductHandler();
                                }} />
                            <Button endIcon={<SearchIcon />} className="search-button" onClick={searchProductHandler}>Serach </Button>
                        </Stack>
                    </Stack>
                    <Stack className={"filter"}>
                        <Box className={"filter-buttons"}><Button variant="contained" color={productSearch.order === "createdAt" ? 'primary' : "secondary"} onClick={() => searchOrderHandler('createdAt')}>New</Button></Box>
                        <Box className={"filter-buttons"}><Button variant="contained" color={productSearch.order === "productPrice" ? 'primary' : "secondary"} className={"order"} onClick={() => searchOrderHandler('productPrice')} >Price</Button></Box>
                        <Box className={"filter-buttons"}><Button variant="contained" color={productSearch.order === "productViews" ? 'primary' : "secondary"} className={"order"} onClick={() => searchOrderHandler('productViews')} >Views</Button></Box>
                    </Stack>
                    <Stack className={"product-list-section"}>
                        <Stack className={"categories"}>
                            <Box className={"category-button"}><Button variant="contained" color={productSearch.productCollection === ProductCollelction.DISH ? 'primary' : "secondary"} value={ProductCollelction.DISH} className={"order"} onClick={() => searchCollectionHandler(ProductCollelction.DISH)}>Dish</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={productSearch.productCollection === ProductCollelction.SALAD ? 'primary' : "secondary"} value={ProductCollelction.SALAD} className={"order"} onClick={() => searchCollectionHandler(ProductCollelction.SALAD)}>salad</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={productSearch.productCollection === ProductCollelction.DRINK ? 'primary' : "secondary"} value={ProductCollelction.DRINK} className={"order"} onClick={() => searchCollectionHandler(ProductCollelction.DRINK)}>drink</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={productSearch.productCollection === ProductCollelction.DESSERT ? 'primary' : "secondary"} value={ProductCollelction.DESSERT} className={"order"} onClick={() => searchCollectionHandler(ProductCollelction.DESSERT)}>desert</Button></Box>
                            <Box className={"category-button"}><Button variant="contained" color={productSearch.productCollection === ProductCollelction.OTHER ? 'primary' : "secondary"} value={ProductCollelction.OTHER} className={"order"} onClick={() => searchCollectionHandler(ProductCollelction.OTHER)}>other</Button></Box>
                        </Stack>
                        <Stack className={"product-cards"}>
                            <CssVarsProvider>
                                { products.length !== 0 ? (
                                products.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <Card key={product._id} className={"card"} variant="soft" onClick={() => chooseDishHandler(product._id)}>
                                            <CardOverflow>
                                                <div className="product-sale">{product.productCollection === ProductCollelction.DRINK ? product.productVolume + " litre" : product.productSize + " size"}</div>
                                                <div className="product-order-busket" onClick={(e) => {
                                                    console.log("Button Pressed!");
                                                    onAdd({
                                                        _id: product._id,
                                                        quantity: 1,
                                                        name: product.productName,
                                                        price: product.productPrice,
                                                        image: product.productImages[0],
                                                    })
                                                    e.stopPropagation();
                                                }}>
                                                    <ShoppingCartIcon sx={{width: "50px", height: "30px", color: "white"}} />
                                                </div>
                                                <div className="product-view">
                                                    <Badge badgeContent={product.productViews}>
                                                        <RemoveRedEyeIcon sx={{width: "50px", height: "30px", color: "white"}} />
                                                    </Badge>
                                                </div>
                                                <AspectRatio ratio="1">
                                                    <img className="card-picture" src={imagePath} />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className="product-detail">
                                                <Box className={"product-name"}>{product.productName}</Box>
                                                <Box className={"icon-box"}><PaidIcon sx={{fontSize: "25px", color:"gold" }} className="dollar-icon" />{product.productPrice}</Box>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })) : <Box className="no-data">New Product Are Not Available!</Box> }
                            </CssVarsProvider>
                        </Stack>
                    </Stack>
                    <Stack className={"pagination"}>
                        <Pagination 
                            count={products.length !==0 
                                ? productSearch.page + 1
                                : productSearch.page
                            } 
                            page={productSearch.page} 
                            color="secondary"
                            onChange={paginationHandler}
                        />
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