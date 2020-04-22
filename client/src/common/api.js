import React from 'react';

const defaultHeaders = {
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',
};

const objectToQueryString = (obj) => Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

const apiCall = (path, payload={}, requestObject={}) => {

    let finalPath = path;

    if(payload) {
        finalPath += '?' + objectToQueryString(payload);
    }

    console.log(finalPath);

    const request = {
        ...requestObject,
    };

    request.headers = {
        ...defaultHeaders,
        ...request.headers
    }

    // if(!request.headers.method) {
    //     //request.headers.method = 'GET';
    // }

    if(request.headers.method == 'POST') {
        request.body = JSON.stringify(payload);
        // request.headers = {
        //     ...request.headers,
        //     ...defaultHeaders,
        // };
    }
    return fetch(finalPath, request)
        .then(response => {
            return response.json();
        });
};

const apiPath = process.env.REACT_APP_API_URL;
const apiPostsPath = apiPath + 'posts/';

const getPosts = (query, onReceiveResponse) => {
    return apiCall(apiPostsPath, query)
        .then(res => {
            onReceiveResponse(res);
        })
        .catch(err => {
            onReceiveResponse(null);
        });
};

const apiTagsPath = apiPath + 'tags/';
const apiPopularTagsPath = apiPath + 'popular_tags/';

const getTags = (onReceiveResponse, isPopular = false) => {
    return apiCall((isPopular) ? apiPopularTagsPath : apiTagsPath)
        .then(res => {
            onReceiveResponse(res);
        })
        .catch(err => {
            console.log(err);
            onReceiveResponse(null);
        });
};

export {
    apiCall,
    getPosts,
    getTags,
    objectToQueryString,
};
