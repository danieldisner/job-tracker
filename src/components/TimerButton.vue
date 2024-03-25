<template>
    <button class="button" @click="click" :disabled="disabled">
        <span class="icon">
            <i :class="icon"></i>
        </span>
        <span>{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'TimerButton',
    emits: ['click'],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        click() {
            this.$emit('click');
        }
    }
});
</script>