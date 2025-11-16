import { ExtractPropTypes, PropType } from "vue";

export type Key = string | number;

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
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
};

export const treeEmitts = {
  // 同步响应式数据
  "update:selectedKeys": (keys: Key[]) => keys,
};

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
};
