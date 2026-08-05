import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, List, LayoutGrid } from 'lucide-react';
import { MOCK_CALENDAR_EVENTS } from '../data/mockData';
import { useTask } from '../context/TaskContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const CalendarPage = () => {
  const { navigateTo } = useTask();
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'agenda'
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 5)); // Aug 5, 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date(2026, 7, 5));

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, month: month - 1, otherMonth: true });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, month: month, otherMonth: false });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, month: month + 1, otherMonth: true });
    }

    return days;
  }, [year, month]);

  const getEventsForDay = (day, mon) => {
    const dateStr = `${year}-${String(mon + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return MOCK_CALENDAR_EVENTS.filter(e => e.date === dateStr);
  };

  const isToday = (day, mon) => {
    return day === 5 && mon === 7 && year === 2026; // Aug 5, 2026
  };

  // Agenda view: group events by date
  const agendaEvents = useMemo(() => {
    return [...MOCK_CALENDAR_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  return (
    <div className="page-container fade-in-up">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>
            <CalendarIcon size={26} style={{ color: 'var(--accent-primary)' }} />
            Calendar
          </h1>
          <p>Track deadlines, meetings, milestones, and sprint events in one view.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={goToToday} style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}>
            Today
          </button>
          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-elevated)', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('month')} className="btn-icon"
              style={{ width: '32px', height: '32px', border: 'none', backgroundColor: viewMode === 'month' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'month' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="Monthly View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('agenda')} className="btn-icon"
              style={{ width: '32px', height: '32px', border: 'none', backgroundColor: viewMode === 'agenda' ? 'var(--bg-card)' : 'transparent', color: viewMode === 'agenda' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              title="Agenda View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="card-glass" style={{ padding: '0.75rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn-icon" onClick={prevMonth} style={{ width: '30px', height: '30px' }} aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
          {MONTHS[month]} {year}
        </h2>
        <button className="btn-icon" onClick={nextMonth} style={{ width: '30px', height: '30px' }} aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      {viewMode === 'month' ? (
        /* Monthly Grid */
        <div className="calendar-grid">
          {/* Header Row */}
          {DAYS.map(d => (
            <div key={d} className="calendar-header-cell">{d}</div>
          ))}

          {/* Day Cells */}
          {calendarDays.map((cell, i) => {
            const events = getEventsForDay(cell.day, cell.month);
            const today = isToday(cell.day, cell.month);

            return (
              <div
                key={i}
                className={`calendar-cell ${today ? 'today' : ''} ${cell.otherMonth ? 'other-month' : ''}`}
              >
                <div className="calendar-day-num">{cell.day}</div>
                {events.slice(0, 3).map(evt => (
                  <div
                    key={evt.id}
                    className="calendar-event-pill"
                    style={{ backgroundColor: `${evt.color}22`, color: evt.color }}
                    onClick={() => evt.taskId && navigateTo('taskdetail', evt.taskId)}
                    title={evt.title}
                  >
                    {evt.title}
                  </div>
                ))}
                {events.length > 3 && (
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', paddingLeft: '0.2rem' }}>
                    +{events.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Agenda View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {agendaEvents.map(evt => {
            const eventDate = new Date(evt.date + 'T00:00:00');
            const dateLabel = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            return (
              <div key={evt.id} className="card-glass" style={{ padding: '0.85rem 1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: evt.taskId ? 'pointer' : 'default' }}
                onClick={() => evt.taskId && navigateTo('taskdetail', evt.taskId)}
              >
                <div style={{
                  width: '4px', height: '36px', borderRadius: '2px',
                  backgroundColor: evt.color, flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{evt.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{dateLabel} • {evt.type}</div>
                </div>
                <span style={{
                  fontSize: '0.72rem', fontWeight: '600', padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: `${evt.color}18`, color: evt.color
                }}>
                  {evt.type}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
