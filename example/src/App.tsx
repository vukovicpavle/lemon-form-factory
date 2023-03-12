import {
  ControlProps,
  FormFactory,
  FormProps,
} from "@vukovicpavle/lemon-form-factory";

const controls = {
  text: (props: ControlProps) => {
    const {
      name,
      label,
      placeholder,
      required,
      disabled,
      readonly,
      value,
      onChange,
      onBlur,
      error,
      helpText,
      className,
    } = props;

    return (
      <div className={className as string}>
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          disabled={disabled as boolean}
          readOnly={readonly as boolean}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <p className="error">{error as string}</p>}
        {helpText && <p className="help-text">{helpText as string}</p>}
      </div>
    );
  },

  select: (props: ControlProps) => {
    const {
      name,
      label,
      className,
      onBlur,
      onChange,
      value,
      disabled,
      error,
      helpText,
      placeholder,
      required,
    } = props;

    const custom: any = props.custom;
    const { options } = custom;

    return (
      <div className={className as string}>
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <select
          name={name}
          id={name}
          disabled={disabled as boolean}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="error">{error as string}</p>}
        {helpText && <p className="help-text">{helpText as string}</p>}
      </div>
    );
  },

  submit: (props: ControlProps) => {
    const { label, disabled, className } = props;

    return (
      <div className={className as string}>
        <button type="submit" disabled={disabled as boolean}>
          {label}
        </button>
      </div>
    );
  },
};

const formFactory = new FormFactory(controls);
const controlNames = formFactory.getControlNames();

const form: FormProps = {
  name: "myForm",
  fields: [
    {
      control: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      control: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      control: "select",
      name: "role",
      label: "Role",
      placeholder: "Select role",
      required: true,
      custom: {
        options: [
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ],
      },
    },
    {
      control: "submit",
      name: "submit",
      label: "Submit",
    },
  ],
  initialValues: {
    firstName: "pas",
    lastName: "",
  },
  onSubmit: (values) => {
    console.log(values);
  },
};

const MyForm = formFactory.createForm();

const App = () => {
  console.log(controlNames);
  return (
    <div className="App">
      <MyForm {...form} />
    </div>
  );
};

export default App;
