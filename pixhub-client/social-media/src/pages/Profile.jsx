import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Text, Input, Image, useColorMode, Button, useDisclosure } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import config from '../config'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LanguageIcon from '@mui/icons-material/Language'; 
import PlaceIcon from '@mui/icons-material/Place'; 
import { Posts, Update, Loader } from '../components'
import { addUserInfo } from '../redux/data/action';

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { id } = useParams();
  const { id : user_id } = useSelector(data => data.auth);
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery(['user', id], async () => {
    const token = localStorage.getItem('token') || '';
      let res = await axios.get(`${config.API_URL}/api/users/find/${id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
      });
      // console.log(res.data);
      if(res.data.data._id == user_id){
          const { name, website, city } = res.data.data;
          dispatch(addUserInfo(name, city || '', website || ''));
      }
      return res.data.data;
  })
  const { isOpen, onOpen, onClose } = useDisclosure();


  const queryClient = useQueryClient()

  const mutation = useMutation(async (user_id) => {
      const token = localStorage.getItem('token') || '';
      let res = await axios.get(`${config.API_URL}/api/users/follow/${user_id}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
  }, {
      onSuccess: () => {
          queryClient.invalidateQueries("user");
      },
  })

  const handleFollow = async () => {
      mutation.mutate(id);
  } 

  return (
    <Box bgColor={ colorMode === 'light' ? "#f6f3f3" : "#333"} minH="120vh">
      { data && <Update isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } userData={ data }/> }
      { isLoading && <Loader /> }

    {
      data && (
            <Box w="100%" h={["230px", "300px"]} position="relative">
                <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${data?.cover_pic}.jpg` }
                  w="100%" h="100%" objectFit="cover"
                  /> 
                <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${data?.profile_pic}.jpg` } 
                  w={["150px", "200px"]} h={["150px", "200px"]} borderRadius="50%" objectFit="cover" position="absolute" left="0" right="0" m="auto"
                  top={["150px", "200px"]}
                  />
            </Box>
          )
    }

      <Box p={["10px 10px", "20px 50px"]} m={["80px 0", "0"]}>  
        <Box  bgColor={ colorMode === 'light' ? "white" : "#222"} h="280px" borderRadius="20px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"  
          p="20px 50px" display="flex" alignItems="center" justifyContent="center" mb="20px"
          flexDir={["column", "row"]}
        >
          {/* <Box flex="1" display="flex" gap="10px">
            <a href="">
              <FacebookTwoToneIcon fontSize="large"/>
            </a>
            <a href="">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
          </Box> */}

          <Box display="flex" flexDir="column" alignItems="center" gap="10px" w={["250px", "300px"]}>
            <Text fontSize="30px" fontWeight="500">{ data?.name }</Text>

            <Box display="flex" alignItems="center" justifyContent="space-around" w="100%">
              <Box display="flex" alignItems="center" >
                <PlaceIcon />
                <Text fontSize="14px">{ data?.city || 'not added' } </Text>
              </Box>

              <Box>
                <Link to={ data?.website } target={ data?.website && "_blank"}>
                  <Box display="flex" alignItems="center" gap="5px" >
                    <LanguageIcon />
                    <Text fontSize="14px">social</Text>
                  </Box>
                </Link>
              </Box>

              <Box display="flex" alignItems="center" gap="5px" fontSize="16px">
                <Text fontWeight="500">followers:</Text>
                <Text fontWeight="600">{ data?.followers.length || 0 }</Text>
              </Box>

            </Box>

            {
              (data?._id === user_id) ? (
                <Button size="md" colorScheme="twitter" fontWeight="400" p="10px 20px" fontSize="15px" border="none"
                  onClick= { onOpen }
                > 
                  update 
                </Button>
              ): (
                <Button size="md" colorScheme="twitter" fontWeight="400" p="10px 20px" fontSize="15px" border="none"
                  onClick= { handleFollow }
                > 
                    {data?.followers.includes(user_id)? "following" : "follow"}
                </Button>
              )
            }
        
          </Box>

          {/* <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end" gap="10px">
            <EmailOutLinedIcon />
            <MoreVertIcon />
          </Box> */}
        </Box>

        <Posts id={ id } /> 
      </Box>

    </Box>
  )
}

export default Profile
