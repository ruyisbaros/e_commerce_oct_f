import proxy from "http-proxy-middleware";
module.exports = function (app) {
  app.use(
    proxy("https://my-ecom-back.herokuapp.com", {
      target: "http://localhost:8090",
      /* pathRewrite: {
        '^/\\.netlify/functions': '',
      }, */
    })
  );
};
