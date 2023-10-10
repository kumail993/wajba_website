// Import required modules
const express = require('express');
const router = express.Router();
const db = require('./server.js'); // Import your database connection configuration

// Define a route to fetch restaurant reviews and user full names
router.get('/reviews', (req, res) => {
  const query = `
    SELECT review_customer.*, customer_details.full_name
    FROM review_customer
    INNER JOIN customer_details ON review_customer.user_id = customer_details.user_id
  `;

  // Execute the SQL query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the results as JSON response
    res.status(200).json(results);
  });
});

// Export the router to be used in your application
module.exports = router;
