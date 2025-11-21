<template>
  <div
    @dragover.prevent="onDragover"
    @dragleave.prevent="($event) => (isOver = false)"
    @drop.prevent="onDrop"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOver = ref(false);
const onDragover = function () {
  isOver.value = true;
};

const emit = defineEmits({});

const onDrop = (e: DragEvent) => {
  e.stopPropagation();
  emit("file", Array.from(e.dataTransfer!.files));
  // console.log(e.dataTransfer?.files);
};
</script>
