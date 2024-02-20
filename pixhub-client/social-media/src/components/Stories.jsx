import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

let story = [
    {
        id: 1,
        name: 'Jithu',
        img: "https://images.pexels.com/photos/3921014/pexels-photo-3921014.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
        id: 2,
        name: 'Sanju',
        img: "https://images.pexels.com/photos/14173827/pexels-photo-14173827.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
        id: 3,
        name: 'Gopi',
        img: "https://images.pexels.com/photos/6207875/pexels-photo-6207875.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    { 
        id: 4,
        name: 'Sajin',
        img: "https://images.pexels.com/photos/14249237/pexels-photo-14249237.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    }
]

const IndividualStory = ({ img, name, user }) => {
    if(user) return (
        <Box flex={["none", "1"]}  w={{ base: "50px"}} borderRadius={["50%", "10px"]} overflow="hidden" 
            position="relative" h="full"
        >
            <Image h="full" w="full" src={ img } objectFit="cover" />
            <Text  color="white" position="absolute" bottom="10px" left="10px" fontWeight="400" 
                display={["none", "block"]}
            >{ name } </Text>
            <Button position="absolute" bottom={["10px","35px"]} left="10px" color="white" fontSize="20px"
                bgColor="#5271ff" border="none" borderRadius="50%" size="xs"
                display="flex" justifyContent="center" alignItems="center" w="30px" h="30px"
            >+</Button>
        </Box>
    )
    return (
        <Box flex={["none", "1"]}  borderRadius={["50%", "10px"]} overflow="hidden" position="relative"
             h="full" w={{ base: "50px"}}
        >
            <Image h="full" w="full" src={ img } objectFit="cover" />
            <Text color="white" position="absolute" bottom="10px" left="10px" fontWeight="400" 
                display={["none", "block"]}
            >{ name } </Text>
        </Box>
    )
}

const Stories = () => {
    const { name } = useSelector(data => data.auth);
  return (
    <Box display="flex" gap="10px" height={["50px", "120px", "120px", "200px"]} mb="30px" >
        <IndividualStory user={true} img="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" name={name} />
      {
        story.map((story, i) => {
            return <IndividualStory key={i} img={ story.img } name={ story.name } />
        })
      }
    </Box>
  )
}

export default Stories
