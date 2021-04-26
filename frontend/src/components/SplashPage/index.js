import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './Splash.scss';

const Splash = () => {
    const user = useSelector((state) => state.session?.user);

    if (user) return <Redirect to="/home" />;

    return (
        <h1>This is the Splash Page</h1>
    )
}

export default Splash