import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { Store } from './redux/Store.js'
import { Bounce, ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
        <App />
        <ToastContainer
            position="bottom-left"
            autoClose= {5000}
            hideProgressBar={false}
            closeOnClick= {true}
            pauseOnHover={true}
            theme={"colored"}
            transition={Bounce}
        />
    </Provider>
  </React.StrictMode>,
)
