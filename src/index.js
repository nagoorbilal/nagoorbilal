import React from "react";
import ReactDOM from "react-dom"; 
import './assets/css/index.css';  
import './assets/css/App.css';
import { HashRouter, Redirect, Route, Switch } from "react-router-dom"; 
import Login from './views/Login/Login.js';
import "./assets/scss/material-dashboard-pro-react.scss?v=1.7.0"; 
import { Provider } from "react-redux";
// import {Idleclear, CommonLogout} from "./views/Login/SessionOut.js";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "./Store/store";
import Home from './HomePage/TestHome';
import PrivateRoute from './views/Login/Authentication.js';
// import Logout from './views/Login/Logout';
import Test from './HomePage/test'
import { config } from './config';
// import IdleLogout from './IdleLogout';    
const { store, persistor } = configureStore(); 

function Mount() {
    return  (<Provider store={store}>
    			<PersistGate persistor={persistor}>
	    			<HashRouter>
		                <Switch>     
						<PrivateRoute  path="/Home" component={Home} /> 
							{/* <Route path="/Home" component={Home} /> */}
			                <Route path="/login" component={Login}/>
			                <Route path="/test" component={Test}/>
			                <Redirect from="/" to="/login" />
		                </Switch>
						{/* <IdleLogout/>  */}
		            </HashRouter>
		        </PersistGate>
	        </Provider>);  

}
const element = <Mount/>;

ReactDOM.render(element, document.getElementById("root")
);
