import React from 'react';
import { useState, useEffect } from 'react';

import { getPosts, getTags, objectToQueryString } from '../common/api';

import { Break } from '../components/layout';
import Post from '../components/post';

import style from './blog.module.css';


const Blog = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);

    const [filters, setFilters] = useState({
        tag: params.get('tag') || 'None',
        orderBy: !(params.get('orderBy') === 'false'),
        descending: !(params.get('descending') === 'false'),
        page: params.get('page') || 1,
    });

    const [tagsResponse, setTagsResponse] = useState(null);
    const [awaitingTags, setAwaitingTags] = useState(true);

    const [response, setResponse] = useState(null);
    const [awaitingPosts, setAwaitingPosts] = useState(true);

    useEffect(() => {
        getTags((response) => {
            setAwaitingTags(false);
            if(response) {
                setTagsResponse(response.tags.split('_'));
            }
            else {
                setTagsResponse(null)
            }
        });
    }, []);

    const queryPosts = () => {
        const params = {
            tag: filters.tag,
            order: (filters.orderBy) ? 'title' : 'date',
            descending: filters.descending,
            page: filters.page,
        };
        const onReceiveResponse = (response) => {
            setAwaitingPosts(false);
            if(response) {
                setResponse(response);
            }
            else {
                setResponse(null);
            }
        };

        getPosts(params, onReceiveResponse);
    };

    const onClickTag = (_tag) => {
        props.history.push('/blog/?tag=' + _tag);
        setFilters({
                tag: _tag,
                orderBy: filters.orderBy,
                descending: filters.descendingValue,
                page: 1,
            });
        setAwaitingPosts(true);
        queryPosts();
    };

    useEffect(() => {
        queryPosts();
    }, [filters]);

    const tagOptions = [];
    if(!awaitingTags && tagsResponse != null) {
        tagOptions.push(<option key={-1} value='None' selected={false}>None</option>);
        for(let i = 0; i < tagsResponse.length; i++) {
            tagOptions.push(
                <option value={tagsResponse[i]} key={i} selected={tagsResponse[i] === filters.tag}>{tagsResponse[i]}</option>
            );
        }
    }
    else {
        tagOptions.push(<option key={-1} value='None' selected={true}>None</option>);
    }

    const postComponents = [];
    if(!awaitingPosts && response != null) {
        for(let i = 0; i < response.results.length; i++) {
            const post = response.results[i];
            if(i > 0)
            {
               postComponents.push(<Break key={-i} h='30'/>);
            }
            postComponents.push(
                <Post onClickTag={onClickTag} key={i} post={post} linked={true}/>
            );
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(!awaitingPosts)
        {
            const form = document.forms['blog-search'].elements;

            const tagValue = form.tag.value;
            const orderByValue = form.orderBy.checked;
            const descendingValue = !form.descending.checked;

            setFilters({
                tag: tagValue,
                orderBy: orderByValue,
                descending: descendingValue,
                page: 1,
            });

            props.history.push('/blog/');
        }
    };

    return (
        <React.Fragment>
            <Break h='50'/>
            <div className={style.postsFilterWrap}>
                <form name='blog-search' className={style.form}>
                    <h1>Filter Posts</h1>
                    <Break h='20'/>

                    <label>By Tag</label>
                    <select name='tag'>
                        { tagOptions }
                    </select>
                    <Break h='50'/>

                    <label><b>Order By</b></label>
                    <Break h='30'/>
                    <label>Date</label>
                        <label className={style.toggle}>
                            <input name='orderBy' type='checkbox' defaultChecked={!filters.orderBy}/>
                            <span className={style.slider}></span>
                        </label>
                    <label className={style.postLabel}>Title</label>
                    <Break h='30'/>

                    <label>Desc.</label>
                    <label className={style.toggle}>
                        <input name='descending' type='checkbox' defaultChecked={!filters.descending}/>
                        <span className={style.slider}></span>
                    </label>
                    <label className={style.postLabel}>Asc.</label>
                    <Break h='55'/>

                    <div className={style.submitButton} onClick={onSubmit}>Search</div>
                    <Break h='50'/>

                    <div className={style.horizontalBreak}></div>
                    <Break h='10'/>
                    { (postComponents.length > 0 &&
                        <h2>Viewing <b>{ response.results.length }</b> of <b>{ response.count }</b> results . . .</h2>)
                        ||
                        <h2>There were no results with the given criteria</h2>
                    }
                </form>
            </div>
            { (postComponents.length > 0) &&
                <React.Fragment>
                    <Break h='30'/>
                    <div className={style.postsWrap}>
                        { postComponents }
                    </div>
                </React.Fragment>
            }
            { (response !== null && (response.next !== null || response.previous !== null)) &&
                (<div className={style.pagination}>
                    <Break h='100'/>
                    { response.previous !== null &&
                        <div onClick={() => setFilters({...filters, page: filters.page - 1})} className={style.nextButton}>Prev</div>
                    }
                    { response.next !== null &&
                        <div onClick={() => setFilters({...filters, page: filters.page + 1})} className={style.nextButton}>Next</div>
                    }
                    <Break h='10'/>
                </div>)
            }
        </React.Fragment>
    );
};

export default Blog;
