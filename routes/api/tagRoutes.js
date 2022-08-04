const router = require('express').Router();
const { Category, Product, Producttag, Tag } = require('../../models');

// The `/api/tags` endpoint

// find all Tags
router.get('/', (req, res) => {
  // be sure to include its associated Category and Tag data
 // Access Tag model and run .findAll() method)
    Tag.findAll()
     attributes: { exclude: ['password'] }
})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

// get one Tag
router.get('/:id', (req, res) => {
  // find a single Tag by its `id`
  // be sure to include its associated Category and Tag data
  Tag.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new Tag
router.post('/', (req, res) => {
 // expects {Tagname:  'tea', 'coffee', 'juice', 'snacks', tagIds: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22, 33]'}
  Tag.create({
    Tagname:req.body.Tagname,
    tea: req.body.tea,
    coffee: req.body.coffee,
    juice: req.body.juice,
    snacks: req.body.snacks,
    id: req.body.id
    // category_id: req.body.category_id
  })
    .then((Tag) => {
      // if there's  tags, we need to create pairings to bulk create in the Tag model
      if (req.body.tagIds.length) {

        const TagTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            Tag_id: Tag.id,
            tag_id,
          };
        });
        return TagTag.bulkCreate(TagTagIdArr);
      }
      // if no Tag tags, just respond
      res.status(200).json(Tag);
    })
    .then((TagTagIds) => res.status(200).json(TagTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/login', (req, res) => {
    // login - Query operation
 // expects {Tagname:  'tea', 'coffee', 'juice', 'snacks', tagIds: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22, 33]'}
     Tag.findOne({
       where: {
         Tag_name: req.body.coffee
       }
     }).then(dbTagData => {
     if (!dbTagData) {
       res.status(400).json({ message: 'No Tag found !' });
       return;
     }

     res.json({ Tag: dbTagData });

     // Verify Tag
     const validPassword = dbTagData.checkPassword(req.body.password);
     if (!validPassword) {
       res.status(400).json({ message: 'Incorrect password!' });
       return;
     }
     
     res.json({ Tag: dbTagData, message: 'You are now logged in!' });
     
   }); 
 });


// update Tag data
router.put('/:id', (req, res) => {
// update a tag's name by its `id` value
 // expects {Tagname:  'tea', 'coffee', 'juice', 'snacks', tagIds: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22, 33]'}
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then((Tag) => {
      // find all associated tags from TagTag
      return TagTag.findAll({ where: { Tag_id: req.params.id } });
    })
    .then((TagTags) => {
      // get list of current tag_ids
      const TagTagIds = TagTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newTagTags = req.body.tagIds
        .filter((tag_id) => !TagTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            Tag_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const TagTagsToRemove = TagTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        TagTag.destroy({ where: { id: TagTagsToRemove } }),
        TagTag.bulkCreate(newTagTags),
      ]);
    })
    .then((updatedTagTags) => res.json(updatedTagTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one Tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;