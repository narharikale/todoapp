import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Todotable } from '../features/todos/Todotable';
import { UserDetailCard } from '../features/user/UserDetails';

function Home() {
    const [userDetailCardShow, setUserDetailCardShow] = useState(false);

    return (
        <Box m='10' display='flex' gap={10}>
            <Box display={'flex'} flexDirection='column' >
                
                <Todotable setUserDetailCardShow={setUserDetailCardShow} />
            </Box>
            {userDetailCardShow && <UserDetailCard />}

        </Box>
    );
}

export { Home };
