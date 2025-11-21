import { ExtractPropTypes, PropType } from "vue";

// 对每个文件进行包装成一个新的类型
export interface UpLoadFile {
  uid?: number;
  name: string;
  url?: string;
  percentage?: number;
  raw?: File;
  size?: number;
  status: string;
}
export type UpLoadFiles = UpLoadFile[];

export const baseProps = {
  FileList: {
    type: Array as PropType<UpLoadFiles>,
    default: () => [] as const,
  },
  action: {
    // 请求 URL
    type: String,
    default: "",
  },
  multiple: {
    // 是否支持多选文件
    type: Boolean,
    default: true,
  },
  name: {
    // 上传的文件字段名
    type: String,
    default: "file",
  },
  accept: {
    // 接受上传的文件类型
    type: String,
    default: "",
  },
  // 上传文件调用ajax需要
  method: {
    // 设置上传请求方法
    type: String,
    default: "post",
  },
  headers: {
    // 设置上传的请求头部
    type: Object,
    default: () => ({}),
  },
  data: {
    // 上传时附带的额外参数
    type: Object,
    default: () => ({}),
  },
  drag: {
    type: Boolean,
    default: false,
  },
} as const;

export type UpLoadRawFile = File & { uid: number };
export type UpLoadProgressEvent = ProgressEvent & { pecetange: number };
const NOOP = () => {};
export const uploadProps = {
  ...baseProps,
  onPreview: {
    // 点击文件列表中已上传的文件时的钩子
    type: Function as PropType<(file: UpLoadFile) => void>,
    default: NOOP,
  },
  beforeUpload: {
    // 上传文件之前的钩子
    type: Function as PropType<
      (file: UpLoadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  onChange: {
    // 文件状态改变时的钩子
    type: Function as PropType<(file: UpLoadFile) => void>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (
        e: UpLoadProgressEvent,
        rawFile: UpLoadFile,
        FileList: UpLoadFiles
      ) => void
    >,
    default: NOOP,
  },
  beforeRemove: {
    // 删除文件之前的钩子
    type: Function as PropType<
      (file: UpLoadFile, uploadFiles: UpLoadFiles) => void
    >,
    default: NOOP,
  },
  onRemove: {
    // 文件列表移除文件时的钩子
    type: Function as PropType<
      (
        // file: UpLoadProgressEvent,
        uploadFile: UpLoadFile,
        uploadFiles: UpLoadFiles
      ) => void
    >,
    default: NOOP,
  },
  onSuccess: {
    // 文件上传成功时的钩子
    type: Function as PropType<
      (response: any, uploadFile: UpLoadFile, uploadFiles: UpLoadFiles) => void
    >,
    default: NOOP,
  },
  onError: {
    // 文件上传失败时的钩子
    type: Function as PropType<
      (err: any, uploadFile: UpLoadFile, uploadFiles: UpLoadFiles) => void
    >,
    default: NOOP,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

let id = 0;
export const genId = () => id++;
