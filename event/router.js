const {Router} = require('express')

const Event = require('./model');

const router = new Router()

router.post('/event', (req, res, next) =>
  Event.create(req.body)
    .then(data => res.send(data))
    .catch(next)
);

router.get('/event', (req, res, next) =>
  Event.findAll()
    .then(data => res.send(data))
    .catch(next)
);

router.get('/event/:id', (req, res, next) =>
  Event.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).sendStatus(res.statusCode);
      }

      return res.send(data);
    })
    .catch(next)
);

router.put('/event/:id',
  (request, response, next) => {
    Event.findByPk(request.params.id)
      .then(team => team.update(request.body))
      .then(team => response.send(team))
      .catch(next)
  }
)

router.delete('/event/:id',
  (request, response, next) => Event
    .destroy({ where: { id: request.params.id }})
    .then(number => response.send({ number }))
    .catch(next)
)

module.exports = router;