## Image Board - Part 2.1

<!-- 1. Add a new POST route in your server to handle the incoming data from the form -->
<!-- - add a middleware to handle FormData to access the uploaded file and it should be automatically saved in a folder -->
<!-- 2. In your client you'll need to add a form to your index.html with corresponding input fields to upload and update an image in your server -->
<!-- - you will need to send the data as FormData. Add two methods in the methods keyword in VueJs where you will handle file changes and handle the submit (here you will create the form data and send it via fetch to your server) -->
<!-- - in the fetch response you'll need to handle the response and update the images array accordingly -->

## Image Board - Part 2.2

<!-- 1. Add a new POST route in your server to handle the incoming data from the Vue as multipart/formdata -->

<!-- -   add a middleware to handle FormData to access the uploaded file and it should be automatically saved in a folder (done in 2.1) -->
<!-- -   add a middleware to upload the file to AWS -->
<!-- -   in your POST route yourself you should then update your database after the upload -->
<!-- -   for that you'll need a new db function to insert new image data -->
<!-- -   after inserting the data to the database was successful send the image data back to your client -->

<!-- 2. For the client see Part 2.1 -->
