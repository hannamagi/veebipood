import { Request, Response, Router } from "express";
import Arve from "../models/arve";
import Arverida from "../models/arverida";
import Maksestaatus from "../models/maksestaatus";
import Klient from "../models/klient";
import arve from "../models/arve";

const router: Router = Router();

router.get("/arve", async (req: Request, res: Response) => {
    try {
        const arve = await Arve.find()
            .populate("arverida")
            .populate("maksestaatus")
            .populate("klient");

        res.json(arve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/arve", async (req: Request, res: Response) => {
    try {
        const { kuupäev, kogusumma } = req.body;
        const uusArverida = await new Arverida({
            toode: req.body.arverida.toode,
            kogus: req.body.arverida.kogus
        })
        const uusMaksestaatus = await new Maksestaatus({
            makseviis: req.body.maksestaatus.makseviis,
            kuupäev: req.body.maksestaatus.kuupäev
        })
        const uusKlient = await new Klient({
            nimi: req.body.klient.nimi,
            aadress: req.body.klient.aadress,
            kontaktandmed: req.body.klient.kontaktandmed
        })
        await uusArverida.save();
        await uusMaksestaatus.save();
        await uusKlient.save();

        const arve = new Arve({
            kuupäev,
            uusArverida,
            kogusumma,
            uusMaksestaatus,
            uusKlient,

        });
        const uusArve = await arve.save();
        res.json(uusArve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/arve/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudArve = await Arve.findByIdAndDelete(req.params.id);
        const arve = await Arve.find()
            .populate("arverida")
            .populate("maksestaatus")
            .populate("klient");
        if (!kustutatudArve) {
            return res.status(404).json({ error: 'Arvet ei leitud' });
        }
        res.json(arve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/arve/:id", async (req: Request, res: Response) => {
    try {
        const { kuupäev, arverida, kogusumma, maksestaatus, klient } = req.body;
        const uusArve = await Arve.findByIdAndUpdate(req.params.id, { kuupäev, arverida, kogusumma, maksestaatus, klient }, { new: true })
            .populate("arverida")
            .populate("maksestaatus")
            .populate("klient");
        if (!uusArve) {
            return res.status(404).json({ error: 'Arvet ei leitud' });
        }
        res.json(uusArve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;