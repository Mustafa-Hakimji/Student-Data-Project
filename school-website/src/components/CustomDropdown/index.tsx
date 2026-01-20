interface CustomDropdownProps {
  data: any[];
  setSelectedItem: (arg: string) => void;
  selectedItem: string;
  title: string;
  updateAction?: () => void;
  subTitle: string;
  onChange?: () => void;
}

const CustomDropdown = ({
  data,
  setSelectedItem,
  selectedItem,
  title,
  subTitle,
  updateAction = () => {},
  onChange = () => {},
}: CustomDropdownProps) => {
  return (
    <div className="input-group mb-3">
      <label className="input-group-text">{title}</label>
      <select
        className="form-select"
        value={selectedItem}
        onChange={(e) => {
          onChange();
          setSelectedItem(e.target.value);
          updateAction();
        }}
      >
        <option value="">{subTitle}</option>
        {data?.map((item, index) => (
          <option key={index} value={item}>
            {item?.split("|")[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
