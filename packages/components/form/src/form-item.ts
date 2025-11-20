// form-item.d.ts
import type { PropType, ExtractPropTypes, InjectionKey } from "vue";

import { RuleItem } from "async-validator";

export type Arrayable<T> = T | T[];

export const formItemValidateState = ["success", "error", ""] as const;
export type FormItemValidateState = (typeof formItemValidateState)[number];

export interface FormItemRule extends RuleItem {
  trigger: string | string[];
}

// 组件接收的 props
export const formItemProps = {
  prop: String, // 绑定的字段名称，如 "username"
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>, // 直接传规则 或 数组
  showMessage: {
    // 是否展示错误信息
    type: Boolean,
    default: true,
  },
  // validateOnRuleChange?: Boolean,          // 规则变化后是否立即校验
} as const;

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>;

// 校验

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void
  ) => Promise<void>;
}

export const formItemContextKeys: InjectionKey<FormItemContext> = Symbol();
