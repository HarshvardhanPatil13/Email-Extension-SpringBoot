import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("https://email-extension-springboot-production.up.railway.app/api/email/generate", {
       emailContent,
       tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate eamil reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb:2 }}/>

          <FormControl fullWidth sx={{ mb:2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth>
            {loading ? <CircularProgress size={24}/> : "Generate Reply"}
          </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb:2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
       <Box sx={{ mt: 3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}/>
        
        <Button
          variant='outlined'
          sx={{ mt: 2 }}
          onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to Clipboard
        </Button>
       </Box> 
      )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          href="/email-writer-ext1.zip"
          download
        >
          📥 Get AI Reply Extension (ZIP)
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
            How to Use the Chrome Extension
      </Typography>

          <Box sx={{ mt: 2, mx: 'auto', maxWidth: 700 }}>
            <ol style={{ paddingLeft: '1.2rem' }}>
              <li>Download the ZIP file using the button above.</li>
              <li>Unzip the downloaded file to a folder.</li>
              <li>
                Open the Chrome Extensions page by either:
                <ul style={{ marginTop: '4px', paddingLeft: '1.2rem' }}>
                  <li>Click the <strong>⋮ (three-dot menu)</strong> → <strong>Extensions</strong> → <strong>Manage Extensions</strong></li>
                  <li>Or type <code>chrome://extensions</code> in the address bar</li>
                </ul>
              </li>
              <li>Enable <strong>Developer mode</strong> (toggle on top-right).</li>
              <li>Click on <strong>Load unpacked</strong>.</li>
              <li>Select the folder where you unzipped the extension.</li>
              <li>Open Gmail, select an email and click <strong>Reply</strong>, then click the <strong>“AI Reply”</strong> button that appears in the reply toolbar.</li>
            </ol>
          </Box>


    </Container>
  )
}

export default App