/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractPropTypes, PropType } from "vue";
import {
  baseProps,
  UpLoadProgressEvent,
  uploadProps,
  UpLoadRawFile,
} from "./upload";

const NOOP = () => {};
export const uploadContentProps = {
  ...baseProps,
  beforeUpload: uploadProps["beforeUpload"],
  onStart: {
    type: Function as PropType<(rawFile: UpLoadRawFile) => void>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (e: UpLoadProgressEvent, rawFile: UpLoadRawFile) => void
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<(rawFile: UpLoadRawFile) => void>,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<(err: any, rawFile: UpLoadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<(res: any, rawFile: UpLoadRawFile) => void>,
    default: NOOP,
  },
} as const;

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;

export interface RequestOptions {
  method: string;
  file: File;
  name: string;
  action: string;
  headers: Headers | Record<string, any>;
  data: Record<string, any>;
  onError: (e: any) => void;
  onSuccess: (response: any) => void;
  onProgress: (e: UpLoadProgressEvent) => void;
}
