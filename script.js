/* =====================================================
   STUDY MATE
   Complete Frontend Application
===================================================== */


/* ================= GLOBAL DATA ================= */

let users = JSON.parse(localStorage.getItem("studyMateUsers")) || [];

let currentUserEmail =
    localStorage.getItem("studyMateCurrentUser") || null;

let currentUser = null;

let taskFilter = "all";

let timerInterval = null;

let timerSeconds = 25 * 60;


/* ================= DEFAULT USER DATA ================= */

function createUserData() {

    return {

        subjects: [],

        tasks: [],

        notes: [],

        exams: [],

        planner: [],

        studyMinutes: 0,

        streak: 0,

        lastStudyDate: null

    };

}


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("currentDate").textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    if (currentUserEmail) {

        currentUser =
            users.find(user => user.email === currentUserEmail);

        if (currentUser) {

            openApplication();

        }

    }

    updateTimerDisplay();

});


/* ================= AUTH ================= */

function showRegister() {

    document.getElementById("loginBox")
        .classList.add("hidden");

    document.getElementById("registerBox")
        .classList.remove("hidden");

}


function showLogin() {

    document.getElementById("registerBox")
        .classList.add("hidden");

    document.getElementById("loginBox")
        .classList.remove("hidden");

}


/* ================= REGISTER ================= */

document.getElementById("registerForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const studentId =
        document.getElementById("registerStudentId").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const course =
        document.getElementById("registerCourse").value.trim();

    const department =
        document.getElementById("registerDepartment").value.trim();

    const academicYear =
        document.getElementById("registerYear").value;

    const semester =
        document.getElementById("registerSemester").value;


    if (users.some(user => user.email === email)) {

        showToast("Email already registered.");

        return;

    }


    if (users.some(user => user.studentId === studentId)) {

        showToast("Student ID already exists.");

        return;

    }


    const newUser = {

        id: Date.now(),

        name,

        studentId,

        email,

        password,

        course,

        department,

        academicYear,

        semester,

        ...createUserData()

    };


    users.push(newUser);

    saveUsers();


    currentUser = newUser;

    currentUserEmail = email;

    localStorage.setItem(
        "studyMateCurrentUser",
        email
    );


    showToast("Account created successfully!");

    openApplication();

});


/* ================= LOGIN ================= */

document.getElementById("loginForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const user = users.find(
        u =>
            u.email === email &&
            u.password === password
    );


    if (!user) {

        showToast("Invalid email or password.");

        return;

    }


    currentUser = user;

    currentUserEmail = email;


    localStorage.setItem(
        "studyMateCurrentUser",
        email
    );


    openApplication();

});


/* ================= OPEN APP ================= */

function openApplication() {

    document.getElementById("authScreen")
        .classList.add("hidden");

    document.getElementById("app")
        .classList.remove("hidden");


    renderEverything();

}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("studyMateCurrentUser");

    location.reload();

}


/* ================= SAVE DATABASE ================= */

function saveUsers() {

    localStorage.setItem(
        "studyMateUsers",
        JSON.stringify(users)
    );

}


/* ================= PAGE NAVIGATION ================= */

function showPage(pageId, element) {

    document.querySelectorAll(".page")
        .forEach(page => page.classList.remove("active-page"));

    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add("active-page");

    }


    document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));


    if (element) {

        element.classList.add("active");

    }


    const titles = {

        dashboard: "Dashboard",
        subjects: "Subjects",
        planner: "Study Planner",
        tasks: "Tasks",
        notes: "Notes",
        exams: "Exam Preparation",
        timer: "Pomodoro Timer",
        profile: "Student Profile",
        students: "Student Database"

    };


    document.getElementById("pageTitle")
        .textContent = titles[pageId] || "Study Mate";

}


function showPageById(id) {

    const nav =
        document.querySelector(
            `.nav-item[onclick*="${id}"]`
        );

    showPage(id, nav);

}


/* ================= MODALS ================= */

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


/* ================= SUBJECTS ================= */

document.getElementById("subjectForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    const name =
        document.getElementById("subjectName").value.trim();

    const difficulty =
        document.getElementById("subjectDifficulty").value;


    currentUser.subjects.push({

        id: Date.now(),

        name,

        difficulty,

        topics: []

    });


    saveUsers();

    this.reset();

    closeModal("subjectModal");

    renderSubjects();

    renderDashboard();

    showToast("Subject added.");

});


function renderSubjects() {

    const container =
        document.getElementById("subjectsContainer");


    if (!currentUser.subjects.length) {

        container.innerHTML = `
            <div class="panel">
                <p>No subjects added yet.</p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        currentUser.subjects.map(subject => {

            const completed =
                subject.topics.filter(t => t.completed).length;

            const total =
                subject.topics.length;

            const progress =
                total
                    ? Math.round((completed / total) * 100)
                    : 0;


            return `

                <div class="subject-card">

                    <div class="subject-top">

                        <div>

                            <h3>
                                ${escapeHTML(subject.name)}
                            </h3>

                            <small>
                                ${total} topics
                            </small>

                        </div>

                        <span class="difficulty ${subject.difficulty.toLowerCase()}">
                            ${subject.difficulty}
                        </span>

                    </div>


                    <div class="progress-item">

                        <div class="progress-label">

                            <span>Progress</span>

                            <strong>${progress}%</strong>

                        </div>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${progress}%"
                            ></div>

                        </div>

                    </div>


                    <div class="topic-list">

                        ${
                            subject.topics.length
                                ? subject.topics.map(topic => `

                                    <label class="topic ${topic.completed ? "completed" : ""}">

                                        <input
                                            type="checkbox"
                                            ${topic.completed ? "checked" : ""}
                                            onchange="toggleTopic(${subject.id}, ${topic.id})"
                                        >

                                        <span>
                                            ${escapeHTML(topic.name)}
                                        </span>

                                    </label>

                                `).join("")
                                : `<p style="font-size:12px;color:var(--muted)">
                                    No topics yet.
                                   </p>`
                        }

                    </div>


                    <button
                        class="add-topic-btn"
                        onclick="openTopicModal(${subject.id})"
                    >
                        + Add Unit / Topic
                    </button>

                </div>

            `;

        }).join("");

}


/* ================= ADD TOPIC ================= */

function openTopicModal(subjectId) {

    document.getElementById("topicSubjectId").value =
        subjectId;

    openModal("topicModal");

}


document.getElementById("topicForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    const subjectId =
        Number(document.getElementById("topicSubjectId").value);

    const name =
        document.getElementById("topicName").value.trim();

    const difficulty =
        document.getElementById("topicDifficulty").value;


    const subject =
        currentUser.subjects.find(
            s => s.id === subjectId
        );


    if (!subject) return;


    subject.topics.push({

        id: Date.now(),

        name,

        difficulty,

        completed: false

    });


    saveUsers();

    this.reset();

    closeModal("topicModal");

    renderSubjects();

    renderDashboard();

    showToast("Topic added.");

});


/* ================= TOGGLE TOPIC ================= */

function toggleTopic(subjectId, topicId) {

    const subject =
        currentUser.subjects.find(
            s => s.id === subjectId
        );


    if (!subject) return;


    const topic =
        subject.topics.find(
            t => t.id === topicId
        );


    if (!topic) return;


    topic.completed =
        !topic.completed;


    if (topic.completed) {

        recordStudyActivity();

    }


    saveUsers();

    renderSubjects();

    renderDashboard();

}


/* ================= TASKS ================= */

document.getElementById("taskForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    currentUser.tasks.push({

        id: Date.now(),

        title:
            document.getElementById("taskTitle").value.trim(),

        priority:
            document.getElementById("taskPriority").value,

        dueDate:
            document.getElementById("taskDueDate").value,

        completed: false

    });


    saveUsers();

    this.reset();

    closeModal("taskModal");

    renderTasks();

    renderDashboard();

    showToast("Task added.");

});


function filterTasks(filter) {

    taskFilter = filter;

    renderTasks();

}


function renderTasks() {

    const container =
        document.getElementById("tasksContainer");


    let tasks =
        [...currentUser.tasks];


    if (taskFilter === "pending") {

        tasks =
            tasks.filter(t => !t.completed);

    }

    if (taskFilter === "completed") {

        tasks =
            tasks.filter(t => t.completed);

    }


    tasks.sort(
        (a, b) =>
            new Date(a.dueDate) -
            new Date(b.dueDate)
    );


    if (!tasks.length) {

        container.innerHTML =
            `<p>No tasks found.</p>`;

        return;

    }


    container.innerHTML =
        tasks.map(task => `

            <div class="task-item">

                <input
                    class="task-check"
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <div class="task-content
                    ${task.completed ? "task-completed" : ""}">

                    <strong>
                        ${escapeHTML(task.title)}
                    </strong>

                    <small>
                        Due: ${formatDate(task.dueDate)}
                    </small>

                </div>

                <span class="priority priority-${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

        `).join("");

}


function toggleTask(id) {

    const task =
        currentUser.tasks.find(
            t => t.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveUsers();

    renderTasks();

    renderDashboard();

}


/* ================= NOTES ================= */

document.getElementById("noteForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    currentUser.notes.push({

        id: Date.now(),

        title:
            document.getElementById("noteTitle").value.trim(),

        subject:
            document.getElementById("noteSubject").value.trim(),

        content:
            document.getElementById("noteContent").value.trim(),

        createdAt:
            new Date().toISOString()

    });


    saveUsers();

    this.reset();

    closeModal("noteModal");

    renderNotes();

    showToast("Note saved.");

});


function renderNotes() {

    const container =
        document.getElementById("notesContainer");


    const search =
        document.getElementById("noteSearch")
            .value
            .toLowerCase();


    const notes =
        currentUser.notes.filter(note =>

            note.title.toLowerCase().includes(search) ||

            note.content.toLowerCase().includes(search) ||

            note.subject.toLowerCase().includes(search)

        );


    if (!notes.length) {

        container.innerHTML =
            `<div class="panel">
                <p>No notes found.</p>
             </div>`;

        return;

    }


    container.innerHTML =
        notes.map(note => `

            <div class="note-card">

                <span class="note-subject">
                    ${escapeHTML(note.subject || "General")}
                </span>

                <h3>
                    ${escapeHTML(note.title)}
                </h3>

                <p>
                    ${escapeHTML(note.content)}
                </p>

            </div>

        `).join("");

}


/* ================= EXAMS ================= */

document.getElementById("examForm")
.addEventListener("submit", function(e) {

    e.preventDefault();


    currentUser.exams.push({

        id: Date.now(),

        subject:
            document.getElementById("examSubject").value.trim(),

        date:
            document.getElementById("examDate").value,

        topics:
            document.getElementById("examTopics").value.trim()

    });


    saveUsers();

    this.reset();

    closeModal("examModal");

    renderExams();

    renderDashboard();

    showToast("Exam added.");

});


function renderExams() {

    const container =
        document.getElementById("examsContainer");


    const exams =
        [...currentUser.exams]
            .sort(
                (a,b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );


    if (!exams.length) {

        container.innerHTML =
            `<div class="panel">
                <p>No exams added yet.</p>
             </div>`;

        return;

    }


    container.innerHTML =
        exams.map(exam => {

            const days =
                calculateDaysLeft(exam.date);


            return `

                <div class="exam-card">

                    <h3>
                        ${escapeHTML(exam.subject)}
                    </h3>

                    <div class="exam-date">
                        📅 ${formatDate(exam.date)}
                    </div>

                    <div class="days-left">
                        ${days >= 0 ? days : 0}
                    </div>

                    <small>
                        ${days === 1 ? "day" : "days"} remaining
                    </small>

                    <p style="margin-top:15px;font-size:12px;color:var(--muted)">
                        ${escapeHTML(exam.topics || "No important topics added.")}
                    </p>

                </div>

            `;

        }).join("");

}


/* ================= SMART PLANNER ================= */

function generatePlanner() {

    const examDate =
        document.getElementById("plannerExamDate").value;

    const hours =
        Number(
            document.getElementById("plannerHours").value
        );

    const startTime =
        document.getElementById("plannerStartTime").value;


    if (!examDate) {

        showToast("Please enter an exam date.");

        return;

    }


    if (!currentUser.subjects.length) {

        showToast("Add subjects and topics first.");

        return;

    }


    let topics = [];


    currentUser.subjects.forEach(subject => {

        subject.topics
            .filter(topic => !topic.completed)
            .forEach(topic => {

                let priority = 1;


                if (topic.difficulty === "Medium")
                    priority = 2;

                if (topic.difficulty === "Hard")
                    priority = 3;


                if (subject.difficulty === "Hard")
                    priority += 1;


                topics.push({

                    subject:
                        subject.name,

                    topic:
                        topic.name,

                    difficulty:
                        topic.difficulty,

                    priority

                });

            });

    });


    topics.sort(
        (a,b) =>
            b.priority -
            a.priority
    );


    if (!topics.length) {

        showToast("All topics are already completed!");

        return;

    }


    const sessionsPerDay =
        Math.max(
            1,
            Math.floor(hours)
        );


    const schedule = [];


    for (
        let i = 0;
        i < topics.length;
        i++
    ) {

        const dayOffset =
            Math.floor(
                i / sessionsPerDay
            );


        const date =
            new Date();


        date.setDate(
            date.getDate() + dayOffset
        );


        let sessionIndex =
            i % sessionsPerDay;


        const start =
            convertTimeToMinutes(startTime) +
            sessionIndex * 75;


        const end =
            start + 60;


        schedule.push({

            id: Date.now() + i,

            date:
                date.toISOString().split("T")[0],

            subject:
                topics[i].subject,

            topic:
                topics[i].topic,

            difficulty:
                topics[i].difficulty,

            start:
                minutesToTime(start),

            end:
                minutesToTime(end),

            status:
                "scheduled"

        });

    }


    currentUser.planner =
        schedule;


    saveUsers();

    renderPlanner();

    renderDashboard();

    showToast("Smart schedule generated!");

}


function renderPlanner() {

    const container =
        document.getElementById("plannerResult");


    if (!currentUser.planner.length) {

        container.innerHTML =
            `<p>No schedule generated yet.</p>`;

        return;

    }


    container.innerHTML =
        currentUser.planner.map(session => `

            <div class="plan-item">

                <div class="plan-time">

                    ${formatDate(session.date)}
                    <br>

                    ${session.start} -
                    ${session.end}

                </div>

                <div class="plan-info">

                    <strong>
                        ${escapeHTML(session.subject)}
                    </strong>

                    <span>
                        ${escapeHTML(session.topic)}
                        • ${session.difficulty}
                    </span>

                </div>

                <div style="margin-left:auto">

                    <button
                        class="secondary-btn"
                        onclick="completeSession(${session.id})"
                    >
                        ✓
                    </button>

                </div>

            </div>

        `).join("");

}


/* ================= SESSION ================= */

function completeSession(id) {

    const session =
        currentUser.planner.find(
            s => s.id === id
        );


    if (!session) return;


    session.status =
        "completed";


    currentUser.studyMinutes += 60;


    recordStudyActivity();

    saveUsers();

    renderPlanner();

    renderDashboard();

    showToast("Study session completed!");

}


function rescheduleMissedSessions() {

    const missed =
        currentUser.planner.filter(
            s => s.status === "scheduled" &&
                 new Date(s.date) < new Date()
        );


    if (!missed.length) {

        showToast("No missed sessions found.");

        return;

    }


    missed.forEach(session => {

        session.date =
            new Date(
                Date.now() +
                86400000
            )
            .toISOString()
            .split("T")[0];

    });


    saveUsers();

    renderPlanner();

    showToast(
        `${missed.length} session(s) rescheduled.`
    );

}


/* ================= POMODORO ================= */

function startTimer() {

    if (timerInterval) return;


    timerInterval =
        setInterval(() => {

            if (timerSeconds <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                currentUser.studyMinutes += 25;

                recordStudyActivity();

                saveUsers();

                renderDashboard();

                showToast(
                    "Pomodoro completed! Great work."
                );

                setTimer(5);

                return;

            }


            timerSeconds--;

            updateTimerDisplay();

        }, 1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}


function resetTimer() {

    pauseTimer();

    timerSeconds = 25 * 60;

    updateTimerDisplay();

}


function setTimer(minutes) {

    pauseTimer();

    timerSeconds = minutes * 60;

    document.getElementById("timerMode")
        .textContent =
        minutes <= 5
            ? "BREAK"
            : "FOCUS SESSION";

    updateTimerDisplay();

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;


    document.getElementById("timerDisplay")
        .textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* ================= PROFILE ================= */

function renderProfile() {

    document.getElementById("profileName").value =
        currentUser.name;

    document.getElementById("profileStudentId").value =
        currentUser.studentId;

    document.getElementById("profileEmail").value =
        currentUser.email;

    document.getElementById("profileCourse").value =
        currentUser.course;

    document.getElementById("profileDepartment").value =
        currentUser.department;

    document.getElementById("profileYear").value =
        currentUser.academicYear;

    document.getElementById("profileSemester").value =
        currentUser.semester;


    document.getElementById("profileAvatar")
        .textContent =
        currentUser.name.charAt(0).toUpperCase();

}


function saveProfile() {

    currentUser.name =
        document.getElementById("profileName").value;

    currentUser.studentId =
        document.getElementById("profileStudentId").value;

    currentUser.course =
        document.getElementById("profileCourse").value;

    currentUser.department =
        document.getElementById("profileDepartment").value;

    currentUser.academicYear =
        document.getElementById("profileYear").value;

    currentUser.semester =
        document.getElementById("profileSemester").value;


    saveUsers();

    renderEverything();

    showToast("Profile updated.");

}


/* ================= DATABASE ================= */

function renderStudentDatabase() {

    const body =
        document.getElementById("studentTableBody");


    document.getElementById(
        "databaseStudentCount"
    ).textContent =
        users.length;


    body.innerHTML =
        users.map(user => `

            <tr>

                <td>
                    ${escapeHTML(user.studentId)}
                </td>

                <td>
                    ${escapeHTML(user.name)}
                </td>

                <td>
                    ${escapeHTML(user.email)}
                </td>

                <td>
                    ${escapeHTML(user.course)}
                </td>

                <td>
                    ${escapeHTML(user.department)}
                </td>

                <td>
                    ${escapeHTML(user.academicYear)}
                </td>

            </tr>

        `).join("");

}


/* ================= DASHBOARD ================= */

function renderDashboard() {

    document.getElementById("dashboardName")
        .textContent =
        currentUser.name;


    document.getElementById("topAvatar")
        .textContent =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    let totalTopics = 0;

    let completedTopics = 0;


    currentUser.subjects.forEach(subject => {

        totalTopics += subject.topics.length;

        completedTopics +=
            subject.topics
                .filter(t => t.completed)
                .length;

    });


    const progress =
        totalTopics
            ? Math.round(
                completedTopics /
                totalTopics *
                100
            )
            : 0;


    document.getElementById("completedTopics")
        .textContent =
        completedTopics;


    document.getElementById("overallProgress")
        .textContent =
        progress + "%";


    document.getElementById("totalStudyHours")
        .textContent =
        (currentUser.studyMinutes / 60)
            .toFixed(1) + "h";


    document.getElementById("studyStreak")
        .textContent =
        currentUser.streak;


    renderTodayPlan();

    renderSubjectProgress();

    renderDashboardTasks();

    renderNextExam();

}


/* ================= TODAY PLAN ================= */

function renderTodayPlan() {

    const container =
        document.getElementById("todayPlan");


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const sessions =
        currentUser.planner.filter(
            s => s.date === today
        );


    if (!sessions.length) {

        container.innerHTML =
            `<p style="font-size:12px;color:var(--muted)">
                No study sessions scheduled for today.
             </p>`;

        return;

    }


    container.innerHTML =
        sessions.slice(0,5).map(session => `

            <div class="plan-item">

                <div class="plan-time">
                    ${session.start}
                    -
                    ${session.end}
                </div>

                <div class="plan-info">

                    <strong>
                        ${escapeHTML(session.subject)}
                    </strong>

                    <span>
                        ${escapeHTML(session.topic)}
                    </span>

                </div>

            </div>

        `).join("");

}


/* ================= SUBJECT PROGRESS ================= */

function renderSubjectProgress() {

    const container =
        document.getElementById("subjectProgress");


    if (!currentUser.subjects.length) {

        container.innerHTML =
            `<p>No subjects added.</p>`;

        return;

    }


    container.innerHTML =
        currentUser.subjects.map(subject => {

            const total =
                subject.topics.length;

            const completed =
                subject.topics
                    .filter(t => t.completed)
                    .length;

            const progress =
                total
                    ? Math.round(
                        completed /
                        total *
                        100
                    )
                    : 0;


            return `

                <div class="progress-item">

                    <div class="progress-label">

                        <span>
                            ${escapeHTML(subject.name)}
                        </span>

                        <strong>
                            ${progress}%
                        </strong>

                    </div>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${progress}%"
                        ></div>

                    </div>

                </div>

            `;

        }).join("");

}


/* ================= DASHBOARD TASKS ================= */

function renderDashboardTasks() {

    const container =
        document.getElementById("dashboardTasks");


    const tasks =
        currentUser.tasks
            .filter(t => !t.completed)
            .slice(0,5);


    if (!tasks.length) {

        container.innerHTML =
            `<p>No pending tasks.</p>`;

        return;

    }


    container.innerHTML =
        tasks.map(task => `

            <div class="task-item">

                <input
                    type="checkbox"
                    onchange="toggleTask(${task.id})"
                >

                <div class="task-content">

                    <strong>
                        ${escapeHTML(task.title)}
                    </strong>

                    <small>
                        Due ${formatDate(task.dueDate)}
                    </small>

                </div>

                <span class="priority priority-${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

        `).join("");

}


/* ================= NEXT EXAM ================= */

function renderNextExam() {

    const countdown =
        document.getElementById(
            "dashboardCountdown"
        );


    if (!currentUser.exams.length) {

        countdown.textContent =
            "No exam";

        return;

    }


    const exams =
        currentUser.exams
            .filter(
                exam =>
                    calculateDaysLeft(exam.date) >= 0
            )
            .sort(
                (a,b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );


    if (!exams.length) {

        countdown.textContent =
            "No upcoming exam";

        return;

    }


    const exam = exams[0];

    const days =
        calculateDaysLeft(exam.date);


    countdown.textContent =
        `${days} day${days !== 1 ? "s" : ""} — ${exam.subject}`;

}


/* ================= STREAK ================= */

function recordStudyActivity() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (
        currentUser.lastStudyDate === today
    ) {

        return;

    }


    if (currentUser.lastStudyDate) {

        const previous =
            new Date(
                currentUser.lastStudyDate
            );

        const current =
            new Date(today);


        const difference =
            Math.floor(
                (
                    current -
                    previous
                ) /
                86400000
            );


        if (difference === 1) {

            currentUser.streak++;

        } else {

            currentUser.streak = 1;

        }

    } else {

        currentUser.streak = 1;

    }


    currentUser.lastStudyDate =
        today;

}


/* ================= DARK MODE ================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "studyMateDarkMode",
        document.body.classList.contains("dark")
    );

}


if (
    localStorage.getItem("studyMateDarkMode")
    === "true"
) {

    document.body.classList.add("dark");

}


/* ================= UTILITIES ================= */

function calculateDaysLeft(dateString) {

    const today =
        new Date();

    today.setHours(0,0,0,0);


    const exam =
        new Date(dateString);

    exam.setHours(0,0,0,0);


    return Math.ceil(
        (exam - today) /
        86400000
    );

}


function formatDate(date) {

    if (!date) return "-";


    return new Date(date)
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

}


function convertTimeToMinutes(time) {

    const [hours, minutes] =
        time.split(":")
            .map(Number);

    return hours * 60 + minutes;

}


function minutesToTime(minutes) {

    minutes =
        minutes % (24 * 60);


    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;


    return `${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;

}


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= RENDER EVERYTHING ================= */

function renderEverything() {

    renderDashboard();

    renderSubjects();

    renderPlanner();

    renderTasks();

    renderNotes();

    renderExams();

    renderProfile();

    renderStudentDatabase();

}


/* ================= NOTIFICATION ================= */

function updateNotifications() {

    let count = 0;


    count += currentUser.tasks
        .filter(t => !t.completed)
        .length;


    count += currentUser.exams
        .filter(
            e =>
                calculateDaysLeft(e.date) <= 7 &&
                calculateDaysLeft(e.date) >= 0
        )
        .length;


    document.getElementById(
        "notificationCount"
    ).textContent =
        count;

}


setInterval(() => {

    if (currentUser) {

        updateNotifications();

        renderNextExam();

    }

}, 60000);
