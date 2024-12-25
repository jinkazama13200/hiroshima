import { useState } from "react";

import Button, { buttonStyles } from "../../../../components/Button/Button";
import { Key, Loader, LogIn } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { userSignIn } from "../../../../apis/usersAPI";
import { useUserContext } from "../../../../contexts/UserContext";

const schema = object({
  taiKhoan: string().required("Empty Field."),
  matKhau: string().min(6, "At least 6 characters.").required("Empty Field."),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignIn: onSuccessSignIn } = useUserContext();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await userSignIn(data);
      onSuccessSignIn(response);
      reset();
      return response;
    } catch (error) {
      setError("submitError", {
        type: "manual",
        message: error?.message || "Something went wrong. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[max-content] flex-grow flex-col items-center justify-center gap-6 rounded-md px-5 py-2"
    >
      <Key
        className={twMerge(
          buttonStyles({ size: "icon" }),
          "pointer-events-none",
        )}
      />
      <div className="flex max-w-[300px] flex-grow flex-col">
        <input
          {...register("taiKhoan")}
          className="rounded-full border border-secondary-default px-4 py-2 shadow-inner outline-none transition-all focus:shadow-secondary-default"
          type="text"
          placeholder="account"
        />
        {errors && (
          <span className="ml-3 text-red-500">{errors.taiKhoan?.message}</span>
        )}
      </div>
      <div className="flex max-w-[300px] flex-grow flex-col">
        <input
          {...register("matKhau")}
          className="w-full rounded-full border border-secondary-default px-4 py-2 shadow-inner outline-none transition-all focus:shadow-secondary-default"
          type="password"
          placeholder="password"
        />
        {errors && (
          <span className="ml-3 text-red-500">{errors.matKhau?.message}</span>
        )}
      </div>
      <Button disabled={isLoading} className={`rounded-full`} type="submit">
        {isLoading ? <Loader className="animate-spin" /> : <LogIn />}
      </Button>
      {errors && (
        <div className="flex flex-shrink">
          <p className="text-red-500">{errors.submitError?.message}</p>
        </div>
      )}
    </form>
  );
};

export default SignIn;
