import ImageUpload from "./ImageUpload";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import Password from "./Password";
import Radio from "./Radio";
import Select from "./Select";
import TextArea from "./TextArea";

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
    case "imageUpload":
      return <ImageUpload {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
