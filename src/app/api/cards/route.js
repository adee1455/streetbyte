import { NextResponse } from "next/server";

import { query } from "../../../lib/db";

export const GET = async (req, res) => {
  try {
    const results = await query({
      query: "SELECT * FROM vendors",
    });

    // Fetch images for each vendor
    const vendorsWithImages = await Promise.all(results.map(async (vendor) => {
      const images = await query({
        query: "SELECT image_url FROM VendorImages WHERE vendor_id = ?",
        values: [vendor.id],
      });
      return { ...vendor, images: images.map(img => img.image_url) };
    }));

    return NextResponse.json(vendorsWithImages);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
};
