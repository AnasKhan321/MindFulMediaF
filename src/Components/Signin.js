import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect,useState} from "react"; 
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignIn(prop) {
    console.log(prop)
    const [error,Seterror] = useState('')
    const navigate = useNavigate(); 
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let email = data.get('email')
        let pass1 = data.get('password')
        const apiUrl = 'http://127.0.0.1:8001/login';
        const requestData = {
            loginusername:email,
            loginpass:pass1,
        
        };

        
        fetch(apiUrl, {
        method: 'POST',  // Use the appropriate HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json;  charset=utf-8',  // Set the content type
        },
        body: JSON.stringify(requestData),  // Convert data to JSON string
        })
        .then(response => response.json())  // Parse response as JSON
        .then(data => {
        // Handle the response data here
        console.log(data);
        if(data.error){
          console.error('Error:', error);
          prop.SetType('error'); 
          prop.Setmessage(data.error)

          setTimeout(()=>{
              prop.SetType(''); 
              prop.Setmessage(''); 
          },3000)
        }
        else{
            localStorage.setItem('auth' , data.auth);
            localStorage.setItem('user',data.user) 
            if(data.detail == 'save'){
              localStorage.setItem('ship','save')
            }
            navigate('/')

        }
        
        })
        .catch(error => {
        // Handle errors
      
        });
  };
  useEffect(() => {
    document.getElementsByTagName('header')[0].style.visibility = 'hidden'; 
    }, [])
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Your Name "
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}