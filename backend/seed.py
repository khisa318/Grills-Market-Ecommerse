import os
from app import create_app, db
from app.models import User, Product
from werkzeug.security import generate_password_hash

def seed_database():
    print("Initializing database seeding pipeline...")
    
    # 1. Clear out any existing data to prevent unique constraints/duplicate errors
    db.drop_all()
    db.create_all()
    print("Database schema dropped and re-initialized cleanly.")

    # 2. Seed Users (Admin & Standard Customer)
    # Using werkzeug to securely generate the password hashes
    admin_user = User(
        email="admin@grillwebsite.com",
        password_hash=generate_password_hash("AdminMaster2026!"),
        is_admin=True
    )
    
    regular_user = User(
        email="backyardcook@gmail.com",
        password_hash=generate_password_hash("LetUsSmoke123!"),
        is_admin=False
    )
    
    db.session.add(admin_user)
    db.session.add(regular_user)
    print("Security Roles injected: Admin & Customer identities created.")

    # 3. Seed Premium Grills & Accessories
    grills_and_gear = [
        Product(
            slug="weber-searwood-600",
            brand="Weber",
            name="Searwood 600 Smart Pellet Grill",
            price=899.00,
            tag="Pellet",
            description="The flagship 2026 smart pellet engine replacing old generation models. Delivers flawless rapid heating, robust heavy smoke distribution, and dynamic direct-flame searing controls up to 600°F.",
            image_url="https://images.unsplash.com/photo-1555939594-58d7cb561ad1", # Sample clean food/grill asset fallback
            features="RapidTemp Digital Control, Direct Flame Searing Zone, 20lb Sealed Hopper, Wi-Fi Smart Diagnostics"
        ),
        Product(
            slug="camp-chef-woodwind-pro",
            brand="Camp Chef",
            name="Woodwind Pro 36 Pellet Smoker",
            price=1499.00,
            tag="Pellet",
            description="Engineered explicitly for deep pitmaster profile smoke infusion. Features an innovative dedicated lower Smoke Box allows you to burn authentic lump charcoal or clean wood chunks side-by-side with your standard pellets.",
            image_url="https://images.unsplash.com/photo-1608756687911-a1510af36be2",
            features="Integrated Lump Charcoal Smoke Box, SideKick Gas Burner Compatible, Utility Storage Shelf, Color Touch PID Controller"
        ),
        Product(
            slug="kamado-joe-konnected",
            brand="Kamado Joe",
            name="Konnected Joe Digital Ceramic Grill",
            price=1999.00,
            tag="Charcoal",
            description="A premium 18-inch insulated heavy-wall ceramic egg that seamlessly blends ancestral charcoal cooking with digital air-flow automation. Maintains highly consistent operational temperatures over 12+ hour cooks.",
            image_url="https://images.unsplash.com/photo-1544025162-d76694265947",
            features="Kontrol Fan Automatic Ventilation, Automatic Fire Starter Element, Multi-Tier Divide & Conquer System, Heavy Duty Air Lift Hinge"
        ),
        Product(
            slug="pit-boss-850-dx",
            brand="Pit Boss",
            name="850 DX Navigator Smoker",
            price=549.00,
            tag="Pellet",
            description="The reigning budget value master for expansive backyard smoke sessions. Packs a heavy steel frame with 840 square inches of primary rack estate and double-wall structural insulation profiles.",
            image_url="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
            features="840 Sq In Total Cooking Grid, Sliding Flame Broiler Plate, Porcelain-Coated Cast Iron Grates"
        ),
        Product(
            slug="premium-hickory-pellets-20lb",
            brand="GrillMaster",
            name="100% All-Natural Hickory Wood Pellets (20lb Bag)",
            price=18.99,
            tag="Accessories",
            description="Ultra-low ash generation wood fuel composition. Imbues traditional rich bold southern barbecue flavor notes perfectly suited for beef briskets, short ribs, and thick cut pork shoulders.",
            image_url="https://images.unsplash.com/photo-1594007654729-407ededc414a",
            features="Zero Fillers or Binders, Consistent Heat Output, Heavy-Gauge Resealable Moisture Proof Bag"
        )
    ]

    db.session.add_all(grills_and_gear)
    db.session.commit()
    print("Inventory injection completed successfully! 5 records stored.")
    print("--- Seeding Script Finished Cleanly ---")

if __name__ == "__main__":
    # Initialize the flask app instance context wrapper to safely access database configurations
    app = create_app()
    with app.app_context():
        seed_database()