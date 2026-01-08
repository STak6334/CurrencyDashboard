import React, { useState } from 'react';
import {
    Globe,
    TrendingUp,
    DollarSign,
    ShieldCheck,
    Activity,
    ArrowRightLeft,
    Banknote
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';

// --- Data & Constants ---
const GLOBAL_RESERVES = [
    { name: 'USD', value: 59.0, color: '#3b82f6' }, // Blue-500
    { name: 'EUR', value: 19.8, color: '#10b981' }, // Emerald-500
    { name: 'JPY', value: 5.5, color: '#f59e0b' },  // Amber-500
    { name: 'GBP', value: 4.9, color: '#8b5cf6' },  // Violet-500
    { name: 'Other', value: 10.8, color: '#64748b' } // Slate-500
];

const HISTORICAL_DATA = [
    { year: '1995', usd_share: 59, trade_vol: 40 },
    { year: '2000', usd_share: 71, trade_vol: 55 },
    { year: '2005', usd_share: 66, trade_vol: 70 },
    { year: '2010', usd_share: 62, trade_vol: 85 },
    { year: '2015', usd_share: 65, trade_vol: 100 },
    { year: '2020', usd_share: 59, trade_vol: 110 },
    { year: '2024', usd_share: 58, trade_vol: 125 },
];

const SIMULATION_DATA = [
    { name: 'Stable', rate: 1.0, volatility: 2 },
    { name: 'Crisis', rate: 0.8, volatility: 15 },
    { name: 'Recovery', rate: 1.1, volatility: 5 },
];

// --- Components ---

const MetricCard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            {trend && (
                <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className="text-slate-500 text-xs">{subtext}</p>
    </div>
);

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 max-w-2xl">{subtitle}</p>
    </div>
);

const SimulationPanel = () => {
    const [trustLevel, setTrustLevel] = useState(80);

    // Derived values based on simulation
    const stabilityIndex = (trustLevel * 0.8 + 20).toFixed(1);
    const spread = ((100 - trustLevel) * 0.15).toFixed(2); // Example spread

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Market Interaction Simulator
            </h3>

            <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Global Trust in Anchor (Confidence)</span>
                    <span className="text-blue-400 font-bold">{trustLevel}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={trustLevel}
                    onChange={(e) => setTrustLevel(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Crisis Mode</span>
                    <span>Stable Dominance</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                    <div className="text-sm text-slate-400 mb-1">Stability Index</div>
                    <div className={`text-xl font-bold ${trustLevel > 50 ? 'text-green-400' : 'text-red-400'}`}>
                        {stabilityIndex}
                    </div>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                    <div className="text-sm text-slate-400 mb-1">Interbank Spread</div>
                    <div className="text-xl font-bold text-blue-400">{spread}%</div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-sm text-blue-300">
                    <strong>Insight:</strong> As trust in the anchor currency {trustLevel > 50 ? 'increases' : 'decreases'}, global transaction costs {trustLevel > 50 ? 'decrease (flight to quality)' : 'increase (liquidity crunch)'}.
                </div>
            </div>
        </div>
    );
};

const AnchorCurrencyDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-blue-500/30">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="mb-12 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-8 h-8 text-blue-500 animate-pulse" />
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200">
                            Global Anchor Currency Monitor
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Interactive visualization of global reserve currency dynamics and the role of the USD.
                    </p>
                </header>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <MetricCard
                        title="Global Reserves Share"
                        value="59.0%"
                        subtext="USD dominance in central banks"
                        icon={Banknote}
                        trend={-0.5}
                    />
                    <MetricCard
                        title="Global Trade Invoice"
                        value="74.0%"
                        subtext="Asia-Pacific exports invoiced in USD"
                        icon={ArrowRightLeft}
                        trend={1.2}
                    />
                    <MetricCard
                        title="Forex Transaction Vol"
                        value="89.0%"
                        subtext="One side of all FX trades includes USD"
                        icon={TrendingUp}
                        trend={0.1}
                    />
                    <MetricCard
                        title="Fed Effective Rate"
                        value="5.33%"
                        subtext="Anchor reference rate"
                        icon={DollarSign}
                        trend={0.0}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Left Column: Visual Explanation & Charts */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Historical Trend Chart */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Historical Dominance</h3>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div> USD Share
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Trade Vol
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={HISTORICAL_DATA}>
                                        <defs>
                                            <linearGradient id="colorUsd" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorTrade" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#64748b' }} />
                                        <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                            itemStyle={{ color: '#f1f5f9' }}
                                        />
                                        <Area type="monotone" dataKey="usd_share" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsd)" />
                                        <Area type="monotone" dataKey="trade_vol" stroke="#10b981" fillOpacity={1} fill="url(#colorTrade)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Triffin Dilemma / Mechanism Diagram (Concept) */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <ShieldCheck size={120} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-4">Mechanism: The Triffin Dilemma</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        To serve as a global reserve, the anchor country (USA) must run trade deficits to supply the world with liquidity (dollars). However, persistent deficits undermine confidence in the currency over the long term.
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Global Liquidity Needs
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                            Confidence Erosion
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                    {/* Simple Visualization of Flow */}
                                    <div className="relative w-full h-[150px] flex items-center justify-center">
                                        <div className="absolute w-[180px] h-[180px] border-2 border-dashed border-slate-600 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                        <div className="z-10 bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                                            Anchor
                                        </div>
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-700 text-xs px-2 py-1 rounded">Liquidity</div>
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-700 text-xs px-2 py-1 rounded">Deficits</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Interaction & Distribution */}
                    <div className="space-y-8">

                        {/* Reserves Pie Chart */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-lg font-semibold text-white mb-6">Global Reserves Composition</h3>
                            <div className="h-[250px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={GLOBAL_RESERVES}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {GLOBAL_RESERVES.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-sm text-slate-400">USD</div>
                                    <div className="text-xl font-bold text-white">59%</div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                {GLOBAL_RESERVES.map(item => (
                                    <div key={item.name} className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-slate-300">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Simulation Panel */}
                        <SimulationPanel />

                        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 rounded-xl border border-blue-500/20">
                            <h4 className="font-semibold text-blue-300 mb-2">Did you know?</h4>
                            <p className="text-sm text-slate-400">
                                More than 80% of global trade finance is conducted in U.S. dollars, even when the U.S. is not a party to the transaction.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <footer className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p>© 2024 Anchor Currency Dashboard. Designed for educational purposes.</p>
                </footer>

            </div>
        </div>
    );
};

export default AnchorCurrencyDashboard;
