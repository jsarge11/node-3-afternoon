const users = require('../models/users')
let id = 1

module.exports = {
 login: (req,res,next) => {
 
  const { session } = req;
  const { username, password } = req.body;

  const found = users.find(user => user.username === username && user.password === password);

  if (found) {
     session.user.username = username;
     res.status(200).send( session.user );
   }
   else {
    res.status(403).send ('Forbidden');
   }
 },

 register: (req,res,next) => {

  let { session } = req;
  let { username, password } = req.body;

  //linked to another file, that's pretty freaking cool
  users.push({id: id, username: username, password: password});
  id++;
  session.user.username = username;
  res.status(200).send ( session.user );
 }, 

 signout: (req,res,next) => {
  req.session.destroy();
  res.status(200).send (req.session);
 }, 

 getUser: (req,res,next) => {
  res.status(200).send (req.session.user)
 }  
}