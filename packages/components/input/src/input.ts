/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes, PropType } from "vue";

export const inputProps = {
  type: {
    type: String,
    // as PropType<
    //   "text" | "password" | "textarea" | "number" | "search" | "email"
    // >,
    default: "text",
  },

  /** 组件的值（v-model） */
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: "",
  },

  /** 占位文本 */
  placeholder: {
    type: String,
    default: "",
  },

  /** 是否能清空（显示清空按钮） */
  clearable: {
    type: Boolean,
    default: true,
  },

  /** 密码框是否可切换可见性 */
  showPassword: {
    type: Boolean,
    default: false,
  },

  /** 禁用状态 */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** 原生 readonly 属性 */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** 左侧标签文本（组件库常用） */
  label: {
    type: String,
    default: "",
  },
} as const;

export type inputProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  "update:modelValue": (v: string) => true,
  input: (v: string) => true,
  change: (v: string) => true,
  focus: (e: FocusEvent) => true,
  blur: (e: FocusEvent) => true,
  clear: () => true,
};

export type InputEmits = typeof inputEmits;
