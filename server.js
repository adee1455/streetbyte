import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { query } from './src/lib/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Import routes
import vendorRoutes from './src/app/api/vendors.js';
import vendorImagesRoutes from './src/app/api/vendor-images.js';
import menuImagesRoutes from './src/app/api/menu-images.js';
import cardsRoute from './src/app/api/cards/route.js'; // Import cards route
import vendorRoute from './src/app/api/vendorPage/route.js'
// Use routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/vendor-images', vendorImagesRoutes);
app.use('/api/menu-images', menuImagesRoutes);
app.use(cardsRoute); // Add cards route
app.use(vendorRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
