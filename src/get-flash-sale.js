// get-flash-sale.js

const { Pool } = require('pg');

// Cấu hình kết nối đến PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mypassword',
  port: 5432,
});

// Middleware để xử lý request
const getFlashSale = async (req, res) => {
  try {
    const query = 'SELECT * FROM flash_sale';
    const result = await pool.query(query);
    res.json({data: result.rows});
  } catch (err) {
    console.error('Lỗi khi truy vấn:', err.stack);
    res.status(500).send('Lỗi máy chủ nội bộ');
  }
};

module.exports = getFlashSale;