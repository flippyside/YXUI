<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error'),
    ]"
  >
    <label :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@yx/utils/create";
import { computed, inject, onMounted, provide, ref, toRef, toRefs } from "vue";
import {
  FormItemContext,
  formItemContextKeys,
  FormItemProps,
  FormItemRule,
  formItemProps,
  FormItemValidateState,
  Arrayable,
} from "./form-item";
import { FormContextKeys } from "./form";
import AsyncValidator, { Values } from "async-validator";

defineOptions({
  name: "yx-form-item",
});

const props = defineProps(formItemProps);

const bem = createNamespace("form-item");

// 校验逻辑
const validateState = ref<FormItemValidateState>("");
const validateMessage = ref("");

const converArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
};

const _rules = computed(() => {
  const myRules = converArray(props.rules);
  const formRules = formContext?.rules;
  if (formRules && props.prop) {
    const _temp = formRules[props.prop];
    if (_temp) {
      myRules.push(...converArray(_temp));
    }
  }
  return myRules;
});

const getRuleFiltered = (trigger: string) => {
  const rules = _rules.value;
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    } else {
      return rule.trigger === trigger;
    }
  });
};

const onValidationSuccessed = () => {
  validateState.value = "success";
  validateMessage.value = "";
};

const onValidationFailed = (err: Values) => {
  validateState.value = "error";
  const { errors } = err;
  validateMessage.value = errors ? errors[0].message : "";
};

const validate: FormItemContext["validate"] = async (trigger, callback?) => {
  // 拿到触发的时机，校验是否通过可以调用callback 或者调用promise.then方法
  const rules = getRuleFiltered(trigger);
  const modelName = props.prop!;

  const validator = new AsyncValidator({
    [modelName]: rules,
  });
  const model = formContext!.model!;

  return validator
    .validate({
      [modelName]: model[modelName],
    })
    .then(() => {
      onValidationSuccessed();
    })
    .catch((err) => {
      onValidationFailed(err);
      return Promise.reject(err);
    });
};

const context: FormItemContext = {
  ...props,
  validate,
};

provide(formItemContextKeys, context);
const formContext = inject(FormContextKeys);

onMounted(() => {
  formContext?.addField(context); // 将自己的context传递给父亲
});

// console.log(formContext);
</script>
