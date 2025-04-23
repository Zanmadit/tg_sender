import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Data validation
  const validateForm = () => {
    // Check for all fill
    if (!form.name || !form.email || !form.message) {
      setStatus('Пожалуйста, заполните все поля.');
      return false;
    }

    // Email check
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(form.email)) {
      setStatus('Пожалуйста, введите правильный email.');
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check form
    if (!validateForm()) return;

    setLoading(true);
    setStatus('');

    // Data trasnport
    const response = await fetch('http://localhost:8000/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (response.ok) {
      setStatus('Заявка успешно отправлена!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Ошибка при отправке заявки.');
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Связаться с нами</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Сообщение"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}

export default App;
