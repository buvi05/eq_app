from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"  # Matches your table name

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, nullable=False)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<User {self.firstname} {self.lastname} ({self.email})>"
    @classmethod
    def create(cls, email, firstname, lastname, role):
        """Create a new user and save it to the database."""
        user = cls(
            email=email,
            firstname=firstname,
            lastname=lastname,
            role=role
        )
        db.session.add(user)
        db.session.commit()
        return user
    

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "role": self.role
        }