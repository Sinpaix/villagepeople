import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PalveluKortti from './PalveluKortti';
import TextField from '@material-ui/core/TextField';

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const tieto =
  [
    { "id": 1, "data": "eka" },
    { "id": 2, "data": "toka" },
    { "id": 3, "data": "kolmas" },
    { "id": 4, "data": "nelkku" },
    { "id": 5, "data": "viis" },
    { "id": 6, "data": "kuusi" },
  ]

const theme = createTheme();

export default function Palvelut() {

  const [hakuehto, setHakuehto] = useState("");

  const tyhjenna = () =>{
    setHakuehto("");
  }

  const hae = () =>{
    //haetaan hakuehdon mukaiset palvelut
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Palvelut
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="palveluNimi"
              label="Etsi palvelua"
              name="nimi"
              value={hakuehto}
              onChange={(event)=>{setHakuehto(event.target.value)}}
            />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={hae}>Hae palvelut</Button>
              <Button variant="outlined" onClick={tyhjenna}>Tyhjennä</Button>
            </Stack>
          </Container>
        </Box>
        <PalveluKortti data={tieto} />
      </main>
    </ThemeProvider>
  );
}