import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    media: {
        display: 'block',
        margin: '10px auto',
        borderRadius: '20px',
        width: '90%',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
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

    recommendedPostsImage: {
        display: 'block',
        margin: '10px auto',
        width: '90%',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px gray',
    },

    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBlock: '10px',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },

    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },

    commentsInnerContainer: {
        boxShadow: '0px 0px 5px 0px gray',
        borderRadius: '10px',
        padding: '10px',
        flex: '1',
        marginRight: '30px',

        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
            marginRight: '0px',
        },
    },

    commentsSection: {
        overflowY: 'auto',
        height: 'auto',
        maxHeight: '200px',
    },

    userCommentLoginMessage: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            borderLeft: 'none',
            width: '100%',
        },
    },

    commentsBox: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}))
