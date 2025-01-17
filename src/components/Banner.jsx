import { Typography, Paper, Box, Container } from '@mui/material'

export function Banner() {
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              marginBottom: 3,
              color: 'text.primary',
              lineHeight: 1.2
            }}
          >
            Welcome to Your App
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Your awesome tagline goes here
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
} 