import React from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import Login from './../pages/Login';
import Logs from './../pages/Logs';
import LogsDetail from './../pages/LogsDetail';
import Info from '../pages/Info';
import Notes from './../pages/Notes';

// props from App.tsx
export default function AppRouter(props:any) {  
    // routes only accessible when logged in is true
    // destructure props within each page like this: {props}
    // otherwise you would have to do props.props.data to access data instead of props.data
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login props={props} />} />
                <Route path="/logs" element={<Logs props={props} />} />
                <Route path="/logs/:path" element={<LogsDetail props={props} />} />
                <Route path="/info" element={<Info props={props} />} />
                <Route path="/notes" element={<Notes props={props} />} />
            </Routes>
        </div>
    )
};