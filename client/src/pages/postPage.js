import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { getPosts } from '../common/api';

import style from './home.module.css';
import extrasStyle from '../components/extras.module.css';

import { Break } from '../components/layout';
import Post from '../components/post';
import Tag from '../components/tag';

const SidePanel = () => {

	return (
		<React.Fragment>
			<div>
				<h2>Related Tags</h2>
				<p>Twitter</p>
				<p>Twitter</p>
				<p>Twitter</p>
				<p>Twitter</p>
			</div>
		</React.Fragment>
	);
};

const MainPanel = ({ post, onClickTag }) => {

	const tagComponents = [];

	for(let i = 0; i < post.tags.length; i++) {
		tagComponents.push(
			<Tag onClickTag={onClickTag} key={i} tag={post.tags[i].tag_name}/>
		);
	}

	if(post) {
		return <div className={extrasStyle.postWrap}>
			<Break h='20'/>
			<div className={extrasStyle.standalonePost}>{ post.content }
			</div>
			<Break h='40'/>
			<div>{tagComponents}</div>
		</div>
	}
	return null;
};

const Home = ({ history }) => {

	const [post, setPost] = useState(undefined);
	const [awaitingPost, setAwaitingPost] = useState(false);

	const identifier = window.location.href.split('/').pop();

	const onReceiveResponse = (response) => {

		if(response !== null && response.results.length > 0)
		{
			setPost(response.results[0]);
		}
		else {
			setPost(null);
		}
	};

	const onClickTag = (_tag) => {
        history.push('/blog/?tag=' + _tag);
    };

	if(post === undefined && !awaitingPost) {
		getPosts({
			identifier,
		}, onReceiveResponse);
		setAwaitingPost(true);
	}
	else if(post === null)
	{
		return <Redirect to='/404'/>
	}

	return (<div className={style.subHeader}>
		<Break h='50'/>
		<div className={style.mainText}>
	    	<h1>{ post?.title }</h1>
	    	<p>{ post?.date.substring(0, 10) }</p>
	    </div>
    	<Break h='40'/>
    	<div className={extrasStyle.postPage}>
    		<div className={extrasStyle.postPageBody}>
    			{ post !== undefined &&
    				<MainPanel post={post} linked={true} onClickTag={onClickTag}/>
    			}
    		</div>
    		{/*<div className={extrasStyle.side}>
    			<SidePanel/>
    		</div>*/}
    	</div>
    </div>);
};

export default Home;
