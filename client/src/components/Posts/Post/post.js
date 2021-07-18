/**
 * Individual Post Component
 */

import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from '@material-ui/core'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import { deletePost, likePost } from '../../../actions/posts'

/* -------------------------------------------------------------------------- */

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('profile'))

    const printSomething = () => {
        console.log('Clicked Edit Button!')
    }

    const openPost = (e) => history.push(`/posts/${post._id}`)

    // This thing handles Likes/Dislikes (Component)
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? 's' : ''
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize='small' />
                    &nbsp;{post.likes.length}{' '}
                    {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }

        return (
            <>
                {' '}
                <ThumbUpAltOutlined fontSize='small' /> &nbsp;Like
            </>
        )
    }

    /* -------------------------- Actual Post Component ------------------------- */
    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component='span'
                name='test'
                className={classes.cardAction}
                onClick={openPost}>
                <CardMedia
                    className={classes.media}
                    image={
                        post.selectedFile ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                    }
                    title={post.title}
                />

                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>

                    <Typography variant='body2'>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>

                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: 'white' }}
                            size='small'
                            onClick={() => {
                                setCurrentId(post._id)
                            }}>
                            <MoreHorizIcon
                                fontSize='medium'
                                onClick={printSomething}
                            />
                        </Button>
                    </div>
                )}

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>
                        {/* {post.tags[0].split(',').map((tag) => `#${tag.trim()} `)} */}
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>

                <CardContent>
                    <Typography
                        className={classes.title}
                        variant='h4'
                        gutterBottom>
                        {post.title}
                    </Typography>

                    <Typography
                        className={classes.title}
                        variant='body2'
                        color='textSecondary'
                        component='p'>
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button
                    size='small'
                    color='primary'
                    disabled={!user?.result}
                    onClick={() => {
                        dispatch(likePost(post._id))
                    }}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button
                        size='small'
                        color='primary'
                        onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
