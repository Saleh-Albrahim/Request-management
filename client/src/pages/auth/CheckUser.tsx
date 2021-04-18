import React, { useEffect, useState } from 'react';

const CheckUser: React.FC = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/v1/auth/user');
      if (response.status == 200) {
        const serverUser = await response.json();
        setUser(serverUser);
      }
    };
  });
  return <div></div>;
};

export default CheckUser;
