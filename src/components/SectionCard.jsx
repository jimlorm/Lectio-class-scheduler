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
          <span>▣ {section.room}</span>
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
