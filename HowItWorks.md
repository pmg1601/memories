# Memories

This is a MERN Stack project that stores some posts and deal with some operations on that post.
Used O-Auth from Google.

## Folder & File Structure

---

> Client

`Client side deals with frontend and content management`

| Folder Name  | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| node_modules | Contains node required node modules                             |
| public       | Contains node required node modules                             |
| src          | Contains source files                                           |
| actions      | Dispatch action and data according to user's desire             |
| api          | Data Fetching and serving / data related operations             |
| components   | Individual components on the web page and their structure       |
| images       | Contains images                                                 |
| reducers     | Accepts action call and perform some operations for it and data |

<br>

| File Name | Description                                                  |
| --------- | ------------------------------------------------------------ |
| App.js    | Main Component                                               |
| index.js  | Deals with store and other functionality for `App` Component |

<br>

> Server

`Server side deals with databases, routing, error handling and content delivery`

| Folder Name | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| controllers | Perform actions for the content on the path/route               |
| models      | Contains Schema for database collections                        |
| routes      | Contains routes for defined path and what to do on those routes |

<br>

| File Name | Description                           |
| --------- | ------------------------------------- |
| index.js  | Express routing, db setup, page setup |

<br>

## The Flow

---

1. In `server/routes` - Set a route and import functionality from controllers.
2. In `server/controllers` - Set functionality for the route like db validation and operations. Return a response.
3. In `client/api` - Mention an API call.
4. In `client/actions` - Make an API call, retrieve data and dispatch the action.
5. In `client/reducers` - Get a dispatch Call and perform operations according to it.
6. In `client/index.js` - Use the reducers to create store with thunk middleware.
