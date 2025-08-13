from flask import Flask, request,jsonify
from models.users import db, User
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



# Get absolute path to 'database' folder
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "eq_app_database.db")

# Make sure the folder exists
os.makedirs(os.path.join(BASE_DIR, "database"), exist_ok=True)
# Init DB

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Welcome to the Flask API!"




@app.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   username = data.get("email")
   password = data.get("password")
   existing_user = User.query.filter_by(email=username, password=password).first();
   print(str(existing_user.firstname))
   user_fullname= existing_user.firstname+ " " + existing_user.lastname;
   if existing_user:
       return jsonify ({"status" : "Success", 
                        "message" : "Login successful",
                        "name" : user_fullname}) 
   else:
       return jsonify ({"status" : "failure" , "message" : "Invalid username or password"}), 401
   

@app.route('/register', methods=['POST'])
def register():
       data = request.get_json()
       email = data.get('email')
       firstname = data.get('firstname')
       lastname = data.get('lastname')
       role = data.get('role')
       
       existing_user = User.query.filter_by(email=email).first()

       if existing_user:
        return jsonify({"error": "Email already exists"}), 409  # 409 Conflict

       new_user = User.create(email = email, firstname = firstname, lastname = lastname,role = role)
       print(new_user)
       return jsonify ({"status" : "success" , "message" : "Login successful"}), 200


       
       
    

if __name__ == '__main__':
    app.run(debug=True) 