// place-order.js

const { Pool } = require('pg');

// Cấu hình kết nối đến PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mypassword',
  port: 5432,
});

const placeOrder = async (req, res) => {
  const { flash_sale_id, phone } = req.body;

  if (!flash_sale_id || !phone) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin flash_sale_id hoặc phone.' });
  }

  try {
    // 1. Kiểm tra xem số điện thoại đã tồn tại trong bảng chưa
    const checkQuery = 'SELECT COUNT(*) FROM flash_sale_order WHERE phone = $1 AND flash_sale_id = $2';
    const checkResult = await pool.query(checkQuery, [phone, flash_sale_id]);
    const orderCount = parseInt(checkResult.rows[0].count);

    if (orderCount > 0) {
      return res.status(409).json({ success: false, message: 'Số điện thoại này đã đặt hàng cho sự kiện flash sale này rồi.' });
    }

    // 1. Kiểm tra xem số điện thoại đã tồn tại trong bảng chưa
    const checkConHangQuery = 'SELECT * FROM flash_sale WHERE id = $1';
    const checkConHangResult = await pool.query(checkConHangQuery, [flash_sale_id]);
    const quantity = parseInt(checkConHangResult.rows[0].quantity);

    if (quantity <= 0) {
      return res.status(409).json({ success: false, message: 'Đã hết hàng này' });
    }

    // 2. Nếu chưa tồn tại, thêm bản ghi mới vào bảng
    const insertQuery = 'INSERT INTO flash_sale_order (flash_sale_id, phone) VALUES ($1, $2) RETURNING *';
    await pool.query(insertQuery, [flash_sale_id, phone]);

    const updateQuery = 'UPDATE flash_sale set quantity = quantity - 1 where id = $1';
    await pool.query(updateQuery, [flash_sale_id]);

    res.status(201).json({ success: true, message: 'Đặt hàng thành công!' });
  } catch (err) {
    console.error('Lỗi khi xử lý đặt hàng:', err.stack);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ.' });
  }
};

module.exports = placeOrder;