import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    media: {
        display: 'block',
        margin: '10px auto',
        margin: '0 auto',
        borderRadius: '20px',
        width: '90%',
        // maxHeight: '600px',
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
        // marginRight: 'auto',
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
        flex: '1',
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
    },

    userCommentLoginMessage: {
        borderLeft: '1px solid black',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            // flexDirection: 'column',
            width: '100%',
        },
    },

    commentsBox: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            // flexDirection: 'column',
            width: '100%',
        },
    },
}))
