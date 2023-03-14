import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    //events
    //ZQ0nqUleO3fiGSwh
    const uri =
      "mongodb+srv://events:ZQ0nqUleO3fiGSwh@cluster0.f8dsb.mongodb.net/events?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();
    res.status(201).json({ message: "Signed UP" });
  }
}
