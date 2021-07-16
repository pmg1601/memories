import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import useStyles from './styles'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {}

    const handleChange = () => {}

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword)

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

    const GoogleFailure = () => {
        console.log('Google Sign In was unsuccessful! Try Again Later.')
    }

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
                                        name='firstName'
                                        label='First Name'
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
