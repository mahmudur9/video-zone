import {toast} from "react-toastify";

class Toast {
    // Toast
    static successToast = (msg) => {
        toast.success(msg, {
            position: "top-right",
            theme: "colored",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    static dangerToast = (msg) => {
        toast.error(msg, {
            position: "top-right",
            theme: "colored",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    static warningToast = (msg) => {
        toast.warning(msg, {
            position: "top-right",
            theme: "colored",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
}

export default Toast;
