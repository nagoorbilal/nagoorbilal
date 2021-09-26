import React,{Component} from 'react'; 
import { Redirect, Route } from "react-router-dom"; 

function PrivateRoute ({component: Component, authed, ...rest}) {
    var auth = localStorage.getItem('MarFish');
    //var session = localStorage.getItem('SessionID');
    // console.log("session",session)
    return (
      <Route
        {...rest}
        render={(props) => auth === "true"
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

export default PrivateRoute;