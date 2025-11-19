<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node!.disabled),
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node!.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node!.isLeaf },
          bem.is('leaf', node!.isLeaf),
        ]"
        @click="handleExpand()"
      >
        <yx-icon size="25">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else> </Loading>
        </yx-icon>
      </span>
      <yx-checkbox
        v-if="showCheckbox"
        :model-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      ></yx-checkbox>
      <span :class="bem.e('label')" @click="handleSelected">
        <YxTreeNodeContent :node="node"></YxTreeNodeContent>
        <!-- {{ node?.label }} -->
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@yx/utils/create";
import { TreeNode, treeNodeEmitts, treeNodeProps } from "./tree";
import YxIcon from "@yx/components/icon";
import Switcher from "../../internal-icon/switcher";
import { computed } from "vue";
import Loading from "../../internal-icon/Loading";

import YxTreeNodeContent from "./icon/tree-node-content";
import YxCheckbox from "@yx/components/checkbox";

const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);
const emit = defineEmits(treeNodeEmitts);
function handleExpand() {
  emit("toggle", props.node as TreeNode);
}

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node!.key);
});

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node!.key);
});

function handleSelected() {
  // console.log(props.node?.key);
  if (props.node?.disabled) return;
  emit("select", props.node!);
}

function handleCheckChange(e: Event) {
  const inputElement = e.target as HTMLInputElement;
  const val = inputElement.checked;
  emit("check", props.node, val);
}
</script>
