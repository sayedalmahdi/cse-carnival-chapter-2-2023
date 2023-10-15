/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const moment = require("moment");

const stripe = require("stripe")(
	"sk_test_51HQXc9FhUcydeiwhnQUxCzMQ8I9U4bdEj5epXvz2hp6oL6H5a0ogoMY4zadpcZJ3tilmNTN3vfSThqnsqyAMlqh000eVqyU9pY"
);

admin.initializeApp();
const db = admin.firestore();

const SITE_URL = "https://goto-tour.web.app/";

exports.createPaymentSession = functions.https.onCall(async (data, ctx) => {
	const userData = await getUser(ctx);

	const req = {
		billing_address_collection: "auto",
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Consultation",
					},
					unit_amount: 2000,
				},
				quantity: 1,
			},
		],
		metadata: {
			tourist: userData._id,
			guide: data.guideId,
			guideName: data.guideName,
		},
		client_reference_id: userData._id,
		mode: "payment",
		success_url: `${SITE_URL}/tourist/chat`,
		cancel_url: `${SITE_URL}/tourist/guides`,
	};

	if (userData.email) req.customer_email = userData.email;

	const session = await stripe.checkout.sessions.create(req);

	return { ok: true, url: session.url };
});

const getUser = async (ctx) => {
	if (!ctx.auth) {
		throw new functions.https.HttpsError("failed-precondition", "User must be authenticated");
	}
	const uid = ctx.auth.uid;

	const ref = db.collection("users").doc(uid);
	const doc = await ref.get();

	if (!doc.exists) {
		throw new functions.https.HttpsError("not-found", "User not found");
	}

	return { ...doc.data(), _id: doc.id };
};

exports.webhook = functions.https.onRequest(async (req, res) => {
	cors(req, res, async () => {
		let event = req.body;
		// Replace this endpoint secret with your endpoint's unique secret
		// If you are testing with the CLI, find the secret by running 'stripe listen'
		// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
		// at https://dashboard.stripe.com/webhooks
		const endpointSecret = "whsec_e2183a300ff630aae892c1f01173795457de8da19da98ac0515b1ca795b967e6";
		// Only verify the event if you have an endpoint secret defined.
		// Otherwise use the basic event deserialized with JSON.parse
		// if (endpointSecret) {
		// 	// Get the signature sent by Stripe
		// 	const signature = request.headers["stripe-signature"];
		// 	try {
		// 		event = stripe.webhooks.constructEvent(
		// 			request.body,
		// 			signature,
		// 			endpointSecret
		// 		);
		// 	} catch (err) {
		// 		console.log(`⚠️  Webhook signature verification failed.`, err.message);
		// 		return response.sendStatus(400);
		// 	}
		// }
		switch (event.type) {
			case "checkout.session.completed":
				const data = event.data.object;
				const touristId = data.client_reference_id;
				const guideId = data.metadata.guide;

				//create chat doc with touristId and guideId
				db.collection("chat").doc(`${touristId}_${guideId}`).set({
					tourist: touristId,
					guide: guideId,
                    guideName: data.metadata.guideName,
					isActive: true,
				});

				break;
			default:
				// Unexpected event type
				console.log(`Unhandled event type ${event.type}.`);
		}
		// Return a 200 response to acknowledge receipt of the event
		res.status(200).send();
	});
});
