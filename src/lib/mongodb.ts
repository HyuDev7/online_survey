import {
  AgreementFormDataType,
  AssessmentFormDataType,
  FirstFormDataType,
  ProfileFormDataType,
  SecondFormDataType,
  ThirdFormDataType,
  UserIdType,
} from "./formDataTypes";
import {
  DB_NAME,
  ID_COLLECTION,
  PROFILE_COLLECTION,
  FIRSTGAME_COLLECTION,
  SECONDGAME_COLLECTION,
  THIRDGAME_COLLECTION,
  AGREEMENT_COLLECTION,
} from "./dbConfig";
import { list } from "postcss";
const { MongoClient, ServerApiVersion } = require("mongodb");

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
const thirdGameCollection = myDB.collection(THIRDGAME_COLLECTION);
const agreementCollection = myDB.collection(AGREEMENT_COLLECTION);
const assessmentCollection = myDB.collection("assessment");
const counterCollectioin = myDB.collection("counter");

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

    //get a list of counter
    const counterRes = await counterCollectioin.findOne(
      {
        title: "condition_counter",
      },
      { projection: { _id: 0, title: 0 } }
    );

    const { total, ...counterlist } = counterRes;
    console.log("this is counter list");
    console.log(counterlist);
    console.log("this is total count");
    console.log(total);

    //acceptable condition list array
    let acceptablecCondArr = [];
    for (const property in counterlist) {
      if (counterlist[property] < 100) {
        acceptablecCondArr.push(property);
      }
    }
    console.log(acceptablecCondArr);
    //calculate the time 3hours before forom current one
    const current = new Date();
    const currentMilli = current.valueOf();
    const threehoursMilli = 3 * 60 * 60 * 1000;
    const targetTimeMilli = currentMilli - threehoursMilli;
    const targetTime = new Date(targetTimeMilli);
    console.log("this is target iso time " + targetTime.toISOString());

    //find a document
    sessionIdResult = await userIdCollection.findOneAndUpdate(
      {
        passCode: userIdBody.passCode,
        // isSent: false,
        cond_num: { $in: acceptablecCondArr },
        fin: false,
        sentAt: { $lt: new Date(targetTime.toISOString()) },
      },
      {
        $set: { isSent: true, sentAt: new Date() },
      },
      {
        projection: { _id: 0, passCode: 0 },
      }
    );
    console.log("this is first found id ");
    sessionIdResult=sessionIdResult.value
    console.log(sessionIdResult);

    //if total count is over 1,200 and, there is no id whose sentAt is less than 3h and fin is false
    // findOne function returns null
    if (sessionIdResult === null) {
      //if total is over 1200, send message about it's over
      if (total >= 1200) {
        sessionIdResult = { sessionID: "over" };
        return sessionIdResult;
      }
    }

    //check condition count
    let condition_number: string = sessionIdResult.cond_num;
    const targetVal = counterRes[condition_number];
    console.log("this is target value type" + typeof targetVal);
    console.log("original condition number is " + condition_number);

    //when target value is more than 100, try to give other condition number havnig minimal count
    // if (targetVal >= 100) {
    //   //get a list of value of counter list
    //   const numArr: Array<number> = Object.values(counterlist);
    //   //find minimal value in counter list
    //   const minVal = Math.min(...numArr);
    //   console.log("this is min val " + minVal);
    //   //find a field having minimal value
    //   for (const [key, value] of Object.entries(counterlist)) {
    //     if (value === minVal) {
    //       //get a name having minimal count
    //       condition_number = key;
    //       break;
    //     }
    //   }
    //   //id with condition, the number of it is over 100 should be updated(isSent : true)
    //   await userIdCollection.updateOne(
    //     { sessionID: sessionIdResult.sessionID },
    //     {
    //       $set: { isSent: true },
    //     }
    //   );

    //   console.log("new condition number is " + condition_number);
    //   //find a new id with the condition
    //   sessionIdResult = await userIdCollection.findOne(
    //     {
    //       passCode: userIdBody.passCode,
    //       isSent: false,
    //       cond_num: condition_number,
    //     },
    //     {
    //       projection: { _id: 0, passCode: 0, isSent: 0 },
    //     }
    //   );
    // }

    console.log("current condition number is " + condition_number);
    console.log("this is session is isSent field : " + sessionIdResult.isSent);

    if (sessionIdResult.isSent == false) {
      //indicating what is and how incremented
      let count_updateDocument: any = {
        $inc: {},
      };
      count_updateDocument.$inc[condition_number] = 1;
      count_updateDocument.$inc["total"] = 1;
      await counterCollectioin.updateOne(
        { title: "condition_counter" },
        count_updateDocument
      );
    }

    // //update counter doc and isSent field of sent id document
    // await userIdCollection.updateOne(
    //   { sessionID: sessionIdResult.sessionID },
    //   {
    //     $set: { isSent: true, sentAt: new Date() },
    //   }
    // );
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed from getSessionID!");
    return sessionIdResult;
  }
}

export async function findSessionId(passedSessionID: string): Promise<boolean> {
  let validateSessionIdResult: any;
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("connected from find session id!");

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
    console.log("connection is closed from find Session ID!");

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
    console.log("connected from update agreement");

    //filter for finding document
    const filter = {
      sessionID: passedAgreementForm.sessionID,
    };

    //indicating what is updated
    const updateDocument = {
      $set: {
        secondAgreement: passedAgreementForm.secondAgreement,
        example: passedAgreementForm.example,
        secondCreatedAt: passedAgreementForm.secondCreatedAt,
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
    console.log("connection is closed from update agreement");
  }
}

export async function updateFin(passedAgreementForm: AgreementFormDataType) {
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
        fin: true,
      },
    };

    //get document
    const updateRes = await userIdCollection.updateOne(filter, updateDocument);
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("connection is closed from update fin");
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
    | ThirdFormDataType
    | AgreementFormDataType
    | AssessmentFormDataType
) {
  let res: any;
  try {
    //connecting to db
    await client.connect();
    console.log("connected from insert document!");

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

    if ("firstCondition" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        firstGameCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          firstCondition: formData.firstCondition,
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

    if ("secondCondition" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        secondGameCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          secondGameType: formData.secondGameType,
          secondDistribution: formData.secondDistribution,
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

    if ("thirdCondition" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        thirdGameCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          thirdGameType: formData.thirdGameType,
          thirdDistribution: formData.thirdDistribution,
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await thirdGameCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await thirdGameCollection.insertOne(formData);
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
          example: formData.example,
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

    if ("compAssessment" in formData) {
      //check whether doc already exist
      const flag = await findSessionIdInEachDoc(
        formData.sessionID,
        assessmentCollection
      );
      const filter = { sessionID: formData.sessionID };
      const updateDocument = {
        $set: {
          compAssessment: formData.compAssessment,
        },
      };

      //if there is doc already, update it
      if (flag) {
        res = await assessmentCollection.updateOne(filter, updateDocument);
      } else {
        //if there is no doc, insert new one
        res = await assessmentCollection.insertOne(formData);
      }
    }
  } catch (e) {
    console.dir(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  console.log("connection is closed from insert document!");
  return res;
}

export async function findPath(passedSessionID: string) {
  async function run() {
    let gotPath: any;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("connected from find path!");

      //filter for finding document
      const filter = {
        sessionID: passedSessionID,
      };

      //options of returned document
      const options = {
        projection: { _id: 0, passCode: 0, sessionID: 0, isSent: 0 },
      };

      //get document
      gotPath = await userIdCollection.findOne(filter, options);
    } catch (e) {
      console.dir(e);
    } finally {
      console.log("connection is closed from find path!");
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return gotPath;
  }
  const res = await run().catch(console.dir);
  return res;
}

export async function findOrderCondition(passedSessionID: string) {
  async function run() {
    let gotAssessCond: any;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("connected from find order condition!");

      //filter for finding document
      const filter = {
        sessionID: passedSessionID,
      };

      //options of returned document
      const options = {
        projection: {
          _id: 0,
          passCode: 0,
          sessionID: 0,
          firstroute: 0,
          secondroute: 0,
          thirdroute: 0,
          isSent: 0,
        },
      };

      //get document
      gotAssessCond = await userIdCollection.findOne(filter, options);
    } catch (e) {
      console.dir(e);
    } finally {
      console.log("connection is closed from find order condition!");
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return gotAssessCond;
  }
  const res = await run().catch(console.dir);
  return res;
}

export async function findFirstGame(passedSessionID: string) {
  async function run() {
    let firstGame: any;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("connected from find first game reaction!");

      //filter for finding document
      const filter = {
        sessionID: passedSessionID,
      };

      //options of returned document
      const options = {
        projection: { _id: 0, sessionID: 0, firstGameCreatedAt: 0 },
      };

      //get document
      firstGame = await firstGameCollection.findOne(filter, options);
    } catch (e) {
      console.dir(e);
    } finally {
      console.log("connection is closed from find first game reaction!");
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return firstGame;
  }
  const res = await run().catch(console.dir);
  return res;
}

export async function findSecondGame(passedSessionID: string) {
  async function run() {
    let secondGame: any;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("connected from find second game reaction!");

      //filter for finding document
      const filter = {
        sessionID: passedSessionID,
      };

      //options of returned document
      const options = {
        projection: { _id: 0, sessionID: 0, secondGameCreatedAt: 0 },
      };

      //get document
      secondGame = await secondGameCollection.findOne(filter, options);
    } catch (e) {
      console.dir(e);
    } finally {
      console.log("connection is closed from find second game reaction!");
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return secondGame;
  }

  const res = await run().catch(console.dir);
  return res;
}

export async function findThirdGame(passedSessionID: string) {
  async function run() {
    let thirdGame: any;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log("connected from find third game reaction!");

      //filter for finding document
      const filter = {
        sessionID: passedSessionID,
      };

      //options of returned document
      const options = {
        projection: { _id: 0 },
      };

      //get document
      thirdGame = await thirdGameCollection.findOne(filter, options);
    } catch (e) {
      console.dir(e);
    } finally {
      console.log("connection is closed from find third game reaction!");
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return thirdGame;
  }

  const res = await run().catch(console.dir);
  return res;
}

export async function sendClosed(passedSessionID: string, location: string) {
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      console.log("connected from send closed!");
      await myDB.collection("closedLog").insertOne({
        id: passedSessionID,
        page: location,
        closedAt: new Date(),
      });
    } finally {
      // Ensures that the client will close when you finish/error
      console.log("disconnected from send closed!");
      await client.close();
    }
  }
  run().catch(console.dir);
}
