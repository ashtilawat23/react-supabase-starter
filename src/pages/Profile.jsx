import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { DashboardLayout } from '../components/DashboardLayout'

export function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    website: '',
    avatar_url: ''
  })

  useEffect(() => {
    if (user) {
      
      setFormData({
        full_name: user.user_metadata?.full_name || '',
        username: user.user_metadata?.username || '',
        website: user.user_metadata?.website || '',
        avatar_url: user.user_metadata?.avatar_url || ''
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')

      console.log('Updating user with data:', formData)

      const { data, error } = await supabase.auth.updateUser({
        data: formData
      })

      console.log('Update response:', data)

      if (error) throw error
      setMessage('Profile updated successfully!')
    } catch (error) {
      console.error('Update error:', error)
      setMessage('Error updating profile: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600, mb: 4 }}
          >
            Profile Settings
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Avatar URL"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Paper>
      </Container>

      <Snackbar 
        open={!!message} 
        autoHideDuration={6000} 
        onClose={() => setMessage('')}
      >
        <Alert 
          severity={message.startsWith('Error') ? 'error' : 'success'}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  )
} 