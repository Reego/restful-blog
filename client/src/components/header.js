import React from 'react';
import { Link } from 'react-router-dom';

import style from './extras.module.css';

const Header = () => (
    <div className={style.header}>
    	<span>reegodev</span>
        <Link to='/'>home</Link>
        <Link to='/blog'>blog</Link>
        <Link to='/contact'>contact</Link>
        <a href='https://github.com/Reego'>github</a>
    </div>
);

export default Header;
