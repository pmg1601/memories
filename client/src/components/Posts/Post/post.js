import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@material-ui/core'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={
                    post.selectedFile ||
                    'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>

            <div className={classes.overlay2}>
                <Button
                    style={{ color: 'white' }}
                    size='small'
                    onClick={() => {
                        setCurrentId(post._id)
                    }}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>
                    {/* {post.tags[0].split(',').map((tag) => `#${tag.trim()} `)} */}
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>

                <Typography
                    variant='body2'
                    color='textSecondary'
                    style={{ textAlign: 'right' }}>
                    {moment(post.createdAt).calendar()}
                </Typography>
            </div>

            <CardContent>
                <Typography className={classes.title} variant='h4' gutterBottom>
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

            <CardActions className={classes.cardActions}>
                <Button
                    size='small'
                    color='primary'
                    onClick={() => {
                        dispatch(likePost(post._id))
                    }}>
                    <ThumbUpAltIcon
                        fontSize='small'
                        style={{ marginRight: '5px' }}
                    />{' '}
                    {post.likeCount}
                </Button>

                <Button
                    size='small'
                    color='primary'
                    onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' /> Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
