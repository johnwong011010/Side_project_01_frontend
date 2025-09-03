import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Login() {
  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    // 模擬帳號密碼驗證
    if (username && password) {
      setStep("otp");
    } else {
      alert("請輸入帳號與密碼");
    }
  };

  const handleVerifyOtp = () => {
    // 模擬 OTP 驗證
    if (otp === "123456") {
      alert("登入成功 ✅");
    } else {
      alert("OTP 驗證失敗 ❌");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            {step === "login" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">登入</h2>
                <Input
                  placeholder="帳號"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full" onClick={handleLogin}>
                  下一步
                </Button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">OTP 驗證</h2>
                <Input
                  placeholder="輸入 6 位數 OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button className="w-full" onClick={handleVerifyOtp}>
                  驗證
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
