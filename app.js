require("dotenv").config();
const express = require('express')
const cors = require('cors');
const path = require('path'); 
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 8080;

const app = express();

//DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).catch(error => {
    console.error(error.message);
});

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use(cors({
    origin : true,
    credentials: true,
}));

//all the back-end routes
app.use('/api', routes);

//serve the static files (css/images)
app.use(express.static(path.join(__dirname, 'dist/my-app')))


app.get('/created_tasks', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});
app.get('/assigned_tasks', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});
app.get('/completed_tasks', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});
app.get('/login', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});
app.get('/create_task', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
});

app.listen(PORT)
console.log(`App started on port ${PORT}`)
