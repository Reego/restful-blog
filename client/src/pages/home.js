import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { getPosts, getTags } from '../common/api';

import style from './home.module.css';

import { Break } from '../components/layout';
import Post from '../components/post';
import Tag from '../components/tag';

const SidePanel = () => {
	return (
		<React.Fragment>
			<div>
				<h2>Follow me on GitHub</h2>
				<p><a className="link" href="https://github.com/Reego">https://github.com/Reego</a></p>
			</div>
		</React.Fragment>
	);
};

const MainPanel = ({ post }) => {

	return <Post post={post}/>
};

const Home = ({ history }) => {

	const [post, setPost] = useState(undefined);
	const [awaitingPost, setAwaitingPost] = useState(true);

	const [tags, setTags] = useState(null);
	const [awaitingTags, setAwaitingTags] = useState(true);

	useEffect(() => {
		const onReceiveResponse = (response) => {

			setAwaitingPost(false);
			if(response !== null && response.results.length > 0)
			{
				setPost(response.results[0]);
			}
			else {
				setPost(null);
			}
		};
		getPosts({}, onReceiveResponse)
		getTags((response) => {
			setAwaitingTags(false);
            if(response) {
                setTags(response.tags.split('_'));
            }
            else {
                setTags(null)
            }
		}, true);
	}, []);

	const onClickTag = (_tag) => {
        history.push('/blog/?tag=' + _tag);
    };

	if(post === null && !awaitingPost)
	{
		return <Redirect to='500'/>
	}

	const tagComponents = [];
	if(!awaitingTags && tags !== null) {
		for(let i = 0; i < tags.length; i++) {
			tagComponents.push(
				<p key={i}>
					<Tag tag={tags[i]} onClickTag={onClickTag}/>
				</p>
			);
		}
	}

	return (<div className={style.subHeader}>
		<Break h='50'/>
		<div className={style.mainText}>
	    	<h1>Hello, I'm <b>Reego</b></h1>
	    	<p>This is a site where I talk about some of my coding adventures.</p>
	    </div>
    	<Break h='80'/>
    	<div className={style.displayBody}>
   			<div className={style.displayMain}>
   				{ (post &&
    				<MainPanel post={post} linked={true}/>)
   					||
   					<MainPanel post={null}/>
   				}
    		</div>
    		<div className={style.displaySide}>
    			<SidePanel/>
    			<Break h='20'/>
    			<div>
					<h2>Popular tags</h2>
					{ tagComponents }
				</div>
    		</div>
    	</div>
    </div>);
};

export default Home;
