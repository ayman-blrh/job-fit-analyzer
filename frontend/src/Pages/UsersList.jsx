import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList({ users: mockUsers = [] }) {
const [apiUsers, setApiUsers] = useState([]);

useEffect(() => {
axios
.get("[http://localhost:3000/api/users](http://localhost:3000/api/users)")
.then((res) => setApiUsers(res.data))
.catch((err) => console.log(err));
}, []);

const allUsers = [...mockUsers, ...apiUsers];

return ( <div>
{allUsers.length === 0 ? ( <p>No users found.</p>
) : ( <ul className="list-disc pl-5">
{allUsers.map((user, index) => ( <li key={index}>{user.name || JSON.stringify(user)}</li>
))} </ul>
)} </div>
);
}

export default UsersList;
