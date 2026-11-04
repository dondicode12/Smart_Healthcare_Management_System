import { Pencil, Trash2 } from 'lucide-react'

// Edit and Delete icon buttons for a table row.
// Pass onEdit / onDelete to make the buttons do something.
function RowActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onEdit}
        className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-700"
        aria-label="Edit"
        title="Edit"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={onDelete}
        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
        aria-label="Delete"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default RowActions
