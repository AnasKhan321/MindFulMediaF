import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function ActionAreaCard(prop) {
  const billstyle = {
    textAlign : "center",
    fontWeight : "bold",
    fontSize : "25px "
  }
  let local = localStorage; 
  let listt = []; 
  let bill = 0 ; 
  for (const [key, value] of Object.entries(local)) {
    console.log(`${key}: ${value}`);
    if(key == 'user' || key == 'auth' || key=='ship' || key=='bill'){
      console.log('thi')
    }
    else{
      const ob = {}; 
      let price = parseInt(value.slice(0,4))
      let qty = parseInt(value.slice(6))
      let p = price * qty ; 
      bill+=p ; 
      ob.Name = key ; 
      ob.qty = value; 
      ob.price = p ; 
      console.log(ob)
      listt.push(ob)
    }
  }

  localStorage.setItem('bill' , bill)
  console.log(listt)
  const cartstyle = {
    margin : "25px  auto ",
    display:"block"
  }
  const btnstyle = {
    display: "block",
    margin : "0 auto"
  }
  const navigate = useNavigate(); 
  const takeorder = ()=>{
    let sh = localStorage.getItem('ship')
    if(sh== 'save'){
        let i = JSON.stringify(listt)
        const apiUrl = 'http://127.0.0.1:8001/takeorder';
        const requestData = {
            auth:localStorage.getItem('auth'),
            item : i,
            price : localStorage.getItem('bill')
        };
    
        fetch(apiUrl, {
          method: 'POST',  // Use the appropriate HTTP method (POST, GET, etc.)
          headers: {
              'Content-Type': 'application/json;  charset=utf-8',  // Set the content type
          },
          body: JSON.stringify(requestData),  // Convert data to JSON string
          })
          .then(response => response.json())
          .then(data => {
            let user = localStorage.getItem('user'); 
            let auth = localStorage.getItem('auth'); 
            let ship = localStorage.getItem('ship'); 
            console.log(user,auth,ship)
            localStorage.clear(); 
            localStorage.setItem('user',user)
            localStorage.setItem('auth',auth)
            localStorage.setItem('ship',ship)

            console.log(data)
            prop.SetType('success')
            prop.Setmessage('Your order has been succesfully')
            navigate('/')
            setTimeout(()=>{
              prop.SetType('')
              prop.Setmessage('')
            },5000)
            
          })
    }
    else{
      navigate('checkout')
    }
    
  }
  return (
   
   <>
    {listt.map((element)=>{
        
        return(
          <Card sx={{ maxWidth: 335 }} style={cartstyle}>
                <CardActionArea>
            
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {element.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {element.qty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {element.price}₹
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>)
        
    })}

    <p style={billstyle}> Your Bill is Total Ruppes of : {bill}₹ </p>
    <Button variant="contained" style={btnstyle} onClick={takeorder}>Order Now</Button>
 </>
 
  );
}