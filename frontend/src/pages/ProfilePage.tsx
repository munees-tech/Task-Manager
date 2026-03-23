const ProfilePage = () => {
  return (
    <div className='page-container' style={{ maxWidth: '760px', margin: '2rem auto', padding: '1.6rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '1.75rem' }}>JD</div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.9rem' }}>John Doe</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Product Designer</p>
        </div>
      </header>

      <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.2rem' }}>
        <h2 style={{ marginTop: 0 }}>Profile Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.8rem' }}>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '0.8rem' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Email</p>
            <p style={{ margin: '0.2rem 0 0', color: '#374151' }}>john.doe@example.com</p>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '0.8rem' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Phone</p>
            <p style={{ margin: '0.2rem 0 0', color: '#374151' }}>+1 (555) 123-4567</p>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '0.8rem' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Location</p>
            <p style={{ margin: '0.2rem 0 0', color: '#374151' }}>San Francisco, CA</p>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '0.8rem' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Joined</p>
            <p style={{ margin: '0.2rem 0 0', color: '#374151' }}>March 1, 2024</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.2rem' }}>
        <h2 style={{ marginTop: 0 }}>Bio</h2>
        <p style={{ color: '#4b5563' }}>Experienced product designer with a passion for building intuitive user experiences. Skilled in UI design, prototyping, and cross-functional team collaboration.</p>
      </section>
    </div>
  );
};

export default ProfilePage;
