import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        // JWT ...

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to='/'
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
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Typography className={classes.username} variant='h6'>
                            {user.result.name}
                        </Typography>

                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}>
                            {user.result.name[0]}
                        </Avatar>

                        <Button
                            variant='contained'
                            classname={classes.logout}
                            color='secondary'
                            onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to='/auth'
                        variant='contained'
                        color='primary'>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
