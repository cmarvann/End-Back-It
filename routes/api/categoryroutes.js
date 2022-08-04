const router = require('express').Router();

const { Category, Product, Producttag, Tag } = require('../../models');

// const { Category, Product } = require('../../models');


// The `/api/categories` endpoint
// find all categories - be sure to include its associated Products
// GET all /api/catergory
router.get('/', (req, res) => {
  Category.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    attributes: { exclude: ['password'] },
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

router.post('/', (req, res) => {
 // create a new category
   // expects {categoryname: 'backendit', email: 'backendit@gmail.com', password: 'password123456'}
   Category.create({
     categoryname: req.body.categoryname,
     email: req.body.email,
     password: req.body.password
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
    // expects {categoryname: 'backendit', email: 'backendit@gmail.com', password: 'password123456'}
    Category.findOne({
      where: {
        email: req.body.email
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
    // expects {categoryname: 'backendit', email: 'backendit@gmail.com', password: 'password123456'}
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