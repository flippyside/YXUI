<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>
  {{ uploadFiles }}
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import UploadContent from "./upload-content.vue";
import { UploadContentProps } from "./upload-content";
import { UpLoadFile, UpLoadFiles, uploadProps, UpLoadRawFile } from "./upload";

defineOptions({
  name: "yx-upload",
});

const props = defineProps(uploadProps);

const uploadFiles = ref<UpLoadFiles>(props.FileList);

// const emit = defineEmits({});
// // 监控文件变化
// watch(uploadFiles, (newVal) => {
//   emit("onUpdate:file-list", newVal);
// });

const findFile = (rawFile: UpLoadRawFile): UpLoadFile => {
  return uploadFiles.value.find((file) => file.uid === rawFile.uid)!;
};

const uploadContentProps = computed<UploadContentProps>(() => ({
  ...props,
  onStart: (rawFile) => {
    // 上传之前的逻辑：将上传的文件 uploadFile 加入队列 uploadFiles
    console.log("start");
    const uploadFile: UpLoadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      percentage: 0,
      raw: rawFile,
      size: rawFile.size,
      status: "start",
    };
    uploadFile.url = URL.createObjectURL(rawFile); // 实现预览
    uploadFiles.value = [...uploadFiles.value, uploadFile];
    props.onChange(uploadFile);
  },
  onProgress: (e, rawFile) => {
    // 上传中：
    console.log("progress");
    const uploadFile = findFile(rawFile);
    uploadFile!.status = "uploading";
    uploadFile!.percentage = e.pecetange;
    props.onProgress(e, uploadFile!, uploadFiles.value);
  },
  onRemove: async (rawFile) => {
    // console.log('start');
    const uploadFile = findFile(rawFile);
    const r = await props.beforeRemove(uploadFile, uploadFiles.value);
    if (r != false) {
      const fileList = uploadFiles.value;
      fileList.splice(fileList.indexOf(uploadFile), 1);
      props.onRemove(uploadFile, fileList);
    }
  },
  onError: (err, rawFile) => {
    console.log("error");
    const uploadFile = findFile(rawFile);
    uploadFile.status = "error";
    const fileList = uploadFiles.value;
    fileList.splice(fileList.indexOf(uploadFile), 1);
    props.onError(err, uploadFile, fileList);
  },
  onSuccess: (res, rawFile) => {
    console.log("success");
    const uploadFile = findFile(rawFile);
    uploadFile.status = "success";
    const fileList = uploadFiles.value;
    props.onSuccess(res, uploadFile, fileList);
  },
}));

// console.log(props.action);
</script>
