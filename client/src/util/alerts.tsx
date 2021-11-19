import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './styles.css';

const MySwal: any = withReactContent(Swal);

export const errorAlert = (message: string): void => {
  MySwal.fire({
    icon: 'error',
    text: message,
    onOpen: () => MySwal.getConfirmButton().blur(),
    background: '#dfdfdf',
    customClass: {
      container: 'my-swal',
    },
    confirmButtonText: 'المحاولة مرة اخرى',
    confirmButtonColor: '#888888',
  });
};

export const successAlertTimer = (message: string): void => {
  MySwal.fire({
    icon: 'success',
    text: message,
    timer: 1500,
    customClass: {
      container: 'my-swal',
    },
    background: '#dfdfdf',
    showConfirmButton: false,
  });
};

export const confirmAlert = async () => {
  const res = await MySwal.fire({
    title: 'هل انت متأكد',
    text: 'لا تستطيع التراجع عن هذا القرار',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'متأكد',
    cancelButtonText: 'تراجع',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#888888',
    customClass: {
      container: 'my-swal',
    },
    background: '#dfdfdf',
  });

  return res;
};
