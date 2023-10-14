import express from 'express';
import { signin, signup, verify } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/verify:token', verify);

export default router;