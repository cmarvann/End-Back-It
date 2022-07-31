const router = require('express').Router();

const { Category } = require('../../models');

// const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories - be sure to include its associated Products

  // GET /api/catergory
router.get('/', (req, res) => {
  // Access our category model and run .findAll() method)
  Category.findAll({
    // attributes: { exclude: ['password'] }
  })
    .then(dbCatergoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    // attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
  //   include: [
  //     {
  //       model: Post,
  //       attributes: ['id', 'categoryname']
  //     },
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'created_at'],
  //       include: {
  //         model: Post,
  //         attributes: ['title']
  //       }
  //     },
  //     {
  //       model: Post,
  //       attributes: ['title'],
  //       through: Vote,
  //       as: 'voted_posts'
  //     }
  //   ]
  // })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new category
    // expects {categoryname: 'backendit'}
    Category.create({
      categoryname: req.body.categoryname
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
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
        res.status(404).json({ message: 'No user found with this id' });
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