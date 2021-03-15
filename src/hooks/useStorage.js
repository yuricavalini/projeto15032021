import { useState, useEffect } from 'react';

import { projectStorage } from '../firebase';

export default function useStorage(file) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);

    storageRef.put(file).on(
      'state_changed',
      () => {},
      (err) => {
        console.log(err);
      },
      async () => {
        const imgUrl = await storageRef.getDownloadURL();
        setUrl(imgUrl);
      }
    );
  }, [file, url]);

  return { url };
}
