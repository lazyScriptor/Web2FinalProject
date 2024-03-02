import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {  Paper } from '@mui/material';
import './Payments.css'

export default function BasicButtons() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/payment/getAll")
      .then(res => res.json())
      .then(result => {

        
        // Format amount field to display only two decimal places
        const formattedPayments = result.map(payment => ({
          ...payment,
          amount: parseFloat(payment.amount).toFixed(2)
        }));


        setPayments(formattedPayments); // Set payments state with fetched data
      })
      .catch(error => {
        console.error('Error fetching payment data:', error);
      });
  }, []);


  return (
    <Box className="fullSize">
      <h1>Payment History</h1>
      <Box display="flex" justifyContent="center" width="100%">
        {payments.map(payment => (
          <Paper key={payment.id} sx={{ margin: '10px' }} elevation={3} style={{ padding: '20px', marginBottom: '10px', width: '20%' }}>
            <p>Take-home salary: {payment.amount}</p>
            <p>Date: {payment.date}</p>
            <p>Time: {payment.time}</p>

          </Paper>
        ))}
      </Box>
    </Box>
  );
}
