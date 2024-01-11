const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM posts', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error.',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data successfully retrieved.',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
 router.post('/store', [

    //validation
    body('userId').notEmpty(),
    body('id').notEmpty(),
    body('title').notEmpty(),
    body('body').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        userId: req.body.userId,
        id: req.body.id,
        title: req.body.title,
        body: req.body.body
    }

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error.',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Data successfully inserted.',
                data: rows[0]
            })
        }
    })

});

module.exports = router;