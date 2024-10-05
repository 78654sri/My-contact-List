const express = require('express');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assests'))); 
// Contact list data
var contact_List = [
    { name: "Arpan5", phone: "46678322" },
    { name: "Arpan4", phone: "2228322" },
    { name: "Arpan2", phone: "5644422" },
    { name: "Arpan1", phone: "7588322" }
];

// Routes
app.get('/', (req, res) => {
    return res.render('home', {
        title: "My Contacts List",
        contact_List: contact_List
    });
});




app.get('/delete-contact/', (req, res) => {
    const phone = req.query.phone; 
    const index = contact_List.findIndex(contact => contact.phone === phone);

    if (index !== -1) {
        contact_List.splice(index, 1);
    }
    return res.redirect('back');
});

app.get('/practice', (req, res) => {
    return res.render('practice', { title: "Let's play with EJS" });
});



app.post('/create-contact', (req, res) => {
    contact_List.push(req.body);
    return res.redirect('back');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
