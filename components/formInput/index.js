export default function FormInput({
  label,
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
}) {
  return (
    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-15j76c0">
      <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root inputOutline css-feqhe6">
        <label
          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1ald77x"
          htmlFor={id}
        >
          {label}
        </label>
        <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1bp1ao6">
          <input
            aria-invalid="false"
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            className="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq"
            value={value}
            onChange={onChange}
          />
          <fieldset
            aria-hidden="true"
            className="MuiOutlinedInput-notchedOutline css-igs3ac"
          >
            <legend className="css-14lo706">
              <span>{label}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
