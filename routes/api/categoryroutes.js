const router = require('express').Router();

const { Category} = require('../../models');

// const { Category, Product, Producttag, Tag } = require('../../models');


// Find all categories including associated products
router.get('/', (req, res) => {
  Category.findAll()
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  

// Find one categories including associated products, find category by its id value
router.get('/:id', (req, res) => {
  Category.findOne({
    
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 // create a new category
router.post('/', (req, res) => {
   // expects {categoryname: 'coffee', productname: 'american coffee', category_id: '1'}
   Category.create({
     categoryname: req.body.categoryname,
     productname: req.body.productname,
     category_id: req.body.category_id
   })
     .then(dbCategoryData => res.json(dbCategoryData))
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
 });

router.post('/login', (req, res) => {
   // login - Query operation
  // create a new category
    // expects {categoryname: 'coffee', product_id: '1', tag-id: '4'}
    Category.findOne({
      where: {
        categoryname: req.body.categoryname
      }
    }).then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(400).json({ message: 'No category with that email address!' });
      return;
    }

    res.json({ category: dbCategoryData });

    // Verify category
    const validPassword = dbCategoryData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    
    res.json({ category: dbCategoryData, message: 'You are now logged in!' });
    
  }); 
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    // expects {categoryname: 'coffee', product_id: '1', tag-id: '4'}
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;