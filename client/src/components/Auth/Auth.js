import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'

import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Icon from './Icon'
import useStyles from './styles'
import Input from './Input'
import { signin, signup } from '../../actions/auth'

const intialState = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(intialState)


    /* ----------------------- Handle Sign in button event ---------------------- */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }


    /* ------------------ Handle Input given in the field value ----------------- */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    /* -------------- Switch cards between "sign in" and "sign up" -------------- */
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }


    /* ------------- Password field "Eye" Button - Toggle visibility ------------ */
    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword)


    /* ----------- If Google login is successful, dispatch AUTH action ---------- */
    const GoogleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }


    /* ------------------- If Google Sign in is unsuccessful! ------------------- */
    const GoogleFailure = () => {
        console.log('Google Sign In was unsuccessful! Try Again Later.')
    }


    /* ---------------------- Actual Components and screen ---------------------- */
    return (
        <div>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elevation={3}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant='h5'>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit}>

                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />

                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )}

                            <Input
                                name='email'
                                label='Email Address'
                                handleChange={handleChange}
                                type='email'
                            />

                            <Input
                                name='password'
                                label='password'
                                handleChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                            />

                            {isSignup && (
                                <Input
                                    name='confirmPassword'
                                    label='Repeat Password'
                                    handleChange={handleChange}
                                    type='password'
                                />
                            )}
                        </Grid>

                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>

                        <GoogleLogin
                            clientId='660320692516-cmhe5560b1bmdqod9tns0ske9b0opjad.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color='primary'
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant='contained'>
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={GoogleSuccess}
                            onFailure={GoogleFailure}
                            cookiePolicy='single_host_origin'
                        />

                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup
                                        ? 'Already have an account? Sign In'
                                        : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth
