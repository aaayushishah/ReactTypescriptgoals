import { Alert, AlertColor, Snackbar, SnackbarCloseReason, styled } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { default as MuiIconButton } from '@mui/material/IconButton';

export interface ToastOptions {
  type: AlertColor;
  disableAutoClose?: boolean;
  extraActions?: ReactNode;
}

export type OpenToastFunc = (message?: string, options?: ToastOptions | undefined) => void;

interface IToastContext {
  openToast: OpenToastFunc;
  closeToast: () => void;
}
const ToastContext = createContext<IToastContext>({} as IToastContext);
export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children?: ReactNode;
}

const icons: { [key: string]: ReactNode } = {
  'success': <CheckCircleOutlineIcon />,
  'info': <InfoIcon />,
  'warning': <WarningAmberIcon />,
  'error': <ErrorOutlineIcon />,
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [options, setOptions] = useState<ToastOptions>({ type: 'error', disableAutoClose: false });

  const openToast: OpenToastFunc = (message = 'Something went wrong...', options) => {
    setMessage(message)
    if (options) {
      setOptions(options);
    } else {
      setOptions({ type: 'error', disableAutoClose: false });
    }
    setIsActive(true);
  }

  const closeToast = () => {
    setIsActive(false);
    setMessage('');
  }

  const handleClose = (event: Event | React.SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeToast();
  };

  const toastType = (options?.type || 'error');

  return (

    <ToastContext.Provider value={{
      openToast,
      closeToast
    }}>
      {children}

      <Snackbar
        open={isActive}
        autoHideDuration={options?.disableAutoClose ? null : 2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <Alert
          action={
            <>
              {(options?.extraActions || null)}
              <MuiIconButton
                id="toast-close-button"
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { closeToast() }}
              >
                <CloseIcon fontSize="small" />
              </MuiIconButton>
            </>
          }
          severity={toastType}
          sx={{ width: '100%' }}
          icon={icons[toastType]}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider >
  );
};
export default ToastProvider;