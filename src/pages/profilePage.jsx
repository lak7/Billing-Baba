import React, { useEffect, useState } from "react";
import { logout, saveUidToLocalStorage } from "../firebase";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImgUpload";
import { data } from "autoprefixer";

export default function Profile({ data, setData, change, setChange }) {
  const Navigate = useNavigate();

  const [ProfileDat, setProfileDat] = useState({
    BusinessName: data.BusinessName || "",
    GSTIN: data.GSTIN || "",
    email: data.email || "",
    mobile: data.mobile || "",
    name: data.name || "",
    address: data.address || "",
    address2: data.address2 || "",
    pincode: data.pincode || "",
    State: data.State || "",
    City: data.City || "",
    establishedYear: data.establishedYear || "",
  });

  const [gstType, setGstType] = useState("withGST");
  const [page, setPage] = useState(0);

  // Initialize logo and signature from data
  const [Logo, setLogo] = useState(data.Logo || null);
  const [Signature, setSignature] = useState(data.Signature || null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoPopup, setShowLogoPopup] = useState(false);

  // Update values when data changes externally
  useEffect(() => {
    setLogo(data.Logo || null);
    setSignature(data.Signature || null);
    setProfileDat({
      BusinessName: data.BusinessName || "",
      GSTIN: data.GSTIN || "",
      email: data.email || "",
      mobile: data.mobile || "",
      name: data.name || "",
      address: data.address || "",
      address2: data.address2 || "",
      pincode: data.pincode || "",
      State: data.State || "",
      City: data.City || "",
      establishedYear: data.establishedYear || "",
    });
  }, [data]);

  // Update logo and save to data
  const handleUploadProfileImage = (url) => {
    console.log("Logo URL received:", url);
    setLogo(url);
    const updatedData = { ...data, Logo: url };
    setData(updatedData);
    // Trigger update to localStorage if change state exists
    if (setChange) {
      setChange(!change);
    }
  };

  // Update signature and save to data
  const handleUploadSign = (url) => {
    console.log("Signature URL received:", url);
    setSignature(url);
    const updatedData = { ...data, Signature: url };
    setData(updatedData);
    // Trigger update to localStorage if change state exists
    if (setChange) {
      setChange(!change);
    }
  };

  // Clear logo
  const handleClearLogo = () => {
    setLogo(null);
    const updatedData = { ...data, Logo: null };
    setData(updatedData);
    if (setChange) {
      setChange(!change);
    }
  };

  // Clear signature
  const handleClearSignature = () => {
    setSignature(null);
    const updatedData = { ...data, Signature: null };
    setData(updatedData);
    if (setChange) {
      setChange(!change);
    }
  };

  // Handle save company data
  const handleSaveCompany = () => {
    const updatedData = {
      ...data,
      ...ProfileDat,
      Logo: Logo,
      Signature: Signature,
    };
    console.log("Saving company data:", updatedData);
    setData(updatedData);
    if (setChange) {
      setChange(!change);
    }
    alert("Company data saved successfully");
  };

  const createnewCompany = (Company) => {
    if (data.Companies) {
      if (data.Companies.length > 0) {
        let lastIndex =
          data.Companies[data.Companies.length - 1].currentCompanyIndex;
        let newCompany = {
          ...Company,
          // ...etc,
          currentCompanyIndex: lastIndex + 1,
        };
        setData({ ...data, Companies: [...data.Companies, newCompany] });
        if (setChange) {
          setChange(!change);
        }
      }
    } else {
      console.log(data);
      // console.log(data.filter((key, value) => key !== "Companies"))
      let lastComapnydat = { ...data };
      delete lastComapnydat.Companies;
      let currentCompany = {
        ...lastComapnydat,
        currentCompanyIndex: 0,
      };

      let newCompany = {
        ...Company,
        // ...etc,
        currentCompanyIndex: 1,
      };
      setData({ ...data, Companies: [currentCompany, newCompany] });
      if (setChange) {
        setChange(!change);
      }
    }
  };

  const changeCompany = (index) => {
    let tempData = { ...data };
    let currentCompanyDat = data.filter((key, value) => key !== "Companies");
    data.Companies[data.currentCompanyIndex ? data.currentCompanyIndex : 0] =
      currentCompanyDat;
    tempData = { ...tempData, ...tempData.Companies[index] };
    console.log(tempData);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex w-full justify-evenly gap-2 bg-[#f9f8f2]">
        <button
          className={`py-1 px-3 text-md font-semibold hover:bg-gray-300 border-red-500 ${
            page === 0 && "border-b-2"
          } `}
          onClick={() => {
            setProfileDat({
              BusinessName: data.BusinessName || "",
              GSTIN: data.GSTIN || "",
              email: data.email || "",
              mobile: data.mobile || "",
              name: data.name || "",
              address: data.address || "",
              address2: data.address2 || "",
              pincode: data.pincode || "",
              State: data.State || "",
              City: data.City || "",
              establishedYear: data.establishedYear || "",
            });
            setPage(0);
          }}
        >
          Current Company
        </button>
        {data.settings?.multifirm && (
          <button
            className={`py-1 px-3 text-md font-semibold hover:bg-gray-300 border-red-500 ${
              (page == 1 || page == 5) && "border-b-2"
            } `}
            onClick={() => setPage(1)}
          >
            Manage Companies
          </button>
        )}
        <button
          className={`py-1 px-3 text-md font-semibold hover:bg-gray-300 border-red-500  ${
            page === 2 && "border-b-2"
          } `}
          onClick={() => setPage(2)}
        >
          Billing & Plans
        </button>
        <button
          className={` py-1 px-3 text-md font-semibold hover:bg-gray-300 border-red-500 ${
            page === 3 && "border-b-2"
          } `}
          disabled
        >
          User & Permissions
        </button>
        <button
          className={`py-1 px-3 text-md font-semibold hover:bg-gray-300 border-red-500  ${
            page === 4 && "border-b-2"
          } `}
          disabled
        >
          My Staff
        </button>
      </div>
      <div className="w-2/3 p-3 rounded-md">
        {page === 0 && (
          <div className="w-full mt-1 mx-auto p-6 bg-white rounded-md">
            <div className="flex justify-between items-center mb-5 w-full">
              <h1 className="text-xl font-bold">User Profile</h1>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded-sm font-semibold"
                onClick={() => {
                  logout();
                  saveUidToLocalStorage("");
                  Navigate("/login");
                }}
              >
                Log Out
              </button>
            </div>
            <div className="flex justify-between w-full">
              <div className="mb-2">
                {!Logo ? (
                  <>
                    <button
                      className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                      onClick={() => {
                        setShowLogoPopup(true);
                      }}
                    >
                      <span className="hover:underline">Add Business Logo</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                    </button>
                    {showLogoPopup && (
                      <ImageUploader
                        onClose={() => setShowLogoPopup(false)}
                        onUpload={handleUploadProfileImage}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={handleClearLogo}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                    135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                          />
                        </svg>
                      </button>
                    </div>
                    <span>Business Logo</span>
                  </>
                )}
              </div>
              <div className="">
                {!Signature ? (
                  <>
                    <button
                      className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                      onClick={() => setShowPopup(true)}
                    >
                      <span className="hover:underline">Add Business Sign</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                    </button>
                    {showPopup && (
                      <ImageUploader
                        onClose={() => setShowPopup(false)}
                        onUpload={handleUploadSign}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2">
                      <img
                        src={Signature}
                        alt="Sign"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={handleClearSignature}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                  135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                          />
                        </svg>
                      </button>
                    </div>
                    <span>Business Sign</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setGstType("withGST")}
                className={`flex-1 p-2 rounded-md ${
                  gstType === "withGST"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                With GST
              </button>
              <button
                onClick={() => setGstType("nonGST")}
                className={`flex-1 p-2 rounded-md ${
                  gstType === "nonGST"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Non-GST
              </button>
            </div>

            {gstType === "withGST" && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    GSTIN (disabled)
                  </label>
                  <input
                    type="text"
                    value={ProfileDat.GSTIN}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                  <p className="text-sm text-gray-500">
                    Enter your 15 digit GSTIN number
                  </p>
                  <a href="#" className="text-blue-500 text-sm">
                    Contact Us
                  </a>
                  , if you are facing any difficulties.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.BusinessName}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          BusinessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      user Name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Alias Name"
                      value={ProfileDat.name}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 1<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: shop no 30, Anjuman Shopping Complex"
                      value={ProfileDat.address}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 2
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: marhatal, Jabalpur"
                      value={ProfileDat.address2}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Country
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Pincode<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 48xxxx"
                      value={ProfileDat.pincode}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      State
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.State}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, State: e.target.value })
                      }
                    >
                      <option value="">Select State/UT</option>
                      <optgroup label="States">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </optgroup>
                      <optgroup label="Union Territories">
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: New Delhi"
                      value={ProfileDat.City}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, City: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Mobile No.<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 7987016325"
                      value={ProfileDat.mobile}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Email
                    </label>
                    <input
                      autoComplete="off"
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="example@domain.com"
                      value={ProfileDat.email}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Established From
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Year"
                      value={ProfileDat.establishedYear}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          establishedYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {gstType === "nonGST" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.BusinessName}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          BusinessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      user Name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Alias Name"
                      value={ProfileDat.name}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 1<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: shop no 30, Anjuman Shopping Complex"
                      value={ProfileDat.address}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 2
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="marhatal, Jabalpur"
                      value={ProfileDat.address2}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Country
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Pincode<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 48xxxx"
                      value={ProfileDat.pincode}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-semibold"
                      value={ProfileDat.State}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, State: e.target.value })
                      }
                    >
                      State
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select State/UT</option>
                      <optgroup label="States">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </optgroup>
                      <optgroup label="Union Territories">
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: New Delhi"
                      value={ProfileDat.City}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, City: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Mobile No.<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="7987016325"
                      value={ProfileDat.mobile}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Email
                    </label>
                    <input
                      autoComplete="off"
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="example@domain.com"
                      value={ProfileDat.email}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Established From
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Year"
                      value={ProfileDat.establishedYear}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          establishedYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSaveCompany}
              >
                Save Company
              </button>
            </div>
          </div>
        )}
        {page === 1 && (
          <div className="w-full mt-1 mx-auto p-6 bg-white rounded-md">
            {data.Companies && (
              <>
                {data.Companies.map((company) => (
                  <div className="w-full flex justify-between my-2 items-center">
                    <span className="text-lg font-semibold">
                      {company.currentCompanyIndex + 1}
                    </span>
                    <span className="text-lg font-semibold">
                      {company.BusinessName}
                    </span>
                    <button className="bg-blue-600 text-white font-semibold p-3 rounded-md hover:shadow-md">
                      Switch to this company
                    </button>
                  </div>
                ))}
              </>
            )}
            <div className="w-full flex justify-center items-center">
              <button
                className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:shadow-md"
                onClick={() => {
                  setProfileDat({
                    BusinessName: "",
                    GSTIN: "",
                    email: "",
                    mobile: "",
                    name: "",
                    address: "",
                    address2: "",
                    pincode: "",
                    State: "",
                    City: "",
                    establishedYear: "",
                  });
                  setPage(5);
                }}
              >
                Create another company
              </button>
            </div>
          </div>
        )}
        {page === 5 && (
          <div className="w-full mt-1 mx-auto p-6 bg-white rounded-md">
            <div className="flex justify-between w-full">
              <div className="mb-2">
                {!Logo ? (
                  <>
                    <button
                      className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                      onClick={() => setShowLogoPopup(true)}
                    >
                      <span className="hover:underline">Add Business Logo</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                    </button>
                    {showLogoPopup && (
                      <ImageUploader
                        onClose={() => setShowLogoPopup(false)}
                        onUpload={handleUploadProfileImage}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={handleClearLogo}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                    135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                          />
                        </svg>
                      </button>
                    </div>
                    <span>Business Logo</span>
                  </>
                )}
              </div>
              <div className="mb-2">
                {!Signature ? (
                  <>
                    <button
                      className="text-blue-400 font-semibold mx-2 items-center fill-blue-400 flex gap-1"
                      onClick={() => setShowPopup(true)}
                    >
                      <span className="hover:underline">Add Business Sign</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                      </svg>
                    </button>
                    {showPopup && (
                      <ImageUploader
                        onClose={() => setShowPopup(false)}
                        onUpload={handleUploadSign}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative my-2">
                      <img
                        src={Signature}
                        alt="Sign"
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={handleClearSignature}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 85.9l11.1-11.6c9.4-10.5 9.4-27.7 0-39.2L
                  135.2 17.7zM32 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32S14.3 32 32 32z"
                          />
                        </svg>
                      </button>
                    </div>
                    <span>Business Sign</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setGstType("withGST")}
                className={`flex-1 p-2 rounded-md ${
                  gstType === "withGST"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                With GST
              </button>
              <button
                onClick={() => setGstType("nonGST")}
                className={`flex-1 p-2 rounded-md ${
                  gstType === "nonGST"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Non-GST
              </button>
            </div>

            {gstType === "withGST" && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">
                    GSTIN (disabled)
                  </label>
                  <input
                    type="text"
                    value={ProfileDat.GSTIN}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                  <p className="text-sm text-gray-500">
                    Enter your 15 digit GSTIN number
                  </p>
                  <a href="#" className="text-blue-500 text-sm">
                    Contact Us
                  </a>
                  , if you are facing any difficulties.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.BusinessName}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          BusinessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      user Name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Alias Name"
                      value={ProfileDat.name}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 1<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: shop no 30, Anjuman Shopping Complex"
                      value={ProfileDat.address}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 2
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: marhatal, Jabalpur"
                      value={ProfileDat.address2}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Country
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Pincode<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 48xxxx"
                      value={ProfileDat.pincode}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      State
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.State}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, State: e.target.value })
                      }
                    >
                      <option value="">Select State/UT</option>
                      <optgroup label="States">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </optgroup>
                      <optgroup label="Union Territories">
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: New Delhi"
                      value={ProfileDat.City}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, City: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Mobile No.<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 7987016325"
                      value={ProfileDat.mobile}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Email
                    </label>
                    <input
                      autoComplete="off"
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="example@domain.com"
                      value={ProfileDat.email}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Established From
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Year"
                      value={ProfileDat.establishedYear}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          establishedYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {gstType === "nonGST" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={ProfileDat.BusinessName}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          BusinessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      user Name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Alias Name"
                      value={ProfileDat.name}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 1<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: shop no 30, Anjuman Shopping Complex"
                      value={ProfileDat.address}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address Line 2
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="marhatal, Jabalpur"
                      value={ProfileDat.address2}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          address2: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Country
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Pincode<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: 48xxxx"
                      value={ProfileDat.pincode}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-semibold"
                      value={ProfileDat.State}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, State: e.target.value })
                      }
                    >
                      State
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select State/UT</option>
                      <optgroup label="States">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </optgroup>
                      <optgroup label="Union Territories">
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="eg: New Delhi"
                      value={ProfileDat.City}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, City: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Mobile No.<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="7987016325"
                      value={ProfileDat.mobile}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Email
                    </label>
                    <input
                      autoComplete="off"
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="example@domain.com"
                      value={ProfileDat.email}
                      onChange={(e) =>
                        setProfileDat({ ...ProfileDat, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Company Established From
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Year"
                      value={ProfileDat.establishedYear}
                      onChange={(e) =>
                        setProfileDat({
                          ...ProfileDat,
                          establishedYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-red-200 font-semibold p-3 rounded-md hover:shadow-md"
                onClick={() => {
                  setProfileDat({
                    BusinessName: "",
                    GSTIN: "",
                    email: "",
                    mobile: "",
                    name: "",
                    address: "",
                    address2: "",
                    pincode: "",
                    State: "",
                    City: "",
                    establishedYear: "",
                  });
                  setPage(1);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  const newCompanyData = {
                    ...ProfileDat,
                    Logo: Logo,
                    Signature: Signature,
                  };
                  createnewCompany(newCompanyData);
                }}
              >
                Create Company
              </button>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="w-full mt-1 mx-auto p-6 bg-white rounded-md">
            <div className="w-full flex justify-center items-center">
              <span>Billing tab is unavailable for beta</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
