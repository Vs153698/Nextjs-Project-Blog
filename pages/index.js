import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
const Dummy_Meetups = [
    {
        id: "m1",
        title: "My First Meetup",
        image: "https://wallpaperaccess.com/full/411012.jpg",
        address: "Kota, Rajasthan",
        description: "This is first meetup"
    },
    {
        id: "m2",
        title: "My Second Meetup",
        image: "https://cdn.wallpapersafari.com/9/19/wkeJtK.jpg",
        address: "Kota, Rajasthan",
        description: "This is Second meetup"
    },
    {
        id: "m3",
        title: "My Third Meetup",
        image: "https://images.wallpaperscraft.com/image/single/street_night_wet_155637_1920x1080.jpg",
        address: "Kota, Rajasthan",
        description: "This is Third meetup"
    },
    {
        id: "m4",
        title: "My Fourth Meetup",
        image: "https://wallpaperaccess.com/full/215112.jpg",
        address: "Kota, Rajasthan",
        description: "This is Fourth meetup"
    },
    {
        id: "m5",
        title: "My Fifth Meetup",
        image: "https://images3.alphacoders.com/823/thumb-1920-82317.jpg",
        address: "Kota, Rajasthan",
        description: "This is Fifth meetup"
    },
]
const index = (props) => {
    // when we use this there are two re render cycle initial loadmeetups will be an empty array and then in next re render data comes there so this will affect the seo as there is no data when page renders for this just view page source and u can see that there is no data available there
    // after using getstaticprop we no longer need state and efect because know we are getting data using props
    // const [loadMeetups, setLoadMeetups] = useState([])
    // useEffect(() => {  
    //     setLoadMeetups(Dummy_Meetups)  
    // }, [])
    console.log("homepage propps", props)
    return (
        <div>
            <Head>
                <title>React Title</title>
                <meta  name='description' content='Browse a huge list of highly active blogs'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </div>
    );
}
// we will use getstaticprops alot
// PROBLEMS
// 1: as static page is CREATED during build time so data may be outdated when we add new data it will not show it there 
// solution 1: for solving this we will use one more property of get static props is "revalidate" it takes time in seconds,using this it will automatically regenerate the page after some changes init 
// 2: sometimes we need to regenrate the page for everyincoming request not on the build side not every couple of seconds
// solution 2: for solving this we will use getServerSideProps this does not require to run npm run build again and again
// export const getServerSideProps = async (context) => {
//     // we can also fetch data here using api also
//     // we can also use this for authentication because this code only runs on server side so it will not expose anything to client
//     // we cannot use revalidate here because serversideprops update page for everyincoming request
//     // here we also get access to request and response which we can use during authentication for checking session cookie
//     // we had to wait for page to be genrated for every incoming request
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: Dummy_Meetups
//         }
//     }
// }
// if we dont have data which regulary changes and also where we dont need to access request and response getstaticprops is beeter option to use 
export const getStaticProps = async (props) => {
    // as we are running this on server side so here we do not require api to make request we cant directly write code to fetch here.
    // on client side  client cannot se the mongoclient import 
    const client = await MongoClient.connect('mongodb+srv://vaibhav:vaibhav@cluster0.xxhpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();
    const meetupcollection = db.collection('meetups')
    const data = await meetupcollection.find().toArray();
    client.close()
    return {
        props:{
            meetups:data.map(meetup=>({
                title: meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()

            }))
        },
        // update page regulary
        revalidate:1,
    }
}
export default index;