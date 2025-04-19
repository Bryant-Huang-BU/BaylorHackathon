const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const SECRET_KEY = 'someunicorns';

function scramble() {
    setInterval(() => {
        console.log("SCRAMBLE!");
        SECRET_KEY = Math.random().toString(36).substring(2, 15);
        console.log(SECRET_KEY);
    }, 10000);
}

app.post('/generate', (req, res) => {
    const  payload  = 
    {
        team: 'Bruiser',
        iswinner: false,
    }; 

    if (!payload) {
        return res.status(400).json({ error: 'Payload is required' });
    }

    const token = jsonwebtoken.sign(payload, SECRET_KEY, { algorithm: 'HS256' });
    console.log(token);
    res.json(token);
});

app.get('/verify', (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const decoded = jsonwebtoken.decode(token);
        
        if (!decoded) {
            return res.status(401).json({ valid: false, error: 'Invalid token' });
        }
        console.log(decoded);
        if (!decoded.team || !decoded.iswinner) {
            return res.status(401).json({ valid: false, error: 'Sorry, not a winner!' });
        }
        else {
            console.log("Winner! " + decoded.team);
            //write to file flag.txt
            const fs = require('fs');
            const flag = decoded.team || 'Bruiser';
            fs.writeFile('flag.txt', flag, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Flag saved to flag.txt');
            });
        }
        res.json({ valid: true, decoded });
    } catch (error) {
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});