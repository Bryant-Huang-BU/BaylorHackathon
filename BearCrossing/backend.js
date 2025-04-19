const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const logs = [];
app.use(cors());
app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded form data

app.post('/log', (req, res) => {
    const { message } = req.body; 
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    //console.log(message);
    logs.push({ timestamp: new Date().toISOString(), message });
    //console.log(logs)
    res.json({ success: true });
});

app.get('/logs', (req, res) => {
    console.log(logs);
    res.json(logs);
});

app.get('/flag', (req, res) => {
    const  token = req.query.key;
    //console.log(token)
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    if (token !== 'adminadminadmin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const flag = process.env.FLAG || 'FLAG{this_is_a_fake_flag}';
    res.json({ flag });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

window.onload = function () {
    fetch("http://localhost:3000/logs")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then(data => {
            const tableBody = document.querySelector("#logsTable tbody");
            tableBody.innerHTML = ""; 

            // Populate the table with fetched data
            data.forEach(log => {
                const row = document.createElement("tr");

                const timestampCell = document.createElement("td");
                timestampCell.textContent = log.timestamp;
                row.appendChild(timestampCell);

                const messageCell = document.createElement("td");
                messageCell.textContent = log.message;
                row.appendChild(messageCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching logs:", error);
        });

    // Fetch the flag
    fetch("http://localhost:3000/flag?key=adminadminadmin")
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then(flag => {
            localStorage.setItem("FLAG", flag);
            console.log("FLAG stored in localStorage:", flag);
        })
        .catch(error => {
            console.error("Error fetching flag:", error);
        });
};