require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const morgan = require("morgan");
const commissionRoutes = require("./routes/commisionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const sellingRoutes = require("./routes/sellingRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/commissions", commissionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/sales", sellingRoutes);

// Database Sync
db.sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
