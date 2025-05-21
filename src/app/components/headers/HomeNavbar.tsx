import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";

interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
};

export default function HomeNavbar(props: HomeNavbarProps) {
    const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = props;
    const authMember = false;

    const [count, setCount] = useState<number>(0);
    const [value, setValue] = useState<boolean>(true);

    useEffect( () => {

        console.log("componentDidMount"); // DATA FETCH
        setCount(count + 1);

        return () => {
            console.log("componenWillUnmount");
        };
    }, [value]);

    /** Handlers **/

    const buttonHandler = () => {
        setValue(!value);
    }
    return <div className="home-navbar">
        <Container className="navbar-container">
            <Stack className="menu">
                <Box>
                    <NavLink to="/">
                        <img className="brand-logo" src="/icons/burak.svg" />
                    </NavLink>
                </Box>
                <Stack className="links">
                    <Box className={"hover-line"}>
                        <NavLink activeClassName={"underline"} to="/">Home</NavLink>
                    </Box>
                    <Box className={"hover-line"}>
                        <NavLink activeClassName={"underline"} to="/products">Products</NavLink>
                    </Box>
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/orders">Orders</NavLink>
                        </Box>
                    ): null}
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink activeClassName={"underline"} to="/member-page">My Page</NavLink>
                        </Box>
                    ): null}
                    <Box className={"hover-line"}>
                        <NavLink activeClassName={"underline"} to="/help">Help</NavLink>
                    </Box>

                    <Basket 
                        cartItems={cartItems}
                        onAdd = {onAdd}
                        onRemove={onRemove} 
                        onDelete = {onDelete} 
                        onDeleteAll = {onDeleteAll}
                    />

                    {!authMember ? (
                        <Box>
                            <Button variant="contained" className="login-button">LOGIN</Button>
                        </Box>
                    ) : (
                        <img 
                            className="user-avatar"
                            src={"/icons/default-user.svg"}
                            aria-haspopup={"true"}   
                        />
                    )}
                </Stack>
            </Stack>
            <Stack className={"header-frame"}>
                <Stack className={"detail"}>
                    <Box className={"head-main-text"}>World's Most Delicious Cousine</Box>
                    <Box className={"wel-text"}>The Choice, not just a choice!</Box>
                    <Box className={"service-text"}>{count} hours service</Box>
                    <Box className={"signup"}>
                        {!authMember ? (
                            <Button 
                                variant={"contained"} 
                                className={"signup-button"}
                                onClick={buttonHandler}
                            >
                                SIGN UP
                            </Button>
                        ) : null}
                    </Box>
                </Stack>
                <Stack className={"logo-frame"}>
                    <div className={"logo-img"}></div>
                </Stack>
            </Stack>
        </Container>
    </div>;
}