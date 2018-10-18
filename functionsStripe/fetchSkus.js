import stripePackage from "stripe";
import { success, failure } from "./../libs/response-lib";

export async function main(event, context, callback) {

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    const result = await stripe.skus.list({ limit: 10 });
    callback(null, success(result))
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}