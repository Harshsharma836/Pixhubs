import React, { useState, useRef } from 'react'
import { Box, Text, Input, Image, useColorMode, Button, useToast, Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import config from '../config'
import { IndividualPost, Loader } from './index'
import { storePosts } from '../redux/data/action';


  const Posts = ({ id }) => {
      const [ skip, setSkip ] = useState(5);
      const [ paginationLoading, setPaginationLoading ] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const postData = useSelector(data => data.data.posts );
      const countRef = useRef(null);
      const toast = useToast()
      const { isLoading, error, data } = useQuery(['posts', id, skip], async () => {
          const token = localStorage.getItem('token') || '';
          let res = await axios.get(`${config.API_URL}/api/posts?id=${id}&skip=${skip}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          });
          dispatch(storePosts([...res.data.data]));
          setPaginationLoading(false);
          return res.data.data; 
      })
      if(error) {
          console.log(error.response.data.message)
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          toast({
              title: error.response.data.message || 'Something went wrong!',
              position: 'top',
              status: 'error',
              isClosable: true,
          })
      } 

      const handlerScroll = () => { 
          if(Math.floor(window.innerHeight + document.documentElement.scrollTop + 1 )  >= document.documentElement.offsetHeight){
              setSkip(postData?.length + 5);
              if( countRef.current !== postData.length ){
                  setPaginationLoading(true);
                  countRef.current = postData?.length;
              }
          }
      }
      window.onscroll = handlerScroll;
  return (
    <Box display="flex" flexDir="column" gap="40px"> 
      { error ? <h1>Something went wrong!</h1>
        : !paginationLoading && isLoading ? <Loader /> : postData.map((post, i) => {
            return <IndividualPost key={i} post={ post } />
        })
      }
      
      { paginationLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
              <Spinner color='red.500' size='lg' thickness='3px' />
          </Box>
      ) : <Text textAlign="center">No more post!</Text>}
    </Box>
  )
}

export default Posts
