import React from 'react';
import { useHistory } from "react-router-dom";
import { MovieContext } from '../../Context/MovieContext';
import { URL } from '../Constants';
import DefaultLoader from '../Loader';

function ProtectedRoute(
    {
    Component,
    ...restProps
    }
) {
    const history = useHistory();
    const { auth } = React.useContext(MovieContext);
    React.useEffect(()=>{
        if(!auth.data) history.push(URL.HomePage);
    },[auth.data, history]);

    if(auth.data){
        return <Component {...restProps} />
    }
    return <DefaultLoader />;
}

export default ProtectedRoute;
