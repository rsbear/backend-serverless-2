import stripePackage from "stripe";

export async function main(event, context, callback) {
  const { products } = JSON.parse(event.body);
  const description = "Revive Archives charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    return stripe.products.list({ 
      limit: 20,
      products
    }) 
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }
}

