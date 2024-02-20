import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store';
import App from './App'
import './index.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={ theme }>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Provider store={ store }>
            <App />
          </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
