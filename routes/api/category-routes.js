const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: { 
        model: Product,
        attributes: [`id`, `product_name`, `price`, `stock`, `category_id`],
      }
    });
    return res.status(200).json(categoryData);
  }
  catch(err){
    res.status(404).json(err)
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { 
        model: Product,
        attributes: [`id`, `product_name`, `price`, `stock`, `category_id`],
      }
    });
    return res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    return res.status(200).json(categoryData);
  }catch (err){
    res.status(400).json(err);
  }
  

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
