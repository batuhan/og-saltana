import { createInstance } from "@saltana/sdk";
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_...', { });

const apiVersion = "2019-05-20";

const adminApi = createInstance({
  apiKey,
  apiVersion,
  //apiHost,
  //apiPort,
  //apiProtocol,
});

async function getOrCreateCustomer({}) {


}
export async function createIntent({ assetId }) {
  // TODO: cache this - @b

const asset = adminApi.assets.read(assetId)
 const intent = stripe.paymentIntents.create()
}

export async function checkout({ assetId, stripeId }) {
  const asset = adminApi.assets.read(assetId)

  const transaction = adminApi.transactions.create({})

  const customer =
}
export async function handleRequest(request: Request): Promise<Response> {
	return new Response(`request method: ${ request.method }`)
}


/**
 * create
