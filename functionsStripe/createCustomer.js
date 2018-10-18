const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  const source = requestBody.customer.source.id
  const ownerEmail = requestBody.ownerInfo.email

  return stripe.customers.create({
    email: ownerEmail,
    source: source,
  }).then((customer) => {

      return stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: 'plan_DRiOMV2B1we4Rm' }] 
      }).then((customer) => {;
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            message: `Customer created and subscribed succesfully!`,
            customer,
          }),
        };
        callback(null, response);
      })
    })

  .catch((err) => { // Error response
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
  })
}