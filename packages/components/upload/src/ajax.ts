import { UpLoadProgressEvent } from "./upload";
import { RequestOptions } from "./upload-content";

export function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest();
  const action = options.action;

  xhr.open(options.method, action, true);

  xhr.upload.addEventListener("progress", (e) => {
    const processEvent = e as UpLoadProgressEvent;
    // 进度条
    processEvent.pecetange = e.total > 0 ? (e.loaded / e.total) * 100 : 0;

    options.onProgress(processEvent);
  });

  const headers = options.headers;
  if (headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      xhr.setRequestHeader(key, value);
    }
  }

  const formData = new FormData();

  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      formData.append(key, value);
    }
  }
  formData.append(options.name, options.file);

  xhr.onload = function (err) {
    if (xhr.status < 300 && xhr.status >= 200) {
      options.onSuccess(xhr.response);
    } else {
      options.onError(err);
    }
  };

  xhr.addEventListener("error", function (err) {
    options.onError(err);
  });

  xhr.send(formData);

  return xhr;
}
