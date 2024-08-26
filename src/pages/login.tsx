import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithGoogle, auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

const LoginButton = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/'); // Redirect to dashboard if already logged in
      }
    });
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <LoginButton onClick={signInWithGoogle}>Sign in with Google</LoginButton>
    </div>
  );
};

export default Login;
