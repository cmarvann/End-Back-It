const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'coffee',
  },
  {
    tag_name: 'tea',
  },
  {
    tag_name: 'juice',
  },
  {
    tag_name: 'snacks',
  },
  {
    tag_name: 'hot',
  },
  {
    tag_name: 'cold',
  },
  {
    tag_name: 'frozen',
  },
  {
    tag_name: 'iced',
  },
  {
    tag_name: 'bottled',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;