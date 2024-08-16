const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./blood-bowl-team-manager-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * Converts string paths to Firestore references if they match a specific pattern.
 * @param {any} value - The value to check and potentially convert.
 * @returns {any} - The original value or a Firestore reference if applicable.
 */
const convertReferences = (value) => {
  // Specific pattern to match your Firestore collections
  const referencePattern =
    /^(specialRules\/[a-zA-Z0-9_-]+|playerBlueprints\/[a-zA-Z0-9_-]+)$/;

  if (typeof value === 'string' && referencePattern.test(value)) {
    return db.doc(value); // Convert to Firestore document reference
  } else if (Array.isArray(value)) {
    return value.map(convertReferences); // Recursively check each item in arrays
  } else if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, convertReferences(v)])
    );
  }

  return value; // Return original value if no conversion needed
};

/**
 * Generic function to upload JSON data to Firestore
 * @param {string} filePath - The path to the JSON file.
 * @param {string} collectionName - The Firestore collection where the data should be uploaded.
 * @param {string} dataKey - The key in the JSON file that holds the data object.
 */
const uploadDataToFirestore = async (filePath, collectionName, dataKey) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data)[dataKey];

    // Iterate over the data and add it to Firestore
    for (const [docId, docData] of Object.entries(jsonData)) {
      const convertedData = convertReferences(docData);
      await db.collection(collectionName).doc(docId).set(convertedData);
      console.log(
        `Uploaded document: ${docId} to collection: ${collectionName}`
      );
    }

    console.log(
      `All documents have been uploaded to ${collectionName} successfully.`
    );
  } catch (error) {
    console.error(`Error uploading data to ${collectionName}:`, error);
  }
};

// Example Usage:
(async () => {
  await uploadDataToFirestore(
    'data/specialRules.json',
    'specialRules',
    'specialRules'
  );
  await uploadDataToFirestore(
    'data/playerBlueprints.json',
    'playerBlueprints',
    'playerBlueprints'
  );
  await uploadDataToFirestore(
    'data/teamBlueprints.json',
    'teamBlueprints',
    'teamBlueprints'
  );
})();
