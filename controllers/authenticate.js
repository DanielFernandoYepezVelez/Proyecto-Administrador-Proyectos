const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.post('/user/signIn',
    passport.authenticate('local', {
        failureRedirect: '/user/signIn',
        failureFlash: true,
        badRequestMessage: 'Ambos Campos Son Obligatorios'
    }),
    function(req, res) {
        res.redirect('/');
    });

module.exports = router;