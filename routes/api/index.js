const router = require('express').Router();

const categoryRoutes = require('./categoryRoutes.js');

// const productRoutes = require('./productRoutes.js');
// const tagRoutes = require('./tagRoutes.js');

router.use('/categorys', categoryRoutes);

// router.use('/products', productRoutes);
// router.use('/tags', tagRoutes);

module.exports = router;