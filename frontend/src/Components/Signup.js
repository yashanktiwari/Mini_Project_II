import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {countries} from "../utils/cityList";

const Signup = ({ retailer }) => {
  countries[0].name = "India";


  const [country, setCountry] = useState("--Country--");
  const [state, setState] = useState("--State--");
  const [city, setCity] = useState("--City--");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(countries.find((ctr) => ctr.name === event.target.value).states);
  };

  const [showimg, setShowimg] = useState("");

  const changeState = (event) => {
    setState(event.target.value);
    setCities(states.find((state) => state.name === event.target.value).cities);
  };
  function changeCity(event) {
    setCity(event.target.value);
  }

  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [altPhone, setAltPhone] = useState("");

  // Additional Account Details
  // const [acHolderName, setAcName] = useState("");
  // const [acNumber, setAcNumber] = useState("");
  // const [ifsCode, setIfsCode] = useState("");

  const navigate = useNavigate();

  const inputRef = useRef();
  const [img, setImg] = useState([]);

  const handleSignUp = (e) => {
    e.preventDefault();

    if(fName.length == 0 || lName.length == 0 || email.length == 0 || phone.length == 0 || state.length === 0 || city.length === 0 || address.length === 0 || pin.length === 0 || gender.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      toast.error("Please fill all the fields");
    } else {
      if(password === confirmPassword) {
        toast.success("Signing you up");
        if (retailer) {
          axios
              .post("/signupr", {
                fName,
                lName,
                email,
                phone,
                altPhone,
                state,
                city,
                address,
                pin,
                gender,
                password,
                profile_image: img,
                retailer,
              })
              .then((obj) => {
                if (obj.data.error) {
                  toast.error("User already present");
                } else {
                  toast.success("Sign up successful");
                  navigate("/");
                }
              })
              .catch((error) => {
                console.log(error);
              });
        } else {
          axios
              .post("/signupu", {
                fName,
                lName,
                email,
                phone,
                altPhone,
                state,
                city,
                address,
                pin,
                gender,
                password,
                profile_image: img,
                retailer,
              })
              .then((obj) => {
                if (obj.data.error) {
                  toast.error("User already present");
                } else {
                  toast.success("Sign up successful");
                  navigate("/");
                }
              })
              .catch((error) => {
                console.log(error);
              });
        }
      } else {
        toast.error("Password and Confirm Password are not matching");
      }
    }
  };

  const setFiletoBase = (file) => {
    const reader = new FileReader();

    // Reader is reading the file
    reader.readAsDataURL(file);

    // Once the reading is completed, onloadend is triggered
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const acceptedTypes = ["image/jpeg", "image/png"];

  const handleImageSubmission = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      // Checking if the file is an image or not
      if (acceptedTypes.includes(image["type"])) {
        setFiletoBase(image);
        setShowimg({
          image: URL.createObjectURL(image),
        });
      } else {
        setImg([]);
      }
    }
  };

  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  const [verified, setVerified] = useState(false);

  const [number, setNumber] = useState("");
  return (
    <>
      <div className="bg-grey-lighter flex flex-col mx-auto w-[70%]">
        <h1 className="text-4xl font-semibold text-white mx-auto text-center my-5">
          Signup Page
        </h1>


        <form onSubmit={handleSignUp}>
          <div className="mx-auto grid grid-rows-1 mb-2">
              <div className="border-b border-gray-900/10 grid-cols-2">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                          <div className="col-span-2 px-[2rem] grid place-items-center">
                              <div
                                  id="profile-container"
                                  className="mt-4 cursor-pointer border-white border-2 bg-gray-200"
                                  onClick={() => {
                                      inputRef.current.click();
                                  }}
                              >
                                  {showimg && (
                                      <img
                                          src={showimg.image}
                                          alt="Profile"
                                          id="profileImage"
                                          className="h-[100%] w-[100%]"
                                      />
                                  )}
                              </div>
                              <br />
                              <label className="text-white text-sm font-semibold">
                                  Upload your Picture Here
                              </label>

                              <input
                                  type="file"
                                  name="profile-file"
                                  className={"hidden"}
                                  ref={inputRef}
                                  onChange={handleImageSubmission}
                              />
                          </div>

                          <div className="grid-rows-1 col-span-3 w-full sm:w-[80%] sm:ml-[2rem] md:w-[75%]">
                              <div className="sm:col-span-3 md:col-span-3 my-[24px]">
                                  <label
                                      htmlFor="first-name"
                                      className="block text-sm leading-6 text-white font-semibold"
                                  >
                                      First Name
                                  </label>
                                  <div className="mt-2">
                                      <input
                                          type="text"
                                          name="first-name"
                                          id="first-name"
                                          placeholder="First Name"
                                          autoComplete="given-name"
                                          className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          onChange={(e) => {
                                              setFname(e.target.value);
                                          }}
                                          
                                      />
                                  </div>
                              </div>

                              <div className="sm:col-span-2 md:col-span-3">
                                  <label
                                      htmlFor="last-name"
                                      className="block text-sm leading-6 text-white font-semibold"
                                  >
                                      Last Name
                                  </label>
                                  <div className="mt-2">
                                      <input
                                          type="text"
                                          name="last-name"
                                          id="last-name"
                                          placeholder="Last Name"
                                          autoComplete="family-name"
                                          className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          onChange={(e) => {
                                              setLname(e.target.value);
                                          }}
                                          
                                      />
                                  </div>
                              </div>
                          </div>
                  </div>
              </div>
          </div>


          <div className="mx-auto grid grid-rows-1">
            <div className="border-b border-gray-900/10 pb-12 grid-cols-2">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Email ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email ID"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contact"
                      placeholder="Primary Number"
                      name="contact"
                      type="contact"
                      autoComplete="contact"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Alternate Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="contact"
                      name="contact"
                      type="contact"
                      placeholder="Alternate Number"
                      autoComplete="contact"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setAltPhone(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={country}
                      onChange={changeCountry}
                    >
                      <option>--Country--</option>
                      {countries.map((ctr) => (
                        <option value={ctr.name}>{ctr.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <select
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={state}
                      onChange={changeState}
                    >
                      <option>--State--</option>
                      {states.map((state) => (
                        <option value={state.name}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="city"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <select
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={city}
                      onChange={changeCity}
                    >
                      <option>--City--</option>
                      {cities.map((city) => (
                        <option value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      placeholder=" Enter your Complete Address..."
                      className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      placeholder="PIN Code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setPin(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      placeholder=" Enter your password..."
                      className="block w-full rounded-md p-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm leading-6 text-white font-semibold"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Re-enter Passowrd"
                      autoComplete="password"
                      className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 mt-[2rem]">
                <label
                  htmlFor="gender"
                  className="block text-sm leading-6 text-white font-semibold"
                >
                  Gender
                </label>
                <span className="text-white border-2 rounded px-3 py-1 mr-[2rem]">
                  Male{"  "}
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="mt-4"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    
                  />
                </span>
                <span className="text-white border-2 rounded px-3 py-1">
                  Female{"  "}
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="mt-4"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    
                  />
                </span>
              </div>

              <button
                  type="submit"
                  className="mt-[2rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;