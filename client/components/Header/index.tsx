import React, { useEffect } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import styles from './Header.module.scss';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectUserData } from '../../redux/slices/user';
import { destroyCookie } from 'nookies';

export const Header: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const avatar = false;

  const handleLogout = () => {
    destroyCookie(null, 'ozonaToken', null);
    dispatch(logout());
    setAnchorElUser(null);
  };

  return (
    <AppBar classes={{ root: styles.root }} position="static">
      <Container>
        <Toolbar classes={{ root: styles.toolbar }} disableGutters>
          <Link href="/">
            <a className={styles.logo}>OZONA</a>
          </Link>
          <div className={styles.menu}>
            <Link href="/catalog">
              <a>
                <Button>Каталог</Button>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Button>Контакты</Button>
              </a>
            </Link>
            <Link href="#">
              <a>
                <Button>О нас</Button>
              </a>
            </Link>
            <Link href="/users">
              <a>
                <Button>Пользователи</Button>
              </a>
            </Link>
          </div>
          <div className={styles.actions}>
            {userData ? (
              <>
                <Button onClick={handleOpenUserMenu}>
                  <img
                    className={styles.avatar}
                    src={avatar ? '' : '/assets/images/avatar.png'}
                    alt="Avatar"
                  />
                  {userData.name}
                </Button>
                <Menu
                  sx={{ mt: '45px' }}
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
                  <Divider variant="middle" />
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Выйти</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link href="/cart">
                  <a>
                    <Button>
                      <Badge badgeContent={99} color="error">
                        <LocalMallOutlinedIcon />
                      </Badge>
                      Корзина
                    </Button>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <Button>
                      <AccountCircleOutlinedIcon /> Войти
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
