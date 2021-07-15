import React, { useState, useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { getPosts } from './actions/posts'

import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import memories from './images/memories.png'

import useStyles from './styles'

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Container maxwidth='lg'>
            <AppBar
                className={classes.appBar}
                position='static'
                color='inherit'>
                <Typography
                    className={classes.heading}
                    variant='h2'
                    align='center'>
                    Memories
                </Typography>
                <img
                    className={classes.image}
                    src={memories}
                    alt='memories'
                    height='60'
                />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid
                        className={classes.mainContainer}
                        container
                        justifyContent='space-between'
                        alignItems='stretch'
                        spacing={3}>
                        <Grid item xs={12} sm={12} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
