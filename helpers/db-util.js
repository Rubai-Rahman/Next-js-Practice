import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const uri =
    "mongodb+srv://events:ZQ0nqUleO3fiGSwh@cluster0.f8dsb.mongodb.net/events?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  await db.collection(collection).insertOne(document);
}
