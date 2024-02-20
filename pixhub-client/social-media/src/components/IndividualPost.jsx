import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Comment } from './'
import axios from 'axios'
import config from '../config'

const IndividualPost = ({ post }) => {
    const { name, user_img, desc, img, user_id, _id, createdAt, likes, total_comments } = post;
    const [ commentOpen, setCommentOpen ] = useState(false);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { id } = useSelector(data => data.auth);

    const queryClient = useQueryClient();

    const mutation = useMutation(async (post_id) => {
        const token = localStorage.getItem('token') || '';
        let res  = await axios.get(`${config.API_URL}/api/likes/${post_id}`,{
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries('posts');
        },
    })

    const deleteMutation = useMutation(async (post_id) => {
        const token = localStorage.getItem('token') || '';
        let res  = await axios.delete(`${config.API_URL}/api/posts/${post_id}`,{
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries('posts');
        },
    })

    const likePost =  () => {
        mutation.mutate(_id);
    }

    const handleDelete = async () => {
        deleteMutation.mutate(_id);
    }

  return (
    <Box borderRadius="20px" bgColor={colorMode == 'light' ? "white" : "#222" } boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
        <Box p="20px" >
            <Box display="flex" justifyContent="space-between" alignItems="center" position="relative">
                <Box display="flex" alignItems="center" gap="15px"> 
                    <Image src={ `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${user_img}.jpg`} h="40px" w="40px" borderRadius="50%" objectFit="cover" />
                    <Box>
                        <Link to={`/profile/${user_id}`} style={{ color: "inherit"}}>
                            <Text fontSize="15px" fontWeight="500">{ name }</Text>
                            <Text fontSize="13px">{ moment(createdAt).fromNow() }</Text>
                        </Link>
                    </Box>
                </Box>
                <MoreHorizIcon onClick={ ()=> setMenuOpen(!menuOpen)} cursor="pointer" />
                {menuOpen && user_id === id && 
                (<Button colorScheme="red" onClick={ handleDelete } size="sm" position="absolute" 
                    top="40px" right="0"
                >Delete</Button>)}
            </Box>

            <Box m="20px 0">
                <Text>{ desc } </Text>
                <Image src={ `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg` } w="100%" maxH="500px" objectFit="cover" mt="20px" />
            </Box>

            <Box display="flex" alignItems="center" gap="25px">
                <Box display="flex" alignItems="center" gap="5px" cursor="pointer"
                    onClick = { likePost }
                >
                    {likes.includes(id) ? <FavoriteOutlinedIcon style={{ color: 'red'}} /> : <FavoriteBorderOutlinedIcon/> }
                    <Text fontSize="15px">{likes.length} likes </Text>
                </Box>
                <Box display="flex" alignItems="center" gap="5px" cursor="pointer"
                    onClick={ ()=> setCommentOpen(!commentOpen) }
                >
                    <TextsmsOutlinedIcon/>
                    <Text fontSize="15px">{total_comments} comments</Text>
                </Box>
                <Box display="flex" alignItems="center" gap="5px" cursor="pointer">
                    <ShareOutlinedIcon/>
                    <Text fontSize="15px">share </Text>
                </Box>
            </Box>

            {commentOpen && <Comment postId={ _id }/>}
        </Box>
        
    </Box>
  )
}

export default IndividualPost
