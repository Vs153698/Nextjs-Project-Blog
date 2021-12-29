
import NewMeetupForm from "../components/meetups/NewMeetupForm";
const newmeetup = () => {
    function addMeetupHnadler(enteredmeetupdata) {
        console.log(enteredmeetupdata)
    }
    return (
        <>
            <NewMeetupForm onAddMeetup={addMeetupHnadler} />
        </>
    );
}

export default newmeetup;