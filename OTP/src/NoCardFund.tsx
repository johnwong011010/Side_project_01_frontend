import React, { useState } from 'react';

function NoCardFund(){
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // 這裡可以加上 API 請求邏輯
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>無卡提款</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        提款帳號
                        <input
                            type="text"
                            value={account}
                            onChange={e => setAccount(e.target.value)}
                            required
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            placeholder="請輸入提款帳號"
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        提款金額
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            placeholder="請輸入金額"
                            min={1}
                        />
                    </label>
                </div>
                <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
                    提交
                </button>
            </form>
            {submitted && (
                <div style={{ marginTop: 24, color: 'green' }}>
                    已提交無卡提款申請！
                </div>
            )}
        </div>
    );
};

export default NoCardFund;