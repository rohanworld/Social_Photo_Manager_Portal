


import React, { useState, useEffect } from 'react';
import './Analytics.css';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { firestore } from './FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const imagesRef = collection(firestore, 'images');
      const q = query(imagesRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedAnalytics = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnalytics(fetchedAnalytics);
    };
    fetchAnalytics();
  }, [currentUser]);

  return (
    <div className="analytics-container">
      <Link className="back-link" to="/dashboard">Back to Dashboard</Link>
      <h2 className="analytics-title">Analytics</h2>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Image Name</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map(image => (
            <tr key={image.id} className="analytics-item">
              <td>{image.name}</td>
              <td>{image.clicks || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;
