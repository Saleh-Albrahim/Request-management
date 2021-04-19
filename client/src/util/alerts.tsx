import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal: any = withReactContent(Swal);

export const errorAlert = (message: string): void => {
  MySwal.fire({
    icon: 'error',
    text: message,
    onOpen: () => MySwal.getConfirmButton().blur(),
    background: '#dfdfdf',
    confirmButtonText: 'المحاولة مرة اخرى',
    confirmButtonColor: '#888888',
  });
};

export const successAlertTimer = (message: string): void => {
  MySwal.fire({
    icon: 'success',
    text: message,
    timer: 1500,
    background: '#dfdfdf',
    showConfirmButton: false,
  });
};
