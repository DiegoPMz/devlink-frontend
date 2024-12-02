import toast from "react-hot-toast";

interface ToastMessages {
  success: string;
  loading: string;
  error: string;
}

const handleApiWithToast = <T extends { error: { status: number } }>(
  addedPromise: Promise<T>,
  options: ToastMessages,
) => {
  return toast
    .promise(
      addedPromise.then((res) => {
        if (res.error.status >= 400) {
          throw res;
        }

        return res;
      }),
      {
        loading: options.loading,
        success: options.success,
        error: (res) => {
          if (res.error.status >= 500) return res.error.cause.cause.service;
          return options.error;
        },
      },
    )
    .catch((rej: T) => rej);
};

export default handleApiWithToast;
