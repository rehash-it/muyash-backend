module.exports = {
  jwtPrivateKey :process.env.JWT_SECRET||'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  dbhost:process.env.DATABASE_URL||'localhost',
  dbport:process.env.DB_PORT||'27017',
  dbname:process.env.DATABASE_NAME||'muyash',
  port:process.env.PORT || 3000
}
// mongodb://<dbuser>:<dbpassword>@ds211268.mlab.com:11268/muyash-dev