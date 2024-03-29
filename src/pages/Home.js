import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MonumentList from './MonumentList';
import AddItems from './AddItems';
import { Analytics } from '@mui/icons-material';

import {Routes, Route} from 'react-router-dom'
import TicketList from './TicketList';
import Dashboard from './Dashboard';
import { useEffect } from 'react';


import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import AddCircleIcon from '@mui/icons-material/AddCircle';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const sideItems = [
    {
        title:'Dashboard',
        route:'dashboard',
        icon:<Analytics/>
    },
    {
      title:'List',
      route:'viewitems',
      icon:<FormatListNumberedIcon/>
  },
  {
    title:'Tickets',
    route:'viewtickets',
    icon:<InboxIcon />
},
    {
        title:'Add Items',
        route:'additems',
        icon:<AddCircleIcon/>
    },
    

    
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  // backgroundColor:"#8884d8"
}));

export default function Home() {




  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [page, setPage] = React.useState('dashboard')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(async()=>{

  //   const status = await localStorage.getItem("admin-token")
  //   console.log("status==>>",status)
  //   if(status == null){
  //     window.location.href = "/login"
  //     return
  //   }

  // },[])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{backgroundColor:'#8884d8'}} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DIRECTORATE OF ARCHAEOLOGY GOVERNMENT OF GOA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideItems.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={()=> setPage(text.route)}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        
            {/* <Categories/> */}
            {/* {page == 'categories' && <Categories/>} */}
            {page == 'dashboard' && <Dashboard/> }
            {page == 'additems' && <AddItems/>}
            {page == 'viewitems' && <MonumentList/>}
            {page == 'viewtickets' && <TicketList/> }
            
            {/* <Routes>
            <Route exact path='/home/categories' element={<Categories/>} />
            <Route exact path='/additems' element={<AddItems/>} />
            <Route exact path='/viewitems' element={<MonumentList/>} />
            </Routes> */}
            
      </Main>
    </Box>
  );
}
