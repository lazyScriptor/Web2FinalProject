import TextField from '@mui/material/TextField';
import './Login.css';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); // Import useNavigate hook

    // Simulate fetching students data from API
    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then(result => {
                setStudents(result);
            });
    }, []);

    const handleClick1 = () => {
        // Find the student with the entered username
        const foundStudent = students.find(student => student.username === username);

        // If no student found, display "No user exists"
        if (!foundStudent) {
            alert("No user exists");
            return;
        }

        // If no student found or password doesn't match, display login failed
        if (!foundStudent || foundStudent.password !== password) {
            alert("Login failed");
        } else {
            // Navigate to Dashboard route with username as a route parameter
            navigate('/Dashboard', { state: { username: username } });

        }
    }

    const handleClick2 = () => {
            navigate('/Members');
    }

    
    
    return (
        <div className='container'>
            <div className="login-left">
                <div className="content">
                    <h1 style={{ color: 'black' }}>Login form</h1>
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                    <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="outlined" onClick={handleClick1}>Login</Button>
                    <Button variant="outlined" onClick={handleClick2}>Sign in</Button>
                </div>
            </div>
        </div>
    );
}
