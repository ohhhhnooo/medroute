"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/shared/Logo";
import { SystemStatus } from "@/components/shared/SystemStatus";
import { useAuthStore } from "@/features/auth/store";
import { TEXT } from "@/lib/constants/text";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Неверные учетные данные");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-6 flex items-center justify-between border-b border-border">
        <Logo />
        <SystemStatus status="online" />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {TEXT.LOGIN.TITLE}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{TEXT.LOGIN.USERNAME}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={TEXT.LOGIN.USERNAME}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{TEXT.LOGIN.PASSWORD}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={TEXT.LOGIN.PASSWORD}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Загрузка..." : TEXT.LOGIN.SUBMIT}
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Для демонстрации используйте любые учетные данные
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
