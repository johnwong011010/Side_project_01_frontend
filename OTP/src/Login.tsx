import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Login() {
  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginUrl = "https://localhost:7201/api/login";
  const qrCodeUrl = "https://localhost:7201/api/generate";
  const verifyUrl = "https://localhost:7201/api/verify";
  const [qrCode64, setQrCode64] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    // 模擬帳號密碼驗證
    if (username && password) {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body  : JSON.stringify({ username, password })
          });
        const data = await response.json();
        if (!response.ok){
            alert("登入失敗 ❌");
        }
        else if (data.status === "need verify"){
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            localStorage.setItem("status", data.status);
            fetchQrCode();
            setStep("otp");
        }
        else{
            alert("發生錯誤 ❌");
        }
    } else {
      alert("請輸入帳號與密碼");
    }
    setLoading(false);
  };

  const fetchQrCode = async () => {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    console.log(username, password);
    const code  = await fetch (qrCodeUrl,
        { 
            method: 'POST' ,
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({ username, password })
        });
    const data = await code.text();
    if (!code.ok){
        alert("取得 QR Code 失敗 ❌");
    }
    else{
        setQrCode64(data);
    }
  }
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      alert("請輸入 6 位數 OTP");
      return;
    }
    else{
        var username = localStorage.getItem("username");
        var password = localStorage.getItem("password");
        const response = await fetch(verifyUrl,
        {
            method  : 'POST',
            headers : {"Content-Type": "application/json"},
            body    : JSON.stringify({ username, password, otpCode })
        });
        if (response.ok){
            alert("OTP 驗證成功 ✅");
        }
        else{
            alert("OTP 驗證失敗 ❌");
        }
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
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-bold">OTP 驗證</h2>
                {qrCode64 && (
                    <div className="flex justify-center">
                        <img 
                        src={`data:image/png;base64,${qrCode64}`}
                        alt="OTP QR Code"
                        className="mx-auto w-48 h-48 border rounded-md"
                        />
                    </div>
                )}
                <Input
                  placeholder="輸入 6 位數 OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
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
