import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div style={{ fontFamily: 'sans-serif', background: '#f5f6fa', minHeight: '100vh' }}>
            <header style={{ background: '#273c75', color: '#fff', padding: '1.5rem 2rem' }}>
                <h1>網路銀行</h1>
                <nav>
                    <a href="#" style={{ color: '#fff', marginRight: '2rem' }}>帳戶總覽</a>
                    <a href="#" style={{ color: '#fff', marginRight: '2rem' }}>轉帳</a>
                    <Link to="/noCard" style={{ color: '#fff', marginRight: '2rem' }}>無卡提款專區</Link>
                    <a href="#" style={{ color: '#fff' }}>登出</a>
                </nav>
            </header>
            <main style={{ padding: '2rem' }}>
                <section style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px #dcdde1' }}>
                    <h2>歡迎回來，王小明！</h2>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                        <div style={{ flex: 1 }}>
                            <h3>帳戶餘額</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#44bd32' }}>NT$ 120,000</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3>最近交易</h3>
                            <ul>
                                <li>2024/06/01 - 轉帳至李四 - NT$ 5,000</li>
                                <li>2024/05/28 - 超商消費 - NT$ 320</li>
                                <li>2024/05/25 - 薪資入帳 - NT$ 50,000</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <footer style={{ textAlign: 'center', padding: '1rem', background: '#dcdde1', marginTop: '2rem' }}>
                © 2024 網路銀行
            </footer>
        </div>
    );
};

export default MainPage;