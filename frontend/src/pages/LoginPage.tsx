import { useState } from "react";
import { useAuthStore } from "../store/user.store";

const LoginPage = () => {

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const {login, isLogin} = useAuthStore() as any

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(formData);

    if(success) {
      navigate("/")
    }
  }

  return (
    <div className='page-container' style={{ maxWidth: '420px', margin: '2rem auto', padding: '1.6rem', border: '1px solid #ddd', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label style={{ display: 'grid', gap: 4 }}>
          Email
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='you@example.com' style={{ width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc' }} />
        </label>
        <label style={{ display: 'grid', gap: 4 }}>
          Password
          <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='your password' style={{ width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc' }} />
        </label>
        <button disabled={isLogin} type='submit' style={{ padding: '0.75rem', borderRadius: 6, border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          {isLogin ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center', color: '#555' }}>Don’t have an account? <a href="/signup">Sign up below</a></p>
    </div>
  );
};

export default LoginPage;
