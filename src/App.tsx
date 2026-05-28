import { useEffect, useState } from 'react';
import { generateCalendarYear, GREGORIAN, JULIAN, PROPORTIONAL } from '@orthodox-tools/calendar-data';
import type { CalendarData } from '@orthodox-tools/calendar-data';
import { MonthGrid } from './components/MonthGrid';

const AVAILABLE_YEARS = Array.from({ length: 41 }, (_, i) => 2005 + i); // 2005-2045

type PrimaryCalendar = 'new' | 'old';

function App() {
    const [data, setData] = useState<CalendarData | null>(null);
    const [year, setYear] = useState(2027);
    const [primary, setPrimary] = useState<PrimaryCalendar>('new');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const options = {
            calendar: primary === 'new' ? GREGORIAN : JULIAN,
            secondaryCalendar: primary === 'new' ? JULIAN : GREGORIAN,
            readingsLayout: { maxLines: 3, maxLineWidth: 33, charWidth: PROPORTIONAL },
        };
        setData(generateCalendarYear(year, options));
        setLoading(false);
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
