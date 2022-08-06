const router = require('express').Router();

const categoryRoutes = require('./categoryroutes.js');
const productRoutes = require('./productroutes.js');

router.use('/categorys', categoryRoutes);
router.use('/products', productRoutes);




module.exports = router;