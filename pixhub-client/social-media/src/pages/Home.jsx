import React from 'react'
import {  Button, useColorMode, Box } from '@chakra-ui/react'
import { Stories, Posts, AddPost } from '../components'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "#f6f3f3" : "#333";
  return (
    <Box bgColor={ bg } p={["10px 10px", "10px 20px", "20px 50px"]} minH="120vh" >
      <Stories />
      <AddPost />
      <Posts id="ALL" />
    </Box>
  )
}

export default Home
