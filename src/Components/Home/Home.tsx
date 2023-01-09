import { useAppSelector } from "../../store/hooks";
import Hero from "../Features/Hero";
import Gallary from "./Gallary";

const Home = () => {
    const { userData } = useAppSelector((state) => (state.authenticate))

    let content;
    if ("firstName" in userData) {
        content = `Welcome ${userData.firstName}, let's get reading`
    }
    
    return (
        <>
            <Hero  title={"Book Social."} message={content}/>
            <Gallary/>
        </>
    )
}

export default Home