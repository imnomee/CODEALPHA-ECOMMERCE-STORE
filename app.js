// Imports
import dotenv from 'dotenv'; // Loads environment variables from a .env file
dotenv.config(); // Initialize dotenv
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies
import bodyParser from 'body-parser'; // Middleware for parsing request bodies
import express from 'express'; // Web framework for Node.js
import mongoose from 'mongoose'; // MongoDB object modeling tool
import productRoutes from './routes/product.route.js'; // Routes for product management
import userRoutes from './routes/user.route.js'; // Routes for user management
import orderRoutes from './routes/order.route.js'; // Routes for order management

const app = express(); // Create an instance of Express
// Middleware Configuration
app.use(bodyParser.urlencoded({ extended: true })); // for forms with URL-encoded data
app.use(bodyParser.json()); // Parses incoming JSON requests and puts the parsed data in req.body
app.use(cookieParser()); // Parses cookies attached to the client request

app.set('view engine', 'pug');
app.set('views', './views'); // Specify the directory for your Pug files

//Frontend
app.get('/', (req, res) => {
    return res.render('index');
});

app.get('/products', (req, res) => {
    const products = { a: 'one', b: 'two', c: 'three' };
    return res.render('products', { products });
});
app.get('/products/:id', (req, res) => {
    return res.render('product');
});
app.get('/user/login', (req, res) => {
    return res.render('login');
});
app.get('/user/register', (req, res) => {
    console.log(req.body);
    return res.render('register');
});
app.get('/create/products', (req, res) => {
    return res.render('newProduct');
});

// Route Definitions
app.use('/api/products', productRoutes); // Product management routes
app.use('/api/user', userRoutes); // User management routes
app.use('/api/order', orderRoutes); // Order management routes

// Server and Database Connection
const port = process.env.PORT || 3000; // Set port to the value in environment variables or default to 3000

mongoose
    .connect(process.env.MONGO_URI) // Connect to the MongoDB database using URI from environment variables
    .then(() => console.log('Database Connected')) // Log success message upon connection
    .then(
        () => app.listen(port, () => console.log('Server is running on:', port)) // Start the server and log the port it's running on
    )
    .catch((err) => console.error(err)); // Log any errors that occur during connection
