import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';
import './style.css';

function Accordion() {
  const [activeItems, setActiveItems] = useState([]);
  const [singleMode, setSingleMode] = useState(true);

  const faqItems = [
    {
      question: 'Q1',
      answer: 'Answer',
    },
    {
      question: 'Q2',
      answer: 'Answer2',
    },
    {
      question: 'Q3',
      answer: 'answer3',
    },
  ];

  const toggleItem = (index) => {
    if (singleMode) {
      setActiveItems(activeItems.includes(index) ? [] : [index]);
    } else {
      setActiveItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const openAll = () => {
    setActiveItems(faqItems.map((_, index) => index));
  };

  const closeAll = () => {
    setActiveItems([]);
  };

  const toggleMode = () => {
    setSingleMode(!singleMode);
    if (!singleMode) {
      setActiveItems((prev) => (prev.length > 0 ? [prev[0]] : []));
    }
  };

  return (
    <div className="accordion">
      <div className="controls">
        <button onClick={openAll}>Открыть все</button>
        <button onClick={closeAll}>Закрыть все</button>
        <button onClick={toggleMode}>
          Режим: {singleMode ? 'Один открыт' : 'Несколько открыто'}
        </button>
      </div>

      {faqItems.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${
            activeItems.includes(index) ? 'active' : ''
          }`}
        >
          <div className="accordion-header" onClick={() => toggleItem(index)}>
            {item.question}
          </div>
          <div
            className="accordion-content"
            style={{
              maxHeight: activeItems.includes(index)
                ? document.querySelector(
                    `.accordion-item:nth-child(${index + 2}) .accordion-content`
                  )?.scrollHeight + 'px'
                : '0',
            }}
          >
            <div className="accordion-content-inner">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;

function App() {
  return (
    <div className="app">
      <Accordion />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
