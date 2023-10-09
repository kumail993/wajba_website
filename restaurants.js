const express = require('express');
const router = express.Router();
const db = require('./server.js');

// Define a route to fetch restaurant names and IDs
router.route('/restaurants').get((req, res) => {
  const sql = 'SELECT resturant_id, resturant_name FROM restaurant';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database query error: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Query result:', result); // Add this line for debugging

      // Check if the result is empty (no restaurants found)
      if (result.length === 0) {
        res.status(404).json({ error: 'No restaurants found' });
      } else {
        const restaurants = result.map((row) => ({
          restaurant_id: row.resturant_id,
          restaurant_name: row.resturant_name,
        }));
        res.status(200).json({ restaurants });
      }
    }
  });
});

module.exports = router;
