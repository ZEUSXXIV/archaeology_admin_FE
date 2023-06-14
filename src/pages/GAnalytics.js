import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';


const App = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    ReactGA.initialize('UA-273414908-1');
    fetchAnalyticsData(); // Fetch data when the component mounts
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Make an API request to fetch Google Analytics data
      // Store the data in the component state
      const data = axios.get("http://localhost:5000/api/analytics"); 
      const analyticsData = await data.json();
      console.log("data=>",analyticsData);
      setAnalyticsData(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    }
  };

  return (
    <div>
      {/* Render the analytics data */}
      {analyticsData ? (
        <div>
          {/* Display the fetched data */}
          {/* Example: Render a table */}
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((entry) => (
                <tr key={entry.page}>
                  <td>{entry.page}</td>
                  <td>{entry.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default App;
