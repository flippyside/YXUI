<!-- 组件实现 -->
<template>
  <i class="yx-icon" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
// import { createNamespace } from "@yx/utils/create";
import { iconProps } from "./icon";
import { computed } from "vue";

defineOptions({
  name: "YxIcon",
});

// const bem = createNamespace("icon");
const props = defineProps(iconProps);

const style = computed(() => {
  // if (!props.color && !props.size) return {};
  // console.log(props.color);
  // console.log(props.size);

  return {
    ...(props.size ? { fontSize: `${props.size}px` } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
