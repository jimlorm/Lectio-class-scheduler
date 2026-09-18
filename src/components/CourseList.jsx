import CourseCard from "./CourseCard";

function CourseList({ courses, selectedSections, onAddSection }) {
  if (courses.length === 0) {
    return (
      <div className="empty-courses">
        <div className="empty-symbol">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <h3>No courses found</h3>
        <p>Try another course code or title.</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          selectedSections={selectedSections}
          onAddSection={onAddSection}
        />
      ))}
    </div>
  );
}

export default CourseList;