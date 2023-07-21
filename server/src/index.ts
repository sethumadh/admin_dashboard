import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config/config';
import kpiRoutes from './routes/kpi';
import productRoutes from './routes/products';
import transactionRoutes from './routes/transaction';
import userRoutes from './routes/user';
import KPI from './models/KPI';
import Product from './models/Product';
import Transaction from './models/Transaction';
import { kpis, products, transactions } from './data/data';
import { Err } from './library/type';
import { globalErrorHandler } from './controllers/errorController';
import { customError } from './utils/customError';

// unhandled exception Error
process.on('uncaughtException', (err: Err) => {
    console.log('->>>>', err.name, err.message);
    console.log('uncaughtException! shutting down.. @ksm');

    process.exit(1);
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes);
app.use('/transaction', transactionRoutes);
app.use('/user', userRoutes);

// catch all other invalid url for page not found

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    // ************** -->> resubale / or use a class customerError

    const error = customError(`cant find ${req.originalUrl}`, 'fail', 404, true);
    next(error);
});

// Global Error handler middleware
app.use(globalErrorHandler);

mongoose.connect(`${config.mongo.url}/admin_dash`, { retryWrites: true, w: 'majority' }).then(async () => {
    app.use(cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });
    console.log('Mongo connected successfully.');
    // const server = app.listen(config.server.port, () => console.log(`Server Port: http://localhost:${config.server.port}`));
    // Add data one time only
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);

    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
});

const server = app.listen(config.server.port, () => console.log(`Server Port: http://localhost:${config.server.port}`));

// unhandled promise rejection
process.on('unhandledRejection', (err: Err) => {
    console.log('->>>>', err.name, err.message);
    console.log('unhandled rejection! shutting down.. @ksm');

    server.close(() => {
        process.exit(1);
    });
});
