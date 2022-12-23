## Image Board - Part 3

### Create server side logic

<!-- 1. add a new GET route for getting a single image based on the id (/image/:id) + -->

<!-- 2. with help of the param id in the request object you will create a new database function that will give us one image back based on the id (e.g. getImageById(req.params.id)) -->
<!-- 3. after the db query send the image as res.json back -->

### Create a new Modal component

<!-- 1. Create a new folder modal next to the app.js and create inside the folder a modal.js file. -->
<!-- 2. Inside that file you will define a modal component as const that will be exported -->
<!-- 3. the component will have one prop as input that will be the id of the image (use `props`) -->

4. we will have at least one data variable about the image information within the data block (use `data`)

<!-- 5. in the mounted we will make a GET request with fetch to our server with the id from props in order to get information of a single image (use `mounted`) -->
<!-- - with the results of the fetch we will first call the json() function on the result in order to convert it to regular json -->
<!-- - when we have the result as JS object we will update the image data -->

6. for the template we will build up the HTML how it will look like for the modal (use template)
    - you'll need a container and then some elements for the image itself and the additional data saved in the image data
    - make sure you have a possiblity to close the modal by adding a new close button element. On this close button element you would add a click listener with @click and call a method
7. you'll need a method in the methods block (use methods)
    - this method will be called from the template when the close button is clicked for example
    - in this method you will emit an event so the parent can listen to it and close the modal again later
8. In order to make the method work you'll need to define which events the modal component can emit (use emits)

##### Update App component

add a new modal component to the configuration (use components)
add the modal component to your index.html inside the <div #main> as a direct child next to other elements (adjust index.html)
add an conditional render statment (v-if) to the modal in the index.html in order to show it or not. (adjust index.html)
You will need a new data property inside the app.js which will hold the information wether to show the modal or not (use data)
provide the id to the modal component with v-bind:id. (adjust index.html)
The id will be saved in another data property inside the app.js. (use data)
add an event listener (v-on) to the modal component in order to react to the close emit from the modal component. (adjust index.html)
make sure to call a new method in the app.js in order to update the relevant data properties (use methods)
add other click listener to the single image cards that will call a new method in order to update the data properties accordingly (adjust index.html and use methods)
Style your Modal component in order be take the whole width and height and cover your app

Test the individual steps before you go on!!

Maybe just implement first a very simple component without any props or events. It could probably have only a very simple template like <h1>Modal component works</h1>
