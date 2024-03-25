<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TaskBox',
})
</script>
<style scoped>
.box {
    background-color: #294057;
    padding: 1.25rem;
    border-radius: 8px;
}
</style>