const express = require("express");
const db = require("../../db/connection");
const router = express.Router();
const validate = require('../../utils/validate');

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;

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

router.post('/employees', ({ body }, res) => {
    const errors = validate(body, "first_name", "last_name", "role_id", "manager_id");
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

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

router.put('/employees/:id', (req, res) => {
    const errors = validate(req.body, "first_name", "last_name", "role_id", "manager_id");
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE employee SET 
        first_name = ?, last_name = ?, role_id = ?, manager_id = ?
        WHERE id = ?`;
    const params = [req.body.first_name, req.body.last_name, 
        req.body.role_id, req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        }
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
    });
});

module.exports = router;