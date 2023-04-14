import Signup from "../Components/Signup";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";

const SignupPage = ({retailer}) => {

    return (
        <>
            <HomeNavbar/>
            <section className="bg-gray-900">
            {/* Write the html code here */}
            <Signup retailer={retailer}/>
            </section>
            <Footer/>
        </>
    )
};

export default SignupPage;