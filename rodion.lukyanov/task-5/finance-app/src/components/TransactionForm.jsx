import { useState } from 'react';

function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert('Заполните все обязательные поля');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    };

    onAdd(newTransaction);

    // Очистка формы
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
    setType('expense');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div>
        <label>Тип:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
      </div>

      <div>
        <label>Сумма (₽):</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>Категория:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Выберите --</option>
          <option value="еда">Еда</option>
          <option value="транспорт">Транспорт</option>
          <option value="развлечения">Развлечения</option>
          <option value="зарплата">Зарплата</option>
          <option value="другое">Другое</option>
        </select>
      </div>

      <div>
        <label>Дата:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Комментарий:</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Необязательно"
        />
      </div>

      <button type="submit">Добавить</button>
    </form>
  );
}

export default TransactionForm;
