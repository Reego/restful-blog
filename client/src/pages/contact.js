import React from 'react';
import { Link } from 'react-router-dom';

import { Break } from '../components/layout';

import style from './contact.module.css';

const Contact = () => (
    <React.Fragment>
    	<Break h='50'/>
    	<div className={style.contact}>
		    <h1>Let's get in touch</h1>
		    <p><a href='https://github.com/Reego/'>Github: </a></p>
		    <p><a href='https://twitter.com/'>Twitter: </a></p>
		    <p><a href='https://reddit.com/'>Reddit: </a></p>
		</div>
    </React.Fragment>
);

export default Contact;
