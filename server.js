const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Friend } = db.models;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));


app.get('/api/friends', async(req, res, next) => {
  try {
    const friends = await Friend.findAll({
      order: [['rating', 'DESC']]
    });
    res.send(friends);
  } catch (err) {
    next(err);
  }
})

app.put('/api/friends/:id', async(req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    if (req.body.method === 'plus'){
      await friend.increment('rating');
    } else if (req.body.method === 'minus'){
      await friend.decrement('rating');
    }
    res.send(friend);
  } catch (err) {
    next(err);
  }
})

app.post('/api/friends', async(req, res, next) => {
  try {
    const newFriend = new Friend({
      name: req.body.name
    })
    await newFriend.save();
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
})

app.delete('/api/friends/:id', async(req, res, next) => {
  try {
    await Friend.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send(200, "deleted");
  } catch (err) {
    next(err)
  }
})

app.use((req, res, next) => {
  const error = Error(`Page not found(${req.url})`);
  error.status = 404;
  next(error);
})

app.use((err, req, res, next) => {
  console.log(err, err.stack);
  res.status(err.status || 500).send(`
  <html>
    <body>
      <h1>${err}</h1>
      <p>${err.stack}</p>
    </body>
  </html>`)
})

const port = process.env.PORT || 5055;

const init = async () => {
  try{
    await db.syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch (err) {
    console.log(err);
  }
}

init();
