<template>
  <div :class="bem.b()">
    <yx-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :loadingKeys="loadingKeyRef"
      @toggle="toggleExpand"
      :selectedKeys="selectedKeysRef"
      @select="handleSelect"
    ></yx-tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Key, treeEmitts, TreeNode, TreeOption, treeProps } from "./tree";
import { createNamespace } from "@yx/utils/create";
import YxTreeNode from "./treeNode.vue";

const bem = createNamespace("tree");

console.log(bem.b());

defineOptions({
  name: "YxTree",
});

const props = defineProps(treeProps);

const tree = ref<TreeNode[]>([]);

function createOption(label: string, key: string, children: string) {
  return {
    getLabel(Node: TreeOption): string {
      return Node[label] as string;
    },
    getKey(Node: TreeOption): string {
      return Node[key] as string;
    },
    getChild(Node: TreeOption): TreeOption[] {
      return Node[children] as TreeOption[];
    },
  };
}

const treeOption = createOption(
  props.labelField,
  props.keyField,
  props.childrenField
);

// 对用户的数据进行格式化：label key children
// 将props.data格式化后放到tree中
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  // console.log(data);
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map((node) => {
      let children = treeOption.getChild(node) || [];
      const treeNode: TreeNode = {
        label: treeOption.getLabel(node),
        key: treeOption.getKey(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length === 0,
        disabled: !!node.disabled, // !!显式转布尔：把任意值转成严格的 true / false
      };
      if (children.length > 0) {
        // 有孩子再去递归
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode;
    });
  }

  const result: TreeNode[] = traversal(data, parent);
  return result;
}

// 监控数据变化，调用格式化方法
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
    // console.log(tree.value);
  },
  { immediate: true }
);

// 拍平树

// 把默认展开的节点做成一个 Set
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value; // 要展开的keys
  let flattenNodes: TreeNode[] = []; // 拍平后的结果
  const nodes = tree.value || [];

  const stack: TreeNode[] = []; // 用于遍历树的栈 [40, 30,31,32, 41]

  // [40, 41]
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i]);
  }
  // [41, 32, 31, 30]
  // DFS
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandedKeys.has(node.key)) {
      const children = node.children;
      if (children) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(node.children[i]);
        }
      }
    }
  }
  return flattenNodes;
});

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}

// 折叠
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

// 存放正在加载的node
const loadingKeyRef = ref(new Set<Key>());

function triggerLoading(node: TreeNode) {
  // 节点需要异步加载，并且防止重复多次加载
  // 如果没有加载过这个节点，才加载
  if (!node.children.length && !node.isLeaf) {
    const loadingKey = loadingKeyRef.value;
    if (!loadingKey.has(node.key)) {
      loadingKey.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children;
          // 更新自定义的节点
          node.children = createTree(children, node);
          loadingKey.delete(node.key);
        });
      }
    }
  }
}

// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);
  triggerLoading(node);
}
// 用户点击
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value;
  // 不允许收起正在加载的节点
  if (expandKeys.has(node.key) && !loadingKeyRef.value.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
}

// console.log(props.selectedKeys);

// 选中节点
const emit = defineEmits(treeEmitts);
const selectedKeysRef = ref<Key[]>([]);
watch(
  () => props.selectedKeys,
  (value) => {
    if (value) {
      selectedKeysRef.value = value;
      // console.log(selectedKeysRef.value);
    }
  },
  {
    immediate: true,
  }
);

// 处理选中的节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectedKeysRef.value);
  console.log(keys);

  if (!props.selectable) return;
  if (props.multiple) {
    // 多选
    const index = keys.findIndex((key) => key === node.key);
    if (index > -1) {
      // console.log(keys);
      keys.splice(index);
      // console.log(keys);
    } else {
      keys.push(node.key);
    }
  } else {
    // 单选
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  emit("update:selectedKeys", keys);
}
</script>
