/* ==========================================
   STUDYFLOW - STUDY PLANNER
   ========================================== */


/* ---------- DATA ---------- */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let exams = JSON.parse(localStorage.getItem("exams")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || [];

let timerSeconds = 25 * 60;
let timerInterval = null;


/* ---------- HELPERS ---------- */

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("schedules", JSON.stringify(schedules));
    localStorage.setItem("exams", JSON.stringify(exams));
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("notes", JSON.stringify(notes));
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function today() {
    return new Date().toISOString().split("T")[0];
}

function formatDate(date) {

    if (!date) return "";

    return new Date(date + "T00:00:00")
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
}

function escapeHTML(text) {

    const div = document.createElement("div");
    div.textContent = text;

    return div.innerHTML;
}


/* ---------- PAGE NAVIGATION ---------- */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        showPage(page);

        document.querySelector(".sidebar")
            .classList.remove("open");
    });

});


function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    navItems.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageId
        );

    });

    const titles = {
        dashboard: "Dashboard",
        tasks: "Study Tasks",
        subjects: "Subjects",
        timetable: "Weekly Timetable",
        exams: "Exams",
        goals: "Study Goals",
        timer: "Focus Timer",
        notes: "Study Notes",
        progress: "Study Progress"
    };

    document.getElementById("pageTitle").textContent =
        titles[pageId] || "Dashboard";

    updateAll();
}


/* ---------- DASHBOARD ---------- */

function updateDashboard() {

    document.getElementById("statSubjects").textContent =
        subjects.length;

    document.getElementById("statTasks").textContent =
        tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    document.getElementById("statCompleted").textContent =
        completed;

    const totalMinutes =
        tasks.reduce((sum, task) => sum + Number(task.duration || 0), 0);

    document.getElementById("statHours").textContent =
        (totalMinutes / 60).toFixed(1);


    /* Progress */

    const progress =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    document.getElementById("progressCircle").textContent =
        progress + "%";

    document.querySelector(".progress-circle").style.background =
        `conic-gradient(
            var(--primary) ${progress * 3.6}deg,
            var(--border) ${progress * 3.6}deg
        )`;


    /* Today's Tasks */

    const todayTasks =
        tasks.filter(task => task.date === today());

    const todayContainer =
        document.getElementById("todayTasks");

    if (todayTasks.length === 0) {

        todayContainer.innerHTML =
            `<p class="small-text">No tasks planned for today.</p>`;

    } else {

        todayContainer.innerHTML =
            todayTasks.slice(0, 5)
                .map(taskHTML)
                .join("");

    }


    /* Dashboard Exams */

    const examContainer =
        document.getElementById("dashboardExams");

    const upcoming =
        exams
            .filter(exam => exam.date >= today())
            .sort((a, b) =>
                a.date.localeCompare(b.date)
            )
            .slice(0, 4);

    if (upcoming.length === 0) {

        examContainer.innerHTML =
            `<p class="small-text">No upcoming exams.</p>`;

    } else {

        examContainer.innerHTML =
            upcoming.map(exam => {

                return `
                    <div class="task-item">

                        <div class="task-info">

                            <h4>
                                ${escapeHTML(exam.name)}
                            </h4>

                            <p>
                                ${formatDate(exam.date)}
                                ${exam.time ? " • " + exam.time : ""}
                            </p>

                        </div>

                    </div>
                `;

            }).join("");
    }
}


/* ---------- TASKS ---------- */

function taskHTML(task) {

    return `
        <div class="task-item ${task.completed ? "completed" : ""}">

            <input
                class="task-checkbox"
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <div class="task-info">

                <h4>
                    ${escapeHTML(task.name)}
                </h4>

                <p>
                    ${escapeHTML(task.subject)}
                    • ${formatDate(task.date)}
                    • ${task.duration} min
                </p>

            </div>

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                ×
            </button>

        </div>
    `;
}


function renderTasks() {

    const container =
        document.getElementById("taskList");

    let filtered = [...tasks];

    const filter =
        document.getElementById("taskFilter").value;

    const priority =
        document.getElementById("priorityFilter").value;


    if (filter === "pending") {

        filtered =
            filtered.filter(task => !task.completed);

    }

    if (filter === "completed") {

        filtered =
            filtered.filter(task => task.completed);

    }

    if (filter === "today") {

        filtered =
            filtered.filter(task => task.date === today());

    }

    if (priority !== "all") {

        filtered =
            filtered.filter(task =>
                task.priority === priority
            );

    }


    if (filtered.length === 0) {

        container.innerHTML =
            `<p class="small-text">No tasks found.</p>`;

        return;
    }


    filtered.sort((a, b) =>
        a.date.localeCompare(b.date)
    );

    container.innerHTML =
        filtered.map(taskHTML).join("");
}


function toggleTask(id) {

    const task =
        tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveData();

    updateAll();
}


function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);

    saveData();

    updateAll();
}


/* ---------- TASK FORM ---------- */

document
    .getElementById("taskForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const task = {

            id: generateId(),

            name:
                document.getElementById("taskName").value.trim(),

            subject:
                document.getElementById("taskSubject").value.trim(),

            date:
                document.getElementById("taskDate").value,

            duration:
                Number(
                    document.getElementById("taskDuration").value
                ) || 30,

            priority:
                document.getElementById("taskPriority").value,

            completed: false
        };


        tasks.push(task);

        saveData();

        this.reset();

        closeModal("taskModal");

        updateAll();
    });


/* ---------- SUBJECTS ---------- */

function renderSubjects() {

    const container =
        document.getElementById("subjectList");

    if (subjects.length === 0) {

        container.innerHTML =
            `<p class="small-text">
                No subjects added yet.
            </p>`;

        return;
    }


    container.innerHTML =
        subjects.map(subject => {

            const subjectTasks =
                tasks.filter(
                    task =>
                        task.subject.toLowerCase() ===
                        subject.name.toLowerCase()
                );

            const completed =
                subjectTasks.filter(
                    task => task.completed
                ).length;

            return `
                <div class="subject-card">

                    <div
                        class="subject-color"
                        style="background:${subject.color}"
                    ></div>

                    <h3>
                        ${escapeHTML(subject.name)}
                    </h3>

                    <p>
                        👨‍🏫
                        ${escapeHTML(
                            subject.teacher || "No teacher added"
                        )}
                    </p>

                    <p>
                        📚 ${subjectTasks.length} tasks
                    </p>

                    <p>
                        ✅ ${completed} completed
                    </p>

                    <button
                        class="delete-btn"
                        onclick="deleteSubject(${subject.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

        }).join("");
}


document
    .getElementById("subjectForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        subjects.push({

            id: generateId(),

            name:
                document.getElementById("subjectName").value.trim(),

            teacher:
                document.getElementById("subjectTeacher").value.trim(),

            color:
                document.getElementById("subjectColor").value

        });

        saveData();

        this.reset();

        closeModal("subjectModal");

        updateAll();
    });


function deleteSubject(id) {

    subjects =
        subjects.filter(subject => subject.id !== id);

    saveData();

    updateAll();
}


/* ---------- TIMETABLE ---------- */

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


function renderTimetable() {

    const container =
        document.getElementById("timetableGrid");

    container.innerHTML = days.map(day => {

        const daySchedules =
            schedules.filter(
                item => item.day === day
            );

        return `
            <div class="day-column">

                <div class="day-header">
                    ${day}
                </div>

                ${
                    daySchedules.length === 0
                    ?
                    `<p class="small-text"
                        style="padding:10px">
                        No study session
                    </p>`
                    :
                    daySchedules.map(item => {

                        return `
                            <div class="schedule-item">

                                <strong>
                                    ${escapeHTML(item.subject)}
                                </strong>

                                <span>
                                    ${item.start}
                                    -
                                    ${item.end}
                                </span>

                                <button
                                    class="delete-btn"
                                    onclick="deleteSchedule(${item.id})"
                                >
                                    ×
                                </button>

                            </div>
                        `;

                    }).join("")
                }

            </div>
        `;

    }).join("");
}


document
    .getElementById("scheduleForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        schedules.push({

            id: generateId(),

            day:
                document.getElementById("scheduleDay").value,

            subject:
                document.getElementById("scheduleSubject").value.trim(),

            start:
                document.getElementById("scheduleStart").value,

            end:
                document.getElementById("scheduleEnd").value

        });

        saveData();

        this.reset();

        closeModal("scheduleModal");

        updateAll();
    });


function deleteSchedule(id) {

    schedules =
        schedules.filter(item => item.id !== id);

    saveData();

    updateAll();
}


/* ---------- EXAMS ---------- */

function getDaysUntil(date) {

    const exam =
        new Date(date + "T00:00:00");

    const now =
        new Date(today() + "T00:00:00");

    return Math.ceil(
        (exam - now) / 86400000
    );
}


function renderExams() {

    const container =
        document.getElementById("examList");

    if (exams.length === 0) {

        container.innerHTML =
            `<p class="small-text">
                No exams added.
            </p>`;

        return;
    }


    const sorted =
        [...exams].sort(
            (a, b) =>
                a.date.localeCompare(b.date)
        );


    container.innerHTML =
        sorted.map(exam => {

            const daysLeft =
                getDaysUntil(exam.date);

            let countdown;

            if (daysLeft < 0) {

                countdown = "Completed";

            } else if (daysLeft === 0) {

                countdown = "Today";

            } else {

                countdown =
                    `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;

            }


            return `
                <div class="exam-card">

                    <h3>
                        ${escapeHTML(exam.name)}
                    </h3>

                    <div class="exam-days">
                        ${countdown}
                    </div>

                    <p>
                        📅 ${formatDate(exam.date)}
                    </p>

                    <p>
                        ⏰ ${exam.time || "Time not specified"}
                    </p>

                    <p>
                        🏫 ${escapeHTML(
                            exam.room || "Room not specified"
                        )}
                    </p>

                    <button
                        class="delete-btn"
                        onclick="deleteExam(${exam.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

        }).join("");
}


document
    .getElementById("examForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        exams.push({

            id: generateId(),

            name:
                document.getElementById("examName").value.trim(),

            date:
                document.getElementById("examDate").value,

            time:
                document.getElementById("examTime").value,

            room:
                document.getElementById("examRoom").value.trim()

        });

        saveData();

        this.reset();

        closeModal("examModal");

        updateAll();
    });


function deleteExam(id) {

    exams =
        exams.filter(exam => exam.id !== id);

    saveData();

    updateAll();
}


/* ---------- GOALS ---------- */

function renderGoals() {

    const container =
        document.getElementById("goalList");

    if (goals.length === 0) {

        container.innerHTML =
            `<p class="small-text">
                No goals created yet.
            </p>`;

        return;
    }


    container.innerHTML =
        goals.map(goal => {

            const progress =
                Math.min(
                    100,
                    Math.round(
                        (goal.current / goal.target) * 100
                    )
                );

            return `
                <div class="goal-card">

                    <h3>
                        ${escapeHTML(goal.name)}
                    </h3>

                    <p>
                        ${goal.current}
                        /
                        ${goal.target}
                        ${escapeHTML(goal.unit)}
                    </p>

                    <div class="goal-progress">
                        <div style="width:${progress}%"></div>
                    </div>

                    <p>
                        ${progress}% completed
                    </p>

                    <button
                        class="secondary-btn"
                        onclick="increaseGoal(${goal.id})"
                    >
                        + Progress
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteGoal(${goal.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

        }).join("");
}


document
    .getElementById("goalForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        goals.push({

            id: generateId(),

            name:
                document.getElementById("goalName").value.trim(),

            target:
                Number(
                    document.getElementById("goalTarget").value
                ),

            unit:
                document.getElementById("goalUnit").value.trim(),

            current: 0

        });

        saveData();

        this.reset();

        closeModal("goalModal");

        updateAll();
    });


function increaseGoal(id) {

    const goal =
        goals.find(goal => goal.id === id);

    if (!goal) return;

    goal.current =
        Math.min(
            goal.target,
            goal.current + 1
        );

    saveData();

    updateAll();
}


function deleteGoal(id) {

    goals =
        goals.filter(goal => goal.id !== id);

    saveData();

    updateAll();
}


/* ---------- NOTES ---------- */

function renderNotes() {

    const container =
        document.getElementById("noteList");

    if (notes.length === 0) {

        container.innerHTML =
            `<p class="small-text">
                No notes saved.
            </p>`;

        return;
    }


    container.innerHTML =
        notes.map(note => {

            return `
                <div class="note-card">

                    <h3>
                        ${escapeHTML(note.title)}
                    </h3>

                    <p class="note-content">
                        ${escapeHTML(note.content)}
                    </p>

                    <br>

                    <button
                        class="delete-btn"
                        onclick="deleteNote(${note.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

        }).join("");
}


document
    .getElementById("noteForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        notes.push({

            id: generateId(),

            title:
                document.getElementById("noteTitle").value.trim(),

            content:
                document.getElementById("noteContent").value.trim()

        });

        saveData();

        this.reset();

        closeModal("noteModal");

        updateAll();
    });


function deleteNote(id) {

    notes =
        notes.filter(note => note.id !== id);

    saveData();

    updateAll();
}


/* ---------- PROGRESS ---------- */

function renderProgress() {

    const completed =
        tasks.filter(task => task.completed).length;

    const progress =
        tasks.length === 0
            ? 0
            : Math.round(
                completed / tasks.length * 100
            );


    document.getElementById("taskProgressText")
        .textContent = progress + "%";

    document.getElementById("taskProgressBar")
        .style.width = progress + "%";


    const totalMinutes =
        tasks.reduce(
            (sum, task) =>
                sum + Number(task.duration || 0),
            0
        );

    document.getElementById("totalStudyTime")
        .textContent = totalMinutes;
}


/* ---------- POMODORO TIMER ---------- */

function updateTimerDisplay() {

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;

    document.getElementById("timerDisplay")
        .textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


document
    .getElementById("startTimer")
    .addEventListener("click", function() {

        if (timerInterval) return;

        timerInterval =
            setInterval(() => {

                if (timerSeconds <= 0) {

                    clearInterval(timerInterval);

                    timerInterval = null;

                    alert("🎉 Focus session completed!");

                    return;
                }

                timerSeconds--;

                updateTimerDisplay();

            }, 1000);
    });


document
    .getElementById("pauseTimer")
    .addEventListener("click", function() {

        clearInterval(timerInterval);

        timerInterval = null;
    });


document
    .getElementById("resetTimer")
    .addEventListener("click", function() {

        clearInterval(timerInterval);

        timerInterval = null;

        timerSeconds = 25 * 60;

        updateTimerDisplay();
    });


function setTimer(minutes) {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = minutes * 60;

    updateTimerDisplay();
}


/* ---------- MODALS ---------- */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");
}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");
}


/* Close modal when clicking outside */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", function(e) {

        if (e.target === modal) {

            modal.classList.remove("show");
        }

    });

});


/* ---------- DARK MODE ---------- */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    document.getElementById("themeToggle")
        .textContent = "☀️ Light Mode";
}


document
    .getElementById("themeToggle")
    .addEventListener("click", function() {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        this.textContent =
            dark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    });


/* ---------- MOBILE MENU ---------- */

document
    .getElementById("mobileMenu")
    .addEventListener("click", function() {

        document
            .querySelector(".sidebar")
            .classList.toggle("open");
    });


/* ---------- SEARCH ---------- */

document
    .getElementById("globalSearch")
    .addEventListener("input", function() {

        const search =
            this.value.toLowerCase().trim();

        if (!search) {

            renderTasks();

            return;
        }

        const results =
            tasks.filter(task =>
                task.name.toLowerCase().includes(search) ||
                task.subject.toLowerCase().includes(search)
            );

        const container =
            document.getElementById("taskList");

        showPage("tasks");

        if (results.length === 0) {

            container.innerHTML =
                `<p class="small-text">
                    No results found.
                </p>`;

        } else {

            container.innerHTML =
                results.map(taskHTML).join("");
        }

    });


/* ---------- RESET DATA ---------- */

document
    .getElementById("clearData")
    .addEventListener("click", function() {

        const confirmed =
            confirm(
                "Are you sure you want to delete all planner data?"
            );

        if (!confirmed) return;

        tasks = [];
        subjects = [];
        schedules = [];
        exams = [];
        goals = [];
        notes = [];

        saveData();

        updateAll();
    });


/* ---------- DATE ---------- */

document.getElementById("currentDate")
    .textContent =
    new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


/* ---------- FILTER EVENTS ---------- */

document
    .getElementById("taskFilter")
    .addEventListener("change", renderTasks);

document
    .getElementById("priorityFilter")
    .addEventListener("change", renderTasks);


/* ---------- UPDATE EVERYTHING ---------- */

function updateAll() {

    updateDashboard();

    renderTasks();

    renderSubjects();

    renderTimetable();

    renderExams();

    renderGoals();

    renderNotes();

    renderProgress();

    updateTimerDisplay();
}


/* ---------- INITIALIZE ---------- */

updateAll();
