<template>
  <div :class="bem.b()">
    <yx-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <yx-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :loadingKeys="loadingKeyRef"
          @toggle="toggleExpand"
          :selectedKeys="selectedKeysRef"
          @select="handleSelect"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isindeterminate(node)"
          @check="toggleCheck"
        ></yx-tree-node>
      </template>
    </yx-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, useSlots, watch } from "vue";
import {
  Key,
  treeEmitts,
  treeInjectKey,
  TreeNode,
  TreeOption,
  treeProps,
} from "./tree";
import { createNamespace } from "@yx/utils/create";
import YxTreeNode from "./treeNode.vue";
import YxVirtualList from "@yx/components/virtual-list/src/virtual";

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
        parentKey: parent?.key,
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

provide(treeInjectKey, {
  slots: useSlots(),
});

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys));
const indeterminateRef = ref<Set<Key>>(new Set());
function isChecked(node: TreeNode) {
  return checkedKeysRefs.value.has(node.key);
}
function isDisabled(node: TreeNode) {
  return !!node.disabled;
}

function isindeterminate(node: TreeNode) {
  return indeterminateRef.value.has(node.key);
}

function toggle(node: TreeNode, checked: boolean) {
  if (!node) return;
  const checkedKeys = checkedKeysRefs.value;
  if (checked) {
    // 选中的时候去掉半选状态
    indeterminateRef.value.delete(node.key);
  }
  checkedKeys[checked ? "add" : "delete"](node.key);
  const children = node.children;
  if (children) {
    children.forEach((childNode) => {
      if (!childNode.disabled) {
        toggle(childNode, checked);
      }
    });
  }
}

function findNode(key: Key) {
  return flattenTree.value.find((node) => node.key === key);
}

function udpateCheckKeys(node: TreeNode) {
  if (node && node.parentKey) {
    const parentNode = findNode(node.parentKey);

    if (parentNode) {
      let allChecked = true;
      let hasChecked = false;
      let nodes = parentNode.children;
      for (let node of nodes) {
        // 存在被选中的子节点
        if (checkedKeysRefs.value.has(node.key)) {
          hasChecked = true;
        }
        // 存在半选的子节点
        else if (indeterminateRef.value.has(node.key)) {
          allChecked = false;
          hasChecked = true;
        } else {
          allChecked = false;
        }
      }
      if (allChecked) {
        checkedKeysRefs.value.add(parentNode.key);
        indeterminateRef.value.delete(parentNode.key);
      } else if (hasChecked) {
        checkedKeysRefs.value.delete(parentNode.key);
        indeterminateRef.value.add(parentNode.key);
      }
      udpateCheckKeys(parentNode);
    }
  }
}

// 实现点击父节点的checkbox时会全选子节点的checkbox
function toggleCheck(node: TreeNode, checked: boolean) {
  toggle(node, checked);
  udpateCheckKeys(node);
}

onMounted(() => {
  checkedKeysRefs.value.forEach((key: Key) => {
    toggleCheck(findNode(key)!, true);
  });
});
</script>
