import React, { useState, useContext } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { Menu, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/styles';
import useStyles from './navStyles';

import { ColorModeContext } from '../../utils/ToggleColorMode';

import { Sidebar, Search } from '../route';

function Navbar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useContext(ColorModeContext);

  return (
    <>
      {/* <AppBar position="fixed" sx={{ bgcolor: '#D9008D' }}> */}
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevState) => !prevState)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <div className={classes.searchBar}>{!isMobile && <Search />}</div>

          <div />
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawePaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
