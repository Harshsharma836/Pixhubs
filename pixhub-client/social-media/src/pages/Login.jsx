import React, { useState } from 'react'
import { Box, Text, Heading, Container, Card, CardHeader, CardBody, CardFooter, 
        Button, Input, useToast, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth/action';
import config from '../config'

const Login = () => {
    const [ details, setDetails ] = useState({
        email: '',
        password: ''
    })
    
    const [show, setShow] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toast = useToast()
    
    const handleClick = () => setShow(!show);
    
    const storeDetails = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    } 

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`${config.API_URL}/api/auth/login`, {...details});
            if(res.data.success) {
                const { token, id, name, img } = res.data;
                localStorage.setItem('token', token);
                toast({
                    title: res.data.message,
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                })
                dispatch(login(name, id, token, img))
                navigate('/');
            }
        } catch (err) {
            console.log(err.response.data.message);
            toast({
                title: err.response.data.message,
                position: 'top',
                status: 'error',
                isClosable: true,
            })
        }
    }
  return (
        <Box h="100vh" bg="rgb(193, 190, 255)" display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" flexDirection={{ base:"column", md:"row"}} w={["90%","85%","80%", "60%"]} borderRadius="md" bg="white" minH="500px">
                <Card flex="1" 
                    bgGradient="linear(to-b,rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5))"
                    bgImage="url('https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=600')" 
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="cover" p="20px" color="white"
                     justifyContent="center" alignItems="center" display={{ base: "none", sm: "none", md: "flex"}}
                >
                    <CardHeader zIndex="2">
                        <Heading fontSize="80px" lineHeight="70px">Pixhub</Heading>
                    </CardHeader>
                    <CardBody zIndex="2">
                        <Text fontWeight="400" >
                        Discover new perspectives and connect with people who share your
                         interests on Pixhub - the home for visual inspiration.
                        </Text>
                        <Text mt="5" fontSize="14px" fontWeight="400"> Don't you have an account?</Text>
                        <Button colorScheme='gray' variant='solid' mt="5" color="rebeccapurple" fontWeight="bold"
                            w="50%" p="10px" border="none"  borderRadius="0"  
                            onClick={ ()=> navigate('/register')}
                        >Register</Button>
                    </CardBody>

                    <Box bgGradient="linear(to-b,rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5))"
                         w="full" h="full" position="absolute" >
                    </Box>
                </Card>

                <Card flex="1" p="20px" 
                    display="flex" justifyContent="center" alignItems="center"
                >
                        <Box p="20px">
                            <Heading size='md' fontSize="30px" color="#555">Login</Heading>
                            <form onSubmit={ loginUser }>
                                <Input name="email" mt="6" type="email" variant='flushed' placeholder="Email" 
                                    onChange={ storeDetails } required={true}
                                /> 

                                <InputGroup size='md'  mt="6">
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder="Password" 
                                        variant='flushed'
                                        name="password"
                                        onChange={ storeDetails } required={true}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' bgColor="transparent" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <Button type="submit" mt="6"
                                    w="50%" bgColor="#938eef" color="white" fontWeight="bold" borderRadius="0"
                                    _hover={{ bg: '#938ee1' }}
                                > Login </Button>
                            </form>
                            <Text display={["block", "block", "none"]} mt="5" fontSize="14px" fontWeight="400"> Don't you have an account? 
                                <Link to="/register" style={{ fontSize:"15px", color: "blue", marginLeft: "10px"}}>
                                    Register
                                </Link>
                            </Text>
                        </Box>
                </Card>
            </Box>

        </Box>
  )
}

export default Login
