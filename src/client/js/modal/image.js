export const imageSummaryComponent = {
    template: `
        <h1>Modal component works</h1>
    `,

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    // Properties that are passed in from parent
    props: ['imageid'],
    // Events that will emit, so parent can react to it
    emits: ['imagechanged'],
    // -------------------------------------------------------------

    data: () => {
        return {
            // 4. we will have at least one data variable about the image information within the data block (use `data`)
        };
    },
    // methods: {
    //     handleChange: function (evt, index) {
    //         // this.$emit from Vue that you can use to emit/send out events
    //         this.$emit('citychanged', evt.target.value, index);
    //     },
    // },
    mounted(){
        fetch('/image/imageid', {//GET request with fetch to our server with the id from props in order to get information of a single image
            method: 'GET', 
            // body: formData;
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log('data from server :) ', data.myObj);
                // this.images.unshift(data.myObj);
            });
    } 
};