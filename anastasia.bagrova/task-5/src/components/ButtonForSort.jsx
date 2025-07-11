export default function ButtonForSort({ sortKey, sortConfig, onSortClick, children }){
    const {key, direction} = sortConfig;
    const isActive = (key === sortKey);

    let directionSymbol = ' (по умолч.)';
    if (direction === 'increase'){
        directionSymbol = ' ↑';
    } else if (direction === 'decrease'){
        directionSymbol = ' ↓';
    }

    return(
        <button
            className={`sortButton ${isActive ? 'active' : ''}`}
            onClick={onSortClick}
        >
            {children}
            {isActive && (
                <span>{directionSymbol}</span>)}
        </button>
    );
}