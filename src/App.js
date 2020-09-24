import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid } from '@material-ui/core';
import Navbar from './components/Navbar';
import MyCard from './components/MyCard';
import {getMatches} from "./api/Api";
function App() {
    const [matches, setMatches] = useState([]);
    useEffect(()=>{
      getMatches().then((data)=> {
        setMatches(data.matches);
        console.log(data.matches);
      }).catch(alert=> alert("Could not load data"));
    },[]);
  return (
    <div className="App">
      <Navbar/>
      <h1>Welcome To My LiveScore App</h1>
      <Grid container>
        <Grid item sm="2"></Grid>
        <Grid item sm="8">
        {
        matches.map((match)=>(
          <>
            {match.type == "Twenty20" ? (<MyCard match={match}/>) : ''}
          </>
        ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
