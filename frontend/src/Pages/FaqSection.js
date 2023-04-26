import React, { useState } from "react";
import Faq from "../Components/FAQ";
import HomeNavbar from "../Components/HomeNavbar";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";
const FaqSection = () => {
    const [open, setOpened] = useState(false);

    const toggle = (index) => {
        if (open === index) {
            return setOpened(null);
        }
        setOpened(index);
    };

    const data = [
        {
            question: "What is the process for buying a property?",
            answer:
                "The process for buying a property involves several steps, including finding a real estate agent, getting pre-approved for a mortgage, searching for properties, making an offer, and closing the deal.",
        },
        {
            question: "How do I know if a property is right for me?",
            answer:
                "When considering a property, it is important to take into account your budget, your lifestyle, and your long-term goals. You should also consider factors such as the location, the size of the property, and any potential repairs or renovations that may be needed.",
        },
        {
            question: "What should I look for in a real estate agent?",
            answer:
                "When choosing a real estate agent, it is important to consider their experience, their communication skills, and their knowledge of the local market. You should also look for an agent who is responsive, trustworthy, and who has a track record of success.",
        },
        {
            question:
                "What is the difference between a buyer's agent and a seller's agent?",
            answer:
                "A buyer's agent works with individuals who are looking to buy a property, while a seller's agent works with individuals who are looking to sell a property.",
        },
        {
            question: "How much do I need to put down for a down online payment?",
            answer:
                "The amount you'll need to put down for a down payment depends on a number of factors, including the type of mortgage you're applying for, the purchase price of the property, and your credit score. In general, however, most lenders require a down payment of at least 3-5% of the purchase price. And confirmation for property is done only by booking with a given time interval.",
        },
        {
            question: "What is a property inspection, and why is it important?",
            answer:
                "A property inspection is a thorough examination of a property's condition, performed by a licensed inspector. It's important because it can reveal any potential issues or defects with the property that may not be immediately apparent, allowing you to make an informed decision about whether or not to purchase the property.",
        },
        {
            question: "How long does it take to buy a home?",
            answer:
                "The amount of time it takes to buy a home can vary depending on a number of factors, including the local market conditions, the availability of properties that meet your criteria, and the complexity of the transaction. On average, however, the home buying process typically takes between 30 and 60 days.",
        },
    ];

    return (
        <>
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}

            <div className="bg-gray-900">
                <div className="py-10 mx-auto w-full max-w-5xl">
                    <h3 className="mb-8 text-4xl text-white text-center leading-0 font-extrabold tracking-wide sm:text-4xl sm:leading-10">
                        Frequently Asked Questions
                    </h3>
                    <hr className="border-0 border-gray-100" />

                    {data.map((item, index) => {
                        return (
                            <Faq
                                key={index}
                                open={index === open}
                                title={item.question}
                                desc={item.answer}
                                toggle={() => toggle(index)}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default FaqSection;