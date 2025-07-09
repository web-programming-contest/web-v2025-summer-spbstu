import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

export default function Charts({ transactions }) {
  // Фильтруем только расходы для PieChart
  const expenses = transactions.filter(t => t.type === 'expense');

  // Группируем расходы по категориям
  const expenseByCategory = expenses.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  // Преобразуем в массив для PieChart
  const pieData = Object.entries(expenseByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Для BarChart группируем по дате суммы расходов и доходов
  const sumsByDate = {};

  transactions.forEach(({ date, type, amount }) => {
    if (!sumsByDate[date]) sumsByDate[date] = { date, income: 0, expense: 0 };
    sumsByDate[date][type] += amount;
  });

  // Преобразуем в массив и сортируем по дате
  const barData = Object.values(sumsByDate).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="visualization">
      <h2>Визуализация</h2>

      <h3>Расходы по категориям</h3>
      {pieData.length > 0 ? (
        <div className="chart-wrapper">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p>Нет данных для отображения расходов</p>
      )}

      <h3>Доходы и расходы по датам</h3>
      {barData.length > 0 ? (
        <div className="chart-wrapper">
          <BarChart
            width={600}
            height={300}
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" name="Доходы" />
            <Bar dataKey="expense" fill="#FF4C4C" name="Расходы" />
          </BarChart>
        </div>
      ) : (
        <p>Нет данных для отображения по датам</p>
      )}
    </div>
  );
}