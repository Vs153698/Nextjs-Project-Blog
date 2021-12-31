import { MongoClient } from "mongodb";
async function handler(req, res) {
    if (req.method === 'POST') {
        // use try catch here for error handling
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://vaibhav:vaibhav@cluster0.xxhpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        const db = client.db();
        const meetupcollection = db.collection('meetups')
        const result = await meetupcollection.insertOne(data)
        console.log(result)
        client.close()
        res.status(201).send({message:"Meetup Inserted !"})
    }
}
export default handler;