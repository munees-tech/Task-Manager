import { useState, useEffect } from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/task.store';
import { useAuthStore } from '../store/user.store';

const EditTaskPage = () => {
  const [task, setTask] = useState({
    title: '',
    content: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore() as any;
  const { tasks, getTasks, updateTask, loading, error } = useTaskStore();

  useEffect(() => {
    if (authUser?.user?._id) {
      getTasks(authUser.user._id);
    }
  }, [authUser, getTasks]);

  const taskData = tasks.find(t => t._id === id);

  useEffect(() => {
    if (taskData) {
      setTask({ title: taskData.title, content: taskData.content });
    }
  }, [taskData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (id) {
      await updateTask(task.title, task.content, id);
      if (!error) {
        navigate('/');
      }
    }
  };

  return (
    <div className='page-container' style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.6rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
        onClick={() => navigate("/")}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#374151' }}
          title="Go back"
        >
          <MdArrowBack />
        </button>
        <h1 style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', margin: 0 }}>Edit Task</h1>
      </header>

      <form style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Task Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1f2937' }}>
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
            placeholder="Enter task title"
          />
        </div>

        {/* Content */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1f2937' }}>
            Content
          </label>
          <textarea
            name="content"
            value={task.content}
            onChange={handleChange}
            rows={8}
            style={{
              width: '100%',
              minHeight: '220px',
              maxHeight: '450px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical',
              overflowY: 'auto'
            }}
            placeholder="Enter task content"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              background: loading ? '#9ca3af' : '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#3b82f6')}
          >
            <MdSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
          onClick={() => navigate("/")}
            type="button"
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d1d5db')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#e5e7eb')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPage;
