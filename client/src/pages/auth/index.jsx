import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { useState } from "react";
import catImage from "@/assets/login-cat.svg";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.user.id) {
        setUserInfo(response.data.user);
        console.log(response.data.user);
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
        toast.success("Login Successful!");
      }

      console.log("Login response:", response);
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) {
      console.log("Signup validation failed");
      return;
    }

    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      console.log("Signup response:", response);

      if (response.status == 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
        toast.success("Signup Successful");
      }
    } catch (error) {
      if (error.response?.data?.message === "Email already in use") {
        toast.error("Email already exists. Try logging in.");
      } else {
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }

      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center  ">
      <div className="h-[80vh] bg-neutral-700/20 rounded-4xl w-[80vw] shadow-xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] grid xl:grid-cols-2 px-8 gap-8 border border-slate-900/30">
        <div className="flex flex-col gap-10 items-center mt-10">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-5xl font-semibold md:text-6xl">Welcome</h1>
            <p className="font-regular text-opacity-90 text-center mt-2">
              Fill in the details to get Baatchit started !
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-full" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-white text-opacity-50 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-900 p-6 transition-all duration-300 text-lg"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-white text-opacity-50 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-900 p-6 transition-all duration-300 text-lg"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Button
                  className="rounded-full p-6 bg-purple-900"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
                <Button
                  className="rounded-full p-6 bg-purple-900 "
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="hidden xl:flex items-center justify-center py-8">
          <img
            src={catImage}
            alt=""
            className="rounded-2xl h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
