const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory database (resets when the server restarts)
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// ----------------------------------------------------
// CRUD Routes
// ----------------------------------------------------

// 1. CREATE: Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1, // Auto-increment ID
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// 2. READ: Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// 3. READ: Get a single user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// 4. UPDATE: Update an existing user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Update only provided fields
    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email
    };

    res.json(users[userIndex]);
});

// 5. DELETE: Remove a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully', deletedUser });
});

// ----------------------------------------------------
// Start the Server
// ----------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});