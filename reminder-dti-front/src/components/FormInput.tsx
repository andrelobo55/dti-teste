import "./forminput.css"
import "../index.css"

// interface that omits the 'id' attribute and types the other attributes of the form
interface FormInputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'id'> {
  value: string[];
  errorMessage: string;
  label: string;
}

// create a react function component of type Form InputProps and receives its properties
const FormInput: React.FC<FormInputProps> = ({ errorMessage, label, onChange, ...rest }) => {
    return (
      <div className="forminput">
        <label>{label}</label>
        <input onChange={onChange} {...rest} />
        <span>{errorMessage}</span>
      </div>
    );
  };

export default FormInput