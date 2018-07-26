import express from 'express';
import { findOrCreateUser, newThought, deleteThought } from '../controllers';

const router = express.Router();

router.route('/fetch-user')
  .post(findOrCreateUser);

router.route('/new-thought')
  .post(newThought);

router.route('/delete-thought')
  .delete(deleteThought);




export default router;