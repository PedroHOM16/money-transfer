import express from "express";
import 'express-async-errors';
import loginRoute from "../routes/loginRoute.js";
import errorHandlerMiddleware from '../middlewares/errorHandlerMiddleware.js';
import registerRoute from "../routes/registerRoute.js";
import cors from 'cors'
import usersRoute from "../routes/usersRoute.js";
import transactionsRoute from "../routes/transactionsRoute.js";

const app = express();
app.use(cors())
app.use(express.json());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/user', usersRoute)
app.use('/transaction', transactionsRoute)

app.use(errorHandlerMiddleware)

export default app;
// module.exports = { app };

// class App {
  //   public express: express.Application | undefined
  
  //   public constructor () {
    //     this.express = express()
    //     this.middlewares()
    //     this.routes()
    //   }
    
    //   private middlewares (): void {
      //     this.express?.use(express.json())
      //     this.express?.use(cors())
      //     this.express?.use(errorHandlerMiddleware)
      //   }
      
      //   private routes (): void {
        //     this.express?.use('/login', loginRoute);
        //     this.express?.use('/register', registerRoute);
        //     this.express?.use('/user', usersRoute)
        //     this.express?.use('/transaction', transactionsRoute)
        //  }
        // }
        // export default new App().express
        
        
        // const express = require('express')
        // const loginRoute = require('../routes/loginRoute');