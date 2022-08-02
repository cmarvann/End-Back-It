const router = require('express').Router();

const categoryRoutes = require('./category-routes.js');
const productRoutes = require('./product-routes.js');
// const tagRoutes = require('./tagRoutes.js');

router.use('/categorys', categoryRoutes);
router.use('/products', productRoutes);
// router.use('/tags', tagRoutes);

module.exports = router;