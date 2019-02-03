const knex = require('./database');
const username = 'newbology';
// knex.raw(`INSERT INTO users (username) VALUES ('newbology');`)
// .then((results)=>{
//   console.log(results);
// })
// .then(()=>{
//  return knex.raw('SELECT username FROM users')
// })
//   .then(console.log);

// knex('users').insert({username: username})
//   .then(console.log)
//   .then(()=>{
//     return knex.select('id', 'username').from('users')
//   })
//   .then(console.log);