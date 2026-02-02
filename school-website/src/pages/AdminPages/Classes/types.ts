export interface ClassActionProps {
  selectedClass: string | null;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ClassFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}
