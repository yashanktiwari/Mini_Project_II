import React, {useEffect, useState} from "react";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
// import {RxDotFilled} from "react-icons/rx";


const DashboardCarousel = () => {
    const slides = [
        {
            url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/3288102/pexels-photo-3288102.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            url: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }


    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const isLastSlide = currentIndex === slides.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }, 4000)
        return () => {
            if(interval){
                clearInterval(interval);
            }
        };
    }, [currentIndex]);


    return (
        <>
            <div className="h-[350px] pb-8 w-full m-auto relative group">
                <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="w-full h-full bg-center bg-cover duration-500">
                </div>

                {/*Left Arrow*/}
                <div className="hidden group-hover:block hover:bg-gray-300/10 hover:text-white absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>
                {/*Right Arrow*/}
                <div className="hidden group-hover:block hover:bg-gray-300/10 hover:text-white absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30}/>
                </div>
                {/*<div className="flex top-4 justify-center py-2">*/}
                {/*    {*/}
                {/*        slides.map((slide, slideIndex) => (*/}
                {/*            <div key={slideIndex} onClick={() => goToSlide(slideIndex) } className="text-2xl cursor-pointer ">*/}
                {/*                <RxDotFilled/>*/}
                {/*            </div>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </>
    )
 }

 export default DashboardCarousel;