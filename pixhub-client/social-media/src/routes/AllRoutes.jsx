import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navbar, LeftBar, RightBar } from '../components'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Login, Register, Home, Profile, PageNotFound } from '../pages'
import PrivateRouter from './PrivateRouter'

const queryClient = new QueryClient();

const Layout = () => {
    return (
        <div>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Container maxW="full" display="flex" >
                <LeftBar />
                <Box flex="6">
                  <Outlet />
                </Box>
                <RightBar />
            </Container>
          </QueryClientProvider>
        </div>
    )
}

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <PrivateRouter> <Layout /> </PrivateRouter> } >
            <Route path="" element={ <Home /> }/>
            <Route path="profile/:id" element={ <Profile /> }/>
        </Route>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    </div>
  )
}

export default AllRoutes
