var admin = require("firebase-admin");

var serviceAccount = require("../config/ecommerce-f1704-firebase-adminsdk-xle7w-283f2daebe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports=admin
