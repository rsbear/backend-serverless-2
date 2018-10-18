// import stripePackage from "stripe";
// import { success, failure } from "./../libs/response-lib";

// export async function main(event, context, callback) {
//   // const { caption } = JSON.parse(event.body);
//   // Load our secret key from the  environment variables
//   const stripe = stripePackage(process.env.stripeSecretKey);

//   try {
//   	const result = await stripe.products.retrieve('prod_DZrKwigj1FIlii')
// 		if (result.data) {
// 			callback(null, success(result.data))
// 		} else {
// 			callback(null, failure({ status: false, error: "no item found" }))
// 		}
//   } catch (e) {
//     callback(null, failure({ message: e.message }));
//   }
// }




import stripePackage from "stripe";
const stripe = stripePackage(process.env.stripeSecretKey);

module.exports.handler = (event, context, callback) => {
	// const { id } = JSON.parse(event.body);

  return stripe.products.retrieve("prod_DSFNneYLd0H9lN").then((product) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        data: product
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
        error: err.message
      }),
    };
    callback(null, response);
  });
};