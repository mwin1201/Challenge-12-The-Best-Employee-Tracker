const express = require("express");
const db = require("../../db/connection");
const router = express.Router();
const validate = require('../../utils/validate');

router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/departments', ({ body }, res) => {
    const errors = validate(body, 'dept_name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [body.dept_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;