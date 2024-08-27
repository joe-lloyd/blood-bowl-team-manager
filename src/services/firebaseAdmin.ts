import admin from 'firebase-admin';

let serviceAccount;

try {
  serviceAccount = JSON.parse(
    process.env.NEXT_FIREBASE_ADMIN_CREDENTIALS as string
  );
} catch (error) {
  console.error('Error parsing service account:', error);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
