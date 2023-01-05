import Hero from "../Features/Hero";
import Gallary from "./Gallary";

const Home = () => {

    return (
        <>
            <Hero buttonSeen={false}/>
            <Gallary/>
        </>
    )
}

export default Home