import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UltimateEconomySim = () => {
    const [fedRate, setFedRate] = useState(2.5); // 미국 연준 금리
    const [data, setData] = useState([]);

    useEffect(() => {
        const generatePoints = () => {
            let points = [];
            for (let i = 0; i <= 10; i++) {
                // 1. 환율 메커니즘: 미국 금리가 오를수록 달러 강세 (환율 상승)
                // 기본 1100원에서 금리 영향 크게 받도록, 시간 경과에 따른 약간의 변동
                const exchangeRate = 1100 + (fedRate * 80) + (i * 10);

                // 2. 자산 가격 (달러 기준)
                const stockUsd = 100 + (i * 8) - (fedRate * 2); // S&P 500
                const goldUsd = 100 + (i * 15) + (fedRate < 3 ? 20 : -5); // GLD

                // 3. 원화 환산 가격 (달러 가격 * 환율 / 기준환율)
                // 한국 투자자 입장에서는 자산 가격이 그대로여도 환율이 오르면 이득입니다.
                const stockKrw = (stockUsd * (exchangeRate / 1200)).toFixed(1);
                const goldKrw = (goldUsd * (exchangeRate / 1200)).toFixed(1);

                points.push({
                    name: `T+${i}`,
                    exchangeRate: exchangeRate.toFixed(0),
                    stockKrw: parseFloat(stockKrw),
                    goldKrw: parseFloat(goldKrw),
                    bond: (100 - (fedRate * 5) + i).toFixed(1) // AGG
                });
            }
            setData(points);
        };
        generatePoints();
    }, [fedRate]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#0f172a', color: '#f8fafc', borderRadius: '16px', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#38bdf8', marginBottom: '24px' }}>🇰🇷 한-미 금리/환율 자산 시뮬레이터 (2026)</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                    <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>🇺🇸 <strong>미국 연준 금리: {fedRate}%</strong></p>
                    <input
                        type="range" min="0" max="10" step="0.25"
                        value={fedRate}
                        onChange={(e) => setFedRate(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                    />
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
                        * 금리 상승 → 달러 가치 상승 → <strong>원/달러 환율 상승</strong>
                    </p>
                </div>
                <div style={{ background: '#0369a1', padding: '20px', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#e0f2fe' }}>예상 환율 (USD/KRW)</span>
                    <h1 style={{ margin: '5px 0', fontSize: '2rem', fontWeight: 'bold' }}>₩{data[data.length - 1]?.exchangeRate}</h1>
                </div>
            </div>

            <div style={{ height: '400px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} />
                        <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line type="monotone" dataKey="stockKrw" stroke="#2563eb" name="S&P 500 (원화 환산)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="goldKrw" stroke="#eab308" name="금 (원화 환산)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="bond" stroke="#f87171" name="미국 채권 (AGG)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '20px', padding: '20px', background: '#1e293b', borderRadius: '12px', fontSize: '15px', lineHeight: '1.6' }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#38bdf8' }}>💡 한국 투자자를 위한 분석:</strong>
                <ul style={{ paddingLeft: '20px', color: '#cbd5e1', margin: 0 }}>
                    <li style={{ marginBottom: '8px' }}>미국 금리가 오르면 <strong>채권(AGG)</strong>은 -14.57% 수준으로 하락 압력을 받습니다.</li>
                    <li style={{ marginBottom: '8px' }}>하지만 <strong>금(GLD)</strong>과 <strong>주식(S&P 500)</strong>은 자산 자체의 상승(+84~148%)에 <strong>환차익</strong>까지 더해져 원화 기준 수익률이 더 가팔라집니다.</li>
                    <li>이것이 바로 '기축통화 자산'을 보유해야 하는 이유이며, 이미지에서 강조한 <strong>리밸런싱</strong>의 핵심 근거가 됩니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default UltimateEconomySim;
