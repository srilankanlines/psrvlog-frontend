import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from  "axios";
import { useEffect, useState } from "react";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() =>{
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get(process.env.REACT_APP_ENDPOINT + '/v1/getusers') //Axios.get('http://localhost:8080/api/v1/getusers')
             .then(response =>{
                setUsers(response.data || []);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        }

        Axios.post(process.env.REACT_APP_ENDPOINT + '/v1/adduser', payload) //Axios.post('http://localhost:8080/api/v1/adduser', payload)
        .then( () =>{
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        }

        Axios.put(process.env.REACT_APP_ENDPOINT + '/v1/updateuser', payload) //Axios.put('http://localhost:8080/api/v1/updateuser', payload)
        .then( () =>{
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    const deleteUser = (data) => {

        Axios.delete(process.env.REACT_APP_ENDPOINT + `/v1/deleteuser/${data.id}`) //Axios.delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`)
        .then( () =>{
                getUsers();
             })
             .catch(error => {
                console.error("Axios Error : ", error);
             });
    }

    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px'
            }}
        >
            <UserForm
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />
            <UsersTable
                 rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={data => window.confirm('Are you Sure?') && deleteUser(data)}
            />
        </Box>
    );
}

export default Users;

