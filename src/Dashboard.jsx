



import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { storage, firestore } from './FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';

function Dashboard() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = collection(firestore, 'images');
      const q = query(imagesRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(fetchedImages);
    };
    fetchImages();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      console.error('Failed to log out');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const imageRef = await addDoc(collection(firestore, 'images'), {
        userId: currentUser.uid,
        name: file.name,
        url: url,
        createdAt: new Date(),
        views: 0,
        clicks: 0
      });
      setImages([...images, { id: imageRef.id, name: file.name, url: url, views: 0, clicks: 0 }]);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUploading(false);
  };

  const handleImageClick = async (imageId) => {
    const imageRef = doc(firestore, 'images', imageId);
    await updateDoc(imageRef, {
      clicks: increment(1)
    });

    // Update local state
    setImages(images.map(img => 
      img.id === imageId ? { ...img, clicks: (img.clicks || 0) + 1 } : img
    ));
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-buttons">
          <Link className="analytics-link" to="/analytics">View Analytics</Link>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <center><h1>Welcome, {currentUser.email.split('@')[0].toUpperCase()}</h1></center> 

      <div className="image-upload">
        <input type="file" onChange={handleUpload} disabled={uploading} />
      </div>
      {uploading && <p>Uploading...</p>}
      <h2>Your Uploaded Images:</h2>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <div className="image-name">{image.name}</div>
            <img src={image.url} alt={image.name} className="image" />
            <div className="image-link">
              <button onClick={() => { handleImageClick(image.id); copyToClipboard(image.url); }}>
                Get Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
