import {Request, Response, Router} from "express";
import Maksestaatus from "../models/maksestaatus";

const router: Router = Router()

router.get ("/maksestaatus", async (req: Request, res: Response) => {
    const maksestaatused = await Maksestaatus.find()
    res.json(maksestaatused)
})

router.post ("/maksestaatus", async (req: Request, res: Response) => {
    try {
        const {makseseisund, maksmiseTähtaeg, makstudSumma, maksmiseKuupäev} = req.body
        const maksestaatus = new Maksestaatus({
            makseseisund, maksmiseTähtaeg, makstudSumma, maksmiseKuupäev
        })
        const uusMaksestaatus = await maksestaatus.save()
        res.json(uusMaksestaatus)
    }
    catch (err) {
        res.json(err)
    }
})

router.delete ("/maksestaatus/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudMaksestaatus = await Maksestaatus.findByIdAndDelete(req.params.id)
        const maksestaatused = await Maksestaatus.find()
        if (!kustutatudMaksestaatus) {
            return res.status(404).json({ error: 'Maksestaatus not found' });
        }
        res.json(maksestaatused)
    }
    catch (err) {
        res.json(err)
    }
})

router.put('/maksestaatus/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const  {makseseisund, maksmiseTähtaeg, makstudSumma, maksmiseKuupäev } = req.body;
        const updatedMaksestaatus = await Maksestaatus.findByIdAndUpdate(id, { makseseisund, maksmiseTähtaeg, makstudSumma, maksmiseKuupäev }, { new: true });
        if (!updatedMaksestaatus) {
            return res.status(404).json({ error: 'Maksestaatus not found' });
        }
        res.json(updatedMaksestaatus);
    } catch (error) {
        console.error('Error updating maksestaatus data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;