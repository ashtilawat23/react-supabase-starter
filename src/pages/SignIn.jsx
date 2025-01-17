import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider,
  Link as MuiLink
} from '@mui/material'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setMessage('')
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      
      // Successful sign in will trigger the auth state change
      // and redirect through the AuthProvider
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // Subtract header height
        backgroundColor: 'background.default',
        padding: 3
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600 }}
        >
          Sign in to your account
        </Typography>

        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            type="email"
            label="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {message && (
            <Typography 
              color="error" 
              variant="body2" 
              align="center" 
              sx={{ mb: 2 }}
            >
              {message}
            </Typography>
          )}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Typography align="center" variant="body2">
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              to="/signup"
              sx={{
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Sign up
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Box>
  )
} 