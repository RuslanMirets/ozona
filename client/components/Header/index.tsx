import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/actions/auth';
import { SERVER } from '../../utils/constants';
import Divider from '@mui/material/Divider';

export const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const { cartData } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar classes={{ root: styles.header }} position="static">
      <Container>
        <Toolbar classes={{ root: styles.toolbar }} disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Link href="/">
              <a>OZONA</a>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href="/cart">
                    <a>Корзина</a>
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link href="/">
              <a>OZONA</a>
            </Link>
          </Typography>
          <Box
            sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            <Button
              className={styles.menuBtn}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link href="/cart">
                <a>
                  <Badge badgeContent={`${cartData.length}`} color="error">
                    <LocalMallOutlinedIcon />
                  </Badge>
                  Корзина
                </a>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <>
                <Button
                  className={styles.menuBtn}
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  <div className={styles.avatar}>
                    <img
                      src={
                        userData.avatar
                          ? `${SERVER}/upload/avatar/${userData.avatar}`
                          : '/assets/images/avatar.png'
                      }
                      alt="avatar"
                    />
                  </div>
                  {userData.name}
                </Button>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
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
                  <MenuItem>
                    <Link href="/profile">
                      <a>
                        <Typography textAlign="center">Профиль</Typography>
                      </a>
                    </Link>
                  </MenuItem>
                  {userData.role === 'admin' && (
                    <div style={{paddingBottom: '6px'}}>
                      <MenuItem>
                        <Link href="/users">
                          <a>
                            <Typography textAlign="center">Пользователи</Typography>
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href="/create">
                          <a>
                            <Typography textAlign="center">Продукты</Typography>
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href="/categories">
                          <a>
                            <Typography textAlign="center">Категории</Typography>
                          </a>
                        </Link>
                      </MenuItem>
                    </div>
                  )}
                  <Divider variant="middle" />
                  <MenuItem onClick={handleLogout} style={{marginTop: '6px'}}>
                    <Typography textAlign="center">Выйти</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                className={styles.menuBtn}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link href="/login">
                  <a>
                    <AccountCircleOutlinedIcon />
                    Войти
                  </a>
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
