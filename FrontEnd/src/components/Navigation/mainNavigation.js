import React from 'react';
import {NavLink} from  'react-router-dom';
import './mainNavigation.css';

const mainNavigation = props => (
    <header className = 'main-navigation'>
        <div className="main-navigation__logo">
        <h1>CarePlus</h1>
        </div>
        <nav className ="main-navigation__items">
        <ul>
            <li><NavLink to="/auth">Authentication</NavLink></li>
            <li><NavLink to="/Reception">Reception</NavLink></li>
            <li><NavLink to="/Doctor">Doctor</NavLink></li>
            <li><NavLink to="/lab">Lab</NavLink></li>
        </ul>
        </nav>
    </header>
);
export default mainNavigation ;