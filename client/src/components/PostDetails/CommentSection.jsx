import React, { useState, useRef } from 'react'

import { Typography, TextField, Button, Divider } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { commentPost } from '../../actions/posts'
import moment from 'moment'

const CommentSection = ({ post }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const commentsRef = useRef()
    const user = JSON.parse(localStorage.getItem('profile'))

    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')

    // Handle scrolling to the newest comment
    const handleComment = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`

        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        })
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography
                    gutterBottom
                    variant='h6'
                    style={{
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                    }}>
                    Comments
                </Typography>
                <Divider style={{ marginBottom: '10px' }} />
                {comments.length ? (
                    <div className={classes.commentsSection}>
                        {comments?.map((c, i) => (
                            <Typography
                                key={i}
                                gutterBottom
                                variant='subtitle1'>
                                <strong>{c.toString().split(': ')[0]}</strong>:
                                {c.toString().split(':')[1]}
                            </Typography>
                        ))}
                        <div ref={commentsRef} />
                    </div>
                ) : (
                    <h3>There are no comments!</h3>
                )}
            </div>

            {user?.result?.name ? (
                <div className={classes.commentsBox}>
                    <Typography gutterBottom variant='h5'>
                        Write a comment
                    </Typography>

                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Button
                        style={{ marginTop: '10px' }}
                        fullWidth
                        color='primary'
                        disabled={!comment.length}
                        variant='contained'
                        onClick={handleComment}>
                        Comment
                    </Button>
                </div>
            ) : (
                <div className={classes.userCommentLoginMessage}>
                    Sign In To Comment On This Post!
                </div>
            )}
        </div>
    )
}

export default CommentSection
