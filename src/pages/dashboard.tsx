import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, logout } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while loading
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </div>
  );
};

export default Dashboard;
