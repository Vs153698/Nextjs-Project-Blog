import { useEffect, useState } from "react";
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
    console.log("homepage propps",props)
    return (
        <div>
            <MeetupList meetups={props.meetups} />
        </div>
    );
}
// we will use getstaticprops alot
// PROBLEMS
// 1: as static page is CREATED during build time so data may be outdated when we add new data it will not show it there 
// solution 1: for solving this we will use one more property of get static props is "revalidate" it takes time in seconds,using this it will automatically regenerate the page after some changes init 
    export const getStaticProps = async (props) => {
    
        return {
            props:{
                meetups:Dummy_Meetups
            },
            revalidate:10,
        }
    }
    export default index;