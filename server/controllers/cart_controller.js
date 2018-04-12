const swag = require('../models/swag')

module.exports = {
 add: (req, res, next) => {
  let { id } = req.query;
  let { session } = req;
  console.log(id)
  console.log(session)
  if (session.user.username !== '') {
   let found = session.user.cart.indexOf(id)
   if ( found !== -1) {
    res.status(200).send( session.user )
   }
   else {
    let item = swag.find(item=>item.id == id);
    console.log(item);
    res.status(200).send( item );
   }
 }
 else {
  res.status(403).send (" Not logged in ");
 }
 } ,
 delete: (req, res, next) => {
  let { id } = req.query;

  let toBeRemoved = find(product => product.id === id)
  let dupe = swag.filter(product=> product.id !== id);
  swag = [...dupe];
  session.user.total -= toBeRemoved.price;
 
 } ,
 checkout: (req, res, next) => {
  session.user.cart = [];
  session.user.total = 0;
  res.status(200).send( session.user );
 },

}