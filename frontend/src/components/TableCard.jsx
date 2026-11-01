// A card holding a table. Pass the column names as `headers`
// and the <tr> rows as children.
function TableCard({ headers, children }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default TableCard
