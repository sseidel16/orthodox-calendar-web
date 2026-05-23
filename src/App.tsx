import { useEffect, useState } from 'react';
import type { CalendarData } from './types';
import { MonthGrid } from './components/MonthGrid';

const AVAILABLE_YEARS = [2024, 2025, 2026];

function App() {
    const [data, setData] = useState<CalendarData | null>(null);
    const [year, setYear] = useState(AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1]);

    useEffect(() => {
        fetch(`/data/${year}.json`)
            .then(res => res.json())
            .then(setData)
            .catch(() => setData(null));
    }, [year]);

    if (!data) return <div className="loading">Loading...</div>;

    return (
        <div className="calendar-app">
            <div className="year-nav">
                <select value={year} onChange={e => setYear(Number(e.target.value))}>
                    {AVAILABLE_YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
            <div className="months">
                {data.months.map((month, i) => (
                    <MonthGrid key={i} month={month} />
                ))}
            </div>
        </div>
    );
}

export default App;
