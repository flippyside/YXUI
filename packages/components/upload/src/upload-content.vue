<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div @click="handleClick" :class="[bem.b()]">
    <template v-if="drag">
      <UploadDragger @file="uploadFiles">
        <slot></slot>
      </UploadDragger>
    </template>
    <template v-else>
      <slot></slot>
    </template>
    <input
      :class="[bem.e('input')]"
      type="file"
      ref="inputRef"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { genId, uploadProps, UpLoadRawFile } from "./upload";
import { createNamespace } from "@yx/utils/create";
import { uploadContentProps } from "./upload-content";
import { httpRequest } from "./ajax";
import UploadDragger from "./upload-dragger.vue";

const bem = createNamespace("upload");
const props = defineProps(uploadContentProps);

defineOptions({
  name: "yx-upload",
  inheritAttrs: false,
});
async function upload(rawfile: UpLoadRawFile) {
  // 输入框清空
  inputRef.value!.value = "";

  let result = await props.beforeUpload(rawfile);
  if (result == false) return props.onRemove(rawfile); // 失败停止上传

  // 上传文件 ajax
  const { method, name, action, headers, data } = props;
  httpRequest({
    method,
    name,
    file: rawfile,
    action,
    headers,
    data,
    onError: (e) => {
      props.onError(e, rawfile);
    },
    onSuccess: (res) => {
      props.onSuccess(res, rawfile);
    },
    onProgress: (e) => {
      props.onProgress(e, rawfile);
    },
  });
  // console.log(result);
}

function uploadFiles(files) {
  for (let i = 0; i < files!.length; i++) {
    const rawFile = files![i] as UpLoadRawFile;
    rawFile.uid = genId();
    props.onStart(rawFile);
    upload(rawFile);
  }

  const handleChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    uploadFiles(files);
  };
}

const inputRef = ref<HTMLInputElement>();
const handleClick = () => {
  inputRef.value!.value = "";
  inputRef.value!.click();
};
</script>
