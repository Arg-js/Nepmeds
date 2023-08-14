const customStyles = ({ fontFamily, fontWeight, fontSize }: ICustomStyles) => {
  return [fontFamily, fontWeight, fontSize];
};

interface ICustomStyles {
  fontWeight: string;
  fontSize: string;
  fontFamily: string;
}

export default customStyles;
