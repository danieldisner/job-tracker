<template>
    <div class="box task-box has-text-weight-bold">
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
    padding: 1.25rem;
    border-radius: 8px;
}
</style>