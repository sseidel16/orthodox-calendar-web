import type { MonthData, BoxData, DateBox, SplitBox, NoteBox } from '../types';

const DAY_HEADERS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_HEADERS_GR = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];

export function MonthGrid({ month }: { month: MonthData }) {
    return (
        <div className="month">
            <h2 className="month-title">
                <span className="month-en">{month.name[0]}</span>
                <span className="month-gr">{month.name[1]}</span>
            </h2>
            <div className="grid">
                <div className="grid-header">
                    {DAY_HEADERS_EN.map((day, i) => (
                        <div key={day} className="header-cell">
                            <span className="header-en">{day}</span>
                            <span className="header-gr">{DAY_HEADERS_GR[i]}</span>
                        </div>
                    ))}
                </div>
                {month.grid.map((row, ri) => (
                    <div key={ri} className="grid-row">
                        {row.map((cell, ci) => (
                            <Cell key={ci} cell={cell} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Cell({ cell }: { cell: BoxData }) {
    switch (cell.type) {
        case 'EMPTY': return <div className="cell empty" />;
        case 'NOTE': return <NoteCell cell={cell} />;
        case 'SPLIT': return <SplitCell cell={cell} />;
        case 'DATE': return <DateCell cell={cell} />;
    }
}

function NoteCell({ cell }: { cell: NoteBox }) {
    return (
        <div className="cell note-cell">
            <div className="note-sidebar">
                <div className="note-indicator">{cell.note}</div>
            </div>
            <div className="note-content">
                <div className="note-en">{cell.text[0]}</div>
                <div className="note-gr">{cell.text[1]}</div>
            </div>
        </div>
    );
}

function SplitCell({ cell }: { cell: SplitBox }) {
    return (
        <div className="cell split-cell">
            <div className={`split-half ${cell.top.background === 'FASTING' ? 'fasting' : ''}`}>
                <DateContent box={cell.top} />
            </div>
            <div className="split-divider" />
            <div className={`split-half ${cell.bottom.background === 'FASTING' ? 'fasting' : ''}`}>
                <DateContent box={cell.bottom} />
            </div>
        </div>
    );
}

function DateCell({ cell }: { cell: DateBox }) {
    const classes = ['cell', 'date-cell'];
    if (cell.background === 'FASTING') classes.push('fasting');

    return (
        <div className={classes.join(' ')}>
            <DateContent box={cell} />
        </div>
    );
}

function DateContent({ box }: { box: DateBox }) {
    return (
        <div className="date-layout">
            <div className="date-sidebar">
                <div className={`new-date ${box.newFeast ? 'feast-date' : ''}`}>{box.newDate}</div>
                <div className={`old-date ${box.oldFeast ? 'feast-date' : ''}`}>{box.oldDate}</div>
                {box.note && <div className="note-ref">{box.note}</div>}
                <div className="sidebar-spacer" />
                {box.moon !== 'NONE' && <div className="moon"><MoonIcon phase={box.moon} /></div>}
                <div className="sidebar-spacer" />
                {box.fasting !== 'NONE' && box.fasting !== 'STRICT' && (
                    <div className="fasting-icon"><FastingIcon fasting={box.fasting} /></div>
                )}
            </div>
            <div className="date-content">
                <div className="date-body">
                    {box.mainText.feast && (
                        <div className="feast">
                            <div className="en">{box.mainText.feast[0]}</div>
                            <div className="gr">{box.mainText.feast[1]}</div>
                        </div>
                    )}
                    {box.mainText.saint && (
                        <div className="saint">
                            <div className="en">{box.mainText.saint[0]}</div>
                            <div className="gr">{box.mainText.saint[1]}</div>
                        </div>
                    )}
                    {box.mainText.note && (
                        <div className="main-note">
                            <div className="en">{box.mainText.note[0]}</div>
                            <div className="gr">{box.mainText.note[1]}</div>
                        </div>
                    )}
                </div>
                <div className="date-footer">
                    {box.lowerText.tone && (
                        <div className="tone">{box.lowerText.tone}</div>
                    )}
                    {box.lowerText.readings.length > 0 && (
                        <div className="readings">
                            {box.lowerText.readings.map((r, i) => (
                                <div key={i} className="reading">{r}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MoonIcon({ phase }: { phase: string }) {
    switch (phase) {
        case 'NEW': return <span className="moon-emoji">🌑</span>;
        case 'FIRST': return <span className="moon-emoji">🌓</span>;
        case 'FULL': return <span className="moon-emoji">🌕</span>;
        case 'LAST': return <span className="moon-emoji">🌗</span>;
        default: return null;
    }
}

function FastingIcon({ fasting }: { fasting: string }) {
    switch (fasting) {
        case 'OIL':
            return <span className="fasting-emoji">🍷</span>;
        case 'FISH':
            return <span className="fasting-emoji">🐟</span>;
        case 'DAIRY':
            return <span className="fasting-emoji">🧀</span>;
        default:
            return null;
    }
}
