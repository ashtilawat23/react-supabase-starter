import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error.message)
    }
  }

  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'white',
        height: '8vh'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          Your App
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <Button
              onClick={handleSignOut}
              variant="outlined"
              color="error"
            >
              Sign out
            </Button>
          ) : (
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
} 