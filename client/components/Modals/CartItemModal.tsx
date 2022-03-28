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
import { IProduct } from '../../types/product';
import { useAppSelector } from '../../hooks/useAppSelector';

interface IProps {
  open: boolean;
  onClose: () => void;
  deleteItem?: any;
  item?: IProduct;
}

export const CartItemModal: React.FC<IProps> = ({ open, onClose, deleteItem, item }) => {
  const { cartData } = useAppSelector((state) => state.cart);

  const handleSubmit = () => {
    deleteItem(cartData, item!.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {item !== null && item?.title}
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
      <DialogContent dividers>Вы действительно хотите удалить этот товар?</DialogContent>
      <DialogActions sx={{ padding: '15px 8px' }}>
        <Button variant="contained" onClick={handleSubmit} color="error">
          Удалить
        </Button>
        <Button onClick={onClose}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
};
