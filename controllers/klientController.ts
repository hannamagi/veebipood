import {Request, Response, Router} from "express";
import Klient from "../models/klient";
import Aadress from "../models/aadress";
import Kontaktandmed from "../models/kontaktandmed";

const router: Router = Router()

router.get("/klient", async (req: Request, res: Response) => {
    try {
        const klient = await Klient.find()
            .populate("aadress")
            .populate("kontaktandmed");
        res.json(klient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/klient", async (req: Request, res: Response) => {
    try {
        const { nimi, kontaktandmed, aadress } = req.body;
        const aadressObj = await Aadress.findOne(aadress);
        const kontaktandmedObj = await Kontaktandmed.findOne(kontaktandmed);
        const klient = new Klient({
            nimi,
            aadress: aadressObj,
            kontaktandmed: kontaktandmedObj
        });
        const uusKlient = await klient.save();
        res.json(uusKlient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.delete("/klient/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudKlient = await Klient.findByIdAndDelete(req.params.id)
        const klient = await Klient.find()
            .populate("aadress")
            .populate("kontaktandmed");
        if (!kustutatudKlient) {
            return res.status(404).json({ error: 'Klienti ei leitud' });
        }
        res.json(klient)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.put("/klient/:id", async (req: Request, res: Response) => {
    try {
        const { nimi, kontaktandmed, aadress } = req.body;
        const aadressObj = await Aadress.findOne(aadress);
        const kontaktandmedObj = await Kontaktandmed.findOne(kontaktandmed);
        const uusKlient = await Klient.findByIdAndUpdate(req.params.id, { nimi, aadress: aadressObj, kontaktandmed: kontaktandmedObj } , { new: true })
            .populate("aadress")
            .populate("kontaktandmed");
        if (!uusKlient) {
            return res.status(404).json({ error: 'Klienti ei leitud' });
        }
        res.json(uusKlient)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;