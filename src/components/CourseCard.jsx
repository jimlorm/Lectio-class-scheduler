import { useState } from "react";
import SectionCard from "./SectionCard";

function CourseCard({ course, selectedSections, onAddSection }) {
  const selectedForCourse = selectedSections.find(
    (section) => section.course.id === course.id
  );

  const [expanded, setExpanded] = useState(Boolean(selectedForCourse));

  return (
    <article className="course-card">
      <button
        className="course-header"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <div className="course-heading">
          <span className="course-code">{course.code}</span>
          <h3>{course.title}</h3>
        </div>

        <div className="course-header-right">
          <span className="units-pill">{course.units} units</span>
          <span className="chevron">{expanded ? "⌃" : "⌄"}</span>
        </div>
      </button>

      {expanded && (
        <div className="sections-list">
          <div className="sections-label">Available sections</div>

          {course.sections.map((section) => (
            <SectionCard
              key={section.id}
              course={course}
              section={section}
              isSelected={selectedSections.some(
                (selected) => selected.id === section.id
              )}
              anotherSectionSelected={
                Boolean(selectedForCourse) &&
                selectedForCourse.id !== section.id
              }
              onAddSection={onAddSection}
            />
          ))}
        </div>
      )}
    </article>
  );
}

export default CourseCard;
