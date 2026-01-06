const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (for demo)
let wfhRequests = [];

/**
 * POST - Submit WFH Request
 */
app.post("/forms", (req, res) => {
  const { employeeId, date, reason, requestType } = req.body;

  // Validation
  if (!employeeId || !date || !reason) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const newRequest = {
    id: wfhRequests.length + 1,
    employeeId,
    date,
    reason,
    requestType: requestType || "WFH",
    status: "Submitted",
    createdAt: new Date().toISOString()
  };

  wfhRequests.push(newRequest);

  res.status(201).json({
    message: "WFH request submitted successfully",
    data: newRequest
  });
});

/**
 * GET - View all WFH requests (optional)
 */
app.get("/forms", (req, res) => {
  res.json(wfhRequests);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`WFH API running on port ${PORT}`);
});
