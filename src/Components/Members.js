import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Divider, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function Members() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState(''); //const [state, setState] = useState(initialState);
    const [password, setPassword] = useState('');
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const student = { name, address, username, password };


    const handleClick = (e) => {
        //Prevent traditional way like form refresh after submit the form data
        e.preventDefault();
        
        // empty check
        if (!username || !password) {
            window.alert('Username and password are required');
            return;
        }

        
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)//JSON.stringify() converts JavaScript objects into JSON strings suitable for transmitting over the network
        }).then(() => {
            console.log("New student added");
            window.alert('Member added successfully');
            setName('');
            setAddress('');
            setUsername('');
            setPassword('');
            setTimeout(() => {
                setMessage('');
            }, 3000); // Clear the message after 3 seconds
        });
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    return (
        <Box className="fullSize"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <p style={{ color: 'red' }}>{message}</p> 
            <h1 className='header'>Member Registration Form</h1>
            <Paper elevation={1} style={{ padding: '20px', width: '50vw' }}>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-basic"
                        label="Member Name"
                        variant="outlined"
                        sx={{ margin: '10px' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Member's Address"
                        variant="outlined"
                        sx={{ margin: '10px' }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Username Address"
                        variant="outlined"
                        sx={{ margin: '10px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        sx={{ margin: '10px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Divider sx={{ margin: '10px' }} />
                <Button
                    sx={{ margin: '10px', width: '300px', height: '50px' }}
                    variant="contained"
                    style={{ backgroundColor: '#7F00FF', color: 'white' }}
                    onClick={handleClick}
                >
                    Register now
                </Button>
            </Paper>

            <h1 className='header'>Members</h1>

            <Box display="flex" justifyContent="center" width="100%">
                {students
                    
                    .map(student => (
                        <Paper key={student.id} sx={{ margin: '10px' }} elevation={3} style={{ padding: '20px', marginBottom: '10px', width: '30%' }}>
                            <p>Name: {student.name}</p>
                            <p>Address: {student.address}</p>
                        </Paper>
                    ))}
            </Box>
        </Box>
    );
}
