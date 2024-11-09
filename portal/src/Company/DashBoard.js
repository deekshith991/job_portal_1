import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../Context/axiosInstance";

const CompanyDashboard = () => {
  const { accountId } = useAuth();
  const [companyData, setCompanyData] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for company accountId:", accountId);
      try {
        // Fetch company data
        const companyRes = await axiosInstance.get(`/companies/${accountId}`);
        console.log("Company data fetched successfully:", companyRes.data);
        setCompanyData(companyRes.data);

        // Fetch job posts associated with the company
        const jobPostsRes = await axiosInstance.get(`/jobs/company/${accountId}`);
        console.log("Job posts data fetched successfully:", jobPostsRes.data);
        setJobPosts(jobPostsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [accountId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Welcome, {companyData?.name || 'Company'}
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="mt-4">Your Job Posts</h2>
      <ul>
        {jobPosts.length > 0 ? (
          jobPosts.map((post, index) => (
            <li key={index}>{post.title} - {post.status}</li>
          ))
        ) : (
          <li>No job posts found.</li>
        )}
      </ul>
    </div>
  );
};

export default CompanyDashboard;
