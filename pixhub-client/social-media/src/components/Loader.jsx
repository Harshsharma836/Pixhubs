import React from 'react'
import {  Button, useColorMode, Box, Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Box w="full" display="flex" justifyContent="center" alignItems="center" bgColor="transperent" 
        position="fixed" top="0" left="0" zIndex="10" h="100vh" bg="rgba(0, 0, 0, 0.2)"
    >
        <Spinner
            thickness='5px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            zIndex="20"
        />
    </Box>
  )
}

export default Loader
