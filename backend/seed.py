from app import create_app, db
from app.models import User, Product
from app.utils.security import hash_password


def seed_database():
    print("Rebuilding database from current models...")

    # This intentionally resets local data instead of running migrations.
    db.drop_all()
    db.create_all()
    print("Database schema dropped and recreated.")

    users = [
        User(
            username="admin",
            email="admin@grillwebsite.com",
            password_hash=hash_password("AdminMaster2026!"),
            first_name="Admin",
            last_name="Pitmaster",
            phone="555-0100",
            is_admin=True,
            is_active=True,
        ),
        User(
            username="backyardcook",
            email="backyardcook@gmail.com",
            password_hash=hash_password("LetUsSmoke123!"),
            first_name="Backyard",
            last_name="Cook",
            phone="555-0110",
            is_admin=False,
            is_active=True,
        ),
    ]

    products = [
        Product(
            slug="weber-searwood-600",
            brand="Weber",
            name="Searwood 600 Smart Pellet Grill",
            price=899.00,
            original_price=999.00,
            tag="Pellet",
            category="Pellet Grills",
            description="A smart pellet grill with rapid heating, deep smoke control, and direct-flame searing up to 600 F.",
            image_url="https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
            features="RapidTemp Digital Control, Direct Flame Searing Zone, 20lb Sealed Hopper, Wi-Fi Smart Diagnostics",
            stock_quantity=14,
            sku="WEB-SEAR-600",
            is_active=True,
        ),
        Product(
            slug="camp-chef-woodwind-pro",
            brand="Camp Chef",
            name="Woodwind Pro 36 Pellet Smoker",
            price=1499.00,
            original_price=1599.00,
            tag="Pellet",
            category="Pellet Grills",
            description="A premium pellet smoker with a dedicated smoke box for lump charcoal or wood chunks alongside pellets.",
            image_url="https://images.unsplash.com/photo-1608756687911-a1510af36be2",
            features="Integrated Smoke Box, SideKick Gas Burner Compatible, Utility Storage Shelf, Color Touch PID Controller",
            stock_quantity=8,
            sku="CC-WOOD-PRO-36",
            is_active=True,
        ),
        Product(
            slug="kamado-joe-konnected",
            brand="Kamado Joe",
            name="Konnected Joe Digital Ceramic Grill",
            price=1999.00,
            original_price=None,
            tag="Charcoal",
            category="Kamado Grills",
            description="An insulated ceramic grill that combines charcoal cooking with digital airflow automation.",
            image_url="https://images.unsplash.com/photo-1544025162-d76694265947",
            features="Kontrol Fan Automatic Ventilation, Automatic Fire Starter, Multi-Tier Cooking System, Air Lift Hinge",
            stock_quantity=5,
            sku="KJ-KONNECTED-18",
            is_active=True,
        ),
        Product(
            slug="pit-boss-850-dx",
            brand="Pit Boss",
            name="850 DX Navigator Smoker",
            price=549.00,
            original_price=649.00,
            tag="Pellet",
            category="Pellet Grills",
            description="A value-focused pellet smoker with a heavy steel frame and wide cooking surface for backyard cooks.",
            image_url="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
            features="840 Sq In Cooking Grid, Sliding Flame Broiler Plate, Porcelain-Coated Cast Iron Grates",
            stock_quantity=22,
            sku="PB-850-DX",
            is_active=True,
        ),
        Product(
            slug="premium-hickory-pellets-20lb",
            brand="GrillMaster",
            name="100% All-Natural Hickory Wood Pellets (20lb Bag)",
            price=18.99,
            original_price=None,
            tag="Accessories",
            category="Fuel",
            description="Low-ash hickory pellets for bold barbecue flavor on brisket, ribs, pork, and chicken.",
            image_url="https://images.unsplash.com/photo-1594007654729-407ededc414a",
            features="No Fillers or Binders, Consistent Heat Output, Resealable Moisture Resistant Bag",
            stock_quantity=60,
            sku="GM-HICKORY-20",
            is_active=True,
        ),
    ]

    db.session.add_all(users)
    db.session.add_all(products)
    db.session.commit()

    print("Seeded users:")
    print("  admin@grillwebsite.com / AdminMaster2026!")
    print("  backyardcook@gmail.com / LetUsSmoke123!")
    print(f"Seeded {len(products)} products.")
    print("Database rebuild complete.")


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed_database()
