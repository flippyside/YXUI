<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { createNamespace } from "@yx/utils/create";
import { FormContext, FormContextKeys, formProps } from "./form";
import { provide } from "vue";
import { FormItemContext } from "./form-item";
import { Value, Values } from "async-validator";

const bem = createNamespace("form");

defineOptions({
  name: "yx-form",
});

const props = defineProps(formProps);

const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {};
  // 触发每个子组件校验
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields,
      };
    }
  }
  if (Object.keys(errors).length === 0) {
    return callback?.(true);
  } else {
    if (callback) {
      callback?.(false, errors);
    } else {
      return Promise.reject(errors);
    }
  }
};

const fields: FormItemContext[] = []; // 存储儿子们的context，即FormItemContext

// 供儿子们调用，收集儿子们的context
const addField: FormContext["addField"] = (context: FormItemContext) => {
  fields.push(context);
};

const context = {
  ...props,
  addField,
};

provide(FormContextKeys, context);

defineExpose({
  validate,
});
</script>
