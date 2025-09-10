import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Verify() {
  const navigate = useNavigate();
  const [step, setStep] = useState("otp");
  const qrCodeUrl = "https://localhost:7201/api/generate";
  const verifyUrl = "https://localhost:7201/api/verify";
  const [qrCode64, setQrCode64] = useState("");
  const [otpCode, setOtpCode] = useState("");

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
            navigate("/noCard");
        }
        else{
            alert("OTP 驗證失敗 ❌");
        }
    }
  };
  useEffect(()=>{
    fetchQrCode();
  },[]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

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
      </motion.div>
    </div>
  );
}
