import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
export default function AddressForm() {
    const btnstyle = {
        width : "110px ",
        display : "block",
        margin : "10px  auto"
    }
    const handlesumbit = ()=>{
        let address1 = document.getElementById("address1").value
        let address2 = document.getElementById("address2").value
        let city = document.getElementById("city").value
        let state = document.getElementById("state").value
        console.log(localStorage.getItem('auth'))

        const apiUrl = 'http://127.0.0.1:8001/createdetail';
        const requestData = {
            auth:localStorage.getItem('auth'),
            address1 : address1,
            address2:address2,
            city:city,
            state:state
        
        };
        fetch(apiUrl, {
            method: 'POST',  // Use the appropriate HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json;  charset=utf-8',  // Set the content type
            },
            body: JSON.stringify(requestData),  // Convert data to JSON string
            }).then(response => response.json()) 
            .then(data => {

                localStorage.setItem('ship',data.detail)
            })
        console.log(address1,address2,city,state.value)
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
     
      <Grid container spacing={3}>
    
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>

     
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={btnstyle}
              onClick={handlesumbit}
            >
              Sign In
            </Button>
      </Grid>
    </React.Fragment>
  );
}