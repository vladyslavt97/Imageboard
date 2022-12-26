<!-- 7. you'll need a method in the methods block (use methods) -->
    - this method will be called from the template when the close button is clicked for example
    - in this method you will emit an event so the parent can listen to it and close the modal again later
8. In order to make the method work you'll need to define which events the modal component can emit (use emits)

##### Update App component

## ??? How many handlers is needed for closing and opening the modal?
- add an event listener (v-on) to the modal component in order to react to the close emit from the modal component. (adjust index.html) 
## not clear.. returns undefined showModal
- - make sure to call a new method in the app.js in order to update the relevant data properties (use methods)
##
add other click listener to the single image cards that will call a new method in order to update the data properties accordingly (adjust index.html and use methods)
