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
            <Link href="/catalog">
              <a>
                <Button>Каталог</Button>
              </a>
            </Link>
            <Link href="/users">
              <a>
                <Button>Пользователи</Button>
              </a>
            </Link>
          </Box>
          <Box className={styles.actions}>
            <Link href="/cart">
              <a>
                <Button
                  startIcon={
                    <Badge badgeContent={`${cartData.length}`} color="error">
                      <LocalMallOutlinedIcon />
                    </Badge>
                  }>
                  Корзина
                </Button>
              </a>
            </Link>
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
                    <Link href="#">
                      <a>
                        <Typography textAlign="center">Профиль</Typography>
                      </a>
                    </Link>
                  </MenuItem>
                  {isAdmin && (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link href="#">
                          <a>
                            <Typography textAlign="center">Админ</Typography>
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link href="#">
                          <a>
                            <Typography textAlign="center">Настройки</Typography>
                          </a>
                        </Link>
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
              <Link href="/login">
                <a>
                  <Button startIcon={<AccountCircleOutlinedIcon />}>Войти</Button>
                </a>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
