import {Request, Response, Router} from "express";
import Kontaktandmed from "../models/kontaktandmed";

const router: Router = Router()

router.get ("/kontaktandmed", async (req: Request, res: Response) => {
    const kontaktandmed = await Kontaktandmed.find()
    res.json(kontaktandmed)
})

router.post ("/kontaktandmed", async (req: Request, res: Response) => {
    try {
        const {telefoninumber, email} = req.body
        const kontaktandmed = new Kontaktandmed({
            telefoninumber, email
        })
        const uusKontaktandmed = await kontaktandmed.save()
        res.json(uusKontaktandmed)
    }
    catch (err) {
        res.json(err)
    }
})

router.delete ("/kontaktandmed/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudKontaktandmed = await Kontaktandmed.findByIdAndDelete(req.params.id)
        const kontaktandmed = await Kontaktandmed.find()
        if (!kustutatudKontaktandmed) {
            return res.status(404).json({ error: 'Kontaktandmed not found' });
        }
        res.json(kontaktandmed)
    }
    catch (err) {
        res.json(err)
    }
})

router.put('/kontaktandmed/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { telefoninumber, email } = req.body;
        const updatedKontaktandmed = await Kontaktandmed.findByIdAndUpdate(id, { telefoninumber, email }, { new: true });
        if (!updatedKontaktandmed) {
            return res.status(404).json({ error: 'Kontaktandmed not found' });
        }
        res.json(updatedKontaktandmed);
    }
    catch (err) {
        res.json(err)
    }
})


export default router