const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var Buffer = require("buffer/").Buffer;

function encrypt(id) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(id);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decrypt(id) {
  let iv = Buffer.from(id.iv, "hex");
  let encryptedText = Buffer.from(id.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

//
// var crypto = require("crypto");
// var algorithm = "aes-192-cbc"; //algorithm to use
// var password = "Hello darkness";
// const key = crypto.scryptSync(password, "salt", 24); //create key
// var text = "qweqweqweqwe"; //text to be encrypted

// const iv = crypto.randomBytes(16); // generate different ciphertext everytime
// const cipher = crypto.createCipheriv(algorithm, key, iv);
// var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex"); // encrypted text
// console.log(encrypted);

// const decipher = crypto.createDecipheriv(algorithm, key, iv);
// var decrypted =
//   decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"); //deciphered text
// console.log(decrypted);

//

module.exports = {
  encrypt,
  decrypt,
};
