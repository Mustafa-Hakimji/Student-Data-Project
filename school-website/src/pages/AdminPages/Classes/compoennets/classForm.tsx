import { useEffect, useState } from "react";
import "./classForm.css";
import type { ClassFormProps } from "../types";

const emptyForm = {
  name: "",
  section: "",
  subjects: [""],
};

const ClassForm = ({ initialData, onSubmit, onClose }: ClassFormProps) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        section: initialData.section || "",
        subjects:
          initialData.subjects?.length > 0 ? initialData.subjects : [""],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (value: string, index: number) => {
    const updated = [...form.subjects];
    updated[index] = value;
    setForm({ ...form, subjects: updated });
  };

  const addSubject = () => {
    setForm({ ...form, subjects: [...form.subjects, ""] });
  };

  const removeSubject = (index: number) => {
    const updated = form.subjects.filter((_, i) => i !== index);
    setForm({ ...form, subjects: updated });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      subjects: form.subjects.filter((s) => s.trim() !== ""),
    };

    onSubmit(payload);
  };

  return (
    <div className="class-modal-overlay" onClick={onClose}>
      <div className="class-modal" onClick={(e) => e.stopPropagation()}>
        <div className="class-header">
          <h5>{initialData ? "Edit Class" : "Add New Class"}</h5>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Class Name */}
          <div className="mb-3">
            <label className="form-label">Class Name *</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Section */}
          <div className="mb-3">
            <label className="form-label">Section</label>
            <input
              className="form-control"
              name="section"
              value={form.section}
              onChange={handleChange}
            />
          </div>

          {/* Subjects */}
          <label className="form-label">Subjects</label>

          {form.subjects.map((sub, index) => (
            <div className="d-flex gap-2 mb-2" key={index}>
              <input
                className="form-control"
                value={sub}
                onChange={(e) => handleSubjectChange(e.target.value, index)}
                placeholder={`Subject ${index + 1}`}
              />

              {form.subjects.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeSubject(index)}
                >
                  −
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={addSubject}
          >
            + Add Subject
          </button>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Update Class" : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
