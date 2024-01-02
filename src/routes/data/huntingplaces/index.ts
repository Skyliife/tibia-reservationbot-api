import {Router} from "express";


const router = Router();

router.get('/', (req, res) => {
    res.send({msg: 'Hunting places endpoint accessed successfully!'});
});

export default router;