const swag = require('../models/swag')

module.exports = {
 add: (req, res, next) => {
  let { id } = req.query;
  let { session } = req;
  if (session.user.username !== '') {
   let found = session.user.cart.indexOf(id)
   if ( found !== -1) {
    res.status(200).send( session.user )
   }
   else {
    let item = swag.find(item=>item.id == id);
    session.user.cart.push( item );
    session.user.total += item.price;
    res.status(200).send( session.user );
   }
 }
 else {
  res.status(403).send ("Not logged in ");
 }
 } ,
 delete: (req, res, next) => {
  const { id } = req.query;
  const { cart } = req.session.user;

  
  if ( selectedSwag ) {
    const i = cart.findIndex( swag => swag.id == id );
    cart.splice(i, 1);
    req.session.user.total -= selectedSwag.price;
  }
  
  res.status(200).send( req.session.user );

  },
 checkout: (req, res, next) => {
  session.user.cart = [];
  session.user.total = 0;
  res.status(200).send( session.user );
 },

}