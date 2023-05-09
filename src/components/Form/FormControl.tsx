import Input from "./Input";
import Select from "./Select";
import Radio from "./Radio";
import Password from "./Password";
import TextArea from "./TextArea";
import MultiSelect from "./MultiSelect";

function FormControl(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "password":
      return <Password {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "multiSelect":
      return <MultiSelect {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
