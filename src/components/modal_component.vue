<template>
    <div class="backdrop-modal" @click.self="closeModal">
        <div class="modal-custom">
            <a @click="closeModal" href="#!" class="btn-floating btn-small scale-transition right" >
                <i class="tiny material-icons">close</i>
            </a>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>

<style>
    .modal-custom {
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdrop-modal {
        display: block;
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    .btn-floating{
        background-color: rgba(0, 0, 0, 0.5);
    }

</style>