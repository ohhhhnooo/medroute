"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/shared/Logo";
import { SystemStatus } from "@/components/shared/SystemStatus";
import { useAuthStore } from "@/features/auth/store";
import { TEXT } from "@/lib/constants/text";
import { ShieldCheck, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Logo />
          <SystemStatus status="online" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-4">
              <ShieldCheck className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              MedRoute
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Система управления экстренными вызовами
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center">
                {TEXT.LOGIN.TITLE}
              </CardTitle>
              <CardDescription className="text-center">
                Введите учетные данные для входа в систему
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base">
                    {TEXT.LOGIN.USERNAME}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">
                    {TEXT.LOGIN.PASSWORD}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="h-11"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="border-destructive/50">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Загрузка..." : TEXT.LOGIN.SUBMIT}
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    <span className="inline-block bg-muted px-3 py-1.5 rounded-md">
                      💡 Для демонстрации используйте любые учетные данные
                    </span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>AI-ассистированная система диспетчеризации скорой помощи</p>
          </div>
        </div>
      </main>
    </div>
  );
}
