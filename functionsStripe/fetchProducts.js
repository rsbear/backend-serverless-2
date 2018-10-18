import stripePackage from "stripe";
import { success, failure } from "./../libs/response-lib";

export async function main(event, context, callback) {

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const result = await stripe.products.list({ limit: 10 });
    callback(null, success(result))
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}




// import stripePackage from "stripe";
// const stripe = stripePackage(process.env.stripeSecretKey);

// module.exports.handler = (event, context, callback) => {
//   return stripe.products.list(
//       {limit: 10}).then((products) => {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: JSON.stringify({
//         data: products.data
//       }),
//     };
//     callback(null, response);
//   }).catch((err) => { // Error response
//     console.log(err);
//     const response = {
//       statusCode: 500,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: JSON.stringify({
//         error: err.message,
//       }),
//     };
//     callback(null, response);
//   });
// };

