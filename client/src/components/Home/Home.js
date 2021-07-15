import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { getPosts } from '../../actions/posts'

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <div>
            <Grow in>
                <Container>
                    <Grid
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
        </div>
    )
}

export default Home
