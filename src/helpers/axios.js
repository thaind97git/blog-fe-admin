import { toastError } from './toast';

const apiErrorMessage = error => {
  if (typeof error === 'string') {
    return error;
  }
  const response = error && error.response;
  const isArrayBuffer =
    response?.request?.responseType === 'arraybuffer' &&
    response?.data?.toString() === '[object ArrayBuffer]';

  if (isArrayBuffer) {
    try {
      response.data = JSON.parse(Buffer.from(response.data).toString('utf8'));
    } catch (error) {
      // ignore JSON parse error
    }
  }

  try {
    if (response && typeof response === 'object') {
      const message =
        (response.data &&
          (response.data.message ||
            response.data.errorMessage ||
            response.data.error ||
            JSON.stringify(response.data, null, 2))) ||
        response.data ||
        response.message ||
        response;
      return message || 'Oops something went wrong.';
    }

    return typeof response === 'string' ? response : error.message;
  } catch (error) {
    return error.message;
  }
};

export const errorHandler = error => toastError(apiErrorMessage(error));
