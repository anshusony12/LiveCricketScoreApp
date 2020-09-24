import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { getMatchDetail } from '../api/Api';

const MyCard = ({match})=>{
    const [detail, setDetail] = useState({});
    const [open, setOpen] = useState(false);
    const handleClick = (id)=>{
      getMatchDetail(id).then(data=>{console.log("MATCH_DATA",data);
      setDetail(data);
      handleOpen();
    }).catch(error=>console.log(error));
    }
    const getMatchesCard = ()=>{
        return(
            <Card style={{marginTop:20}} >
                <CardContent>
                    <Grid container justify="center" spacing={4} alignItems="center">
                        <Grid item>
                            <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                            <img style={{width:80}} src={require("../images/ver.png")} alt="vs"></img>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{match["team-2"]}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center">
                        <Button onClick={()=>{
                            handleClick(match.unique_id);
                        }} variant="outlined" color="primary">Show Details</Button>
                        <Button style={{marginLeft:5}} variant="contained" color="primary">
                        START TIME {new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Grid>
                </CardActions>
            </Card>
        );  
    }
    const handleClose=()=>{
      setOpen(false);
    }
    const handleOpen = ()=>{
      setOpen(true);
    }
    const getDialog = ()=>{
        return(
            <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-detail">Match Details...</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  <Typography>{detail.stat}</Typography> 
                  <Typography>
                      Match <span style={{fontStyle:"italic", fontWeight:"bold"}}>{detail.matchStarted ? "Started" : "Still Not Started"}</span>
                  </Typography>
                  <Typography>
                      Score <span style={{fontStyle:"italic", fontWeight:"bold"}}>{detail.score}</span>
                  </Typography>
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>
                  Close
              </Button>
          </DialogActions>
        </Dialog>
        );
    } 
    return (
        <>
        {getMatchesCard()}
        {getDialog()}
        </> 
    );
}

export default MyCard;