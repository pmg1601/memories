// Reducer is a Function which accepts a state and actions, then
// based on action something has to be done!

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload

        case 'CREATE':
            return [...posts, action.payload]

        default:
            return posts
    }
}
