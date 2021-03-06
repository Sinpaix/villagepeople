import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PalveluKortti from './PalveluKortti';
import TextField from '@material-ui/core/TextField';
import { DataContext } from "../App";
import AlueDropBox from './AlueDropBox';


const theme = createTheme();

export default function Palvelut() {

  const { server } = useContext(DataContext);
  const [hae, setHae] = useState(0);
  const [palvelut, setPalvelut] = useState([]);
  const [toimipaikat, setToimipaikat] = useState([]);
  const [alueId, setAlueId] = useState("");
  const [hakuehto, setHakuehto] = useState("");

  const tyhjenna = () =>{
    setHakuehto("");
  }

  // *****JOS EHTII, NIIN VAIHDAN TÄHÄN VIELÄ ALUEHAUN MUKAAN*****

    // Toimipisteiden hakeminen tietokannasta droppivalikkoa varten
  //   useEffect(()=>{
  //     fetch(server + "/api/toimipisteet")
  //     .then(response => response.json())
  //     .then((data) => {
  //         console.log(data);
  //         setToimipaikat(data)})
  //     .catch(err => console.log(err));
  // }, [server])



   // Palvelut tietokannasta hakuehdoilla
   useEffect(() => {
    fetch(server + "/api/palvelut/kortit" + "?nimi=" + hakuehto)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setPalvelut(data)
      })
      .catch(err => console.log(err));
  }, [hae, hakuehto, server])


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  // const palveluHaku = (event) =>{
  //   // setHakuehto(hakuehto);
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 0,
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
            {/* <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat}/> */}

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
              {hakuehto ?
              <Button variant="outlined" onClick={tyhjenna}>Tyhjennä</Button>
              : null}
            </Stack>
          </Container>
        </Box>
        <PalveluKortti data={palvelut} />
      </main>
    </ThemeProvider>
  );
}