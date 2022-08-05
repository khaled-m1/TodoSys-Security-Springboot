import React, { useContext } from 'react';
import { HStack, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { isLogged, logout } = useContext(AuthContext);
  return (
    <>
      <HStack
        backgroundColor="lightblue"
        width="100vw"
        height="7vh"
        color="#000"
      >
        <Text fontSize="1.5rem" ml="3" fontWeight="bold" cursor="pointer">
          <Link to="/"> Todo App 📱</Link>
        </Text>
        <Spacer />
        <HStack marginRight="2rem !important" spacing="2rem" fontWeight="bold">
          {!isLogged && <Link to="/register"> Register</Link>}
          {!isLogged && <Link to="/login"> Login</Link>}
          <Link to="/about"> About</Link>
          {isLogged && (
            <Text cursor="pointer" onClick={logout}>
              Logout
            </Text>
          )}
        </HStack>
      </HStack>
    </>
  );
};

export default NavBar;
