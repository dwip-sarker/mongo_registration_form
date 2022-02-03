// dependency
const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const Register = require('./models/registerSchema');

// initialization
const app = express();
const port = 3000;
const templatesPath = path.join(__dirname, '../templates/views/');
const partials = path.join(__dirname, '../templates/partials/');
// setup view engine
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partials);

// Serving static files in Express
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {
    const { password } = req.body;
    const { confirmpassword } = req.body;
    try {
        if (password === confirmpassword) {
            const UsersData = new Register({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                userEmail: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmpassword,
            });
            await UsersData.save();
            res.status(201).render('index');
        } else {
            res.send('password not matching');
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const { password } = req.body;
        const findUser = await Register.findOne({ userEmail: email });
        if (findUser.password == password) {
            res.status(201).render('index');
        } else {
            res.send('your password is wrong');
        }
    } catch (error) {
        res.status(400).send('error happened');
    }
});

// start the server
app.listen(port, () => {
    console.log(`server listing on port ${port}`);
});
