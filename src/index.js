import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ProveedorAuth0ConHistoria from "./components/inicio-de-sesion/ProveedorAuth0ConHistoria";


ReactDOM.render(
<Router>
    <ProveedorAuth0ConHistoria>
      <App />
    </ProveedorAuth0ConHistoria>
  </Router>
, document.getElementById('root')
);


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
