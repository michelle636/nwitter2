import { collection, getDocs } from "firebase/firestore";
import { dbService, dbAddDoc, dbCollection } from "../fbInstance";
import React, {useEffect, useState} from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        // const dbNweets = dbCollection("nweets").get();
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const docRef = await dbAddDoc(dbCollection(dbService, "nweets"),{
                nweet,
                createAt : Date.now(),
            });
            console.log("Document written with ID:", docRef);
        } catch(error){
            console.log("Error adding document:", error);
        }
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNweet(value);
    };
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type="submit" value="Nweet"></input>
            </form>
            <div>
                {nweets.map(nweet => <div key={nweet.id}>
                    <h4>{nweet.nweet}</h4>
                    </div>
                    )}
            </div>
        </div>
    );
};
export default Home;