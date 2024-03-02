import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';

export default function Members() {
    const [result, setResult] = useState(null);
    const [tax, setTax] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const { username } = location.state;

    const handleCalculate = () => {
        // Validate the input
        if (!tax || isNaN(parseFloat(tax)) || parseFloat(tax) <= 0) {
            setErrorMessage('Please enter a valid positive number for the salary.');
            return;
        }

        const grossSalary = parseFloat(tax); // Convert the entered tax to a number

        // Function to calculate tax deduction, EPF, ETF, and take-home salary
        const calculateTax = (grossSalary) => {
            // Tax brackets and rates
            const taxBrackets = [
                { min: 0, max: 100000, rate: 0 },
                { min: 100001, max: 141667, rate: 6 },
                { min: 141668, max: 183333, rate: 12 },
                { min: 183334, max: 225000, rate: 18 },
                { min: 225001, max: 266667, rate: 24 },
                { min: 266668, max: 308333, rate: 30 },
                { min: 308334, max: Infinity, rate: 36 }
            ];

            // EPF/ETF rates
            const epfRate = 12; // Employer contribution rate for EPF
            const etfRate = 8; // Employee (member) contribution rate for EPF
            const employerContributionRate = 3; // Employer contribution rate for ETF

            // Calculate EPF and ETF contributions
            const epfContribution = (grossSalary * epfRate) / 100;
            const etfContribution = (grossSalary * etfRate) / 100;
            const employerEtfContribution = (grossSalary * employerContributionRate) / 100;

            // Calculate tax deduction
            let taxDeduction = 0;
            let taxGroup = null;
            for (const bracket of taxBrackets) {
                if (grossSalary > bracket.min) {
                    const taxableAmount = Math.min(grossSalary, bracket.max) - bracket.min;
                    taxDeduction += (taxableAmount * bracket.rate) / 100;
                    taxGroup = `${bracket.min}-${bracket.max}-> ${bracket.rate}`;
                } else {
                    break;
                }
            }

            // Calculate take-home salary
            const takeHomeSalary = grossSalary - taxDeduction - epfContribution - etfContribution - employerEtfContribution;

            return { taxDeduction, takeHomeSalary, taxGroup, epfContribution, etfContribution, employerEtfContribution };
        };

        // Calculate tax based on the entered gross salary
        const calculatedResult = calculateTax(grossSalary);

        // Update the result state
        setResult(calculatedResult);

        // Create the payment object with only name (username) and take-home salary
        const payment = { name: username, amount: calculatedResult.takeHomeSalary };

        // Log the payment object before sending it
        console.log("New tax data:", payment);

        // Send the payment data to the server
        fetch("http://localhost:8080/payment/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment)
        }).then(() => {
            console.log("New tax added");
            setTax('');
            setErrorMessage('');
        });
    };

    return (
        <Box className="fullSize"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <h1>Tax Calculator</h1>
            <Paper elevation={1} style={{ padding: '20px', width: '50vw' }}>
                <Stack spacing={2}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Username"
                        defaultValue={username}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Enter the Salary"
                        variant="outlined"
                        sx={{ margin: '10px' }}
                        value={tax} // Bind the value of the text field to the tax state
                        onChange={(e) => setTax(e.target.value)} // Update the tax state with the entered value
                        error={!!errorMessage}
                        helperText={errorMessage}
                    />
                </Stack>
                <Divider sx={{ margin: '10px' }} />
                <Button
                    sx={{ margin: '10px', width: '300px', height: '50px' }}
                    variant="contained"
                    style={{ backgroundColor: '#7F00FF', color: 'white', width: '50vw' }}
                    onClick={handleCalculate} // Call handleCalculate function when button is clicked
                >
                    Hit! to Calculate
                </Button>
                {result !== null && ( // Display the result if it's not null
                    <div>
                        <h2>Result:</h2>
                        <p>Tax Deduction: {result.taxDeduction}</p>
                        <p>Take-Home Salary: {result.takeHomeSalary}</p>
                        <p>Tax Group: {result.taxGroup}</p>
                        <p>EPF Contribution: {result.epfContribution}</p>
                        <p>ETF Contribution: {result.etfContribution}</p>
                        <p>Employer ETF Contribution: {result.employerEtfContribution}</p>
                    </div>
                )}
            </Paper>
        </Box>
    );
}
