import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  Dashboard as DashboardIcon,
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'

const DRAWER_WIDTH = 240

export function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            zIndex: 100
          },
        }}
      >
        <Box 
          sx={{ 
            overflow: 'auto', 
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',
            justifyContent: 'space-between'
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/upload">
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItemButton>
            </ListItem>
          </List>

          <Box>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/profile"
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: 'background.default',
          minHeight: '90vh'
        }}
      >
        {children}
      </Box>
    </Box>
  )
} 