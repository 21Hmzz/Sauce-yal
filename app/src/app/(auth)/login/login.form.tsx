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
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { setCookie } from "cookies-next";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Your username must be at least 2 characters long",
  }),

  password: z.string().min(8, {
    message: "Your password must be at least 8 characters long",
  }),
});

const LOGIN = gql`
  mutation Signup($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export function LoginForm() {
  const [mutation, { data, loading, error }] = useMutation(LOGIN);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
      if (data.login.token) {
        setCookie("token", data.login.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
          path: "/",
        });
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      } else {
        toast({
          title: "Error",
          description: "You have not successfully logged in , please try again",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "You have not successfully logged in , please try again",
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

        <Button type="submit" className="w-full">
          {loading ? "En cours..." : "Connexion"}
        </Button>
      </form>
    </Form>
  );
}
