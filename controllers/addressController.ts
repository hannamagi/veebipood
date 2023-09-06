import {Request, Response, Router} from 'express';
import Aadress from "../models/aadress"

const router: Router = Router()

router.get("/aadress", async (req: Request, res: Response) => {
    const aadressid = await Aadress.find()
    res.json(aadressid)
})

router.post("/aadress", async (req: Request, res: Response) => {
    const { tänav, maja, linn, postiindeks } = req.body;
    try {
        const aadress = new Aadress({
            tänav,
            maja,
            linn,
            postiindeks
        });
        const uusAadress = await aadress.save();
        res.json(uusAadress);
    } catch (error) {
        console.error('Error creating aadress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete("/aadress/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudAadress = await Aadress.findByIdAndDelete(req.params.id)
        const aadressid = Aadress.find()
        if (!kustutatudAadress) {
            return res.status(404).json({ error: 'Aadressi ei leitud' });
        }
        res.json(aadressid)
    } catch (error) {
        console.error('Error deleting aadress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put("/aadress/:id", async (req: Request, res: Response) => {
    try {
        const { tänav, maja, linn, postiindeks } = req.body;
        const uusAadress = await Aadress.findByIdAndUpdate(req.params.id, { tänav, maja, linn, postiindeks } , { new: true })
        if (!uusAadress) {
            return res.status(404).json({ error: 'Aadressi ei leitud' });
        }
        res.json(uusAadress)
    } catch (error) {
        console.error('Error updating aadress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;