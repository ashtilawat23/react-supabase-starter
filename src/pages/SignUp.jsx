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

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setMessage('')
      
      const { error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) throw error
      
      setMessage('Check your email for the confirmation link!')
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
          Create your account
        </Typography>

        <form onSubmit={handleSignUp}>
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
            {isLoading ? 'Creating account...' : 'Sign up'}
          </Button>

          {message && (
            <Typography 
              color={message.startsWith('Error') ? 'error' : 'success.main'}
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
            Already have an account?{' '}
            <MuiLink
              component={Link}
              to="/signin"
              sx={{
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Sign in
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Box>
  )
} 