import React from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    List,
  ListItem,
   
} from '@chakra-ui/react'


function UserDetailCard() {

    const { data } = useSelector((state) => state.user);
    return (
        <Box w='100%'>
            <Box>User Details</Box>
            <Box border={'1px'} borderColor='gray.100' w='100%'>
                { data && <List spacing={3} p='4'>
                    <ListItem  >
                        <span >To Do ID </span> <span>: {data.todoId}</span>
                    </ListItem>
                    <ListItem   >
                        <span >To DO title </span> <span>:{data.todoTilte}</span>
                    </ListItem>
                    <ListItem   >
                        <span >UserID </span> <span>: {data?.id}</span>
                    </ListItem>
                    <ListItem   >
                        <span >Name </span> <span>: {data?.name}</span>
                    </ListItem>
                    <ListItem   >
                        <span  >Email </span> <span>: {data?.email}</span>
                    </ListItem>
                </List>

                }
                

            </Box>
        </Box>
    );
}

export { UserDetailCard };
