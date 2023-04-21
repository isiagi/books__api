import express, { Express, Request, Response } from "express";
import booksRouter from './src/routers/booksRouter'
import ordersRouter from './src/routers/orderRouter'
import connectDB from "./src/db/connect";

const app:Express = express();

app.use(express.json())
app.use('/api/v1/book/', booksRouter)
app.use('/api/v1/order/', ordersRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Express + TypeScript Server,there');
})

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Up and Running On http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

