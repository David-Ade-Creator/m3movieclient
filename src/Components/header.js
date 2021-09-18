import React from 'react'
import { Link } from 'react-router-dom'

function MovieHeader({children}) {
    return (
        <React.Fragment>
            <div style={{ height:"8vh", background:"black", display:"flex", justifyContent:"space-between", alignItems:"center", color:"white", padding:"0 10px"}}>
                <Link to="/" style={{textDecoration:"none",color:"white"}}>CapitalMovies</Link>
                <div>
                    Profile
                </div>
            </div>
           {children} 
        </React.Fragment>
    )
}

export default MovieHeader
