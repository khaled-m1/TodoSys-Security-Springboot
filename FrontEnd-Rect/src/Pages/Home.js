import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Input,
  Button,
  useToast,
  Stack,
  VStack,
  Box,
  List,
  HStack,
} from '@chakra-ui/react';
import { errorToast, successToast } from '../util/toasts';

const Home = () => {
  const toast = useToast();
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('/api/v1/todo');
      const data = await response.json();
      if (response.status === 200) {
        setTodo(data);
      }
    };
    getTodos();
  }, [todo]);

  const onClick = async () => {
    const response = await fetch('/api/v1/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: newTodo,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      setTodo([...todo, data]);
      setNewTodo('');
      toast(successToast('Add Successfully'));
    } else {
      toast(errorToast('Add Worning'));
    }
  };

  const onDelete = async id => {
    const response = await fetch('/api/v1/todo/' + id, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.status === 200) {
      setNewTodo('');
      toast(successToast('Delete Successfully'));
    } else {
      toast(errorToast('Delete dose not Successfully'));
    }
  };

  const onSelect = (message, id) => {
    console.log(message + ' ' + id);
    setNewTodo(message);
    setEditTodo(id);
  };

  const onUpdate = async id => {
    console.log(editTodo);

    const response = await fetch('/api/v1/todo/' + editTodo, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        message: newTodo,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setTodo([...todo]);
      setNewTodo('');
      toast(successToast('Update Successfully'));
    } else {
      toast(errorToast('Update Worning'));
    }
  };

  return (
    <>
      <Flex height="93vh" justifyContent="center" alignItems="center">
        <VStack
          border="1px solid lightblue"
          width="40rem"
          borderRadius="1rem"
          spacing="1rem"
          padding="5"
        >
          <Text fontSize="3rem">Todo</Text>
          <List spacing={3} width="100%">
            {todo.map(todo => (
              <Text
                id={todo.id}
                key={todo.id}
                fontSize="1.2rem"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => onSelect(todo.message, todo.id)}
              >
                <Stack direction={['column', 'row']} spacing="124px">
                  <Box width="100%" borderBottom="1px solid lightgray">
                    {todo.message}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      colorScheme="red"
                      size="xs"
                      variant="outline"
                      onClick={() => onDelete(todo.id)}
                    >
                      X
                    </Button>
                  </Box>
                </Stack>
              </Text>
            ))}
          </List>

          <Input
            variant="outline"
            placeholder="Add Todo"
            onChange={e => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <HStack width="100%">
            <Box width="100%">
              <Button variant="outline" width="100%" onClick={onClick}>
                Add
              </Button>
            </Box>
            <Box width="100%">
              <Button
                colorScheme="yellow"
                width="100%"
                variant="outline"
                // onClick={() => onOpen()}
                onClick={() => onUpdate(todo.id)}
              >
                Edit
              </Button>
            </Box>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
