const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  // env: {
  //   apiKey: "AIzaSyBj4wYsuqNlrOIqg-_f6gPP8_FaK3r79zk",
  //   authDomain: "tokkuai.firebaseapp.com",
  //   projectId: "tokkuai",
  //   storageBucket: "tokkuai.appspot.com",
  //   messagingSenderId: "472655829189",
  //   appId: "1:472655829189:web:81f8aabf3a4769dd20f8ac",
  //   measurementId: "G-78P2ERF9M7",
  // },
});
