<template>
    <div class="modal" :class="{ 'is-active': showModal }" v-if="showModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="modal-header"></slot>
            </header>
            <section class="modal-card-body">
                <slot name="modal-body"></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="modal-footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ModalCard',
    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    }
});
</script>