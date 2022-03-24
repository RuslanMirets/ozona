import { Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { NotifyActionTypes } from '../../types/notify';

interface IProps {
  body: string | string[];
  severity: any;
}

export const Toast: React.FC<IProps> = ({ body, severity }) => {
  const dispatch = useDispatch();

  const handleShow = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: NotifyActionTypes.NOTIFY, payload: {} });
  };

  return (
    <Snackbar open autoHideDuration={3000} onClose={handleShow} style={{ bottom: '40px' }}>
      <Alert onClose={handleShow} severity={severity} sx={{ width: '100%' }}>
        {typeof body === 'string' ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </Alert>
    </Snackbar>
  );
};
