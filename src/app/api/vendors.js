import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export const POST = async (req) => {
  const vendor = await req.json();
  // Insert vendor into the database
  await query({
    query: "INSERT INTO vendors (id, name, description, address, contact_number, rating, foodType) VALUES (?, ?, ?, ?, ?, ?, ?)",
    values: [vendor.id, vendor.name, vendor.description, vendor.address, vendor.contact_number, vendor.rating, vendor.foodType],
  });

  return NextResponse.json({ message: 'Vendor added successfully' });
};
