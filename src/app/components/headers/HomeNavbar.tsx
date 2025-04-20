import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
    const authMember = null;
    return <div className="home-navbar">
        <Container sx={{mt: "55px", height: "642px"}}>
            <Stack 
                sx={{height: "50px"}} 
                flexDirection={"row"} 
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box>
                    <NavLink to="/">
                        <img style={{width: "125px", height: "30px"}} src="/icons/burak.svg" />
                    </NavLink>
                </Box>
                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    minWidth={"700px"}
                    alignItems={"center"}
                >
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
                            <Button variant="contained" style={{background: "#3776CC", color: "#f8f8ff"}}>LOGIN</Button>
                        </Box>
                    ) : (
                        <img  />
                    )}
                </Stack>
            </Stack>
            <Stack>Detail</Stack>
        </Container>
    </div>;
}