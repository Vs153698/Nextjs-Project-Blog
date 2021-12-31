import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

const meetupdetail = (props) => {
    const { image, title, address, description } = props.meetupData
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta  name='description' content={description.slice(0,25)}/>
            </Head>
            <MeetupDetails image={image} title={title} address={address} description={description} />
        </div>
    );
}
// used in dynamic pages
// tells for which dynamic value this page should be pregenrated
export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://vaibhav:vaibhav@cluster0.xxhpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();
    const meetupcollection = db.collection('meetups');
    const meetups = await meetupcollection.find({}, { _id: 1 }).toArray() // each will contain id
    client.close()
    return {
        fallback: false,// to indicate all supported paths to generate some or most popular pages
        // except below meetup id all othwer id will get 404 error
        // here we had take all id from mongo and map them to pregenrate dynamic page
        paths: meetups.map(meetup => (
            {
                params: { meetupId: meetup._id.toString() }
            }
        ))
    }
}
// here we are using getstatic props because meetup data not changes very often
export const getStaticProps = async (context) => {

    // fetch data for single meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://vaibhav:vaibhav@cluster0.xxhpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();
    const meetupcollection = db.collection('meetups');
    // here we used ObjectId because right now id is in string form but mongo has it in ObjectId type
    const selectedmeetup = await meetupcollection.findOne({ _id: ObjectId(meetupId) }) // each will contain id
    client.close()
    console.log(meetupId); // this console is only visible in terminal not in browser console because these run on server side
    return {
        props: {
            meetupData: {
                // again converting id to string
                id: selectedmeetup._id.toString(),
                title: selectedmeetup.title,
                image: selectedmeetup.image,
                description: selectedmeetup.description,
                address: selectedmeetup.address,
            }
        }
    }
}

export default meetupdetail; 