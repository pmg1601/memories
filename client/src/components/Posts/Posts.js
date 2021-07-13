import React from 'react'
import Post from './Post/post.js'
import UseStyles from './styles'

const Posts = () => {
    const classes = UseStyles()

    return (
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    )
}

export default Posts
