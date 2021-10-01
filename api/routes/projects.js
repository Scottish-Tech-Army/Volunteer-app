import express from 'express';
const router = express.Router();
import data from '../data.js';

router.get('/', (req, res) => {
    res.json(data);
});

export default router;