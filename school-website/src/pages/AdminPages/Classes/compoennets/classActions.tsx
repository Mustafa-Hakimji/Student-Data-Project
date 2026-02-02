import type { ClassActionProps } from "../types";

const ClassActions = ({
  selectedClass,
  onAdd,
  onEdit,
  onDelete,
}: ClassActionProps) => {
  return (
    <div className="d-flex gap-2 m-4">
      <button className="btn btn-primary" onClick={onAdd}>
        ➕ Add New Class
      </button>

      {selectedClass && (
        <>
          <button
            className="btn btn-outline-secondary"
            disabled={!selectedClass}
            onClick={onEdit}
          >
            ✏️ Edit
          </button>

          <button
            className="btn btn-outline-danger"
            disabled={!selectedClass}
            onClick={onDelete}
          >
            🗑 Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ClassActions;
