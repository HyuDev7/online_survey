import {
  FirstFormDataType,
  ProfileFormDataType,
  SecondFormDataType,
  UserIdType,
} from "./formDataTypes";
import {
  DB_NAME,
  ID_COLLECTION,
  PROFILE_COLLECTION,
  FIRSTGAME_COLLECTION,
  SECONDGAME_COLLECTION,
} from "./dbConfig";
const { MongoClient, ServerApiVersion } = require("mongodb");
import { v4 as uuidv4 } from "uuid";

const uri = process.env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// for testing
const myDB = client.db(DB_NAME);
const userIdCollection = myDB.collection(ID_COLLECTION);
const profileCollection = myDB.collection(PROFILE_COLLECTION);
const firstGameCollection = myDB.collection(FIRSTGAME_COLLECTION);
const secondGameCollection = myDB.collection(SECONDGAME_COLLECTION);

//for checking the connection of db
export function connectDB() {
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}

//for getting sessionID by entered passCode
export async function getSessionId(userIdBody: UserIdType) {
  let sessionIdResult: any;
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //filter for finding document
    const filter = {
      passCode: userIdBody.passCode,
      isSent: false,
    };

    //options of returned document
    const options = {
      projection: { _id: 0, passCode: 0, isSent: 0 },
    };

    //indicating what is updated
    const updateDocument = {
      $set: { isSent: true },
    };

    //get document
    sessionIdResult = await userIdCollection.findOneAndUpdate(
      filter,
      updateDocument,
      options
    );

    // console.log(sessionIdResult.value.sessionId);
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed");

    return sessionIdResult.value;
  }
}

export async function findSessionId(passedSessionID: string): Promise<boolean> {
  let validateSessionIdResult: any;
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //filter for finding document
    const filter = {
      sessionId: passedSessionID,
    };

    //options of returned document
    const options = {
      projection: { _id: 0, passCode: 0, isSent: 0 },
    };

    //get document
    validateSessionIdResult = await userIdCollection.findOne(filter, options);

    // console.log(sessionIdResult.value.sessionId);
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    // console.log(validateSessionIdResult);
    console.log("connection is closed");

    if (validateSessionIdResult === null) {
      return false;
    } else {
      return true;
    }
  }
}

//for inserting form data
export async function insertDoc(
  formData: ProfileFormDataType | FirstFormDataType | SecondFormDataType
) {
  let insertResult: any;
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    if ("year" in formData) {
      insertResult = await profileCollection.insertOne(formData);
    } else if ("firstGame" in formData) {
      insertResult = await firstGameCollection.insertOne(formData);
    } else {
      insertResult = await secondGameCollection.insertOne(formData);
    }
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed");
    return insertResult;
  }
}

//used for put sessionID with Passcode
export async function insertIDs() {
  let idArray = [];
  let uniquePassCode = uuidv4();

  for (let i = 0; i < 100; i++) {
    let uniqueSessionId = uuidv4();
    idArray.push({
      passCode: uniquePassCode,
      sessionId: uniqueSessionId,
      isSent: false,
    });
  }

  console.log(idArray);

  try {
    await client.connect();

    await userIdCollection.insertMany(idArray);
  } catch (e) {
    console.dir(e);
  } finally {
    await client.close();
    console.log("connection is closed");
  }
}
