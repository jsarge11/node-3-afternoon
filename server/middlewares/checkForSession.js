module.exports = {
 check: (req, res, next) => {
  console.log('running');

  if (!req.session.user) {
   req.session.user = {
    username: '',
    cart: [],
    total: 0
   }
  }

  next();
 }
}