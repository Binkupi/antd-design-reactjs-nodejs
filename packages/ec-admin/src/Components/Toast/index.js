import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const notifySuccess = (mess) => {
    toast.success(mess, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    })
}

export const notifyWarning = (mess) => {
    toast.warning(mess, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    })
}

export const notifyError = (mess) => {
    toast.error(mess, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    })
}

export const notifyInfo = (mess) => {
    toast.info(mess, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
    })
}

