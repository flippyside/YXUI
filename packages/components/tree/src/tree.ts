import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from "vue";

export type Key = string | number;

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  parentKey: Key | undefined;
}

export interface TreeOption {
  label?: Key;
  key?: Key;
  children?: TreeOption[];
  [key: string]: unknown;
  isLeaf?: boolean;
  disabled?: boolean;
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => {},
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => {},
  },
  labelField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "key",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
} as const;

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean,
} as const;

export const treeEmitts = {
  // 同步响应式数据
  "update:selectedKeys": (keys: Key[]) => keys,
};

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, val: boolean) => val,
};

export interface TreeContext {
  slots: SetupContext["slots"];
  // emit: SetupContext<typeof treeEmitts>["emit"];
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol();

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
};
