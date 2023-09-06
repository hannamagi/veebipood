import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import toodeController from "./controllers/toodeController";
import maksestaatusController from "./controllers/maksestaatusController";
import aadressController from "./controllers/aadressController";
import kategooriaController from "./controllers/kategooriaController";
import kontaktandmedController from "./controllers/kontaktandmedController";
import klientController from "./controllers/klientController";
import arveController from "./controllers/arveController";
import arveridaController from "./controllers/arveridaController";

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

mongoose.connect("mongodb+srv://saartauri:suemasuema@cluster0.xlqpkpr.mongodb.net/VeeebiPood");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use("/", toodeController)
app.use("/", maksestaatusController)
app.use("/", aadressController)
app.use("/", kategooriaController)
app.use("/", kontaktandmedController)
app.use("/", klientController)
app.use("/", arveController)
app.use("/", arveridaController)

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});