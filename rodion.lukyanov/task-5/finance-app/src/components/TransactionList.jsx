import { useState } from 'react';

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = transactions.filter((t) => {
    const typeMatch = filterType === 'all' || t.type === filterType;
    const categoryMatch = filterCategory === 'all' || t.category === filterCategory;
    return typeMatch && categoryMatch;
  });

return (
    <div className="transaction-history">
      <h2>История транзакций</h2>

      <div className="filters">
        <label>Фильтр по типу: </label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Все</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
        </select>

        <label>Категория: </label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">Все</option>
          <option value="еда">Еда</option>
          <option value="транспорт">Транспорт</option>
          <option value="развлечения">Развлечения</option>
          <option value="зарплата">Зарплата</option>
          <option value="другое">Другое</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>Нет подходящих транзакций</p>
      ) : (
        <ul className="transaction-list">
          {filtered.map((t) => (
            <li
              key={t.id}
              className={t.type === 'income' ? 'income' : 'expense'}
            >
              <strong>{t.category}</strong> — {t.type === 'income' ? '+' : '-'}
              {t.amount} ₽ <br />
              <small>{t.date} {t.note && `| ${t.note}`}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
