import { Flex, Text, VStack, Input, Button, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, []);
  
  const onClick = () => {
    login(username, password);
  };

  return (
    <>
      <Flex height="93vh" justifyContent="center" alignItems="center">
        <VStack
          border="1px solid lightblue"
          height="30rem"
          width="40rem"
          borderRadius="1rem"
          spacing="1rem"
          padding="5"
        >
          <Text fontSize="3rem">Login</Text>
          <Input
            variant="outline"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <Input
            variant="outline"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="outline" width="100%" onClick={onClick}>
            Login
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
