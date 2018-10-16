import stripePackage from "stripe";
const stripe = stripePackage(process.env.stripeSecretKey);

module.exports.handler = (event, context, callback) => {
  return stripe.products.retrieve(
    id
  ).then((product) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        data: product.data
      }),
    };
    callback(null, response);
  }).catch((err) => { // Error response
    console.log(err);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
    callback(null, response);
  });
};
