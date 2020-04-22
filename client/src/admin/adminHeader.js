import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from './adminHeader.module.css';

const AdminHeader = () => {
    const user = useSelector(state => state.user);
    if(user) {
        return(
            <div className={style.adminHeader}>
                <a>logout</a>
            </div>
        );
    }
    return null;
};

export default AdminHeader;
