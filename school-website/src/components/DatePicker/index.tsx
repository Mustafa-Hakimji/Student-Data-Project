interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
  min?: string;
  max?: string;
}

const DatePicker = ({ value, onChange, title, min, max }: DatePickerProps) => {
  return (
    <div className="input-group mb-3">
      <label className="input-group-text">{title}</label>
      <input
        type="date"
        className="form-control"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
