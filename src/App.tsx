import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// interfaces
import Data from './interfaces/data';
// routes
import AppRouter from './routes/AppRouter';
import BottomNav from './components/BottomNav'
// styles
import './styles/base.css';
// inside useEffect when state updates
import { useNavigate } from 'react-router-dom';
// object with data
import { startData } from './data/startData'

export default function App() {
    const [data, setData] = useState<Partial<Data>>(startData)
    const [user, setUser] = useState<String>("")
    const [password, setPassword] = useState<String>("")
    const [loggedIn, setLoggedIn] = useState<Boolean>(false)
    const [currentPage, setCurrentPage] = useState("/")
    
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            navigate(currentPage) // in order to preserve state between pages
        }
        fetchData();
      }, [currentPage]); // when currentPage changes, useEffect reloads


    return (
        <div className="App">
            <AppRouter
                data={data}
                setData={setData}
                user={user}
                setUser={setUser}
                password={password}
                setPassword={setPassword}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
            {loggedIn ? <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
        </div>
    );
}