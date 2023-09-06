import {Request, Response, Router} from "express";
import Kategooria from "../models/kategooria";

const router: Router = Router()

router.get("/kategooria", async (req: Request, res: Response) => {
    const kategooriad = await Kategooria.find()
    res.json(kategooriad)
})

router.post("/kategooria", async (req: Request, res: Response) => {
    const { nimetus } = req.body;
    try {
        const kategooria = new Kategooria({
            nimetus
        });
        const uusKategooria = await kategooria.save();
        res.json(uusKategooria);
    } catch (error) {
        console.error('Error creating kategooria:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete("/kategooria/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const kategooria = await Kategooria.findByIdAndDelete(id);
        if (!kategooria) {
            return res.status(404).json({ error: 'Kategooria not found' });
        }
        res.json(kategooria);
    }
    catch (err) {
        res.json(err)
    }
})

router.put('/kategooria/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nimetus } = req.body;
        const updatedKategooria = await Kategooria.findByIdAndUpdate(id, { nimetus }, { new: true });
        if (!updatedKategooria) {
            return res.status(404).json({ error: 'Kategooria not found' });
        }
        res.json(updatedKategooria);
    }
    catch (err) {
        res.json(err)
    }
})

export default router;