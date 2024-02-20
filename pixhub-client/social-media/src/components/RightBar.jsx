import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Text, Input, Image, Container, Button, useColorMode } from '@chakra-ui/react'
import axios from 'axios';
import config from '../config';

const User = ({ mode, img, name, message, colorMode }) => {
  if(mode === 'SUGGESTION') return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt="15px">
      <Box display="flex" alignItems="center" gap="10px">
          <Image src={img}
            w="30px" h="30px" borderRadius="50%" objectFit="cover"
          />
          <Text fontSize="14px" fontWeight="500">{ name }</Text>
      </Box>
      <Box display="flex" alignItems="center" gap="10px">
        <Button size="xs" colorScheme="twitter" fontWeight="400" p="7px" fontSize="14px" border="none"> follow </Button>
        <Button size="xs" colorScheme="red" fontWeight="400" p="7px" fontSize="14px" border="none"> dismiss </Button>
      </Box>
    </Box>
  )

  if(mode === 'ACTIVITIES')return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt="15px">
      <Box display="flex" alignItems="center" gap="8px" >
          <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg`}
            w="30px" h="30px" borderRadius="50%" objectFit="cover"
          />
          <Text fontSize="15px" fontWeight="500">{name}</Text>
          <Text fontWeight="400" fontSize="14px" color={colorMode == 'light' ?"grey" : "lightgrey"}> {message}</Text>
      </Box>
      <Text fontWeight="400" fontSize="14px">1hour ago</Text>
    </Box>
  )

  if(mode === 'ONLINE') return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt="15px">
      <Box display="flex" alignItems="center" gap="10px" position="relative">
            <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg`} 
              w="30px" h="30px" borderRadius="50%" objectFit="cover"
            />
            <Box w="10px" h="10px" borderRadius="50%" bgColor="limegreen" position="absolute" top="0" left="22px" />
                <Text fontSize="14px" fontWeight="500">{name}</Text>
          </Box>
      </Box>
  )
}

const RightBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "#f6f3f3" : "#333";
  const [data, setData] = useState([]);
  const { id } = useSelector(data => data.auth );

  useEffect(() => {
      fetchUsers();
  }, [])

  const fetchUsers = async () => {
      try {
          const token = localStorage.getItem('token') || '';
          let res = await axios.get(`${config.API_URL}/api/users`, {
              headers: {
                'authorization': `Bearer ${token}`
              }
          });
          if(res.data.success) {
            setData([newObj, ...res.data.data]);
        }
      } catch (err) {
          console.log(err);
      }
  }


  
  const newObj = {
    city: "Indore",
    cover_pic: "hbasjtpjankbhsylgpqe",
    createdAt: "2023-02-21T04:51:33.878Z",
    email: "harshsharma1421@gmail.com",
    followers: ['63f4524c385b4ca6dfcc62a3', '63fc77ee731499e92b7f2e01', '63f44f56385b4ca6dfcc61f6', '641095c27ad881cecc653c08', '646c220ce5d6c5a47d414d06'],
    name: "Harsh Sharma",
    password: "$2a$10$POtNTjuloUU0FCv6HBfHhefl473aMMCwUEq52.cmW9yxQSgmGoKwy",
    profile_pic: "nwfnhrtlbxv9rrkayh6h",
    updatedAt: "2023-05-23T02:17:21.647Z",
    website: "https://github.com/Harshsharma836",
    __v: 0,
    _id: "63f44dd5385b4ca6dfcc6184"
  };

  return (
    <Box pl="15px" flex="3" display={["none", "none", "none", "block"]} position="sticky" top="60px" h="110vh" overflow="scroll" bgColor={ bg }>
        <Box boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" p="25px" mb="20px"
          bgColor={ colorMode === 'light' ? "white" : "#222"}
        >
            <Text color={colorMode == 'light'? "#555": "lightgray"}>Suggestions for you</Text>
            
            <User mode="SUGGESTION" name="Sajin" img="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <User mode="SUGGESTION" name="Alkesh" img="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </Box>

        <Box boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" p="25px" mb="20px"
          bgColor={ colorMode === 'light' ? "white" : "#222"}
        >
          
            <Text color={colorMode == 'light'? "#555": "lightgray"}>Latest activities</Text>
            
            {
             
                data.map(({ name, profile_pic, _id }) => {
                    if(_id !== id) {
                      return <User colorMode={ colorMode } 
                      message="Changed their profile picture" mode="ACTIVITIES" name={ name } 
                      img={ profile_pic }  key={ _id } />       
                    }
                })
            }
        </Box>

        <Box boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" p="25px" mb="20px"
          bgColor={ colorMode === 'light' ? "white" : "#222"}
        >
            <Text color={colorMode == 'light'? "#555": "lightgray"}>Online friends</Text>
            
            {
                data.map(({ name, profile_pic, _id }) => {
                    if(_id !== id) {
                      return <User mode="ONLINE" key={ _id } name={ name } 
                      img={ profile_pic } />
                    }
                })
            }
        </Box>

    </Box>
  )
}

export default RightBar
