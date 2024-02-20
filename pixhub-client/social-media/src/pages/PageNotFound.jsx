import React from 'react'
import { Box, Text, Button, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box position="relative">
        <Image src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg" 
            h="100vh" w="full"
        />  
        <Link to='/'>  
            <Button colorScheme='whatsapp'
                position="absolute" left="45%" bottom="20%" 
            >Go to Home</Button>
        </Link>  
    </Box>
  )
}

export default PageNotFound
