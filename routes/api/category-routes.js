const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET /api/categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!catData) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err)
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCat) {
      res.status(404).json({ message: 'No category with this id' });
      return
    }
    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCat) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
