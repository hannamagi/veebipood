import {Request, Response, Router} from 'express';
import Toode from '../models/toode';
import Kategooria from '../models/kategooria';

const router: Router = Router()

router.get("/toode", async (req: Request, res: Response) => {
    const tooted = await Toode.find().populate('kategooria')
    res.json(tooted)
})

router.post("/toode", async (req: Request, res: Response) => {
    const {nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg} = req.body;
    try {
        const uusKategooria = await Kategooria.create({
            nimetus: kategooria.nimetus
        });

        const uusToode = await Toode.create({
            nimetus,
            kategooria: uusKategooria._id,
            hind,
            pildiURL,
            aktiivne,
            laokogus,
            vananemisaeg
        });

        res.json(uusToode);
    } catch (error) {
        console.error('Error creating toode:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});








router.delete("/toode/:id", async (req: Request, res: Response) => {
    try {
        const kustutatudToode = await Toode.findByIdAndDelete(req.params.id)
        const tooted = await Toode.find()
        if (!kustutatudToode) {
            return res.status(404).json({ error: 'Toodet ei leitud' });
        }
        res.json(tooted)
    }
    catch (err) {
        res.json(err)
    }
})

router.put('/toode/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const  {nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg } = req.body;
        const updatedToode = await Toode.findByIdAndUpdate(id, { nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg }, { new: true });
        if (!updatedToode) {
            return res.status(404).json({ error: 'Toodet ei leitud' });
        }
        res.json(updatedToode);
    } catch (error) {
        console.error('Error updating toode data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;