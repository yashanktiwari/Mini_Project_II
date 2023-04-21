import React, {useState, useRef, useCallback, useEffect} from 'react';
import PropTypes from "prop-types";
import "../css/multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, dispKey, setMinimumValue, setMaximumValue }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [displayKey, setDisplayKey] = useState(dispKey);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);



    // Get min and max values when their state changes
    useEffect(() => {
        //onChange({ min: minVal, max: maxVal });
        //console.log("minVal, maxVal:", minVal, maxVal);
        // console.log("min:", minVal, " max:", maxVal);
        setMinimumValue(minVal);
        setMaximumValue(maxVal);
    }, [minVal, maxVal, onChange]);

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                // ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(event.target.value, maxVal);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />
            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
            </div>
            <div className="values">
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__key" onLoad={() => {setDisplayKey(dispKey)}}>{displayKey}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>

        </>
    )
 }

// Set the type of each prop
MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

 export default MultiRangeSlider;