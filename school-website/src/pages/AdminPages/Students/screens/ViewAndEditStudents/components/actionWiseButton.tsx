import { ActionsTypes, type StudentTableProps } from "../../../types";

const ActionWiseButton = ({
  actionType,
  selectedStudents,
  handleClick = () => {},
}: StudentTableProps) => {
  return (
    <div>
      {actionType === ActionsTypes.delete && (
        <button className="btn btn-outline-danger" onClick={handleClick}>
          Delete{` ${selectedStudents?.length} students`}
        </button>
      )}

      {actionType === ActionsTypes.update && (
        <button className="btn btn-outline-info" onClick={handleClick}>
          Update Student
        </button>
      )}
    </div>
  );
};

export default ActionWiseButton;
