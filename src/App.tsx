import { useEffect, useState } from 'react';
import type { CalendarData } from './types';
import { MonthGrid } from './components/MonthGrid';

const AVAILABLE_YEARS = Array.from({ length: 41 }, (_, i) => 2005 + i); // 2005-2045

declare global {
    interface Window {
        OrthodoxCalendarData: {
            generateCalendarYear: (year: number, options?: any) => CalendarData;
            GREGORIAN: any;
            JULIAN: any;
        };
    }
}

type PrimaryCalendar = 'new' | 'old';

function App() {
    const [data, setData] = useState<CalendarData | null>(null);
    const [year, setYear] = useState(2026);
    const [primary, setPrimary] = useState<PrimaryCalendar>('new');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const generate = () => {
            const lib = window.OrthodoxCalendarData;
            if (lib) {
                const options = primary === 'new'
                    ? { calendar: lib.GREGORIAN, secondaryCalendar: lib.JULIAN }
                    : { calendar: lib.JULIAN, secondaryCalendar: lib.GREGORIAN };
                setData(lib.generateCalendarYear(year, options));
                setLoading(false);
            }
        };
        if (window.OrthodoxCalendarData) {
            generate();
        } else {
            document.addEventListener('lib-loaded', generate, { once: true });
        }
    }, [year, primary]);

    if (loading || !data) return <div className="loading">Generating {year} calendar...</div>;

    return (
        <div className="calendar-app">
            <div className="year-nav">
                <select value={year} onChange={e => setYear(Number(e.target.value))}>
                    {AVAILABLE_YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <div className="calendar-toggle">
                    <button
                        className={`toggle-btn ${primary === 'new' ? 'active' : ''}`}
                        onClick={() => setPrimary('new')}
                    >
                        New Calendar
                    </button>
                    <button
                        className={`toggle-btn ${primary === 'old' ? 'active' : ''}`}
                        onClick={() => setPrimary('old')}
                    >
                        Old Calendar
                    </button>
                </div>
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
