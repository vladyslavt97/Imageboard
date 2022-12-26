export const imageSummaryComponent = {
    template: `
        <h1 id="popup">Modal component works</h1>
        <button @click="handlerClose">Close</button>
    `,

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    props: ['imageid'], // Properties that are passed in from parent
    emits: ['imagechanged'], // Events that will emit, so parent can react to it

    data: () => {
        return {
            images: null,
        };
    },
    methods: {
        handleImageChange: function (evt, index) {
            // this.$emit from Vue that you can use to emit/send out events
            this.$emit('imagechanged', evt.target.value, index);
            // showModal = true;
        },
        handlerClose(){ //should close the modal
            this.$emit('close');
        }
    },
    mounted(){
        fetch(`/image/${this.imageid}`, {
            method: 'GET', 
        })
            .then(res => {
                return res.json();
            })
            .then(data => this.image = data);
    },
};