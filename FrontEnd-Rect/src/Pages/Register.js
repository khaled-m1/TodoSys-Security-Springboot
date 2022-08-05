import { Flex, Text, VStack, Input, Button, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { errorToast, successToast } from '../util/toasts';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [password2, setPassword2] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const { register, isLogged } = useContext(AuthContext);
  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, []);

  const onClick = () => {
    register(username, phone, password, password2);
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
          <Text fontSize="3rem">Register</Text>
          <Input
            variant="outline"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <Input
            variant="outline"
            placeholder="Phone"
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
          <Input
            variant="outline"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Input
            variant="outline"
            type="password"
            placeholder="Confirm Password"
            onChange={e => setPassword2(e.target.value)}
            value={password2}
          />
          <Button variant="outline" width="100%" onClick={onClick}>
            Register
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Register;
