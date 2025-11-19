<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <div :class="bem.e('wrapper')">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>

        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :class="bem.e('inner')"
          ref="input"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
        />

        <span v-if="slots.suffixIcon" :class="bem.e('suffix')">
          <yx-icon v-if="showPwdVisible" @click="handlePasswordVisible">
            <EyeOff v-if="passwordVisible" />
            <Eye v-else />
          </yx-icon>
          <yx-icon v-if="showClear" @click="handleClear">
            <Close />
          </yx-icon>
          <slot v-else name="suffixIcon"></slot>
        </span>
      </div>

      <div v-if="slots.append" :class="bem.be('group', 'append')">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@yx/utils/create";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from "vue";
import { inputEmits, inputProps } from "./input";
import { Eye } from "@vicons/ionicons5";
import { EyeOff } from "@vicons/ionicons5";
import { Close } from "@vicons/ionicons5";

defineOptions({
  name: "yx-input",
  inheritAttrs: false,
});

const bem = createNamespace("input");
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const attrs = useAttrs();

const slots = useSlots();

// 监控value值的变化
watch(
  () => props.modelValue,
  () => {
    setNativeInputValue();
  }
);

const input = ref<HTMLInputElement | null>(null);

const setNativeInputValue = () => {
  const inputEle = input.value;
  if (!inputEle) {
    return;
  }
  inputEle.value = String(props.modelValue);
};

// 实现密码可见

const focus = async () => {
  await nextTick();
  const inputEle = input.value;
  if (!inputEle) {
    return;
  }
  inputEle.value = String(props.modelValue);
};
const passwordVisible = ref(false);

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 输入密码时，显示Eye/Eyeoff图标
const showPwdVisible = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  );
});

const showClear = computed(() => {
  return (
    props.modelValue && props.clearable && !props.disabled && !props.readonly
  );
});

const handleClear = () => {
  emit("input", "");
  emit("update:modelValue", "");
  emit("clear");
};

onMounted(() => {
  setNativeInputValue();
});

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("input", value);
  emit("update:modelValue", value);
};

const handleChange = (e: Event) => {
  emit("change", (e.target as HTMLInputElement).value);
};

const handleBlur = (e: FocusEvent) => {
  emit("blur", e);
};

const handleFocus = (e: FocusEvent) => {
  emit("focus", e);
};
</script>
