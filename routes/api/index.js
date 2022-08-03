const router = require('express').Router();

const categoryRoutes = require('./categoryroutes.js');
// const productRoutes = require('./productroutes.js');
// const tagRoutes = require('./tagroutes.js');


router.use('/categorys', categoryRoutes);
// router.use('/products', productRoutes);
// router.use('/tags', tagRoutes);



module.exports = router;