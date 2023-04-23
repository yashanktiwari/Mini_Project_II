// import React from 'react';
import "../css/FAQ.css";
import React, { useState } from "react";
import styled from "styled-components";
import HomeNavbar from "../Components/HomeNavbar";
import CommonNavbar from "../Components/CommonNavbar";
import Footer from "../Components/Footer";

const FaqSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const FaqHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FaqContainer = styled.div`
  width: 100%;
  max-width: 768px;
`;

const FaqItem = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  cursor: pointer;
`;

const FaqQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: bold;
`;

const FaqAnswer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  margin-top: 0.5rem;
`;

const FaqDropdown = () => {
    const [faqList, setFaqList] = useState([
        {
            id: 1,
            question: "What is the process for buying a property?",
            answer:
                "The process for buying a property involves several steps, including finding a real estate agent, getting pre-approved for a mortgage, searching for properties, making an offer, and closing the deal.",
            isOpen: false,
        },
        {
            id: 2,
            question: "How do I know if a property is right for me?",
            answer:
                "When considering a property, it is important to take into account your budget, your lifestyle, and your long-term goals. You should also consider factors such as the location, the size of the property, and any potential repairs or renovations that may be needed.",
            isOpen: false,
        },
        {
            id: 3,
            question: "What should I look for in a real estate agent?",
            answer:
                "When choosing a real estate agent, it is important to consider their experience, their communication skills, and their knowledge of the local market. You should also look for an agent who is responsive, trustworthy, and who has a track record of success.",
            isOpen: false,
        },
        {
            id: 4,
            question: "What is the difference between a buyer's agent and a seller's agent?",
            answer:
                "A buyer's agent works with individuals who are looking to buy a property, while a seller's agent works with individuals who are looking to sell a property.",
            isOpen: false,
        },
        {
            id: 5,
            question: "How much do I need to put down for a down online payment?",
            answer:
                "The amount you'll need to put down for a down payment depends on a number of factors, including the type of mortgage you're applying for, the purchase price of the property, and your credit score. In general, however, most lenders require a down payment of at least 3-5% of the purchase price. And confirmation for property is done only by booking with a given time interval.",
            isOpen: false,
        },
        {
            id: 6,
            question: "What is a property inspection, and why is it important?",
            answer:
                "A property inspection is a thorough examination of a property's condition, performed by a licensed inspector. It's important because it can reveal any potential issues or defects with the property that may not be immediately apparent, allowing you to make an informed decision about whether or not to purchase the property.",
            isOpen: false,
        },
        {
            id: 7,
            question: "How long does it take to buy a home?",
            answer:
                "The amount of time it takes to buy a home can vary depending on a number of factors, including the local market conditions, the availability of properties that meet your criteria, and the complexity of the transaction. On average, however, the home buying process typically takes between 30 and 60 days.",
            isOpen: false,
        },
        {
            id: 8,
            question: "What is a pre-approval letter, and why do I need one?",
            answer:
                "A pre-approval letter is a document from a lender that indicates how much money you are qualified to borrow. It's important because it demonstrates to sellers that you are a serious buyer and that you have the financial means to purchase the property.",
            isOpen: false,
        },

    ]);

    const handleFaqClick = (id) => {
        const updatedFaqList = faqList.map((faq) => {
            if (faq.id === id) {
                return {
                    ...faq,
                    isOpen: !faq.isOpen,
                };
            }
            return faq;
        });
        setFaqList(updatedFaqList);
    };

    return (
        <>
            {localStorage.getItem("isLoggedIn") == null ? <HomeNavbar /> : <CommonNavbar />}
            <div className="mains">
                <FaqSection>
                    <FaqHeader>Frequently Asked Questions</FaqHeader>
                    <FaqContainer>
                        {faqList.map((faq) => (
                            <FaqItem key={faq.id} onClick={() => handleFaqClick(faq.id)}>
                                <FaqQuestion>
                                    {faq.question}
                                    {faq.isOpen ? "" : ""}
                                </FaqQuestion>
                                <FaqAnswer isOpen={faq.isOpen}>{faq.answer}</FaqAnswer>
                            </FaqItem>
                        ))}
                    </FaqContainer>
                </FaqSection>
            </div>
            <Footer/>
        </>
    );
};

export default FaqDropdown;