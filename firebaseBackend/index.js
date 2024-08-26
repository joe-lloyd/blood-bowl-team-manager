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

  return value;
};

/**
 * Generic function to upload JSON data to Firestore
 * @param {string} filePath - The path to the JSON file.
 * @param {string} collectionName - The Firestore collection where the data should be uploaded.
 * @param {string} dataKey - The key in the JSON file that holds the data object.
 * @returns {Promise<number>} - The number of documents uploaded.
 */
const uploadDataToFirestore = async (filePath, collectionName, dataKey) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data)[dataKey];

    // Initialize an array to store the promises
    const uploadPromises = [];

    // Iterate over the data and add it to Firestore
    for (const [docId, docData] of Object.entries(jsonData)) {
      const convertedData = convertReferences(docData);
      const uploadPromise = db
        .collection(collectionName)
        .doc(docId)
        .set(convertedData);
      uploadPromises.push(uploadPromise);
      console.log(
        `Uploading document: ${docId} to collection: ${collectionName}`
      );
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    console.log(
      `All documents have been uploaded to ${collectionName} successfully.`
    );

    // Return the number of uploaded documents
    return uploadPromises.length;
  } catch (error) {
    console.error(`Error uploading data to ${collectionName}:`, error);
    return 0;
  }
};

// Example Usage:
(async () => {
  const specialRulesCount = await uploadDataToFirestore(
    'data/specialRules.json',
    'specialRules',
    'specialRules'
  );
  const playerBlueprintsCount = await uploadDataToFirestore(
    'data/playerBlueprints.json',
    'playerBlueprints',
    'playerBlueprints'
  );
  const teamBlueprintsCount = await uploadDataToFirestore(
    'data/teamBlueprints.json',
    'teamBlueprints',
    'teamBlueprints'
  );

  const metaDoc = {
    lastUpdated: Date.now(),
    teamCount: teamBlueprintsCount,
  };

  try {
    await db.collection('meta').doc('dataInfo').set(metaDoc);
    console.log(
      'Meta document created/updated successfully at the root of Firestore.'
    );
  } catch (error) {
    console.error('Error creating/updating meta document:', error);
  }
})();
