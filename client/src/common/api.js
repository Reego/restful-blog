import React from 'react';

const defaultHeaders = {
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',
};

const API_CACHE_ITEM_DURATION = 36000000; /// 10 hours -> I won't be updating the blog too often

const objectToQueryString = (obj) => Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

/// updates the apiCache found in localStorage at the given key (apiPath) with the value parameter
const updateApiCache = (apiPath, value) => {
    const apiCache = JSON.parse(localStorage.getItem("apiCache")) || {};
    localStorage.setItem("apiCache", JSON.stringify({
        ...apiCache,
        [apiPath]: {
            time: (new Date()).getTime(),
            value,
        },
    }));
}

/// removes item with given apiPath as key from apiCache object in localStorage
const removeApiCacheValue = (apiPath) => {
    const apiCache = JSON.parse(localStorage.getItem("apiCache"));
    delete apiCache[apiPath];
    localStorage.setItem("apiCache", JSON.stringify(apiCache));
}

const apiCall = (path, payload={}, requestObject={}) => {

    let finalPath = path;

    if(payload) {
        finalPath += '?' + objectToQueryString(payload);
    }

    /// checks cache for recent api calls
    const apiCache = JSON.parse(localStorage.getItem("apiCache"));
    if(apiCache) {
        const cachedRequest = apiCache[finalPath];
        const accessTime = (new Date()).getTime();
        if(cachedRequest !== undefined) {
            if (cachedRequest.time && accessTime - cachedRequest.time <= API_CACHE_ITEM_DURATION
            && cachedRequest.value) {
                return Promise.resolve(cachedRequest.value);
            }
            else {
                removeApiCacheValue(apiPath);
            }
        }
    }

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
    return (fetch(finalPath, request)
        .then(response => response.json())
        .then(res => {
            updateApiCache(finalPath, res);
            return res;
        })
    );
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
