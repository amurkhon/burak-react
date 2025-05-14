import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';

import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR **/ 
const topUsersRetriever = createSelector(retrieveTopUsers,
    (topUsers) => ({topUsers})
);

export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersRetriever);

    return (
        <div className="active-users-frame">
            <Container>
                <Stack className="active-users">
                    <Box className="title">Active Users</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            { topUsers.length !== 0 ? (
                            topUsers.map(function(member: Member){
                                const imagePath = `${serverApi}/${member.memberImage}`;
                                return (
                                    <Card key={member._id} className="card">
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={imagePath} alt="" />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="name-frame">
                                            <Box className="user-name">{member.memberNick}</Box>
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