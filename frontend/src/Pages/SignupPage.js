import Signup from "../Components/Signup";

const SignupPage = ({retailer}) => {

    return (
        <>
            <section className="bg-gray-900">
            {/* Write the html code here */}
            <Signup retailer={retailer}/>
            </section>
        </>
    )
};

export default SignupPage;