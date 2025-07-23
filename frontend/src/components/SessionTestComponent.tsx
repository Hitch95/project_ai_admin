import React, { useState } from 'react';
import { authClient } from '@/api/auth/auth-client';
import useAuth from '@/utils/hooks/useAuth';

const SessionTestComponent: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const { session, isAuthenticated } = useAuth();

  const testBackendSession = async () => {
    try {
      console.log('🧪 Testing backend session...');

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/test-session`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      console.log('📤 Backend test result:', result);

      setTestResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('❌ Test failed:', error);
      setTestResult(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const testClientSession = async () => {
    try {
      console.log('🧪 Testing client session...');

      const { data: clientSession, error } = await authClient.getSession();
      console.log('📤 Client session result:', { clientSession, error });

      setTestResult(
        `Client Session: ${JSON.stringify({ clientSession, error }, null, 2)}`
      );
    } catch (error) {
      console.error('❌ Client test failed:', error);
      setTestResult(
        `Client Error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>🧪 Session Test Component</h3>

      <div style={{ marginBottom: '10px' }}>
        <strong>Current Status:</strong>
        <br />
        Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}
        <br />
        User ID: {session?.user?.id || 'None'}
        <br />
        User Email: {session?.user?.email || 'None'}
      </div>

      <button
        onClick={testBackendSession}
        style={{ marginRight: '10px', padding: '8px 16px' }}
      >
        Test Backend Session
      </button>

      <button onClick={testClientSession} style={{ padding: '8px 16px' }}>
        Test Client Session
      </button>

      {testResult && (
        <pre
          style={{
            background: '#f5f5f5',
            padding: '10px',
            marginTop: '10px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '300px',
          }}
        >
          {testResult}
        </pre>
      )}
    </div>
  );
};

export default SessionTestComponent;
