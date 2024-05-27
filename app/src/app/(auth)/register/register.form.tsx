"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { gql, useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { setCookie } from "cookies-next";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Your username must be at least 2 characters long",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    name: z.string().min(2, {
      message: "Your name must be at least 2 characters long",
    }),
    password: z.string().min(8, {
      message: "Your password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Your password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const REGISTER = gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

export function RegisterForm() {
  const [mutation, { data, loading, error }] = useMutation(REGISTER);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation({
        variables: {
          username: values.username,
          email: values.email,
          name: values.name,
          password: values.password,
        },
      });
      if (data.signup.token) {
        toast({
          title: "Success",
          description: "You have successfully registered",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast({
          title: "Error",
          description: "You have not successfully registered, please try again",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "You have not successfully registered, please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Votre nom d'utilisateur doit être unique
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Nous ne partagerons jamais votre email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Votre nom complet</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? "En cours..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
