
import axios from "axios";
import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
const newmeetup = () => {
    const router = useRouter()
    async function addMeetupHnadler(enteredmeetupdata) {
        const response = await axios.post('/api/new-meetup',enteredmeetupdata)
        console.log("data added",response);
        // we can add loader also
        router.push('/')
    }
    return (
        <>
            <NewMeetupForm onAddMeetup={addMeetupHnadler} />
        </>
    );
}

export default newmeetup; 