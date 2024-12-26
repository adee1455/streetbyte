
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VendorPage from "../../components/VendorPage";
import { MenuItem } from "../../types";
import { Review } from "../../types";

interface Vendor {
  name: string;
  description: string;
  address: string;
  contact_number: string;
  rating: number;
  foodType: string;
  images: { image_url: string }[];
  menu: MenuItem[];
  reviews: Review[];
}

export default function VendorDetails() {
  // const { id: vendorId } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  console.log("Vendor ID:", id);
  
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_VENDOR_PUBLIC_API_URL}`
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorDetails();
  }, [id]);

  if (loading) return <div>Loading vendor details...</div>;
  if (!vendor) return <div>Vendor not found</div>;

  return (
    <VendorPage
      name={vendor.name}
      description={vendor.description}
      address={vendor.address}
      contact_number={vendor.contact_number}
      rating={vendor.rating.toString()}
      foodType={vendor.foodType}
      images={vendor.images}
      menu={vendor.menu}
      reviews={vendor.reviews}
    />
  );
}
