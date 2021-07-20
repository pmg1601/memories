// More details after clicking on individual post

import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'

import CommentSection from './CommentSection'
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts'

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()

    // If id is changed
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    // If post is changed
    useEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })
            )
        }
    }, [post])

    // If post is null
    if (!post) return null

    // If content is still loading
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

    const openPost = (_id) => history.push(`/posts/${_id}`)

    return (
        <>
            <Paper
                style={{ padding: '10px', borderRadius: '15px' }}
                elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <div>
                            <Typography variant='h3' component='h2'>
                                {post.title}
                            </Typography>

                            <Typography
                                gutterBottom
                                variant='h6'
                                color='textSecondary'
                                component='h2'>
                                {post.tags.map((tag) => `#${tag} `)}
                            </Typography>
                        </div>

                        <div>
                            <Typography variant='h6'>
                                Created by: {post.name}
                            </Typography>

                            <Typography variant='body1'>
                                {moment(post.createdAt).fromNow()}
                            </Typography>
                        </div>

                        <Typography gutterBottom variant='body1' component='p'>
                            {post.message}
                        </Typography>

                        <Divider />
                    </div>

                    <div className={classes.imageSection}>
                        <img
                            className={classes.media}
                            src={
                                post.selectedFile ||
                                'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                            }
                            alt={post.title}
                        />
                    </div>
                </div>
            </Paper>

            {/* Chatting Section */}
            <Paper
                style={{
                    padding: '20px',
                    borderRadius: '15px',
                    marginTop: '50px',
                }}
                elevation={6}>
                <div className={classes.card}>
                    <Typography variant='body1'>
                        <strong>Realtime Chat - coming soon!</strong>
                    </Typography>
                </div>
            </Paper>

            {/* Comment Section */}
            <Paper
                style={{
                    padding: '20px',
                    borderRadius: '15px',
                    marginTop: '50px',
                }}
                elevation={6}>
                <Typography variant='body1'>
                    <CommentSection post={post} />
                </Typography>
            </Paper>

            {/* RECOMMENDED POSTS */}
            <Paper
                style={{
                    padding: '20px',
                    borderRadius: '15px',
                    marginBlock: '50px',
                }}
                elevation={6}>
                <Typography
                    gutterBottom
                    varaint='h5'
                    style={{ fontSize: '30px' }}>
                    You might also like:
                </Typography>

                <Divider />

                {recommendedPosts.length ? (
                    <div className={classes.section}>
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts
                                .slice(0, 4)
                                .map(
                                    ({
                                        title,
                                        message,
                                        name,
                                        likes,
                                        selectedFile,
                                        _id,
                                    }) => (
                                        <div
                                            style={{
                                                margin: '10px',
                                                cursor: 'pointer',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                boxShadow:
                                                    '0px 0px 10px 0px gray',
                                            }}
                                            onClick={() => openPost(_id)}
                                            key={_id}>
                                            <Typography
                                                gutterBottom
                                                variant='h5'
                                                style={{ fontWeight: 'bold' }}>
                                                {title}
                                            </Typography>

                                            <Typography
                                                gutterBottom
                                                variant='subtitle2'>
                                                {name}
                                            </Typography>

                                            <img
                                                className={
                                                    classes.recommendedPostsImage
                                                }
                                                src={selectedFile}
                                                alt='post'
                                                width='200px'
                                            />

                                            <Typography
                                                gutterBottom
                                                style={{ color: 'gray' }}
                                                variant='body2'>
                                                {message}
                                            </Typography>

                                            <Typography
                                                gutterBottom
                                                variant='subtitle1'>
                                                Likes:{likes.length}
                                            </Typography>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                ) : (
                    <Typography gutterBottom style={{ marginBlock: '20px' }}>
                        There are no recommendations!
                    </Typography>
                )}
            </Paper>
        </>
    )
}

export default PostDetails
