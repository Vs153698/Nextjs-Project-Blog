
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
const newmeetup = () => {
    const Router = useRouter()
    async function addMeetupHnadler(enteredmeetupdata) {
        const response = await axios.post('/api/new-meetup',enteredmeetupdata)
        console.log("data added",response);
        // we can add loader also
        Router.push('/')
    }
    return (
        <>
        <Head>
            <title>Create Meetup</title>
            <meta  name='description' content='Add your own meetups and create amazing networking oppotunities'/>
        </Head>
            <NewMeetupForm onAddMeetup={addMeetupHnadler} />
        </>
    );
}

export default newmeetup; 