import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const { email, name, text } = data;
   
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId,
    };
    const uri =
      "mongodb+srv://events:ZQ0nqUleO3fiGSwh@cluster0.f8dsb.mongodb.net/events?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.collection("comments").insertOne({ comment: newComment });
    client.close();
    res.status(201).json({ message: "Signed UP" });
  }

  //Fetch Data
  if (req.method === "GET") {
    const uri =
      "mongodb+srv://events:ZQ0nqUleO3fiGSwh@cluster0.f8dsb.mongodb.net/events?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    
    res.status(200).json({ comments: documents });
  }
}
