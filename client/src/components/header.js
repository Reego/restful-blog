import React from 'react';
import { Link } from 'react-router-dom';

import style from './extras.module.css';

const Header = () => (
    <div className={style.header}>
    	<span>reegodev</span>
        <Link to='/'>home</Link>
        <Link to='/blog'>posts</Link>
        <Link to='/contact'>contact</Link>
    </div>
);

export default Header;
