import { NextResponse } from 'next/server';
import { query } from '../../lib/db'; // Adjust the path as necessary

export const POST = async (req) => {
  const { vendor_id, image_url } = await req.json();

  try {
    await query({
      query: "INSERT INTO MenuImages (vendor_id, image_url) VALUES (?, ?)",
      values: [vendor_id, image_url],
    });

    return NextResponse.json({ message: 'Menu image added successfully' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

