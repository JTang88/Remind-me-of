import express from 'express';
import { findOrCreateUser, newThought, deleteThought, updateThought, updateReminds } from '../controllers';

const router = express.Router();

router.route('/fetch-user')
  .post(findOrCreateUser);

router.route('/thought')
  .post(newThought)
  .put(updateThought)
  .delete (deleteThought);

router.route('/reminds')
  .put(updateReminds)




export default router;