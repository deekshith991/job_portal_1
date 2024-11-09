import React, { useState, useEffect } from "react";
import axiosInstance from "../Context/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileUpdatePage = () => {
  const { accountId } = useAuth();
  const [profile, setProfile] = useState({ first_name: "", last_name: "", DOB: "", phone_No: "" });
  const [education, setEducation] = useState([{ instituteName: "", from: "", to: "", major: "", CGPA: "", Remarks: "" }]);
  const [errors, setErrors] = useState({ profile: {}, education: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const educationLevels = [
    "1st Standard", "2nd Standard", "3rd Standard", "4th Standard", "5th Standard",
    "6th Standard", "7th Standard", "8th Standard", "9th Standard", "10th Standard",
    "Inter - 1st Year", "Inter - 2nd Year", "Degree - 1st Year", "Degree - 2nd Year",
    "Degree - 3rd Year", "BTech - 1st Year", "BTech - 2nd Year", "BTech - 3rd Year",
    "BTech - 4th Year", "PhD"
  ];

  const majors = ["civil", "mech", "cse", "eee"];  // Predefined list of majors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${accountId}`);
        setProfile(response.data.profile);
        setEducation(response.data.education || []);
      } catch (error) {
        setErrors({ ...errors, profile: { general: "Failed to fetch user data." } });
      }
    };
    fetchUserData();
  }, [accountId]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { instituteName: "", from: "", to: "", major: "", CGPA: "", Remarks: "" }]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = { profile, education };
    const newErrors = { profile: {}, education: [] };

    // Frontend Validation
    if (!profile.first_name) newErrors.profile.first_name = "First Name is required.";
    if (!profile.last_name) newErrors.profile.last_name = "Last Name is required.";
    if (!profile.DOB) newErrors.profile.DOB = "Date of Birth is required.";
    if (!profile.phone_No) newErrors.profile.phone_No = "Phone Number is required.";

    education.forEach((edu, index) => {
      if (!edu.instituteName) newErrors.education[index] = { instituteName: "Institute Name is required." };
      if (!edu.from) newErrors.education[index] = { ...newErrors.education[index], from: "From field is required." };
      if (!edu.to) newErrors.education[index] = { ...newErrors.education[index], to: "To field is required." };
      if (!edu.CGPA) newErrors.education[index] = { ...newErrors.education[index], CGPA: "CGPA is required." };
      if (edu.CGPA && (edu.CGPA < 0 || edu.CGPA > 10)) {
        newErrors.education[index] = { ...newErrors.education[index], CGPA: "CGPA must be between 0 and 10." };
      }
    });

    if (Object.keys(newErrors.profile).length === 0 && newErrors.education.every((edu) => Object.keys(edu).length === 0)) {
      try {
        await axiosInstance.put(`/users/${accountId}`, updatedData);
        navigate("/dashboard");
      } catch (error) {
        setErrors({ ...newErrors, profile: { general: error.response?.data?.message || "Failed to update profile." } });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Update Profile</h1>
      {errors.profile.general && <p className="text-red-500 my-4">{errors.profile.general}</p>}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleProfileChange}
                  className={`w-full p-2 border rounded-md ${errors.profile.first_name ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.profile.first_name && <p className="text-red-500 text-sm">{errors.profile.first_name}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleProfileChange}
                  className={`w-full p-2 border rounded-md ${errors.profile.last_name ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.profile.last_name && <p className="text-red-500 text-sm">{errors.profile.last_name}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  value={profile.DOB}
                  onChange={handleProfileChange}
                  className={`w-full p-2 border rounded-md ${errors.profile.DOB ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.profile.DOB && <p className="text-red-500 text-sm">{errors.profile.DOB}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone_No"
                  value={profile.phone_No}
                  onChange={handleProfileChange}
                  className={`w-full p-2 border rounded-md ${errors.profile.phone_No ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.profile.phone_No && <p className="text-red-500 text-sm">{errors.profile.phone_No}</p>}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-8">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">Institute Name</label>
                  <input
                    type="text"
                    name="instituteName"
                    placeholder="Institute Name"
                    value={edu.instituteName}
                    onChange={(e) => handleEducationChange(e, index)}
                    className={`w-full p-2 border rounded-md ${errors.education[index]?.instituteName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.education[index]?.instituteName && <p className="text-red-500 text-sm">{errors.education[index]?.instituteName}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">From</label>
                  <input
                    type="text"
                    name="from"
                    placeholder="From"
                    value={edu.from}
                    onChange={(e) => handleEducationChange(e, index)}
                    className={`w-full p-2 border rounded-md ${errors.education[index]?.from ? 'border-red-500' : 'border-gray-300'}`}
                    list="educationLevels"
                  />
                  <datalist id="educationLevels">
                    {educationLevels.map((level, idx) => (
                      <option key={idx} value={level} />
                    ))}
                  </datalist>
                </div>
                {errors.education[index]?.from && <p className="text-red-500 text-sm">{errors.education[index]?.from}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">To</label>
                  <input
                    type="text"
                    name="to"
                    placeholder="To"
                    value={edu.to}
                    onChange={(e) => handleEducationChange(e, index)}
                    className={`w-full p-2 border rounded-md ${errors.education[index]?.to ? 'border-red-500' : 'border-gray-300'}`}
                    list="educationLevels"
                  />
                  <datalist id="educationLevels">
                    {educationLevels.map((level, idx) => (
                      <option key={idx} value={level} />
                    ))}
                  </datalist>
                </div>
                {errors.education[index]?.to && <p className="text-red-500 text-sm">{errors.education[index]?.to}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">Major <span className="text-sm text-gray-500">(Optional)</span></label>
                  <input
                    type="text"
                    name="major"
                    placeholder="Major"
                    value={edu.major}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="w-full p-2 border rounded-md"
                    list="majors"
                  />
                  <datalist id="majors">
                    {majors.map((major, idx) => (
                      <option key={idx} value={major} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">CGPA <span className="text-sm text-red-500">(Required)</span></label>
                  <input
  type="number"
  name="CGPA"
  placeholder="CGPA"
  value={edu.CGPA}
  onChange={(e) => handleEducationChange(e, index)}
  className={`w-full p-2 border rounded-md ${errors.education[index]?.CGPA ? 'border-red-500' : 'border-gray-300'}`}
  max={10}
  min={0}
  step="0.01" // Allowing decimal values
/>

                 
                </div>
                {errors.education[index]?.CGPA && <p className="text-red-500 text-sm">{errors.education[index]?.CGPA}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <label className="block text-gray-700">Remarks <span className="text-sm text-gray-500">(Optional)</span></label>
                  <input
                    type="text"
                    name="Remarks"
                    placeholder="Remarks"
                    value={edu.Remarks}
                    onChange={(e) => handleEducationChange(e, index)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="mt-2 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Add Education
        </button>
        <button type="submit" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfileUpdatePage;
