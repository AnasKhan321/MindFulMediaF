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
    const navigate = useNavigate()
    console.log(prop)
    const [book,setBook] = React.useState([]); 
    const [count, setCount] = React.useState(false);

    const fetchData = (ele)=>{
        fetch(`http://127.0.0.1:8001/categorybooks/${ele}`)
        .then((res) => res.json())
        .then((data) => {
            setBook(data)
            prop.progress(100); 
       
        });
    }
    useEffect(()=>{
        fetchData(prop.element);
        document.getElementsByTagName('header')[0].style.visibility = 'visible'; 
        
  

    },[])

    let item = document.getElementById('auth')
    item?.addEventListener('click',()=>{
            localStorage.clear(); 
            navigate('/login')
            
   })
   const handleClick = (e)=>{
    let name = document.getElementById(`${e.target.id}name`).innerHTML
    let price = document.getElementById(`${e.target.id}price`).innerHTML
    let qty = 
    document.getElementById(`${e.target.id}qty`).innerHTML = parseInt( document.getElementById(`${e.target.id}qty`).innerHTML )+1; 
    localStorage.setItem(name,`${price}X${document.getElementById(`${e.target.id}qty`).innerHTML }`)

   }

   const handleClick2 = (e)=>{
    console.log(document.getElementById(`${e.target.id.slice(1)}qty`).innerHTML[0])
    let ud = e.target.id.slice(1)

    if(parseInt( document.getElementById(`${e.target.id.slice(1)}qty`).innerHTML[0])== 0) {
      
      let name = document.getElementById(`${ud}name`).innerHTML
        localStorage.removeItem(name)
    }
    else{
        
        let name = document.getElementById(`${ud}name`).innerHTML
        let price = document.getElementById(`${ud}price`).innerHTML
        document.getElementById(`${e.target.id.slice(1)}qty`).innerHTML = parseInt( document.getElementById(`${e.target.id.slice(1)}qty`).innerHTML )-1; 
         localStorage.setItem(name,`${price}X${document.getElementById(`${ud}qty`).innerHTML }`)

    }

   }

  return (
    <>
    <Container style={{ display: 'flex'  ,justifyContent: 'space-around' , flexWrap  : 'wrap'}}>

    {book.map((ele,index)=>{
      return (<Card sx={{ maxWidth: 345, margin:"40px 0px " }} key={ele?.Name}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="350"
            image={`http://127.0.0.1:8001/static/${ele?.url_img}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" id={`${index}name`}>
              {ele?.Name} 
            </Typography>
            <Typography gutterBottom variant="h7" component="div" id={`${index}price`}>
               {ele?.Price}₹
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            {ele?.Category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {ele?.Summary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" className="cart" id={index} onClick={handleClick}>
          Add To Cart 
         
          </Button>
          <Button size="small" color="primary" className="cart" id={`${index}qty`}>
        
        0 
      </Button>
      <Button size="small" color="primary" className="cart" id={`m${index}`} onClick={handleClick2}>
        
        Remove From Cart 
      </Button>
        </CardActions>
      </Card>
       )
    })}
    </Container>

    

   
    </>
  );
}