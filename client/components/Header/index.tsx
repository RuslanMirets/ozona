import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  dividerClasses,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useActions } from '../../hooks/useActions';

export const Header: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const avatar = true;
  const isAdmin = false;

  const { logout } = useActions();
  const { userData } = useAppSelector((state) => state.user);
  const { cartData } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
  };

  return (
    <AppBar classes={{ root: styles.root }} position="static">
      <Container>
        <Toolbar classes={{ root: styles.toolbar }} disableGutters>
          <Link href="/">
            <a className={styles.logo}>
              <Typography variant="h6" noWrap component="div">
                OZONA
              </Typography>
            </a>
          </Link>
          <Box className={styles.menu}>
            <Button>
              <Link href="/catalog">
                <a>Каталог</a>
              </Link>
            </Button>
            <Button>
              <Link href="/users">
                <a>Пользователи</a>
              </Link>
            </Button>
          </Box>
          <Box className={styles.actions}>
            <Button
              startIcon={
                <Badge badgeContent={`${cartData.length}`} color="error">
                  <LocalMallOutlinedIcon />
                </Badge>
              }>
              <Link href="/cart">
                <a>Корзина</a>
              </Link>
            </Button>
            {userData ? (
              <>
                <Button onClick={handleOpenUserMenu}>
                  <Avatar src={avatar ? '' : ''} alt="Avatar" sx={{ marginRight: '10px' }} />
                  {userData.name}
                </Button>
                <Menu
                  sx={{ mt: '40px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="#">
                        <a>Профиль</a>
                      </Link>
                    </Typography>
                  </MenuItem>
                  {isAdmin && (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link href="#">
                            <a>Админ</a>
                          </Link>
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link href="#">
                            <a>Настройки</a>
                          </Link>
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                  <Divider variant="middle" />
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Выйти</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button startIcon={<AccountCircleOutlinedIcon />}>
                <Link href="/login">
                  <a>Войти</a>
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
