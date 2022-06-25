import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToDos, sortBy } from './todosSlice';
import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    Button,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';

import { combineUserTodoData, getUser } from '../user/userSlice';

const Todotable = ({ setUserDetailCardShow }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getToDos())
    }, [dispatch])


    const { data, sortByState } = useSelector((state) => state.todos);

    let finalData = data;

    if (sortByState === 'ASCENDING') {
        finalData = [...finalData].sort((a, b) => a.id - b.id);

    }
    else if (sortByState === 'DESCENDING') {
        finalData = [...finalData].sort((a, b) => b.id - a.id);
    }

    const searchHandler = (e) => {
        setSearchQuery(e.target.value.toLowerCase(""));
    }

    finalData = finalData.filter((todo) => {
        return todo.title.includes(searchQuery?.toLowerCase())
            || (todo.id).toString().includes(searchQuery?.toLowerCase())
    })
    return (
        <Box>
            <InputGroup alignSelf={'flex-end'} width='30%' marginBottom={'10px'}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search'
                    onChange={searchHandler} />
            </InputGroup>
            <TableContainer>

                <Table variant='simple' border='1px' borderColor='gray.200' size={'sm'} width='20%'>
                    <Thead>
                        <Tr>
                            <Th>Todo ID
                                <Button
                                    size='sm'
                                    mx='8px'
                                    p='1'
                                    fontSize='12px'
                                    onClick={() => {
                                        dispatch(sortBy('ASCENDING'))
                                    }}
                                >ASC</Button>
                                <Button
                                    size='sm'
                                    mx='8px'
                                    p='1'
                                    fontSize='12px'
                                    onClick={() => {
                                        dispatch(sortBy('DESCENDING'))
                                    }}
                                >DSC</Button>
                            </Th>
                            <Th>Title</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {finalData?.map((todo) => {
                            return (
                                <Tr key={todo.id}>

                                    <Td>{todo.id}</Td>
                                    <Td>{todo.title}</Td>
                                    <Td>
                                        {
                                            todo.completed ?
                                                <Badge colorScheme='green'>Complete</Badge> :
                                                <Badge colorScheme='yellow'>Pending</Badge>
                                        }
                                    </Td>
                                    <Td>
                                        <Button onClick={() => {
                                            dispatch(getUser({ userId: todo.userId }))
                                            dispatch(combineUserTodoData({ todoId: todo.id, todoTilte: todo.title }))
                                            setUserDetailCardShow(true)
                                        }} > View </Button>
                                    </Td>
                                </Tr>
                            )
                        })
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export { Todotable };
