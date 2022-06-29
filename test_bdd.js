const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://root:KEZDF39brN7Wb9X8@cluster0.enh9t.mongodb.net/?retryWrites=true&w=majority', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
