import CourseCard from "./CourseCard";

function CourseList({ courses, selectedSections, onAddSection }) {
  if (courses.length === 0) {
    return (
      <div className="empty-courses">
        <div className="empty-symbol">⌕</div>
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
