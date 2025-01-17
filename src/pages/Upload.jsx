import { useState } from 'react'
import { 
  Container, 
  Paper, 
  Typography, 
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  CheckCircle as CheckCircleIcon,
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'
import { DashboardLayout } from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export function Upload() {
  const { user } = useAuth()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [successDialog, setSuccessDialog] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const handleUpload = async () => {
    try {
      setUploading(true)
      setMessage('')
      const uploaded = []

      for (const file of files) {
        const filePath = `${user.id}/${file.name}`
        
        const { error } = await supabase.storage
          .from('starter')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) throw error
        uploaded.push(file.name)
      }

      setUploadedFiles(uploaded)
      setSuccessDialog(true)
      setMessage('Files uploaded successfully!')
      setFiles([]) // Clear files after successful upload
    } catch (error) {
      console.error('Upload error:', error)
      setMessage('Error uploading files: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600, mb: 4 }}
          >
            Upload Documents
          </Typography>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 3,
              mb: 3,
              textAlign: 'center'
            }}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                component="span"
                variant="outlined"
                startIcon={<UploadIcon />}
                sx={{ mb: 2 }}
              >
                Select Files
              </Button>
            </label>
            
            <Typography variant="body2" color="text.secondary">
              Drag and drop files here or click to select
            </Typography>
          </Box>

          {files.length > 0 && (
            <>
              <List>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveFile(index)}
                        disabled={uploading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <FileIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={file.name}
                      secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    />
                  </ListItem>
                ))}
              </List>

              {uploading && <LinearProgress sx={{ my: 2 }} />}

              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={uploading}
                startIcon={<UploadIcon />}
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </>
          )}
        </Paper>
      </Container>

      <Dialog 
        open={successDialog} 
        onClose={() => setSuccessDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1
        }}>
          <CheckCircleIcon color="success" />
          Upload Successful
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            The following files have been uploaded:
          </Typography>
          <List dense>
            {uploadedFiles.map((fileName, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FileIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={fileName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setSuccessDialog(false)}
            variant="contained"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

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