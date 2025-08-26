// index.js

const express = require('express');
const cors = require('cors'); // Import thư viện cors
const app = express();
const port = 3000;

// Sử dụng middleware cors
app.use(cors());

// Các middleware và route khác của bạn
app.use(express.json());

// Định nghĩa route cho endpoint get-flash-sale
const getFlashSale = require('./get-flash-sale');
const placeOrder = require('./place-order');
app.get('/get-flash-sale', getFlashSale);
app.post('/place-order', placeOrder);

// Endpoint ví dụ khác
app.get('/', (req, res) => {
  res.send('Xin chào, đây là server Node.js của tôi!');
});

// Lắng nghe các request tại port đã định nghĩa
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});