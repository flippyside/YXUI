import { ExtractPropTypes, PropType, defineEmits } from "vue";

export const checkBoxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String as PropType<string>,
  },
} as const;

export type CheckBoxProps = Partial<ExtractPropTypes<typeof checkBoxProps>>;

export const checkBoxEmits = defineEmits({
  "update:modelValue": (value: boolean | string | number) => value,
  change: (value: boolean) => value,
});

export type CheckBoxEmits = typeof checkBoxEmits;
