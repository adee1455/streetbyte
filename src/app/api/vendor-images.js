import express from 'express';
import { query } from '../../lib/db.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, vendor_id, image_url } = req.body;

  try {
    await query({
      query: "INSERT INTO VendorImages (id, vendor_id, image_url) VALUES (?, ?, ?)",
      values: [id, vendor_id, image_url],
    });

    return res.json({ message: 'Image added successfully' });
  } catch (error) {
    console.error('Error adding vendor image:', error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;

