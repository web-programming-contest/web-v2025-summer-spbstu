import { useState } from 'react';

const SortDirection = {
  "forward": 0,
  "reverse": 1,
  "default": 2
}

export function SortControls({ sortBooks, sortButtons }) {
  const [sortType, setSortType] = useState("none");
  const [sortDirection, setSortDirection] = useState(SortDirection.default);

  const handleSort = (attribute) => {
    if (attribute === sortType) {
      if (sortDirection === SortDirection.default) {
        setSortType("none");
        sortBooks("none", sortDirection);
      }
      else
      {
        sortBooks(sortType, sortDirection);
        setSortDirection(SortDirection.default);
      }
    }
    else {
      sortBooks(attribute, SortDirection.forward);
      setSortType(attribute);
      setSortDirection(SortDirection.reverse);
    }
  };

  const getSortIndicator = (attribute) => {
    if (sortType !== attribute) return null;
    if (sortDirection === SortDirection.reverse) {
      return " ↑";
    }
    else if (sortDirection === SortDirection.default) {
      return " ↓";
    }
    else {
      return null;
    }
  }

  const listItems = sortButtons.map(button =>
    <button key={ button.attribute } id={ button.attribute }
      onClick={ () => handleSort(button.attribute) }>
      { button.text } { getSortIndicator(button.attribute) }
    </button>
  )
  return <div className="sort-buttons">{ listItems }</div>
}
