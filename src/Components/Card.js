import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState, useEffect } from "react";
import { Container, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";

const MyComponent = React.memo(({ value }) => {
  console.log('Rendering MyComponent');
  return (
    <div>
      <p>Value: {value}</p>
    </div>
  );
});


export default function MultiActionAreaCard(prop) {
    const navigate = useNavigate();

    const [book,setBook] = React.useState([]); 
    const [count, setCount] = React.useState(false);
    const fetchData = ()=>{
        fetch("http://127.0.0.1:8001/allbooks")
        .then((res) => res.json())
        .then((data) => {
            setBook(data)
            prop.progress(100)
       
        });
    }
    useEffect(()=>{
        fetchData(); 
    },[])

    let token = localStorage.getItem('auth')
    if(token == null || token== undefined){
        navigate('login')
    }

    let item = document.getElementById('auth')
    item?.addEventListener('click',()=>{
            localStorage.clear(); 
            navigate('/login')
   })

   useEffect(() => {
    document.getElementsByTagName('header')[0].style.visibility = 'visible'; 
    }, [])
   
   

  return (
    <>
    <Container style={{ display: 'flex'  ,justifyContent: 'space-around' , flexWrap  : 'wrap'}}>

    {book.map((ele,index)=>{
      return (<Card sx={{ maxWidth: 345, margin:"40px 0px " }} key={ele?.Name}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image={`http://127.0.0.1:8001/static/${ele?.url_img}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {ele?.Name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            {ele?.Category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {ele?.Summary.slice(0,100)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

        </CardActions>
      </Card>
       )
    })}
    </Container>

    

   
    </>
  );
}