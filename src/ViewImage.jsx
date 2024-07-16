import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './FirebaseConfig';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

function ViewImage() {
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = doc(firestore, 'images', id);
      const imageSnap = await getDoc(imageRef);

      if (imageSnap.exists()) {
        setImage(imageSnap.data());
        // Increment view count
        await updateDoc(imageRef, {
          views: increment(1)
        });
      } else {
        console.log('No such image!');
      }
    };

    fetchImage();
  }, [id]);

  if (!image) return <div>Loading...</div>;

  return (
    <div  className="view-image-container">
      <h2  className="image-title">{image.name}</h2>
      <img  className="view-image"  src={image.url} alt={image.name} style={{ maxWidth: '100%' }} />
      <p>Views: {image.views}</p>
    </div>
  );
}

export default ViewImage;