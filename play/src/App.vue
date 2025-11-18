<script setup lang="ts">
import { AddCircle } from "@vicons/ionicons5";
import type { Key, TreeOption } from "@yx/components/tree";
import { ref } from "vue";

function createData(level = 3, parentKey = ""): object {
  if (!level) return [];
  const arr = new Array(6 - level).fill(0);
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx;
    return {
      label: createLabel(level), // 显示的内容
      key, // 唯一性
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

const data = createData();

// // 测试禁用节点
// const data = ref<TreeOption[]>([
//   {
//     key: "0",
//     label: "0",
//     children: [
//       {
//         key: "0-0",
//         label: "0-0",
//       },
//       {
//         disabled: true,
//         key: "0-1",
//         label: "0-1",
//         children: [
//           {
//             key: "0-1-0",
//             label: "0-1-0",
//           },
//           {
//             key: "0-1-1",
//             label: "0-1-1",
//           },
//         ],
//       },
//     ],
//   },
// ]);

const value = ref<Key[]>([]);

// function createData() {
//   return [
//     { label: nextLabel(), key: 1, isLeaf: false },
//     { label: nextLabel(), key: 2, isLeaf: false },
//   ];
// }
// function nextLabel(currentLabel?: string | undefined | number): string {
//   if (!currentLabel) return "Out of Tao, One is born";
//   if (currentLabel == "Out of Tao, One is born") return "Out of One, Two";
//   if (currentLabel == "Out of One, Two") return "Out of Two, Three";
//   if (currentLabel == "Out of Two, Three")
//     return "Out of Three, The created universe";
//   if (currentLabel == "Out of Three, The created universe")
//     return "Out of Tao, One is born";
//   return "";
// }
// const data = ref(createData());
// const handleLoad = (node: TreeOption) => {
//   return new Promise<TreeOption[]>((resolve, reject) => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: node.key + nextLabel(node.label),
//           isLeaf: false,
//         },
//       ]);
//     }, 300);
//   });
// };
const check = ref(true);

// 用户可自定义checkbox change事件
const handleChange = (val: boolean) => {
  // console.log(val);
};
</script>

<template>
  <yx-icon color="red" :size="24">
    <AddCircle></AddCircle>
  </yx-icon>
  <yx-icon color="yellow" :size="24">
    <AddCircle></AddCircle>
  </yx-icon>
  <yx-icon color="yellow" :size="24">
    <AddCircle></AddCircle>
  </yx-icon>
  <!-- <yx-tree
    :data="data"
    label-field="label"
    key-field="key"
    children-field="children"
    :default-expanded-keys="['41', '4130']"
  ></yx-tree> -->
  <!--实现懒加载 -->
  {{ value }}
  <yx-tree
    :data="data"
    :on-load="handleLoad"
    v-model:selected-keys="value"
    selectable
    multiple
    show-checkbox
    :default-checked-keys="['30', '41']"
  >
    <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </yx-tree>
  {{ check }}
  <yx-checkbox v-model="check" :disabled="false" @change="handleChange"
    >hi</yx-checkbox
  >
</template>

<style scoped></style>
