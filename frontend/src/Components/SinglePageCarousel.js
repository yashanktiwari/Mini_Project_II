import React, {useEffect, useState} from "react";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";

const SinglePageCarousel = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const isLastSlide = currentIndex === images.length - 1;
    //         const newIndex = isLastSlide ? 0 : currentIndex + 1;
    //         setCurrentIndex(newIndex);
    //     }, 4000)
    //     return () => {
    //         if(interval){
    //             clearInterval(interval);
    //         }
    //     };
    // }, [currentIndex]);

    return (
        <>
            <div className="h-[100%] w-[100%] m-auto relative group">
                <div
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                    className='w-full h-[35rem] rounded-2xl bg-center bg-cover duration-500'
                >
                </div>

                <div className="hidden group-hover:block hover:bg-gray-300/10 hover:text-white absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>

                {/* Right Arrow */}
                <div className="hidden group-hover:block hover:bg-gray-300/10 hover:text-white absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30}/>
                </div>


                <div className='flex top-4 justify-center py-2'>
                    {images.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer'
                        >
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default SinglePageCarousel;