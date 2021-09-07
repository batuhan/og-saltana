async function init() {
  const results = await fetch(
    'https://batuhan.dev.saltana.com/api/methods/checkout/process',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json;charset=UTF-8',
      },
      body: '{"paymentIntentId":"pi_3JWgBsIIyBNu6YTc15QF0SuE","assets":[{"id":"ast_4P0ChEe1BeJ1mAXV9BeJ","quantity":1}],"email":"batuhan+11@saltana.com"}',
      method: 'POST',
      mode: 'cors',
    }
  )

  debugger
}

init().then(() => console.log('done'))
