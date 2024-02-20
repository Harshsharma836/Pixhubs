import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'

const PrivateRouter = ( {children}) => {
  const { isAuth } = useSelector( data=> data.auth );
  if(isAuth) return children;

  const toast = useToast();
  toast({
      title: 'User needs logged in',
      position: 'top',
      status: 'warning',
      isClosable: true,
  })
  return <Navigate to="/login" />;
}

export default PrivateRouter
