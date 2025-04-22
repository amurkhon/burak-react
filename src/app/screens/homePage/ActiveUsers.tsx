import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';

const list = [
    {userName: "Martin", imagePath: "/img/martin.webp"},
    {userName: "Justin", imagePath: "/img/justin.webp"},
    {userName: "Rose", imagePath: "/img/rose.webp"},
    {userName: "Nusret", imagePath: "/img/nusret.webp"},
]

export default function ActiveUsers() {
    return (
        <div className="active-users-frame">
            <Container>
                <Stack className="active-users">
                    <Box className="title">Active Users</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { list.length !== 0 ? (
                            list.map(function(ele, index){
                                return (
                                    <Card key={index} className="card">
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={ele.imagePath} alt="" />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="name-frame">
                                            <Box className="user-name">{ele.userName}</Box>
                                        </CardOverflow>
                                    </Card>
                                );
                            })) : <Box className="no-data">No Active Users!</Box>}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}