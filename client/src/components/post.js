import React from 'react';
import { Link } from 'react-router-dom';

import style from './extras.module.css';

import { Break } from './layout';
import Tag from './tag';

const getPostPath = (title, date) => {
    return 'post/' + title.replace(/ /g, '_').replace(/[^(a-z|_)]/gi, '').substring(0, 10) + '_' + date.substring(0, 10);
};

const Post = ({ post, onClickTag=null, contentCutoff=200}) => {

    const tagComponents = [];

    for(let i = 0; i < post.tags.length; i++) {
        tagComponents.push(
            <Tag onClickTag={onClickTag} key={i} tag={post.tags[i].tag_name}/>
        );
    }

    let linkToMaximized = contentCutoff > 0;
    let content = (linkToMaximized && post.content.length > contentCutoff) ? (post.content.substring(0, contentCutoff) + '...') : post.content;

    return (
        <React.Fragment>
        	<div className={style.postWrap}>
	            <div className={style.post}>
                    { (linkToMaximized && 
                        <Link to={getPostPath(post.title, post.date)}><h1 className={style.postTitle}>{ post.title }</h1></Link>) ||
                        <h1 className={style.postTitle}>{ post.title }</h1>
                    }
	                <h3 className={style.postDate}>Posted on { post.date.substring(0, 10) }</h3>
	                <div className={style.postContent}>{ content }</div>
                    { tagComponents.length > 0 &&
                        <React.Fragment>
                            <Break h='30'/>
                            <div>{ tagComponents }</div>
                        </React.Fragment>
                    }
	            </div>
            </div>
        </React.Fragment>
    );
};

export default Post;
