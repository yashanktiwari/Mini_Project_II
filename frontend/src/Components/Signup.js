import {useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/SignUp.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({retailer}) => {

    const countries = [
        {
            name: "India",
            states: [
                {
                    name: "Andaman and Nicobar",
                    cities: ["Port Blair"],
                },
                {
                    name: "Andhra Pradesh",
                    cities: [
                        "Adoni", "Amaravati", "Anantpur", "Chandragiri", "Chittoor", "Dowlaiswaram", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", "Nagarjunakonda", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram", "Yemmiganur",
                    ],
                },
                {
                    name: "Arunachal Pradesh",
                    cities: [
                        "Itanagar"
                    ]
                    ,
                },
                {
                    name: "Assam",
                    cities: [
                        "Dhuburi", "Dibrugarh", "Dispur", "Guwahati", "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia",
                    ],
                },
                {
                    name: "Bihar",
                    cities: [
                        "Ara", "Barauni", "Begusarai", "Bettiah", "Bhagalpur", "Bihar Sharif", "Bodh Gaya", "Buxar", "Chapra", "Darbhanga", "Dehri", "Dinapur Nizamat", "Gaya", "Hajipur", "Jamalpur", "Katihar", "Madhubani", "Motihari", "Munger", "Muzaffarpur", "Patna", "Purnia", "Pusa", "Saharsa", "Samastipur", "Sasaram", "Sitamarhi", "Siwan",
                    ],
                },
                {
                    name: "Chhattisgarh",
                    cities: [
                        "Ambikapur", "Bhilai", "Bilaspur", "Dhamtari", "Durg", "Jagdalpur", "Raipur", "Rajnandgaon",
                    ],
                },
                {
                    name: "Dadra and Nagar Haveli",
                    cities: [
                        "Daman", "Diu", "Silvassa"
                    ],
                },
                {
                    name: "New Delhi",
                    cities: [
                        "Delhi", "New Delhi"
                    ],
                },
                {
                    name: "Goa",
                    cities: [
                        "Madgaon", "Panaji"
                    ],
                },
                {
                    name: "Gujarat",
                    cities: [
                        "Ahmedabad", "Amreli", "Bharuch", "Bhavnagar", "Bhuj", "Dwarka", "Gandhinagar", "Godhra", "Jamnagar", "Junagadh", "Kandla", "Khambhat", "Kheda", "Mahesana", "Morbi", "Nadiad", "Navsari", "Okha", "Palanpur", "Patan", "Porbandar", "Rajkot", "Surat", "Surendranagar", "Valsad", "Veraval",
                    ],
                },
                {
                    name: "Haryana",
                    cities: [
                        "Ambala", "Bhiwani", "Chandigarh", "Faridabad", "Firozpur Jhirka", "Gurugram", "Hansi", "Hisaar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Panipat", "Pehowa", "Rewari", "Rohtak", "Sirsa", "Sonipat",
                    ],
                },
                {
                    name: "Himachal Pradesh",
                    cities: [
                        "Bilaspur", "Chamba", "Dalhousie", "Dharmshala", "Hamirpur", "Kangra", "Kullu", "Mandi", "Nahan", "Shimla", "Una",],
                },
                {
                    name: "Jammu and Kashmir",
                    cities: [
                        "Anantnag", "Baramula", "Doda", "Gulmarg", "Jammu", "Kathua", "Punch", "Rajouri", "Srinagar", "Udhampur",
                    ],
                },
                {
                    name: "Jharkhand",
                    cities: [
                        "Bokaro", "Chaibasa", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Hazaribagh", "Jamshedpur", "Jhaeia", "Rajmahal", "Ranchi", "Saraikela",
                    ],
                },
                {
                    name: "Karnataka",
                    cities: [
                        "Badami", "Ballari", "Bengaluru", "Belagavi", "Bhadravati", "Bidar", "Chikamagaluru", "Chitradurga", "Devangere", "Halebid", "Hassan", "Hubbali-Dharwad", "Kalaburagi", "Kolar", "Madikeri", "Mandya", "Mangaluru", "Mysuru", "Raichur", "Shiamogga", "Shravanabelagola", "Shrirangapattana", "Tumakuru", "Vijayapura",
                    ],
                },
                {
                    name: "Kerala",
                    cities: [
                        "Alappuzha", "Vatakara", "Idukki", "Kannur", "Kochi", "Kollam", "Kottayam", "Kozhikode", "Mattancheri", "Palakkad", "Thalassery", "Thiruvananthapuram", "Thrissur"
                    ],
                },
                {
                    name: "Ladakh",
                    cities: [
                        "Kargil", "Leh"
                    ],
                },
                {
                    name: "Madhya Pradesh",
                    cities: [
                        "Balaghat", "Barwani", "Betul", "Bharhut", "Bhind", "Bhojpur", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dr. Ambedkar Nagar (Mhow)", "Guna", "Gwalior", "Hoshangabad", "Indore", "Itarsi", "Jabalpur", "Jhabua", "Khajuraho", "Khandwa", "Khargone", "Maheshwar", "Mandla", "Mandsaur", "Morena", "Murwara", "Narsimhapur", "Narsinghgarh", "Narwar", "Neemuch", "Nowgong", "Orchha", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Sarangpur", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Ujjain", "Vidisha",
                    ],
                },
                {
                    name: "Maharashtra",
                    cities: [
                        "Ahmadnagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Bhusawal", "Bid", "Buldhana", "Chandrapur", "Daulatabad", "Dhule", "Jalgaon", "Kalyan", "Karli", "Kolhapur", "Mahabaleshwar", "Malegaon", "Matheran", "Mumbai", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Pandharpur", "Parbhani", "Pune", "Ratnagiri", "Sangli", "Satara", "Sevagram", "Solapur", "Thane", "Ulhasnagar", "Vasai-Virar", "Wardha", "Yavatmal"
                    ]
                },
                {
                    name: "Manipur",
                    cities: [
                        "Imphal"
                    ]
                },
                {
                    name: "Meghalaya",
                    cities: [
                        "Cherapunji", "Shillong"
                    ]
                },
                {
                    name: "Mizoram",
                    cities: [
                        "Aizwal", "Lunglei"
                    ]
                },
                {
                    name: "Nagaland",
                    cities: [
                        "Kohima", "Mon", "Phek", "Wokha", "Zunheboto"
                    ]
                },
                {
                    name: "Odisha",
                    cities: [
                        "Balangir", "Baleshwar", "Baripada", "Bhubaneshwar", "Brahmapur", "Cuttack", "Dhenkanal", "Kendujhar", "Konark", "Koraput", "Paradip", "Phulabani", "Puri", "Sambalpur", "Udayagiri"
                    ]
                },
                {
                    name: "Puducherry",
                    cities: [
                        "Karaikal", "Mahe", "Puducherry", "Yanam"
                    ]
                },
                {
                    name: "Punjab",
                    cities: [
                        "Amritsar", "Batala", "Chandigarh", "Faridkot", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Nabha", "Patiala", "Rupnagar", "Sangrur"
                    ],
                },
                {
                    name: "Rajasthan",
                    cities: [
                        "Abu", "Ajmer", "Alwar", "Amer", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittaurgarh", "Churu", "Dhaulpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Kishangarh", "Kota", "Merta", "Nagaur", "Nathdwara", "Pali", "Phalodi", "Pushkar", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"
                    ],
                },
                {
                    name: "Sikkim",
                    cities: [
                        "Gangatok", "Gyalshing", "Lachung", "Mangan"
                    ]
                },
                {
                    name: "Tamil Nadu",
                    cities: [
                        "Arcot", "Chengalpattu", "Chennai", "Chidambaram", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanniyakumari", "Kodaikanal", "Kumbakonam", "Madurai", "Mamallapuram", "Nagappattinam", "Nagercoil", "Palayamkottai", "Pudukkottai", "Rajapalayam", "Ramanathapuram", "Salem", "Thanjavur", "Tiruchchirappalli", "Tirunelveli", "Tiruppur", "Thoothukudi", "Udhagamandalam", "Vellore"
                    ],
                },
                {
                    name: "Telangana",
                    cities: [
                        "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nizamabad", "Sangareddi", "Warangal"
                    ]
                },
                {
                    name: "Tripura",
                    cities: [
                        "Agartala"
                    ]
                },
                {
                    name: "Uttar Pradesh",
                    cities: [
                        "Agra", "Aligarh", "Amroha", "Ayodhya", "Azamgarh", "Bahraich", "Ballia", "Banda", "Bara Banki", "Bareilly", "Basti", "Bijnor", "Bithur", "Budaun", "Bulandshahr", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad-cum-Fatehgarh", "Fatehpur", "Fatehpur Sikri", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Lakhimpur", "Lalitpur", "Lucknow", "Mainpuri", "Mathura", "Meerut", "Mirzapur-Vindhyachal", "Moradabad", "Muzaffarnagar", "Partapgarh", "Pilibhit", "Prayagraj", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Shahjahanpur", "Sitapur", "Sultanpur", "Tehri", "Varanasi"
                    ],
                },
                {
                    name: "Uttarakhand",
                    cities: [
                        "Almora", "Dehra Dun", "Haridwar", "Mussoorie", "Nainital", "Pithoragarh"
                    ],
                },
                {
                    name: "West Bengal",
                    cities: [
                        "Alipore", "Alipur Duar", "Asansol", "Baharampur", "Bally", "Balurghat", "Bankura", "Baranagar", "Barasat", "Barrackpore", "Basirhat", "Bhatpara", "Bishnupur", "Budge Budge", "Burdwan", "Chandernagore", "Darjeeling", "Diamond Harbour", "Dum Dum", "Durgapur", "Halisahar", "Haora", "Hugli", "Ingraj Bazar", "Jalpaiguri", "Kalimpong", "Kamarhati", "Kanchrapara", "Kharagpur", "Cooch Behar", "Kolkata", "Krishnanagar", "Malda", "Midnapore", "Murshidabad", "Nabadwip", "Palashi", "Panihati", "Purulia", "Raiganj", "Santipur", "Shantiniketan", "Shrirampur", "Siliguri", "Siuri", "Tamluk", "Titagarh"
                    ],
                },
            ],
        },
    ];

    const [country, setCountry] = useState("--Country--");
    const [state, setState] = useState("--State--");
    const [city, setCity] = useState("--City--");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const changeCountry = (event) => {
        setCountry(event.target.value);
        setStates(countries.find((ctr) => ctr.name === event.target.value).states);
    };
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
    const [acHolderName, setAcName] = useState("");
    const [acNumber, setAcNumber] = useState("");
    const [ifsCode, setIfsCode] = useState("");


    const navigate = useNavigate();

    const inputRef = useRef();
    const [img, setImg] = useState([]);

    const handleSignUp = (e) => {
        e.preventDefault();
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
                    acNumber,
                    acHolderName,
                    ifsCode
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
                    retailer
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
    };

    const setFiletoBase = (file) => {
        const reader = new FileReader();

        // Reader is reading the file
        reader.readAsDataURL(file);

        // Once the reading is completed, onloadend is triggered
        reader.onloadend = () => {
            setImg(reader.result);
        }

    }

    const acceptedTypes = ['image/jpeg', 'image/png'];

    const handleImageSubmission = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            // Checking if the file is an image or not
            if(acceptedTypes.includes(image['type'])) {
                setFiletoBase(image);
            } else {
                setImg([]);
            }
        }
    };

    return (
        <>
            <div className="bg-grey-lighter flex flex-col mx-auto w-[70%]">
                <h1 className="text-4xl font-semibold text-white mx-auto text-center my-5">
                    Signup Page
                </h1>

                <form onSubmit={handleSignUp}>
                    <div className="mx-auto grid grid-cols-6">
                        <div className="pb-2 col-span-2 pl-[5rem]">
                            <div
                                id="profile-container"
                                className="mt-4 cursor-pointer border-white border-2 bg-gray-200"
                                onClick={() => {
                                    inputRef.current.click();
                                }}
                            >
                                {img && (
                                    <img
                                        src={img.img}
                                        alt="Profile"
                                        id="profileImage"
                                        className="h-[100%] w-[100%]"
                                    />
                                )}
                            </div>
                            <br/>
                            <label className="text-white text-sm font-semibold">Upload your Picture Here</label>
                            <br/>
                            <br/>
                            <input
                                type="file"
                                name="profile-file"
                                className={"hidden"}
                                ref={inputRef}
                                onChange={handleImageSubmission}
                                required
                            />
                        </div>

                        <div className="md:col-span-3 ml-[4rem]">
                            <div className="sm:col-span-2 md:col-span-3 my-[2rem]">
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
                                        required
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
                                        required
                                    />
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
                                            required
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
                                            required
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
                                            required
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
                                            className="
                    w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                            className="w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                            className="w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                            required
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
                                            required
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
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                { retailer ? (
                                    <>
                                        <h3 className="text-white col-span-full text-3xl font-semibold mt-4">Additional Account Details</h3>
                                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 col-span-full"/>
                                    </>
                                ) : null }

                                { retailer ? (
                                    <>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="acHolderName"
                                                className="block text-sm leading-6 text-white font-semibold"
                                            >
                                                Account Holder Name
                                            </label>
                                            <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="acHolderName"
                                                    id="acHolderName"
                                                    placeholder="A/C Holder Name"
                                                    autoComplete="acHolderName"
                                                    className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    onChange={(e) => {
                                                        setAcName(e.target.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="acNumber"
                                                className="block text-sm leading-6 text-white font-semibold"
                                            >
                                                Account Number
                                            </label>
                                            <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="acNumber"
                                                    id="acNumber"
                                                    placeholder="A/C Number"
                                                    autoComplete="acNumber"
                                                    className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    onChange={(e) => {
                                                        setAcNumber(e.target.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="ifsCode"
                                                className="block text-sm leading-6 text-white font-semibold"
                                            >
                                                IFS Code
                                            </label>
                                            <div className="mt-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="ifsCode"
                                                    id="ifsCode"
                                                    placeholder="IFS Code"
                                                    autoComplete="ifsCode"
                                                    className="block w-full rounded-md p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    onChange={(e) => {
                                                        setIfsCode(e.target.value);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>

                                ) : null }

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
                                        required
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
                                        required
                                    />
                                </span>
                            </div>

                            {password.length && password === confirmPassword ? (
                                    <button
                                        type="submit"
                                        className="mt-[2rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={handleSignUp}
                                    >
                                        Sign Up
                                    </button>
                                ) :
                                <button
                                    type="button"
                                    className="mt-[2rem] text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg px-5 py-2.5 text-center"
                                    disabled>Sign Up
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;