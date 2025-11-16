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
      <span :class="bem.e('label')" @click="handleSelected">{{
        node?.label
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@yx/utils/create";
import { TreeNode, treeNodeEmitts, treeNodeProps } from "./tree";
import YxIcon from "@yx/components/icon";
import Switcher from "./icon/switcher";
import { computed } from "vue";
import Loading from "./icon/Loading";

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
</script>
