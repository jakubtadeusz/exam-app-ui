import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../auth/Auth';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import './UserHeader.css';

function UserHeader(props) {

    let auth = useAuth();
    let navigate = useNavigate();

    let logout = (e) => {
        e.preventDefault();
        console.log("logout");
        auth.signout(() => navigate("/"));
    }

    return (
        <div id="user-header">
            <div id = "logo-container" onClick = {() => props.resetPage()}>
                <MenuBookIcon color="secondary" fontSize="large"/>
                Exam App
            </div>
            <div id = "name-container">
                {props.name}
            </div>
            {props.logged ??
            <div id="user-header-title">
                Zalogowany jako: {auth.user.username}
                <Button onClick={logout} color="secondary">Wyloguj</Button>
            </div>
            }  
        </div>
    );
}

export default UserHeader;