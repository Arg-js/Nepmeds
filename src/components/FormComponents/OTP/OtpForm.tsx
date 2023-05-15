import { Button, Input } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const OtpForm = () => {
  const [otp, setOtp] = useState("");

  return (
    <form style={{ width: "100%" }}>
      <OtpInput
        value={otp}
        onChange={val => setOtp(val)}
        numInputs={6}
        inputStyle={{
          width: "50px",
          backgroundColor: colors.forminput,
          color: colors.light_gray,
          padding: "12px",
          height: "50px",
          border: "none",
        }}
        renderSeparator={<span style={{ margin: "7px" }}> - </span>}
        inputType="tel"
        renderInput={props => <Input {...props} />}
      />
      <p
        style={{
          textAlign: "right",
          marginBottom: "48px",
          color: colors.black_30,
          marginTop: "15px",
          fontSize: "14px",
        }}
      >
        Didnt receive the code?
        <Link
          to="/"
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
          }}
        >
          Resend
        </Link>
      </p>
      <p
        style={{
          textAlign: "center",
          color: colors.black_30,
          fontSize: "14px",
        }}
      >
        Already have an account?
        <Link
          to="/login"
          style={{
            color: colors.blue_100,
            marginLeft: "5px",
          }}
        >
          Login
        </Link>
      </p>
      <Button
        margin="0 auto"
        mt={12}
        backgroundColor={colors.primary}
        textColor={colors.white}
        type="submit"
        display="flex"
        borderRadius="12px"
        w="50%"
        p={7}
        fontSize={20}
        fontWeight={400}
      >
        Verify
      </Button>
    </form>
  );
};

export default OtpForm;
