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


// TODO remove, this demo shouldn't need to reset the theme.


export default function Album() {
  const [order,setOrder] = React.useState([]); 
  let arr = []
  const cartstyle = {
    display: "block",
    margin : "20px  auto"
  }
  const fetchData = ()=>{
        const apiUrl = 'http://127.0.0.1:8001/getorder';
        const requestData = {
          auth: localStorage.getItem('auth')
        
        };

        
        fetch(apiUrl, {
        method: 'GET',  // Use the appropriate HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json;  charset=utf-8',  // Set the content type
            'auth' : localStorage.getItem('auth')
        },
         // Convert data to JSON string
        })
        .then(response => response.json()) 
        .then(data =>{
            setOrder(data); 
            console.log(data)
        })


      }
      useEffect(()=>{
          fetchData(); 
      },[])
        

  return (
    <>
    {order?.map((element)=>{
        
      return(
        <Card sx={{ maxWidth: 335 }} style={cartstyle}>
              <CardActionArea>
          
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.Update}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.Price} ₹
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.item} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.Address1} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.Address2} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>)
      
  })}
  </>
  );
}