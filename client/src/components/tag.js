import React from 'react';
import { Link } from 'react-router-dom';

import style from './extras.module.css';

export default ({ tag, onClickTag }) => {
	if(onClickTag === null) {
		return <Link className={style.postTag} to={'/blog/?tag=' + tag}>{ tag }</Link>;
	}
	return <span onClick={() => onClickTag(tag)} className={style.postTag}>{ tag }</span>;
}
