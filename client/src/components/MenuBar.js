import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveitem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveitem(name);

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (<Menu pointing secondary size="massive" color="teal">
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
        />

        <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='signUp'
                active={activeItem === 'signUp'}
                onClick={handleItemClick}
                as={Link}
                to="/signUp"
            />
        </Menu.Menu>
    </Menu>)

    return menuBar;
}

export default MenuBar;