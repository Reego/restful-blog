import { apiCall } from '../common/api';

const apiCreatePath = ;
const apiUpdatePath = ;
const apiDeletePath = ;

const createPost = (data) => {
    return apiCall(apiCreatePath, {
        method: 'CREATE',
        data,
    });
};

const updatePost = (postId, data) => {
    const updatePath = apiUpdatePath + postId + '/';
    return apiCall(apiUpdatePath, {
        method: 'UPDATE',
        data,
    });
};

const deletePost = (postId) => {
    const deletePath = apiDeletePath + postId + '/';
    return apiCall(apiDeletePath, {
        method: 'DELETE',
    });
};

export {
    createPost,
    updatePost,
    deletePost,
};
