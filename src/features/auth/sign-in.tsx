import {Image, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import MainContainer from "../../components/main-container";
import Text from "../../components/text";
import Input from "../../components/input";
import Block from "../../components/block";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateUser } from "../../utils/validate";
import { signInForm } from "../../navigation/config/types";
import { EDGES } from "../../utils/helper";
import { localImages } from "../../assets/icons/images";
import { makeStyles } from "../../theme";
import Row from "../../components/row";
import useSignIn from "../../hooks/auth/use-sign-in";

function Signin() {
  const styles = useStyles();
  const { submit, submitting } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<signInForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSignIn = async (data: signInForm) => {
    return await submit(data);
  };
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mx="l" gap="_10" my={"_100"}>
        <Image
          style={{ width: "30%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().banner}
        />
        <Input
          name="email"
          label="Username"
          placeholder="Nhập email"
          control={control}
          error={errors.email?.message}
          showError={!!errors.email?.message}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Nhập mật khẩu"
          control={control}
          error={errors.password?.message}
          showError={!!errors.password?.message}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text fontSize={16} color="text">
            Login
          </Text>
        </TouchableOpacity>
        <Row justifyContent="space-between" alignItems="center">
          <Block flex={1} height={1.5} backgroundColor="gray_400" />
          <Text fontSize={16} color="black" px="_10">
            Or
          </Text>
          <Block flex={1} height={1.5} backgroundColor="gray_400" />
        </Row>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Row justifyContent="space-between" alignItems="center">
            <Image
              style={{
                width: 32,
                height: 32,
                resizeMode: "contain",
                alignSelf: "center",
              }}
              source={localImages().ic_google}
            />
            <Text fontSize={16} color="black" px="_10">
              Đăng nhập bằng tài khoản Google
            </Text>
          </Row>
        </TouchableOpacity>
      </Block>
    </MainContainer>
  );
}
export default memo(Signin);

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.blue_600,
    padding: theme.spacing._12,
    alignItems: "center",
    marginTop: 10,
    borderRadius: theme.borderRadii.l,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: theme.spacing._12,
    alignItems: "center",
    borderColor: theme.colors.gray_300,
  },
}));
