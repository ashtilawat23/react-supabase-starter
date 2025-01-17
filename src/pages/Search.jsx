import { useState, useEffect } from 'react'
import { 
  Container, 
  Paper, 
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { DashboardLayout } from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  Delete as DeleteIcon
} from '@mui/icons-material'

export function Search() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetchFiles()
  }, [user])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.storage
        .from('starter')
        .list(user.id + '/', {
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error

      // Transform the data for the DataGrid
      const transformedData = data.map(file => ({
        id: file.id,
        name: file.name,
        size: formatFileSize(file.metadata.size),
        type: file.metadata.mimetype,
        created: new Date(file.created_at).toLocaleString(),
        url: supabase.storage
          .from('starter')
          .getPublicUrl(`${user.id}/${file.name}`).data.publicUrl
      }))

      setFiles(transformedData)
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDelete = async (fileId, fileName) => {
    try {
      setLoading(true)
      const { error } = await supabase.storage
        .from('starter')
        .remove([`${user.id}/${fileName}`])

      if (error) throw error

      // Update the UI by removing the deleted file
      setFiles(prev => prev.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error deleting file:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { 
      field: 'name', 
      headerName: 'File Name', 
      flex: 2,
      renderCell: (params) => (
        <a 
          href={params.row.url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {params.value}
        </a>
      )
    },
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'created', headerName: 'Upload Date', flex: 1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete file">
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(params.row.id, params.row.name)
            }}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    }
  ]

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
            Search Documents
          </Typography>

          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={files}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              loading={loading}
              components={{
                LoadingOverlay: LinearProgress,
              }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none'
                }
              }}
            />
          </Box>
        </Paper>
      </Container>
    </DashboardLayout>
  )
} 