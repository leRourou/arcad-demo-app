import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/navbar.scss';

export default function NavBar(props) {

    const items = props.routes;

    // Get current location
    const location = useLocation();

    return (
        <div className="navbar">
            <div className="navbar-item">
                <p>ARCAD Demo App</p>
            </div>
            {
                items.map((item, index) => {
                    const isActive = location.pathname === item.link;
                    return (
                        <NavBarItem
                            key={index}
                            name={item.name}
                            link={item.link}
                            isActive={isActive}
                        />
                    )
                })
            }
        </div>
    )
}

function NavBarItem(props) {

    const { name, link, isActive } = props;

    return (
        <div className={`navbar-item ${isActive ? 'active' : ''}`}>
            <Link to={link}>{name}</Link>
        </div>
    )
}
