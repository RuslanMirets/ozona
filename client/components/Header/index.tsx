import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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

  const isAuth = false;

  return (
    <AppBar classes={{ root: styles.root }} position="static">
      <Container>
        <Toolbar disableGutters>
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
                  <Badge badgeContent={99} color="error">
                    <LocalMallOutlinedIcon />
                  </Badge>
                  Корзина
                </a>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuth ? (
              <>
                <Button
                  className={styles.menuBtn}
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  Username
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Профиль</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
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
