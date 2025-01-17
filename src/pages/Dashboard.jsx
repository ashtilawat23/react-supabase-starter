import { useAuth } from '../context/AuthContext'
import { 
  Typography, 
  Paper, 
  Container
} from '@mui/material'
import { DashboardLayout } from '../components/DashboardLayout'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Dashboard
          </Typography>
          
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome, {user.email}!
          </Typography>
          
          <Typography variant="body1">
            You're signed in and ready to go.
          </Typography>
        </Paper>
      </Container>
    </DashboardLayout>
  )
} 