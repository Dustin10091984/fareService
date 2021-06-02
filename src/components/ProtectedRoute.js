import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
    const { component: Component, ...rest } = props;

    const [state, setState] = useState({
        is_loggedin: true,
    });

    useEffect(() => {
        if(!localStorage.userToken){
            setState(state => ({
                ...state,
                is_loggedin: false,
            }));
        }
    });

    return (
        <Route
        {...rest}
        render={ matchProps => 
            state.is_loggedin ?
                <Component {...matchProps} />
            : 
                <Redirect to="/"/>
        }
        />
    );
};

export default ProtectedRoute;
