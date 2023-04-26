import React from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Faq = ({ open, toggle, title, desc }) => {
    return (
        <div className="d-flex items-center">
            <div className="shadow rounded bg-gray-800 mt-5 cursor-pointer">
                <div className="p-4 text-xl relative font-medium">
                    <div className="w-5/6 text-sky-300 text-2xl tracking-normal" onClick={toggle}>
                        {title}
                    </div>
                    <button
                        aria-label="question-expanded"
                        className="text-xl absolute top-0 right-0 p-4 focus:outline-none"
                        onClick={toggle}
                    >
                        {open ? (
                            <FontAwesomeIcon
                                icon={faChevronUp}
                                className="w-5 text-white"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} className="text-white" />
                        )}
                    </button>
                </div>

                <Collapse isOpened={open}>
                    <hr className="h-[2px] bg-gray-200 mt-2 mb-1 border-0 dark:bg-gray-700"/>
                    <div className="text-white p-5 text-xl tracking-wide">{desc}</div>
                </Collapse>
            </div>
        </div>
    );
};

export default Faq;