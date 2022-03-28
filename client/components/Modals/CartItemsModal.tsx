import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  open: boolean;
  onClose: () => void;
  deleteItems: any;
}

export const CartItemsModal: React.FC<IProps> = ({ open, onClose, deleteItems }) => {
  const handleSubmit = () => {
    deleteItems();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        Удаление
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>Вы действительно хотите удалить все товары?</DialogContent>
      <DialogActions sx={{ padding: '15px 8px' }}>
        <Button variant="contained" onClick={handleSubmit} color="error">
          Удалить
        </Button>
        <Button onClick={onClose}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
};
