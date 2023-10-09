const express = require('express');
const router = express.Router();
const db = require('./server.js');

// Define a route to fetch restaurant names and IDs
router.get('/restaurant/:restaurantId/menu', (req, res) => {
  var { restaurantId } = req.params;
  console.log(restaurantId);

  if (restaurantId.startsWith(':')) {
    restaurantId = restaurantId.substring(1); // Remove the first character (the colon)
  }

  // Define your SQL query to include the price column
  const sqlQuery = `
    SELECT c.category_name, m.menu_name, m.menu_price, m.menu_image
    FROM category c
    JOIN menu m ON c.category_id = m.category_id
    WHERE c.restaurant_id = ?
  `;

  // Use the connection pool to execute the query
  db.query(sqlQuery, [restaurantId], (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Process the results to group menu items by category with price
      const menuByCategory = {};

      results.forEach((row) => {
        const { category_name, menu_name, menu_price,menu_image } = row;

        if (!menuByCategory[category_name]) {
          menuByCategory[category_name] = [];
        }

        menuByCategory[category_name].push({ menu_name, menu_price,menu_image });
      });

      // Send the grouped menu items as JSON
      res.json(menuByCategory);
    }
  });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('./server.js');

// // Define a route to fetch restaurant names and IDs
// router.get('/restaurant/:restaurantId/menu', (req, res) => {
//   var { restaurantId } = req.params;
//   console.log(restaurantId);

//   if (restaurantId.startsWith(':')) {
//     restaurantId = restaurantId.substring(1); // Remove the first character (the colon)
//   }

//   // Define your SQL query
//   const sqlQuery = `
//   SELECT c.category_name, m.menu_name, m.menu_price
//   FROM category c
//   JOIN menu m ON c.category_id = m.category_id
//   WHERE c.restaurant_id = ?
// `;
//   // Use the connection pool to execute the query
//   db.query(sqlQuery, [restaurantId], (error, results) => {
//     if (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       // Process the results to group menu items by category with price
//       const menuByCategory = {};
  
//       results.forEach((row) => {
//         const { category_name, menu_name, price } = row;
  
//         if (!menuByCategory[category_name]) {
//           menuByCategory[category_name] = [];
//         }
  
//         menuByCategory[category_name].push({ menu_name, price });
//       });
  
//       // Send the grouped menu items as JSON
//       res.json(menuByCategory);
//     }
//   });
// });

// module.exports = router;
