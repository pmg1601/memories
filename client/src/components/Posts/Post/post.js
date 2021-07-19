/**
 * Individual Post Component
 */

import React, { useState } from 'react'
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
    const [likes, setLikes] = useState(post?.likes)

    const user = JSON.parse(localStorage.getItem('profile'))

    const userId = user?.result.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId)

    const printSomething = () => {
        console.log('Clicked Edit Button!')
    }

    const openPost = (e) => history.push(`/posts/${post._id}`)

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }

    // This thing handles Likes/Dislikes (Component)
    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize='small' />
                    &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
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
                    onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button
                        size='small'
                        color='secondary'
                        onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
