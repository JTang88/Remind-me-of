import express from 'express';
import { findOrCreateUser, newThought, deleteThought, updateThought } from '../controllers';

const router = express.Router();

router.route('/fetch-user')
  .post(findOrCreateUser);

router.route('/thought')
  .post(newThought)
  .put(updateThought)
  .delete (deleteThought);




export default router;