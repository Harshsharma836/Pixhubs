import React from 'react'
import { Box, Text, Input, Image, Container, useColorMode } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import config from '../config'
import Friends from '../assets/1.png';
import Groups from '../assets/2.png';
import Market from '../assets/3.png';
import Watch from '../assets/4.png';
import Memories from '../assets/5.png';
import Events from '../assets/6.png';
import Gaming from '../assets/7.png';
import Gallery from '../assets/8.png';
import Videos from '../assets/9.png';
import Messages from '../assets/10.png';
import Tutorials from '../assets/11.png';
import Courses from '../assets/12.png';
import Fund from '../assets/13.png';

const IndividualBar = ({ img, text }) => {

  return (
    <Box display="flex" alignItems="center" gap="10px" cursor="pointer">
        <Image src={img} 
          w="20px" h="20px"
        />
        <Text fontSize="15px"> { text }</Text>
    </Box>
  )
}

const LeftBar = () => { 
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "lightgrey" : "#454543";
  const { name, id, img } = useSelector(data => data.auth);
  const navigate = useNavigate();

  return ( 
    <Box flex="2" display={["none", "none", "block"]} position="sticky" top="60px" h="110vh" 
      overflow="scroll" bgColor={ colorMode === 'light' ? "white" : "#222"} 
    >
        <Box pt="20px" pl={["10px", "0px"]} display="flex" flexDir="column" gap="20px">
           <Box display="flex" alignItems="center" gap="10px">
                <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg`} 
                  w="25px" h="25px" borderRadius="50%"
                />
                <Text fontSize="15px" onClick={ ()=> navigate(`/profile/${id}`)} cursor="pointer"
                > { name } </Text>
            </Box>
            <IndividualBar text="Friends" img={ Friends } />
            <IndividualBar text="Groups" img={ Groups } />
            <IndividualBar text="MarketPlace" img={ Market } />
            <IndividualBar text="Watch" img={ Watch } />
            <IndividualBar text="Memories" img={ Memories } />
        </Box>

        <hr style={{ margin: '20px 0px 0px', border: 'none', height: '0.5px', backgroundColor: bg }}/>

        <Box pt="20px" pl="10px" display="flex" flexDir="column" gap="20px">
            <Text fontSize="14px"> Your shortcuts </Text>
            <IndividualBar text="Events" img={ Events } />
            <IndividualBar text="Gaming" img={ Gaming } />
            <IndividualBar text="Gallery" img={ Gallery } />
            <IndividualBar text="Videos" img={ Videos } />
            <IndividualBar text="Messages" img={ Messages } />
        </Box>

        <hr style={{ margin: '20px 0px 0px', border: 'none', height: '0.5px', backgroundColor: bg }}/>

        <Box pt="20px" pl="10px" display="flex" flexDir="column" gap="20px">
            <Text fontSize="14px"> Others </Text>
            <IndividualBar text="Fund" img={ Fund } />
            <IndividualBar text="Tututorials" img={Tutorials } />
            <IndividualBar text="Courses" img={ Courses } />
        </Box>
    </Box>
  )
}

export default LeftBar
