import { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataContext } from "../App";
import Dialogi from "./Dialogi";
import moment from 'moment';

const Kortti = ({data, alkuPvm, loppuPvm}) => {

  const {server, login, majoitus, setMajoitus, kayttaja } = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);

  // const [hae, setHae] = useState(0);
  const [asiakas_id, setAsiakas_id] = useState("");
  const [mokki_id, setMokki_id] = useState("");
  const [varattu_alkupvm, setVarattu_alkupvm] = useState("");
  const [varattu_loppupvm, setVarattu_loppupvm] = useState("");


  // Varauksen lisääminen kantaan varaus-tauluun
  useEffect(() => {
    const funktio = () => {
      console.log("useEffect varaus käyttäjälle " + kayttaja)
      const api = server + "/api/varaukset";

      fetch(api, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            asiakas_id: kayttaja, //kirjautuneen käyttäjän ID contextista
            mokki_id: majoitus.a.mokki_id, //mökin ID contextista
            varattu_alkupvm : moment(alkuPvm).format("YYYY-MM-DD 14:00"),
            varattu_loppupvm : moment(loppuPvm).format("YYYY-MM-DD 12:00") 
          })
      })
        .then((res) => {
          // setHae(hae => hae + 1)
          console.log("mokki_id " + majoitus.a.mokki_id)
          setAsiakas_id("");
          setMokki_id("");
          setVarattu_alkupvm("");
          setVarattu_loppupvm("");
          setMajoitus("");
          
        })
        .catch(err => console.log(err))
    }

      if (majoitus != "")
     funktio();
  }, [majoitus, server])

  const varaa = (e) => {
    setMajoitus(e);
    setOpenDialog(() => true)
  }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((a, index) => (
              <Grid item key={a.mokki_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random/?house"
                    alt="majoituskohde"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {a.mokkinimi}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                      {a.nimi}
                    </Typography>
                    <Typography>
                      {a.kuvaus}<br/>
                      Varustelu: {a.varustelu}<br/>
                      Max.hlo: {a.henkilomaara}<br/>
                      Hinta: {a.hinta} €
                    </Typography>
                  </CardContent>
                  <CardActions>
                  {login ?
                  <Button size="small" onClick={(e) => { varaa({a}) }}>Varaa</Button>
                  : null}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialogi open={openDialog} setOpen={setOpenDialog} otsikko={"Varaus onnistui!"} viesti={"Kiitos varauksesta!"} reitti={"/majoitus"} />
        </Container>
    )
}

export default Kortti;