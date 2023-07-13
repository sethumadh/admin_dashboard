import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config/config';
import kpiRoutes from './routes/kpi';
import KPI from './models/KPI';
import { kpis } from './data/data';

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
    // app.use('/', (req, res) => {
    //     res.json('hello');
    // });
app.use('/kpi', kpiRoutes);

mongoose
    .connect(`${config.mongo.url}/admin_dash`, { retryWrites: true, w: 'majority' })
    .then(async () => {
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
        app.listen(config.server.port, () => console.log(`Server Port: http://localhost:${config.server.port}`));
        // Add data one time only
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
    })
    .catch((e) => {
        console.log(e, 'Connection to Mongo Unsuccessful');
        process.exit(1);
    });
