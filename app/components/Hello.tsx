'use client';

import { useEffect, useState } from 'react';

const Hello = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await (await fetch('/api/hello')).json();

      setMessage(res.message);
    };

    fetchMessage();
  }, []);

  return <div>{message}</div>;
};

export default Hello;
