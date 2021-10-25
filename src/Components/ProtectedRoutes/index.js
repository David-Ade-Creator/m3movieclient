import React from 'react';
import { useHistory } from "react-router-dom";
import { MovieContext } from '../../Context/MovieContext';

function ProtectedRoute(
    {
    Component,
    ...restProps
    }
) {
    const history = useHistory();
    const { auth } = React.useContext(MovieContext);
    React.useEffect(()=>{
        if(!auth.data) history.push("/login");
    },[auth.data, history]);

    if(auth.data){
        return <Component {...restProps} />
    }
    return <>loading....</>;
}

export default ProtectedRoute;