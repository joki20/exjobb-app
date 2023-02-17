import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Login({props}:any) {
    const data = props.data;
    const setData = props.setData;
    const user = props.user;
    const setUser = props.setUser;
    const password = props.password;
    const setPassword = props.setPassword;
    const loggedIn = props.loggedIn;
    const setLoggedIn = props.setLoggedIn;

    const navigate = useNavigate();

    useEffect(() => {
        // create keys on startup if not exist
        if (!localStorage.getItem('leftNotes')) {
            localStorage.setItem('leftNotes', JSON.stringify(''));
        }

        if (!localStorage.getItem('rightNotes')) {
            localStorage.setItem('rightNotes', JSON.stringify(''));
        }

        if (!localStorage.getItem('leftHeader')) {
            localStorage.setItem('leftHeader', JSON.stringify('Vänster'));
        }

        if (!localStorage.getItem('rightHeader')) {
            localStorage.setItem('rightHeader', JSON.stringify('Höger'));
        }


        for (var key in localStorage){
            console.log(key)
         }


        async function fetchData() {
            if (loggedIn) {
                navigate("/logs")
            }
        }
        // fetch data
        fetchData();

      }, [loggedIn]); // when loggedIn changes to 'true', useEffect runs again and renavigates



    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        data.users.every((userObject:any) => {
            if (userObject.username === user) {
                return setLoggedIn(true)
            }
        });

    }

    

  return (
    <div className="Login">

      {/* Detta är sidan 'Login'
      Så fort användaren loggar in så sätts loggedIn till true och menyn syns. */}

        <form className="login" onSubmit={submit}>
            <label>User</label>
            <input
                className="username"
                type="text"
                autoComplete="on"
                onChange={(e) => setUser(e.target.value.toLowerCase())}
                value={user}
                required
            />

            <label>Password</label>
            <input
                className="password"
                type="password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />


            <input type="submit" value="Logga in" />
        </form>
    </div>
    );
}