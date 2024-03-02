import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate hook
import teamImage from "../../Images/team.jpeg"; // Import member.png image
import taxImage from "../../Images/tax.jpeg"; // Import member.png image
import paymentImage from "../../Images/payment.jpg"; // Import member.png image
import "./Dashboard.css"



export default function ActionAreaCard() {
    //retrieve the usernadme from the react dom
    const location = useLocation();
    const { username } = location.state;

    


    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClick1 = () => {
        // Navigate to "/TaxCal" page when the first card is clicked
        navigate("/TaxCal", { state: { username: username } });
        console.log('First card clicked');
    };

    const handleClick2 = () => {
        // Navigate to "/Members" page when the second card is clicked
        navigate("/Members");
        console.log('Second card clicked');
    };

    const handleClick3 = () => {
        // Navigate to "/Members" page when the third card is clicked
        navigate("/Payments");
        console.log('Third card clicked');
    };

    return (
        <Box className="fullSize">
            <br/><br/><h1 className='heading'> Welcome, {username}!</h1> 
        <Box  className="container"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Adjust height as needed
        >
            
            <Card sx={{ maxWidth: 345, margin: '0 8px' }}>
                <CardActionArea onClick={handleClick1}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={taxImage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Tax Calculator
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Calculate Tax with ETF/EPF and many more tax deductions
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345, margin: '0 8px' }}>
                <CardActionArea onClick={handleClick2}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={teamImage} // Use imported image
                        alt="Member Registration"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Member Registrations
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This is the member registration space where you can register your username and password
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345, margin: '0 8px' }}>
                <CardActionArea onClick={handleClick3}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={paymentImage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Payment History
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            You can observe the payments made by the members
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            
        </Box>
        
        </Box>
    );
}
