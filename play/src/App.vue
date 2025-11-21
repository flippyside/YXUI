<script setup lang="ts">
import { AddCircle, Person } from "@vicons/ionicons5";
import type { FormInstance } from "@yx/components/form";
import type { Key, TreeOption } from "@yx/components/tree";
import type { UpLoadRawFile } from "@yx/components/upload";
import { reactive, ref, warn } from "vue";

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
// const check = ref(true);

// // 用户可自定义checkbox change事件
// const handleChange = (val: boolean) => {
//   // console.log(val);
// };

// const handleClick = (e) => {
//   console.log(e);
// };

// const handleMousedown = (e) => {
//   console.log(e);
// };

// const username = ref("");

// const handleBlur = (e: FocusEvent) => {
//   console.log("blur", (e.target as HTMLInputElement).value);
// };

// const handleFocus = (e: FocusEvent) => {
//   console.log("focus", (e.target as HTMLInputElement).value);
// };

const state = reactive({ username: "", password: "" });

const formRef = ref<FormInstance>();

const validateForm = () => {
  const form = formRef.value;
  form?.validate((valid, errors) => {
    console.log(valid, errors);
  });
};

const handleBeforeUpload = (rawFile: UpLoadRawFile) => {
  return true;
};

const currentDate = ref(new Date());

console.log(currentDate.value);
</script>

<template>
  <!-- 日历组件 -->
  <yx-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split("-").slice(1).join("-") }}
        {{ data.isSelected ? "✅" : "" }}
      </p>
    </template>
  </yx-calendar>

  <!-- 上传 组件 -->
  <!-- <yx-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
    :drag="true"
  >
    <yx-button>Upload</yx-button>
  </yx-upload>
  <yx-icon color="red" :size="24">
    <AddCircle></AddCircle>
  </yx-icon> -->

  <!-- 表单组件 -->
  <!-- <yx-form
    ref="formRef"
    :model="state"
    :rules="{
      username: {
        min: 6,
        max: 10,
        message: '用户名6-10位',
        trigger: ['change', 'blur'],
      },
    }"
  >
    <yx-form-item
      prop="username"
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          min: 6,
          max: 10,
          message: '用户名6-10位',
          trigger: ['change', 'blur'],
        },
      ]"
    >
      <yx-input placeholder="请输入用户名" v-model="state.username"></yx-input>
      <template #label>用户名</template>
    </yx-form-item>
    <yx-form-item
      prop="password"
      :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
          min: 6,
          max: 10,
          message: '密码6-10位',
          trigger: ['change', 'blur'],
        },
      ]"
    >    
      <yx-input
        placeholder="请输入密码"
        v-model="state.password"
        type="password"
      ></yx-input>
      <template #label>密码</template>
    </yx-form-item>
    <yx-button size="medium" type="primary" :round="true" @click="validateForm"
      >校验表单</yx-button
    >
  </yx-form>  -->

  <!-- <yx-icon color="red" :size="24">
    <AddCircle></AddCircle>
  </yx-icon>
  <yx-icon color="yellow" :size="24">
    <AddCircle></AddCircle>
  </yx-icon>
  <yx-icon color="yellow" :size="24">
    <AddCircle></AddCircle>
  </yx-icon> -->
  <!-- <yx-tree
    :data="data"
    label-field="label"
    key-field="key"
    children-field="children"
    :default-expanded-keys="['41', '4130']"
  ></yx-tree> -->
  <!--实现懒加载 -->
  <!-- {{ value }} -->

  <!-- 树 -->
  <!-- <yx-tree
    :data="data"
    :on-load="handleLoad"
    v-model:selected-keys="value"
    selectable
    multiple
    show-checkbox
    :clearable="true"
    :default-checked-keys="['30', '41']"
  >
    <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </yx-tree> -->

  <!-- 按钮 -->
  <!-- <yx-button type="primary" size="medium" iconPlacement="right" :loading="true"
    >button1</yx-button
  >
  <yx-button
    type="success"
    size="medium"
    @click="handleClick"
    @mousedown="handleMousedown"
  >
    button
    <template #icon>
      <yx-icon>
        <AddCircle></AddCircle>
      </yx-icon>
    </template>
  </yx-button>
  <yx-button type="warning" size="medium">button</yx-button>
  <yx-button type="info" size="medium">button</yx-button>
  <yx-button type="danger" size="medium">button</yx-button> -->

  <!-- 输入框 -->
  <!-- {{ username }}
  <yx-input
    v-model="username"
    @blur="handleBlur"
    @focus="handleFocus"
    placeholder="请输入"
    :show-password="true"
  >
    <template #prepend>hello</template>
    <template #prefixIcon>
      <yx-icon>
        <Person></Person>
      </yx-icon>
    </template>
    <template #suffixIcon>
      <yx-icon>
        <Person></Person>
      </yx-icon>
    </template>
    <template #append>bye</template>
  </yx-input> -->

  <!-- 
  {{ check }}
  <yx-checkbox v-model="check" :disabled="false" @change="handleChange"
    >hi</yx-checkbox
  > -->
</template>

<style scoped></style>
