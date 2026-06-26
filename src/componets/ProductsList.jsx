import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  // Hardcoded premium product data matching your live application screenshots
  const featuredProducts = [
    {
      id: "weber-spirit-ii-e310",
      brand: "WEBER",
      name: "Weber Spirit II E-310 3-Burner Gas Grill",
      price: 579.00,
      tag: "NEW ARRIVAL",
      rating: 5,
      reviewCount: 124,
      description: "A backyard workhorse. Porcelain-enameled cast-iron grates, GS4 ignition and three stainless burners deliver 30,000 BTU of eve...",
      features: [
        "3 Burners",
        "30,000 BTU",
        "424 sq in",
        "Propane",
        "10-yr warranty"
      ],
      // Standard open-source high-quality placeholders or local assets folder pathing
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "traeger-pro-575",
      brand: "TRAEGER",
      name: "Traeger Pro 575 Wood Pellet Grill",
      price: 899.99,
      tag: "BEST SELLER",
      rating: 5,
      reviewCount: 124,
      description: "WiFIRE-enabled pellet smoker with D2 direct drive. Hits 500°F for searing and holds low and slow within ±5°F.",
      features: [
        "575 sq in",
        "180-500°F",
        "WiFIRE",
        "Hopper 18 lb",
        "Pellet"
      ],
      imageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "big-green-egg-large",
      brand: "BIG GREEN EGG",
      name: "Big Green Egg – Large Kamado",
      price: 1199.00,
      tag: "ICONIC",
      rating: 5,
      reviewCount: 124,
      description: "Ceramic insulation locks in heat and moisture for grilling, smoking and baking on one cooker.",
      features: [
        "262 sq in",
        "Ceramic",
        "Lump charcoal",
        "Lifetime warranty",
        "Made in USA"
      ],
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "oklahoma-joes-highland",
      brand: "OKLAHOMA JOE'S",
      name: "Oklahoma Joe's Highland Offset Smoker",
      price: 499.99,
      tag: "PITMASTER",
      rating: 5,
      reviewCount: 124,
      description: "Heavy 3mm steel cook chamber, professional temperature gauge and a true offset firebox for authentic Texas-style smoke.",
      features: [
        "900 sq in",
        "3mm steel",
        "Offset firebox",
        "Charcoal/Wood",
        "Mod-ready"
      ],
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}