//IMports
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';
const app = express();

//Middlewares
app.use(bodyParser.json()); // to parse data from body

//Routes
app.use('/api/products', productRoutes);

//Server and database
const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database Conneted'))
    .then(() =>
        app.listen(port, () => console.log('Server is running on:', port))
    )
    .catch((err) => console.error(err));
