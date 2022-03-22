const admin = require("firebase-admin");
const { firebaseConfig } = require("./config");
admin.initializeApp(firebaseConfig);

const db = admin.firestore();

if (process.env.FIRESTORE_EMULATOR_HOST.includes("0.0.0.0")) {
    db.settings({ host: 'localhost:8080', ssl: false });
}
module.exports = { admin, db };
