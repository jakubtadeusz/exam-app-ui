import React from "react";
import { useState } from "react";
import {
    useNavigate,
    useLocation,
  } from "react-router-dom";
import { useAuth } from "./Auth";
import { TextField, Button } from "@mui/material"
import './LoginPage.css'
import TitleBanner from "./TitleBanner";

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
  
    let from = location.state?.from?.pathname || "/";

    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
  
    function handleSubmit(event) {
      event.preventDefault();
      let user = {
        grant_type: "password",
        username: email,
        password: password,
        client_id: email,
        client_secret: password,
        scope: "examAPI"
      };
      auth.signin(user, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    }
  
    return (
      <div className="login-page">
        <TitleBanner/>
        <div id = "login-form">
            <p>Zaloguj się</p>
            <TextField id="outlined" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: '32px'}} fullWidth={true}/>
            <TextField id="outlined" label="Hasło" variant="outlined" value={password} type="password" onChange={e => setPassword(e.target.value)} fullWidth={true}/>
            <div className="text-hint">Odzyskaj hasło</div>
            <Button variant="contained" onClick={handleSubmit} color='secondary' fullWidth={true}><b>Zaloguj</b></Button>
            <div className="text-hint">Nie posiadasz konta? Zarejestruj się</div>
        </div>
      </div>
    );
  }

  export default LoginPage;