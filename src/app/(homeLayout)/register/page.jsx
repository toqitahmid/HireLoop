"use client";

import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";

import { ToastContainer, Zoom, toast } from "react-toastify";
// 1. CHANGE: Import useRouter instead of redirect
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";

const RegisterPage = () => {
   const [isVisible, setIsVisible] = useState(false);
   const [password, setPassword] = useState("");
   const [role, setRole] = useState('');
  // 2. CHANGE: Initialize the router
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      image: user.image,
      email: user.email,
      password: password,
      role: role,
    });

    if (data) {
      toast.success("You registered successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });

      // 3. CHANGE: Use router.push() for client-side redirection
      router.push("/");
    } else if (error) {
      console.error("Better-Auth Error Details:", error);

      // 4. CHANGE: Toast the exact error message so you can see why it's a 422
      toast.error(
        error.message || "Failed to register. Please check your inputs.",
        {
          position: "top-center",
          theme: "dark",
          transition: Zoom,
        },
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      {/* Toast container must be present in the tree somewhere if not already in your root layout */}
      <ToastContainer />

      <div className="flex items-center my-10">
        <h1 className="text-2xl font-semibold">Register</h1>
      </div>
      <Form
        className="flex w-96 flex-col gap-4"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={onSubmit}
      >
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        {/* Note: Make sure to type a valid URL (like https://example.com/avatar.jpg) when testing! */}
        <TextField isRequired name="image" type="url">
          <Label>Image Url</Label>
          <Input placeholder="https://example.com/image.jpg" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField className="w-full" name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full"
              type={isVisible ? "text" : "password"}
              // 1. Bind to the password state
              value={password}
              // 2. Update the state when the user types
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <div className="flex flex-col gap-4">
          <Label>Select Role</Label>
          <RadioGroup
            orientation="horizontal"
            name="role"
            value={role}
            onChange={setRole}
          >
            <Radio  value="seeker">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Seeker
              </Radio.Content>
            </Radio>
            <Radio  value="recruter">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Recruter
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>

        <div className="flex gap-2 justify-center">
          <Button className="w-full" type="submit">
            <Check />
            Register
          </Button>
          <Button className="w-full" type="reset" variant="secondary">
            Reset
          </Button>
        </div>

        <p className="text-center">
          or have an account{" "}
          <span className="text-cyan-500 cursor-pointer">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </Form>
    </div>
  );
};

export default RegisterPage;
