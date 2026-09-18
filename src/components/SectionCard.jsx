function SectionCard({
  course,
  section,
  isSelected,
  anotherSectionSelected,
  onAddSection,
}) {
  let buttonText = "Add Section";

  if (isSelected) {
    buttonText = "Selected";
  } else if (anotherSectionSelected) {
    buttonText = "Switch to This Section";
  }

  return (
    <article className={`section-row ${isSelected ? "section-row-selected" : ""}`}>
      <div className="section-main">
        <div>
          <h4>Section {section.section}</h4>
          <p>{section.instructor}</p>
        </div>

        <div className="section-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {section.room}
          </span>
          <span>
            {section.schedule
              .map((slot) => `${slot.day.slice(0, 3)} ${slot.startTime} – ${slot.endTime}`)
              .join(" · ")}
          </span>
        </div>
      </div>

      <button
        className={`section-action ${isSelected ? "selected" : ""}`}
        onClick={() => onAddSection(course, section)}
        disabled={isSelected}
      >
        {buttonText}
      </button>
    </article>
  );
}

export default SectionCard;