const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const START_HOUR = 8;
const END_HOUR = 18;

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function Schedule({ selectedSections, onRemoveSection }) {
  return (
    <div className="schedule-panel">
      {selectedSections.length === 0 ? (
        <div className="empty-schedule">
          <div className="calendar-icon">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <h3>Your schedule is empty</h3>
          <p>Select a section from the course list to add it to your schedule.</p>
        </div>
      ) : (
        <div className="timetable-scroll">
          <div
            className="timetable"
            style={{
              "--rows": END_HOUR - START_HOUR,
            }}
          >
            <div className="timetable-corner">Time</div>

            {DAYS.map((day) => (
              <div className="day-heading" key={day}>
                {day.slice(0, 3)}
              </div>
            ))}

            {Array.from({ length: END_HOUR - START_HOUR }, (_, index) => {
              const hour = START_HOUR + index;

              return (
                <div className="time-row" key={hour}>
                  <div className="time-label">{String(hour).padStart(2, "0")}:00</div>

                  {DAYS.map((day) => {
                    const classes = [];

                    selectedSections.forEach((section) => {
                      section.schedule.forEach((slot) => {
                        const start = timeToMinutes(slot.startTime);
                        const end = timeToMinutes(slot.endTime);
                        const rowStart = hour * 60;

                        if (
                          slot.day === day &&
                          start >= rowStart &&
                          start < rowStart + 60
                        ) {
                          classes.push({
                            section,
                            slot,
                            duration: (end - start) / 60,
                          });
                        }
                      });
                    });

                    return (
                      <div className="time-cell" key={`${day}-${hour}`}>
                        {classes.map(({ section, slot, duration }) => (
                          <div
                            className="class-block"
                            key={`${section.id}-${slot.day}`}
                            style={{
                              minHeight: `${Math.max(duration * 62 - 8, 52)}px`,
                            }}
                          >
                            <strong>{section.course.code}</strong>
                            <span>{section.section}</span>
                            <small>
                              {slot.startTime} – {slot.endTime}
                            </small>
                            <small>{section.room}</small>

                            <button
                              onClick={() => onRemoveSection(section.id)}
                              className="class-remove"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="selected-classes">
        <div className="selected-heading">
          <div>
            <h3>Selected Classes</h3>
            <p>Manage your selected sections.</p>
          </div>
          <span>{selectedSections.length} selected</span>
        </div>

        {selectedSections.length === 0 ? (
          <div className="selected-empty">
            <div className="list-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </div>
            <strong>No classes selected yet</strong>
            <p>Your selected classes will appear here.</p>
          </div>
        ) : (
          <div className="selected-list">
            {selectedSections.map((section) => (
              <div className="selected-class-row" key={section.id}>
                <div>
                  <strong>
                    {section.course.code} · {section.section}
                  </strong>
                  <p>
                    {section.course.title} · {section.instructor} · {section.room}
                  </p>
                </div>

                <button
                  className="text-remove"
                  onClick={() => onRemoveSection(section.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
