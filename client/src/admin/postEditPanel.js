import React from 'react';

const EditPanel = ({ post={
    title: '',
    content: '',
    tags: '',
    isPublic: true,
} }) => {

    return (
        <form>
            <input name='title' type='text' placeholder='Title' defaultValue={post.title} required/>
            <textarea name='content' placeholder='Content' defaultValue={post.content} required/>
            <input name='tags' type='text' placeholder='Tags' defaultValue={post.tags}/>
            <p>Public</p>
            <input name='isPublic' type='checkbox' defaultValue={post.isPublic}/>
            <input type='submit' value='Publish'/>
        </form>
    )
};

export default EditPanel;
