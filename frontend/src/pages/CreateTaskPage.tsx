import { useState } from 'react';
import { MdArrowBack, MdAddTask } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/task.store';
import { useAuthStore } from '../store/user.store';
import toast from 'react-hot-toast';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { postTask, loading, error } = useTaskStore() as any;
  const { authUser } = useAuthStore() as any;

  const [taskData, setTaskData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.title.trim() || !taskData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }


    try {
      await postTask(taskData.title.trim(), taskData.content.trim(), authUser.user._id);
      toast.success('Task created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className='page-container' style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.6rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleGoBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#374151' }}
          title="Go back"
        >
          <MdArrowBack />
        </button>
        <h1 style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', margin: 0 }}>Create New Task</h1>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Task Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1f2937' }}>
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
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
            required
          />
        </div>

        {/* Task Content */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1f2937' }}>
            Task Content *
          </label>
          <textarea
            name="content"
            value={taskData.content}
            onChange={handleChange}
            rows={6}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Enter task details and description"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleGoBack}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: '#374151'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <MdAddTask />
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;