<template>
  <label :class="bem.b()">
    <span>
      <input
        type="checkbox"
        v-model="model"
        ref="inputRef"
        :disabled="disabled"
        @handleChange="handleChange"
      />
    </span>

    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { createNamespace } from "@yx/utils/create";
import { checkBoxEmits, checkBoxProps } from "./checkbox";
import { computed, onMounted, ref, watch } from "vue";

const bem = createNamespace("checkbox");
const props = defineProps(checkBoxProps);
const emits = defineEmits(checkBoxEmits);
defineOptions({
  name: "yx-checkbox",
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    // console.log(val);
    return emits("update:modelValue", val);
  },
});

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const value = target.checked ? true : false;
  emits("change", value);
}

// 实现初始值是半选
const inputRef = ref<HTMLInputElement>();
function indeterminate(val: boolean) {
  inputRef.value!.indeterminate = true;
}

watch(() => props.indeterminate, indeterminate);

// onMounted(() => {
//   indeterminate(props.indeterminate);
// });
</script>
