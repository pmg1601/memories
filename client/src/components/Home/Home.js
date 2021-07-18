/**
 *  This is is Home Page Screen which shows posts, form to add and edit post,
 *  login information, search form
 */

import React, { useEffect, useState } from 'react'
import {
    Container,
    Grow,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'

import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import Paginate from '../Pagination'
import { getPosts, getPostsBySearch } from '../../actions/posts'

/* -------------------------------------------------------------------------- */

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

/* -------------------------------------------------------------------------- */

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()

    /* --------------------- Convert search tags to TAGS ... -------------------- */

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            searchPost()
        }
    }

    /* --------------- Adding tags to list of tags to filter posts -------------- */

    const handleAdd = (tag) => setTags([...tags, tag])

    /* -------------- Remove tag from list of tags to filter posts -------------- */

    const handleDelete = (tagToDelete) =>
        setTags(tags.filter((tag) => tag !== tagToDelete))

    /* ---------- Search post in all posts using search params or tags ---------- */

    const searchPost = () => {
        if (search.trim() || tags) {
            // console.log(tags)
            // console.log(search)
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            history.push(
                `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(
                    ','
                )}`
            )
        } else {
            history.push('/')
        }
    }

    /* ---------------------------- Actual Home Page ---------------------------- */
    return (
        <div>
            <Grow in>
                <Container maxWidth='xl'>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='stretch'
                        spacing={3}
                        onKeyPress={handleKeyPress}
                        className={classes.gridContainer}>
                        <Grid item xs={12} sm={8} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>

                        <Grid item xs={12} sm={4} md={4}>
                            <AppBar
                                className={classes.appBarSearch}
                                position='static'
                                color='inherit'>
                                <TextField
                                    name='search'
                                    variant='outlined'
                                    label='Search Memories'
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label='Search Tags'
                                    variant='outlined'
                                />

                                <Button
                                    onClick={searchPost}
                                    className={classes.searchButton}
                                    variant='contained'
                                    color='primary'>
                                    Search
                                </Button>
                            </AppBar>

                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                            {!searchQuery && !tags.length && (
                                <Paper elevation={6}>
                                    <Paginate
                                        page={page}
                                        className={classes.pagination}
                                    />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home
