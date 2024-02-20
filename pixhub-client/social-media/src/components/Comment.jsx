import React, { useState } from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import moment from 'moment'
import axios from 'axios';
import config from '../config'


const IndividualComment = ({ commentData }) => {
    const { user_img, user_name, comment, createdAt } = commentData;
    return(
        <Box m="30px 0" display="flex" justifyContent="space-between" gap="20px">
            <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${user_img}.jpg`}
                w="40px" h="40px" borderRadius="50%" objectFit="cover" 
             />
            <Box display="flex" flexDir="column" gap="3px" flex="5" alignItems="flex-start">
                <Text fontSize="14px"  fontWeight="500"> { user_name } </Text>
                <Text > { comment } </Text>
            </Box>
            <Text flex="2" alignSelf="center" color="grey" fontSize="14px"> { moment(createdAt).fromNow() } </Text>
        </Box>
    )
}

  const Comment = ({ postId }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const border = (colorMode === 'light') ? "1px solid lightgray" : "1px solid #444";
    
    const [ comment, setComment ] = useState('');
    const { img } = useSelector(data => data.auth );

    const { isLoading, error, data } = useQuery('comments', async () => {
      const token = localStorage.getItem('token') || '';
        let res = await axios.get(`${config.API_URL}/api/comments/${postId}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        return res.data.data;
    })

    const queryClient = useQueryClient()

    const mutation = useMutation(async (newComment) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.post(`${config.API_URL}/api/comments/${postId}`, newComment, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        // console.log(res);
    }, {
        onSuccess: () => {
          Promise.all([
            queryClient.invalidateQueries("comments"),
            queryClient.invalidateQueries("posts")
          ])
        },
    })

    const addComment = () => {
      mutation.mutate({comment: comment});
      setComment('');
    }
  return (
    <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="20px" m="20px 0">
            <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg`} 
                w="40px" h="40px" borderRadius="50%" objectFit="cover" 
            />
            <Input value={ comment } flex="5" type="text" placeholder="write a comment..." border={border} 
              onChange={ (e)=> setComment( e.target.value ) }
            />
            <Button border="none" bgColor="#5271ff" color="white" p="10px 20px"
              onClick={ addComment }
            >Send</Button>
        </Box>
       {
        isLoading ? <h1>Loading...</h1> : data.map((comment, i) => {
            return <IndividualComment key={i} commentData={comment} />
        })
       }
    </Box>
  )
}

export default Comment
