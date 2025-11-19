<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="emitClick"
    @mousedown="emitMousedown"
  >
    <template v-if="iconPlacement == 'left'">
      <YxIcon size="26">
        <Loading v-if="loading"></Loading
        ><template v-else-if="slots.icon">
          <component :is="slots.icon"></component>
        </template>
      </YxIcon>
    </template>

    <slot></slot>

    <template v-if="iconPlacement == 'right'">
      <YxIcon size="26"> <Loading v-if="loading"></Loading> </YxIcon>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { createNamespace } from "@yx/utils/create";
import { buttonEmits, buttonProps } from "./button";
import YxIcon from "@yx/components/icon";
import Loading from "@yx/components/internal-icon/Loading";
import { useSlots } from "vue";

const bem = createNamespace("button");

defineOptions({
  name: "yx-button",
  inheritAttrs: false, // 阻止未被声明为 props 的 attributes 自动绑定到组件的根元素
});

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const slots = useSlots();
const emitClick = (e: MouseEvent) => {
  emit("click", e);
};

const emitMousedown = (e: MouseEvent) => {
  emit("mousedown", e);
};
</script>
