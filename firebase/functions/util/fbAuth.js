const { admin, db, secret } = require("./admin");
const Cookies = require("cookies");
const CryptoJS = require("../node_modules/crypto-js");
const encrypt = (text, secret) => {
  // return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  return CryptoJS.AES.encrypt(text, secret);
};
const decrypt = (text, secret) => {
  // return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  let bytes = CryptoJS.AES.decrypt(text, secret);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = async (req, res, next) => {
  let expires = new Date();
  expires.setMonth(expires.getMonth() + 1);

  let cookies = new Cookies(req, res);
  let session = "undefined";
  try {
    session = cookies.get("mob_session");
  } catch (error) {}
  req.user = {};
  let uid = "Not Found";
  try {
    uid = decrypt(session, secret).toString();
  } catch (error) {}
  await db
    .collection("users")
    .where("userId", "==", uid)
    .limit(1)
    .get()
    .then((data) => {
      if (!data.empty) {
        const userId = data.docs[0].data().userId;
        const encryptSession = encrypt(userId, secret);
        cookies.set("mob_session", encryptSession, { expires });
        req.session = encryptSession;
        req.user.userId = userId;
        req.user.nickname = data.docs[0].data().body.nickname
          ? data.docs[0].data().body.nickname
          : " ";
        req.user.owner = data.docs[0].data().owner; //set uid from mail to feild owner from collection
        req.user.ownerProfileImage = data.docs[0].data().body.imgProfile;
        req.user.email = data.docs[0].data().email;
        req.user.admin = data.docs[0].data().admin ? true : false;
        return next(); //For doing next objective Post Get
      } else {
        return res.json({ Error: "Please Login Again" });
      }
    }).catch(err => {
      console.log("Err: ", err);
      return res.status(500).json({err, where: "FBAuth"})
    })
};
