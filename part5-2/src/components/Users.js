import React from 'react'
import { Link } from 'react-router-dom'
const Users=({users})=>{
    return(
        <div>
            <br/>
            <h2>User Information Statistics</h2>
            {users.map((user)=>{
                return(
                    <div>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>has {user.blogs.length} blogs ,you can click the name to see details
                     {/* <a href={`/users/${user.id}`}>{user.name}</a> has {user.blogs.length} blogs ,you can click the name to see details */}
                    </div>
                )
            })}
        </div>
    )
}

export default Users