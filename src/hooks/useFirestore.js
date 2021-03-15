import { useState, useEffect } from 'react';

import { projectFirestore } from '../firebase';

export default function useFirestore(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).onSnapshot((snap) => {
      const documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
  }, [collection]);

  return { docs };
}
