import { useState } from "react";

export default function DataTable({ columns, rows, getRowKey, emptyMessage = "No matches found." }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(1);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => -d);
    } else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  let sortedRows = rows;
  if (sortKey) {
    const col = columns.find(c => c.key === sortKey);
    sortedRows = [...rows].sort((a, b) => {
      const av = col.sortValue(a);
      const bv = col.sortValue(b);
      if (av < bv) return -1 * sortDir;
      if (av > bv) return 1 * sortDir;
      return 0;
    });
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={col.sortValue ? () => handleSort(col.key) : undefined}
                className={[
                  col.sortValue ? "sortable" : "",
                  col.sortValue && sortKey === col.key ? (sortDir === 1 ? "sort-asc" : "sort-desc") : "",
                ].filter(Boolean).join(" ")}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr><td colSpan={columns.length} className="empty-state">{emptyMessage}</td></tr>
          ) : (
            sortedRows.map(row => (
              <tr key={getRowKey(row)}>
                {columns.map(col => (
                  <td key={col.key} className={col.wrap ? "wrap" : ""}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
