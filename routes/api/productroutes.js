const router = require('express').Router();
const { Category, PRoduct, Tag, Producttag } = require('../../models');
// const { Product } = require('../../models');

// Create Category model
class Product extends Model {}

// find all products
router.get('/', (req, res) => {
  // be sure to include its associated Category and Tag data
 // Access Product model and run .findAll() method)
    Product.findAll()
     attributes: { exclude: ['password'] }
    })
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
 // expects {productname: 'americano coffee', price: '4.99', stock: '2'. category_id: '1', tagIds: '[ 2, 3, 4, 6, 8, 9, 10, 12, 15, 22, 33]'}
  Product.create({
    productname:req.body.productname,
    price: req.body.price,
    stock: req.body.stock,
    id: req.body.id
    // category_id: req.body.category_id
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {

        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/login', (req, res) => {
    // login - Query operation
   // expects {productname: 'americano coffee', price: '4.99', stock: '2'. category_id: '1', tagIds: '[ 2, 3, 4, 6, 8, 9, 10, 12, 15, 22, 33]'}
     Product.findOne({
       where: {
         productname: req.body.american_coffee
       }
     }).then(dbProductData => {
     if (!dbProductData) {
       res.status(400).json({ message: 'No product found !' });
       return;
     }
 
     res.json({ product: dbProductData });
 
     // Verify product
     const validPassword = dbProductData.checkPassword(req.body.password);
     if (!validPassword) {
       res.status(400).json({ message: 'Incorrect password!' });
       return;
     }
     
     res.json({ product: dbProductData, message: 'You are now logged in!' });
     
   }); 
 });
 

// update product data
router.put('/:id', (req, res) => {
 // expects {productname: 'americano coffee', price: '4.99', stock: '2'. category_id: '1', tagIds: '[ 2, 3, 4, 6, 8, 9, 10, 12, 15, 22, 33]'}
  Product.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;