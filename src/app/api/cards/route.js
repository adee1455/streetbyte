// Add this to your server.js or appropriate routes file

import express from 'express';
import { query } from '../../../lib/db.js';

const router = express.Router();

// Define the /api/cards endpoint
router.get('/api/cards', async (req, res) => {
  try {
    const vendors = await query({
      query: "SELECT * FROM vendors",
    });

    // Fetch images for each vendor
    const vendorsWithImages = await Promise.all(vendors.map(async (vendor) => {
      const images = await query({
        query: "SELECT image_url FROM VendorImages WHERE vendor_id = ?",
        values: [vendor.id],
      });
      const menu = await query({
        query: "SELECT image_url FROM MenuImages WHERE vendor_id = ?",
        values: [vendor.id],
      })
      return { ...vendor, images: images.map(img => img.image_url), menu: menu.map(menu => menu.image_url) };
    }));

    return res.json(vendorsWithImages); // Send JSON response
  } catch (e) {
    console.error(e); // Log the error for debugging
    return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
  }
});

export default router;