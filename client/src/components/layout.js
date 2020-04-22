import React from 'react';

import Header from './header';
import Footer from './footer';
import Post from './post';

import style from './layout.module.css';

import AdminHeader from '../admin/adminHeader';

const Break = ({ h }) => (
	<div style={{
		width:'100%',
		height: h + 'px',
	}}></div>
);

const Layout = ({ children }) => (
    <div className={style.layoutWrapper}>
        <Header/>
        <Break h='10'/>
        { children }
        <Break h='50'/>
        <Footer/>
    </div>
);

export default Layout;

export {
    Break,
};