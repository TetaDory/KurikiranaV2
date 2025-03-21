from app import db, app  # adjust this import to match your project structure

with app.app_context():
    db.drop_all()
    db.create_all()
    print("Database has been reset — all tables dropped and recreated.")
