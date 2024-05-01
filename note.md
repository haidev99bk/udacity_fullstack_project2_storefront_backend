- Create a users table with:

* db-migrate create users --sql-file
* then use jwt to sign new token
* use bcrypt to hash password (note: https://github.com/kelektiv/node.bcrypt.js/issues/437 )
