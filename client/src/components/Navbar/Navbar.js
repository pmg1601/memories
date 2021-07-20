/**
 * Navbar component
 */

import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import useStyles from './styles'
import logo from '../../images/logo.png'
import text from '../../images/text.png'

/* -------------------------------------------------------------------------- */

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )

    /* ------------------- Logout from app and go to home page ------------------ */
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    /* ------------ Check is token is expired or not and logout user ------------ */
    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    /* -------------------------- Actual Form Component ------------------------- */
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img
                    src={text}
                    alt='icon'
                    height='45px'
                    className={classes.textImage}
                />

                <img
                    className={classes.logoImage}
                    src={logo}
                    alt='memories'
                    height='40px'
                />
            </Link>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Typography className={classes.userName} variant='h6'>
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
                            className={classes.logout}
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
