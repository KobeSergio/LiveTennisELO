import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Import container first:
export function NotificationContainer() {
    return ( 
        <ToastContainer />
    )
}

// Toasts

export function SuccessToast() {
    const notify = () =>
        toast.success('Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });;

    return (
        <>

        <div>
            <button onClick={notify}>Success Notify!</button>
        </div>

        </>
    );
}

export function ErrorToast() {
    const notify = () =>
        toast.error('Error', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });;

    return (
        <>

        <div>
            <button onClick={notify}>Error Notify!</button>
        </div>

        </>

    );
}