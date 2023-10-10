import express from 'express'
const router = express.Router()
const items = [{id: 1, task: "buy groceries"}, {id:2, task: "clean room"}]

router.get('/', (req, res) => {
    return res.json(items)
})

router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === itemId);
  if (item) {
    return res.json(item);
  } else {
    return res.status(404).json({ error: 'Item not found' });
  }
})

router.post('/', (req, res) => {
  const requiredProperties = ['id', 'task']
  let missingProperties = []

  requiredProperties.forEach(prop => {
      if (!req.body.hasOwnProperty(prop)) {
          missingProperties.push(prop)
      }
  })

  if (missingProperties.length) { // we do not need a specific comparison here because a 0 is essentially the same as false
      // we have missing properties!
      let errorMessage = []
      missingProperties.forEach(prop => {
          errorMessage.push(`Missing property: ${prop}`)
      })
      return res.status(400).json({ errors: errorMessage })
  }
  items.push(req.body)
  return res.status(201).json(req.body)
})

export default router