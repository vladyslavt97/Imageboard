- When users have the image modal open, we want to allow them to add comments about the image that is displayed. Additionally, users should see all the comments that have already been made about the image.

## 
<!-- The comments should be implemented as component that is rendered inside of the modal component, bringing the total number of components required for this project to two. -->

Like its parent component, the component for showing the comments and allowing users to add comments will need to make an HTTP request as soon as it mounts. This request is to retrieve all of the comments that have already been made about the image. In order to make this request, the component will need to know the id of the image whose comments needs to be retrieved so it can send this information to the server. 
`For this reason, the modal component will have to pass the id of the image to the comments component as a prop.`

In addition to the GET request it makes when it mounts, the comments component will have to make a POST request to submit a new comment. Note that this POST request will not involve a FormData object since that is only required for multipart uploads. Instead, a stringified JSON object with the desired properties should be passed as the body property of the second argument to fetch. Note also that you will have to set the Content-Type header for the request appropriately.

On the server, you will have to make sure that you are passing the value returned by express.json() to app.use so that the body of the POST request will be parsed and req.body will be available in your route.

A new database table will be required to store 
- comment text, 
- the username of the commenter,
- the id of the image that the comment is associated with,
- and the creation time for the comment.

- When the request to add the comment is complete, an object with the data for the new comment should be added to the array of comments retrieved when the component mounted, causing the new comment to be displayed.