import { toast } from 'react-toastify';

const errorToast = (error) => {
    toast(error, { type: "error" });
}

const successUpdate = () => {
    toast("Article updated !", { type: "success" });
}

const successDelete = () => {
    toast("Article deleted !", { type: "success" });
}

const successAdd = () => {
    toast("Article added !", { type: "success" });
}

const pendingUpdate = () => {
    toast("Updating article...", { type: "info" });
}

const pendingDelete = () => {
    toast("Deleting article...", { type: "info" });
}

const pendingAdd = () => {
    toast("Adding article...", { type: "info" });
}

export { errorToast, successUpdate, successDelete, successAdd, pendingUpdate, pendingDelete, pendingAdd}