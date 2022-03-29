import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
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
import { SERVER } from '../../utils/constants';

export const Header: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  <Avatar
                    src={userData.avatar ? `${SERVER}/user/avatar/${userData.avatar}` : ''}
                    alt="Avatar"
                    sx={{ marginRight: '10px' }}
                  />
                  {userData.name}
                </Button>
                <Menu
                  classes={{ list: styles.submenu }}
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
                  <Link href="/profile">
                    <a>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Профиль</Typography>
                      </MenuItem>
                    </a>
                  </Link>
                  {userData?.role?.[0].value === 'ADMIN' && (
                    <>
                      <Link href="/users">
                        <a>
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Пользователи</Typography>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href="/create">
                        <a>
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Товары</Typography>
                          </MenuItem>
                        </a>
                      </Link>
                      <Link href="/categories">
                        <a>
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Категории</Typography>
                          </MenuItem>
                        </a>
                      </Link>
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
