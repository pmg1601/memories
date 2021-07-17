/**
 * This component is for all posts container
 */

import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from './Post/post.js'
import useStyles from './styles'

/* -------------------------------------------------------------------------- */

const Posts = ({ setCurrentId }) => {
    // There are some upadates here!

    const posts = useSelector((state) => state.posts)
    const classes = useStyles()

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid
            container
            className={classes.container}
            alignItems='stretch'
            spacing={3}>
            {posts.map((post) => (
                <Grid key={post.id} item xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
