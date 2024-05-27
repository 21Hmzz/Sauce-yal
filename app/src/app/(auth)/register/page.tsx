import React from "react";
import { RegisterForm } from "./register.form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RegisterPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center p-8">
      <div className="w-1/2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
