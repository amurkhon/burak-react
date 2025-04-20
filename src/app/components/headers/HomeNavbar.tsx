import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
    const authMember = null;
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

                    {/*BASKET*/}

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
            <Stack>Detail</Stack>
        </Container>
    </div>;
}