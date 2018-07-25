import express from 'express';
import { findOrCreateUser, newThought } from '../controllers';

const router = express.Router();

router.route('/fetch-user')
  .post(findOrCreateUser);

router.route('/new-thought')
  .post(newThought);


export default router;