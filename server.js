// Import necessary libraries
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
// Create an Express application
const app = express();

//adding cors
// Add CORS middleware
app.use(cors());

// Set up middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Create a PostgreSQL connection pool
// postgres://postgres_zkf4_user:vi77Z6xsbiWerxnTfO2fujxBlR4Xxi9z@dpg-cnmaovi1hbls739fqf8g-a.singapore-postgres.render.com/student_db_j80f
const pool = new Pool({
  // user: "usertest",
  // host: "dpg-coiljsdjm4es739qiqe0-a.singapore-postgres.render.com",
  // database: "dbtest_l2yo",
  // password: "QYukQhkR4j7hZ8uzn7jQBWPa2eFGG7c8",

  user: "postgres_zkf4_user",
  host: "dpg-cnmaovi1hbls739fqf8g-a.singapore-postgres.render.com",
  database: "student_db_j80f",
  password: "vi77Z6xsbiWerxnTfO2fujxBlR4Xxi9z",
  port: 5432, // or your PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Set this to true if your server uses a self-signed certificate
  },
});

// Attempt to connect to the database
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  // If connected successfully, log a message
  console.log("Connected to the database");

  // Release the client to the pool
  done();

  // Start the server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// ####################################CRUD USERS#############################

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const query =
      "INSERT INTO Users (firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [firstName, lastName, email, password, phone];
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    const result = await pool.query(query);
    res.json({ success: true, users: result.rows });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const query = "SELECT * FROM Users WHERE id = $1";
    const values = [userId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res.json({ success: true, user: result.rows[0] });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Update user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password, phone } = req.body;
    const query =
      "UPDATE Users SET firstName = $1, lastName = $2, email = $3, password = $4, phone = $5 WHERE id = $6 RETURNING *";
    const values = [firstName, lastName, email, password, phone, userId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res.json({ success: true, user: result.rows[0] });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const query = "DELETE FROM Users WHERE id = $1 RETURNING *";
    const values = [userId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "User not found" });
    } else {
      res.json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ############################### PRODUCTS ######################################
// Endpoint to get all products
// Endpoint to get all products
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, product_name, product_price, product_quantity, product_status, created_at, updated_at, created_by, updated_by, CONCAT('/images/', product_image) as product_image FROM public.products"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
