import {Request, Response, Router} from "express";
import Arverida from "../models/arverida"
import Toode from "../models/toode";

const router: Router = Router()

router.get("/arverida", async (req: Request, res: Response) => {
    const arveread = Arverida.find().populate("toode")
    res.json(arveread)
})

router.post("/arverida", async (req: Request, res: Response) => {
    try {
        const {kogus} = req.body
        const uusToode = await new Toode({
            nimetus: req.body.toode.nimetus,
            hind: req.body.toode.hind
        })
        await uusToode.save()

        const arverida = new Arverida({
            uusToode,
            kogus
        })
        const uusArverida = await arverida.save()
        res.json(uusArverida)
    }
    catch (err) {
        res.json(err)
    }
})

router.delete("/arverida/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudArverida = await Arverida.findByIdAndDelete(req.params.id)
        if (!kustutatudArverida) {
            return res.status(404).json({ error: 'Arverida ei leitud' });
        }
        res.json({message: "Arverida kustutatud"})
    }
    catch (err) {
        res.json(err)
    }
})

router.put("/arverida/:id", async (req: Request, res: Response) => {
    try {
        const {kogus} = req.body
        const arverida = await Arverida.findByIdAndUpdate(req.params.id, {
            kogus
        })
        if (!arverida) {
            return res.status(404).json({ error: 'Arverida ei leitud' });
        }
        res.json(arverida)
    }
    catch (err) {
        res.json(err)
    }
})

export default router;