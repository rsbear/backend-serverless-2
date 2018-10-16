import stripePackage from "stripe";
import { success, failure } from "./../libs/response-lib";

export async function main(event, context, callback) {
  const { id } = JSON.parse(event.body);
  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.products.retrieve({ 
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: id
      })
      
    callback(null, success({ status: true}));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }
}