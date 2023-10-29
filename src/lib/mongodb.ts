import {
  AgreementFormDataType,
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
  AGREEMENT_COLLECTION,
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
const agreementCollection = myDB.collection(AGREEMENT_COLLECTION);

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

  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed from getSessionID!");
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
      sessionID: passedSessionID,
    };

    //options of returned document
    const options = {
      projection: { _id: 0, passCode: 0, isSent: 0 },
    };

    //get document
    validateSessionIdResult = await userIdCollection.findOne(filter, options);

  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed from findSessionID!");

    if (validateSessionIdResult === null) {
      return false;
    } else {
      return true;
    }
  }
}

export async function updateAgreement(
  passedAgreementForm: AgreementFormDataType
) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //filter for finding document
    const filter = {
      sessionID: passedAgreementForm.sessionID,
    };

    //indicating what is updated
    const updateDocument = {
      $set: {
        secondAgreement: passedAgreementForm.secondAgreement,
        example: passedAgreementForm.example,
      },
    };

    //get document
    const updateRes = await agreementCollection.updateOne(
      filter,
      updateDocument
    );
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed");
  }
}

async function findSessionIdInEachDoc(
  passedSessionID: string,
  docName: any
): Promise<boolean> {
  let validateSessionIdResult: any;
  try {
    //this function is called in another with connecting to db already

    //filter for finding document
    const filter = {
      sessionID: passedSessionID,
    };

    //options of returned document
    const options = {
      projection: { _id: 0, passCode: 0, isSent: 0 },
    };

    //get document
    validateSessionIdResult = await docName.findOne(filter, options);
  } catch (e) {
    console.dir(e);
  } finally {
    if (validateSessionIdResult === null) {
      return false;
    } else {
      return true;
    }
  }
}

//for inserting form data
export async function insertDoc(
  formData:
    | ProfileFormDataType
    | FirstFormDataType
    | SecondFormDataType
    | AgreementFormDataType
) {
  let res: any;
  try {
    //connecting to db
    await client.connect();

    if ("old" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        profileCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          old: formData.old,
          sex: formData.sex,
          pref: formData.pref,
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await profileCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await profileCollection.insertOne(formData);
      }
    }

    if ("firstGame" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        firstGameCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          firstGame: formData.firstGame,
          offer: formData.offer,
          assessment: formData.assessment,
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await firstGameCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await firstGameCollection.insertOne(formData);
      }
    }

    if ("secondGame" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        secondGameCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          secondGame: formData.secondGame,
          distribution: formData.distribution,
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await secondGameCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await secondGameCollection.insertOne(formData);
      }

    }

    if ("firstAgreement" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        agreementCollection
      );
      const filter = { sessionID: formData.sessionID };

      const updateDocument = {
        $set: {
          firstAgreement: formData.firstAgreement,
          secondAgreement: formData.secondAgreement,
          example:formData.example
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await agreementCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await agreementCollection.insertOne(formData);
      }
    }
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  console.log("connection is closed!");
  return res;
}

//used for put sessionID with Passcode
export async function insertIDs() {
  let idArray = [];
  let uniquePassCode = uuidv4();

  for (let i = 0; i < 1000; i++) {
    let uniqueSessionId = uuidv4();
    idArray.push({
      passCode: uniquePassCode,
      sessionID: uniqueSessionId,
      isSent: false,
    });
  }


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
