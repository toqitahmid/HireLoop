"use client";

import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { ToastContainer, Zoom, toast } from "react-toastify";
// 1. CHANGE: Import useRouter instead of redirect
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

const RegisterPage = () => {
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
      password: user.password,
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

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

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
