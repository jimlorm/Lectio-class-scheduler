import { useMemo, useState } from "react";
import { courses } from "./data/courses";
import CourseList from "./components/CourseList";
import Schedule from "./components/Schedule";

const MAX_UNITS = 18;

function App() {
  const [selectedSections, setSelectedSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setNotice] = useState("");

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return courses;

    return courses.filter(
      (course) =>
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.sections.some((section) =>
          section.instructor.toLowerCase().includes(query)
        )
    );
  }, [searchQuery]);

  const totalUnits = selectedSections.reduce(
    (total, section) => total + section.course.units,
    0
  );

  function showNotice(message) {
    setNotice(message);

    window.clearTimeout(showNotice.timeout);
    showNotice.timeout = window.setTimeout(() => {
      setNotice("");
    }, 3500);
  }

  function addSection(course, section) {
    const existingForCourse = selectedSections.find(
      (selected) => selected.course.id === course.id
    );

    if (existingForCourse?.id === section.id) {
      return;
    }

    if (existingForCourse) {
      setSelectedSections((current) =>
        current.map((selected) =>
          selected.course.id === course.id
            ? { ...section, course }
            : selected
        )
      );

      showNotice(
        `${course.code} ${existingForCourse.section} was changed to ${section.section}.`
      );
      return;
    }

    if (totalUnits + course.units > MAX_UNITS) {
      showNotice(
        `You cannot add ${course.code}. Your maximum is ${MAX_UNITS} units.`
      );
      return;
    }

    setSelectedSections((current) => [
      ...current,
      { ...section, course },
    ]);

    showNotice(`${course.code} ${section.section} added to your schedule.`);
  }

  function removeSection(sectionId) {
    const removed = selectedSections.find(
      (section) => section.id === sectionId
    );

    setSelectedSections((current) =>
      current.filter((section) => section.id !== sectionId)
    );

    if (removed) {
      showNotice(`${removed.course.code} was removed from your schedule.`);
    }
  }

  function clearSchedule() {
    setSelectedSections([]);
    showNotice("Your schedule was cleared.");
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <img src="/Lectio.png" alt="Lectio" className="brand-logo" />
        </div>

        <div className="topbar-right">
          <span className="tagline">Plan wisely. Study freely.</span>
          <div className="profile-circle" aria-label="Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>
      </header>

      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Close notice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}

      <main className="page">
        <section className="courses-column">
          <div className="page-heading">
            <div>
              <h1>Courses</h1>
              <p>Browse and select sections to build your schedule.</p>
            </div>

            <span className="course-total">
              {filteredCourses.length} courses
            </span>
          </div>

          <div className="search-row">
            <div className="search-box">
              <span className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input
                type="search"
                placeholder="Search by course code or title..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              {searchQuery && (
                <button
                  className="clear-button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
            {/* Filter button was completely removed from here */}
          </div>

          <CourseList
            courses={filteredCourses}
            selectedSections={selectedSections}
            onAddSection={addSection}
          />
        </section>

        <section className="schedule-column">
          <div className="schedule-heading">
            <div>
              <h2>My Schedule</h2>
              <p>Your selected classes for the week.</p>
            </div>

            <div className="unit-card">
              <span>Total Units</span>
              <strong>
                {totalUnits} <small>/ {MAX_UNITS}</small>
              </strong>
            </div>
          </div>

          <Schedule
            selectedSections={selectedSections}
            onRemoveSection={removeSection}
          />

          {selectedSections.length > 0 && (
            <button className="clear-schedule" onClick={clearSchedule}>
              Clear Schedule
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;