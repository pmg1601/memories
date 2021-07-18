import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        marginBlock: 'auto',
        width: '100%',
        maxHeight: '600px',
    },

    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },

    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
        [theme.breakpoints.down('lg')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },

    imageSection: {
        marginLeft: '20px',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },

    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },

    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
}))
