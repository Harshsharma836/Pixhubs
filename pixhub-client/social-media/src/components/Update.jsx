import React, { useState, useEffect } from 'react'
import { Box, Text, Input, Image, useColorMode, Button, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import axios from 'axios';
import config from '../config'
import { Loader } from './index' 

const Update = ({ isOpen, onOpen, onClose, userData }) => {

    // const { name, city, website } = userData;
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { name, city, website } = useSelector(data => data.data);
    const [data, setData ] = useState({
        name: name,
        city: city,
        website: website
    })

    useEffect(()=> {
        setData({
            name: name,
            city: city,
            website: website
        })
    }, [name]);
    
    const queryClient = useQueryClient()

    const mutation = useMutation(async (newData) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.post(`${config.API_URL}/api/users/update`, newData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        // console.log(res);
        setIsLoading(false);
        setCover(null);
        setProfile(null);
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries('user')
        }, 
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const updateData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        storeImageAndUpdate();
        onClose();
    }

    const storeImageAndUpdate = async () => {
        const signatureResponse = await axios.get(`${config.API_URL}/get-signature`);
        let imgDatas = [];
        if(cover){
            const data = new FormData()
            data.append("file", cover)
            data.append("api_key", config.CLOUD_API_KEY)
            data.append("signature", signatureResponse.data.signature)
            data.append("timestamp", signatureResponse.data.timestamp)
          
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/auto/upload`, data, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
                onUploadProgress: function (e) {
                    // console.log(e.loaded / e.total)
                }
            })
            // console.log(cloudinaryResponse.data)
          
            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
            }
            imgDatas.push({ type: 'cover', data:  photoData });
        }
        if(profile){
            const data = new FormData()
            data.append("file", profile)
            data.append("api_key", config.CLOUD_API_KEY)
            data.append("signature", signatureResponse.data.signature)
            data.append("timestamp", signatureResponse.data.timestamp)
        
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/auto/upload`, data, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
                onUploadProgress: function (e) {
                    // console.log(e.loaded / e.total)
                }
            })
            console.log(cloudinaryResponse.data)
        
            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
            }
            imgDatas.push({ type: 'profile', data : photoData });
        }
        mutation.mutate({...data, images: imgDatas});
    }
  return (
    <>
        {isLoading && <Loader /> }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update profile</ModalHeader>
          <ModalCloseButton />
            <form onSubmit={ updateData }>
                <ModalBody display="flex" flexDir="column" gap="10px">
                <Box m="10px 0" display="flex" justifyContent="space-between" alignItems="center" mt="20px">
                    <Input type="file" id="cover" onChange={ (e) => setCover(e.target.files[0]) } display="none" />
                    <label htmlFor="cover" style={{ cursor: "pointer" }}>
                        <Box display="flex" alignItems="center" gap="10px">
                            <Image src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/img.png?raw=true" 
                                w="30px"
                            />
                            <Text fontSize="14px">Add cover</Text>
                        </Box>
                    </label>
                    <Text>{ cover?.name.substring(0, 20) }</Text>
                </Box>

                <Box m="10px 0" display="flex" justifyContent="space-between" alignItems="center" mt="20px">
                    <Input type="file" id="profile" onChange={ (e) => setProfile(e.target.files[0]) } display="none" />
                    <label htmlFor="profile" style={{ cursor: "pointer" }}>
                        <Box display="flex" alignItems="center" gap="10px">
                            <Image src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/img.png?raw=true" 
                                w="30px"
                            />
                            <Text fontSize="14px">Add profile</Text>
                        </Box>
                    </label> 
                    <Text>{ profile?.name.substring(0, 20) }</Text>
                </Box>
                        
                        <Input type="text" value={ data.name } name="name" onChange={ handleChange }
                            placeholder="Name"
                        />
                        <Input type="text" value={ data.city } name="city" onChange={ handleChange }
                            placeholder="City"
                        />
                        <Input type="text" value={ data.website } name="website" onChange={ handleChange }
                            placeholder="Website"
                        />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button type="submit" colorScheme='blue'>Update</Button>
                </ModalFooter>
            </form>
        </ModalContent> 
      </Modal>
    </>
  )
}

export default Update
