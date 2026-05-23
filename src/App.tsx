import { useEffect, useState } from 'react';
import type { CalendarData } from './types';
import { MonthGrid } from './components/MonthGrid';

const AVAILABLE_YEARS = Array.from({ length: 41 }, (_, i) => 2005 + i); // 2005-2045

declare global {
    interface Window {
        OrthodoxCalendarData: {
            getYearCalendar: (year: number, options?: any) => CalendarData;
        };
    }
}

function App() {
    const [data, setData] = useState<CalendarData | null>(null);
    const [year, setYear] = useState(2026);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const generate = () => {
            const lib = window.OrthodoxCalendarData;
            if (lib) {
                setData(lib.getYearCalendar(year));
                setLoading(false);
            }
        };
        if (window.OrthodoxCalendarData) {
            generate();
        } else {
            document.addEventListener('lib-loaded', generate, { once: true });
        }
    }, [year]);

    if (loading || !data) return <div className="loading">Generating {year} calendar...</div>;

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
