const express = require('express');
const router = express.Router();

//GET homepage 
router.get('/', (req, res) => {
    res.render('home', {
        user:req.session.user || null 
    });
});

mpdule.export = router;