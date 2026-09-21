/* =========================================================
   STUDY MATE
   Corrected Complete JavaScript
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let users = JSON.parse(
    localStorage.getItem("studyMateUsers") || "[]"
);

let currentUserEmail =
    localStorage.getItem("studyMateCurrentUser") || null;

let currentUser = null;

let taskFilter = "all";

let timerInterval = null;

let timerSeconds = 25 * 60;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentDateElement =
        document.getElementById("currentDate");

    if (currentDateElement) {
        currentDateElement.textContent =
            new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });
    }

    /*
       Check if a user was previously logged in.
    */

    if (currentUserEmail) {

        currentUser =
            users.find(function (user) {
                return user.email === currentUserEmail;
            });

        if (currentUser) {
            openApplication();
        }
    }

    updateTimerDisplay();

    restoreDarkMode();
});


/* =========================================================
   USER DATA
========================================================= */

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


/*
   Makes sure older users created with a previous
   version of the application have all required fields.
*/

function normalizeUser(user) {

    const defaults = createUserData();

    Object.keys(defaults).forEach(function (key) {

        if (!Array.isArray(defaults[key]) &&
            typeof defaults[key] === "object" &&
            defaults[key] !== null) {

            if (
                !user[key] ||
                typeof user[key] !== "object"
            ) {
                user[key] = defaults[key];
            }

        } else if (!(key in user)) {

            user[key] = defaults[key];

        }

    });


    /*
       Make sure subjects contain topic arrays.
    */

    user.subjects.forEach(function (subject) {

        if (!Array.isArray(subject.topics)) {
            subject.topics = [];
        }

    });


    return user;
}


/* =========================================================
   DATABASE
========================================================= */

function saveUsers() {

    localStorage.setItem(
        "studyMateUsers",
        JSON.stringify(users)
    );
}


/* =========================================================
   AUTHENTICATION
========================================================= */

function showRegister() {

    const loginBox =
        document.getElementById("loginBox");

    const registerBox =
        document.getElementById("registerBox");

    if (loginBox) {
        loginBox.classList.add("hidden");
    }

    if (registerBox) {
        registerBox.classList.remove("hidden");
    }
}


function showLogin() {

    const loginBox =
        document.getElementById("loginBox");

    const registerBox =
        document.getElementById("registerBox");

    if (registerBox) {
        registerBox.classList.add("hidden");
    }

    if (loginBox) {
        loginBox.classList.remove("hidden");
    }
}


/* =========================================================
   REGISTER
========================================================= */

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();

            const studentId =
                document
                    .getElementById("registerStudentId")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const course =
                document
                    .getElementById("registerCourse")
                    .value
                    .trim();

            const department =
                document
                    .getElementById("registerDepartment")
                    .value
                    .trim();

            const academicYear =
                document
                    .getElementById("registerYear")
                    .value;

            const semester =
                document
                    .getElementById("registerSemester")
                    .value;


            if (
                !name ||
                !studentId ||
                !email ||
                !password ||
                !course ||
                !department
            ) {

                showToast("Please fill all fields.");

                return;
            }


            /*
               Check duplicate email.
            */

            const emailExists =
                users.some(function (user) {
                    return user.email.toLowerCase() === email;
                });

            if (emailExists) {

                showToast(
                    "This email is already registered."
                );

                return;
            }


            /*
               Check duplicate student ID.
            */

            const studentIdExists =
                users.some(function (user) {
                    return user.studentId === studentId;
                });

            if (studentIdExists) {

                showToast(
                    "This Student ID already exists."
                );

                return;
            }


            const newUser = {

                id: Date.now(),

                name: name,

                studentId: studentId,

                email: email,

                password: password,

                course: course,

                department: department,

                academicYear: academicYear,

                semester: semester,

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


            showToast(
                "Account created successfully!"
            );


            setTimeout(function () {
                openApplication();
            }, 500);

        }
    );
}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const user =
                users.find(function (item) {

                    return (
                        item.email.toLowerCase() === email &&
                        item.password === password
                    );

                });


            if (!user) {

                showToast(
                    "Invalid email or password."
                );

                return;
            }


            currentUser =
                normalizeUser(user);

            currentUserEmail =
                currentUser.email;


            saveUsers();


            localStorage.setItem(
                "studyMateCurrentUser",
                currentUser.email
            );


            openApplication();

        }
    );
}


/* =========================================================
   OPEN APPLICATION
========================================================= */

function openApplication() {

    if (!currentUser) {
        return;
    }


    currentUser =
        normalizeUser(currentUser);


    const authScreen =
        document.getElementById("authScreen");

    const app =
        document.getElementById("app");


    if (authScreen) {
        authScreen.classList.add("hidden");
    }

    if (app) {
        app.classList.remove("hidden");
    }


    renderEverything();

    updateNotifications();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        "studyMateCurrentUser"
    );

    currentUser = null;

    currentUserEmail = null;

    location.reload();
}


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(pageId, element) {

    document
        .querySelectorAll(".page")
        .forEach(function (page) {

            page.classList.remove("active-page");

        });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(function (item) {

            item.classList.remove("active");

        });


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


    const titleElement =
        document.getElementById("pageTitle");


    if (titleElement) {

        titleElement.textContent =
            titles[pageId] || "Study Mate";

    }
}


function showPageById(pageId) {

    const navItems =
        document.querySelectorAll(".nav-item");


    let targetNav = null;


    navItems.forEach(function (item) {

        const onclickValue =
            item.getAttribute("onclick") || "";


        if (
            onclickValue.includes(
                "'" + pageId + "'"
            )
        ) {

            targetNav = item;

        }

    });


    showPage(pageId, targetNav);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.add("show");
    }
}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }
}


/*
   Close modal when clicking outside its content.
*/

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains("modal")
        ) {

            event.target.classList.remove("show");

        }

    }
);


/* =========================================================
   SUBJECTS
========================================================= */

const subjectForm =
    document.getElementById("subjectForm");

if (subjectForm) {

    subjectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!currentUser) {
                return;
            }


            const name =
                document
                    .getElementById("subjectName")
                    .value
                    .trim();

            const difficulty =
                document
                    .getElementById("subjectDifficulty")
                    .value;


            if (!name) {

                showToast(
                    "Please enter a subject name."
                );

                return;
            }


            currentUser.subjects.push({

                id: Date.now(),

                name: name,

                difficulty: difficulty,

                topics: []

            });


            saveUsers();

            subjectForm.reset();

            closeModal("subjectModal");

            renderSubjects();

            renderDashboard();

            showToast(
                "Subject added successfully."
            );

        }
    );
}


function renderSubjects() {

    const container =
        document.getElementById(
            "subjectsContainer"
        );


    if (!container || !currentUser) {
        return;
    }


    if (!currentUser.subjects.length) {

        container.innerHTML = `
            <div class="panel">
                <p>No subjects added yet.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        currentUser.subjects
            .map(function (subject) {

                const topics =
                    Array.isArray(subject.topics)
                        ? subject.topics
                        : [];


                const completed =
                    topics.filter(function (topic) {
                        return topic.completed;
                    }).length;


                const total =
                    topics.length;


                const progress =
                    total > 0
                        ? Math.round(
                            completed /
                            total *
                            100
                        )
                        : 0;


                const topicsHTML =
                    topics.length
                        ? topics
                            .map(function (topic) {

                                return `

                                <label class="topic ${
                                    topic.completed
                                        ? "completed"
                                        : ""
                                }">

                                    <input
                                        type="checkbox"
                                        ${
                                            topic.completed
                                                ? "checked"
                                                : ""
                                        }
                                        onchange="
                                            toggleTopic(
                                                ${subject.id},
                                                ${topic.id}
                                            )
                                        "
                                    >

                                    <span>
                                        ${escapeHTML(
                                            topic.name
                                        )}
                                    </span>

                                </label>

                            `;

                            })
                            .join("")
                        : `
                            <p style="
                                font-size:12px;
                                color:var(--muted);
                            ">
                                No topics yet.
                            </p>
                        `;


                return `

                    <div class="subject-card">

                        <div class="subject-top">

                            <div>

                                <h3>
                                    ${escapeHTML(
                                        subject.name
                                    )}
                                </h3>

                                <small>
                                    ${total} topic${
                                        total !== 1
                                            ? "s"
                                            : ""
                                    }
                                </small>

                            </div>

                            <span class="
                                difficulty
                                ${subject.difficulty.toLowerCase()}
                            ">
                                ${escapeHTML(
                                    subject.difficulty
                                )}
                            </span>

                        </div>


                        <div class="progress-item">

                            <div class="progress-label">

                                <span>
                                    Progress
                                </span>

                                <strong>
                                    ${progress}%
                                </strong>

                            </div>

                            <div class="progress-bar">

                                <div
                                    class="progress-fill"
                                    style="
                                        width:${progress}%
                                    "
                                ></div>

                            </div>

                        </div>


                        <div class="topic-list">

                            ${topicsHTML}

                        </div>


                        <button
                            class="add-topic-btn"
                            onclick="
                                openTopicModal(
                                    ${subject.id}
                                )
                            "
                        >
                            + Add Unit / Topic
                        </button>

                    </div>

                `;

            })
            .join("");
}


/* =========================================================
   TOPICS
========================================================= */

function openTopicModal(subjectId) {

    const input =
        document.getElementById(
            "topicSubjectId"
        );


    if (input) {
        input.value = subjectId;
    }


    openModal("topicModal");
}


const topicForm =
    document.getElementById("topicForm");

if (topicForm) {

    topicForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const subjectId =
                Number(
                    document.getElementById(
                        "topicSubjectId"
                    ).value
                );


            const topicName =
                document.getElementById(
                    "topicName"
                ).value.trim();


            const difficulty =
                document.getElementById(
                    "topicDifficulty"
                ).value;


            const subject =
                currentUser.subjects.find(
                    function (item) {
                        return item.id === subjectId;
                    }
                );


            if (!subject) {

                showToast(
                    "Subject not found."
                );

                return;
            }


            if (!topicName) {

                showToast(
                    "Please enter a topic."
                );

                return;
            }


            if (!Array.isArray(subject.topics)) {
                subject.topics = [];
            }


            subject.topics.push({

                id: Date.now(),

                name: topicName,

                difficulty: difficulty,

                completed: false

            });


            saveUsers();

            topicForm.reset();

            closeModal("topicModal");

            renderSubjects();

            renderDashboard();

            showToast(
                "Topic added successfully."
            );

        }
    );
}


/* =========================================================
   TOGGLE TOPIC
========================================================= */

function toggleTopic(
    subjectId,
    topicId
) {

    if (!currentUser) {
        return;
    }


    const subject =
        currentUser.subjects.find(
            function (item) {
                return item.id === subjectId;
            }
        );


    if (!subject) {
        return;
    }


    const topic =
        subject.topics.find(
            function (item) {
                return item.id === topicId;
            }
        );


    if (!topic) {
        return;
    }


    topic.completed =
        !topic.completed;


    if (topic.completed) {

        recordStudyActivity();

    }


    saveUsers();

    renderSubjects();

    renderDashboard();

    updateNotifications();
}


/* =========================================================
   TASKS
========================================================= */

const taskForm =
    document.getElementById("taskForm");

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("taskTitle")
                    .value.trim();

            const priority =
                document.getElementById(
                    "taskPriority"
                ).value;

            const dueDate =
                document.getElementById(
                    "taskDueDate"
                ).value;


            if (!title || !dueDate) {

                showToast(
                    "Please complete all task fields."
                );

                return;
            }


            currentUser.tasks.push({

                id: Date.now(),

                title: title,

                priority: priority,

                dueDate: dueDate,

                completed: false

            });


            saveUsers();

            taskForm.reset();

            closeModal("taskModal");

            renderTasks();

            renderDashboard();

            updateNotifications();

            showToast(
                "Task added successfully."
            );

        }
    );
}


function filterTasks(filter) {

    taskFilter = filter;

    document
        .querySelectorAll(".filter")
        .forEach(function (button) {

            button.classList.remove(
                "active-filter"
            );

        });


    /*
       Highlight selected filter.
    */

    const buttons =
        document.querySelectorAll(".filter");


    buttons.forEach(function (button) {

        const text =
            button.textContent
                .trim()
                .toLowerCase();


        if (
            (filter === "all" &&
                text === "all") ||

            (filter === "pending" &&
                text === "pending") ||

            (filter === "completed" &&
                text === "completed")
        ) {

            button.classList.add(
                "active-filter"
            );

        }

    });


    renderTasks();
}


function renderTasks() {

    const container =
        document.getElementById(
            "tasksContainer"
        );


    if (!container || !currentUser) {
        return;
    }


    let tasks =
        [...currentUser.tasks];


    if (taskFilter === "pending") {

        tasks =
            tasks.filter(function (task) {
                return !task.completed;
            });

    }


    if (taskFilter === "completed") {

        tasks =
            tasks.filter(function (task) {
                return task.completed;
            });

    }


    tasks.sort(function (a, b) {

        return (
            new Date(a.dueDate) -
            new Date(b.dueDate)
        );

    });


    if (!tasks.length) {

        container.innerHTML =
            `<p>No tasks found.</p>`;

        return;
    }


    container.innerHTML =
        tasks.map(function (task) {

            return `

                <div class="task-item">

                    <input
                        class="task-check"
                        type="checkbox"
                        ${
                            task.completed
                                ? "checked"
                                : ""
                        }
                        onchange="
                            toggleTask(
                                ${task.id}
                            )
                        "
                    >

                    <div class="
                        task-content
                        ${
                            task.completed
                                ? "task-completed"
                                : ""
                        }
                    ">

                        <strong>
                            ${escapeHTML(
                                task.title
                            )}
                        </strong>

                        <small>
                            Due:
                            ${formatDate(
                                task.dueDate
                            )}
                        </small>

                    </div>

                    <span class="
                        priority
                        priority-${task.priority.toLowerCase()}
                    ">
                        ${escapeHTML(
                            task.priority
                        )}
                    </span>

                </div>

            `;

        }).join("");
}


function toggleTask(id) {

    const task =
        currentUser.tasks.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    if (task.completed) {
        recordStudyActivity();
    }


    saveUsers();

    renderTasks();

    renderDashboard();

    updateNotifications();
}


/* =========================================================
   NOTES
========================================================= */

const noteForm =
    document.getElementById("noteForm");

if (noteForm) {

    noteForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("noteTitle")
                    .value.trim();

            const subject =
                document
                    .getElementById("noteSubject")
                    .value.trim();

            const content =
                document
                    .getElementById("noteContent")
                    .value.trim();


            if (!title || !content) {

                showToast(
                    "Please enter a title and content."
                );

                return;
            }


            currentUser.notes.push({

                id: Date.now(),

                title: title,

                subject: subject,

                content: content,

                createdAt:
                    new Date().toISOString()

            });


            saveUsers();

            noteForm.reset();

            closeModal("noteModal");

            renderNotes();

            showToast(
                "Note saved successfully."
            );

        }
    );
}


function renderNotes() {

    const container =
        document.getElementById(
            "notesContainer"
        );


    const searchInput =
        document.getElementById(
            "noteSearch"
        );


    if (!container || !currentUser) {
        return;
    }


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const notes =
        currentUser.notes.filter(
            function (note) {

                return (
                    note.title
                        .toLowerCase()
                        .includes(search) ||

                    (note.content || "")
                        .toLowerCase()
                        .includes(search) ||

                    (note.subject || "")
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    if (!notes.length) {

        container.innerHTML = `
            <div class="panel">
                <p>No notes found.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        notes.map(function (note) {

            return `

                <div class="note-card">

                    <span class="note-subject">

                        ${escapeHTML(
                            note.subject ||
                            "General"
                        )}

                    </span>

                    <h3>
                        ${escapeHTML(
                            note.title
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            note.content
                        )}
                    </p>

                </div>

            `;

        }).join("");
}


/* =========================================================
   EXAMS
========================================================= */

const examForm =
    document.getElementById("examForm");

if (examForm) {

    examForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const subject =
                document
                    .getElementById(
                        "examSubject"
                    )
                    .value.trim();

            const date =
                document
                    .getElementById(
                        "examDate"
                    )
                    .value;

            const topics =
                document
                    .getElementById(
                        "examTopics"
                    )
                    .value.trim();


            if (!subject || !date) {

                showToast(
                    "Please enter the subject and exam date."
                );

                return;
            }


            currentUser.exams.push({

                id: Date.now(),

                subject: subject,

                date: date,

                topics: topics

            });


            saveUsers();

            examForm.reset();

            closeModal("examModal");

            renderExams();

            renderDashboard();

            updateNotifications();

            showToast(
                "Exam added successfully."
            );

        }
    );
}


function renderExams() {

    const container =
        document.getElementById(
            "examsContainer"
        );


    if (!container || !currentUser) {
        return;
    }


    const exams =
        [...currentUser.exams]
            .sort(function (a, b) {

                return (
                    new Date(a.date) -
                    new Date(b.date)
                );

            });


    if (!exams.length) {

        container.innerHTML = `
            <div class="panel">
                <p>No exams added yet.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        exams.map(function (exam) {

            const days =
                calculateDaysLeft(
                    exam.date
                );


            const remaining =
                days >= 0
                    ? days
                    : 0;


            return `

                <div class="exam-card">

                    <h3>
                        ${escapeHTML(
                            exam.subject
                        )}
                    </h3>

                    <div class="exam-date">

                        📅
                        ${formatDate(
                            exam.date
                        )}

                    </div>

                    <div class="days-left">
                        ${remaining}
                    </div>

                    <small>
                        ${
                            days === 1
                                ? "day"
                                : "days"
                        }
                        remaining
                    </small>

                    <p style="
                        margin-top:15px;
                        font-size:12px;
                        color:var(--muted);
                    ">

                        ${escapeHTML(
                            exam.topics ||
                            "No important topics added."
                        )}

                    </p>

                </div>

            `;

        }).join("");
}


/* =========================================================
   SMART PLANNER
========================================================= */

function generatePlanner() {

    const examDate =
        document.getElementById(
            "plannerExamDate"
        ).value;

    const hours =
        Number(
            document.getElementById(
                "plannerHours"
            ).value
        );

    const startTime =
        document.getElementById(
            "plannerStartTime"
        ).value;


    if (!examDate) {

        showToast(
            "Please enter an exam date."
        );

        return;
    }


    if (!hours || hours < 1) {

        showToast(
            "Study hours must be at least 1."
        );

        return;
    }


    if (!startTime) {

        showToast(
            "Please select a start time."
        );

        return;
    }


    if (!currentUser.subjects.length) {

        showToast(
            "Add subjects and topics first."
        );

        return;
    }


    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    const finalExamDate =
        new Date(examDate);

    finalExamDate.setHours(
        0,
        0,
        0,
        0
    );


    if (finalExamDate < today) {

        showToast(
            "Exam date cannot be in the past."
        );

        return;
    }


    /*
       Collect incomplete topics.
    */

    let topics = [];


    currentUser.subjects.forEach(
        function (subject) {

            const subjectDifficulty =
                difficultyScore(
                    subject.difficulty
                );


            const subjectTopics =
                Array.isArray(subject.topics)
                    ? subject.topics
                    : [];


            subjectTopics
                .filter(function (topic) {
                    return !topic.completed;
                })
                .forEach(function (topic) {

                    const topicDifficulty =
                        difficultyScore(
                            topic.difficulty
                        );


                    topics.push({

                        subject:
                            subject.name,

                        topic:
                            topic.name,

                        difficulty:
                            topic.difficulty,

                        priority:
                            subjectDifficulty +
                            topicDifficulty

                    });

                });

        }
    );


    if (!topics.length) {

        showToast(
            "All topics are already completed!"
        );

        return;
    }


    /*
       Highest difficulty first.
    */

    topics.sort(function (a, b) {

        return b.priority - a.priority;

    });


    /*
       Maximum sessions per day.
       Each session = 1 hour.
    */

    const sessionsPerDay =
        Math.max(
            1,
            Math.floor(hours)
        );


    const schedule = [];


    let topicIndex = 0;

    let dayOffset = 0;


    while (
        topicIndex < topics.length
    ) {

        /*
           Stop generating beyond exam date.
        */

        const sessionDate =
            new Date(today);

        sessionDate.setDate(
            today.getDate() + dayOffset
        );


        if (
            sessionDate >
            finalExamDate
        ) {
            break;
        }


        for (
            let sessionIndex = 0;
            sessionIndex < sessionsPerDay &&
            topicIndex < topics.length;
            sessionIndex++
        ) {

            const start =
                convertTimeToMinutes(
                    startTime
                ) +
                sessionIndex * 75;


            const end =
                start + 60;


            /*
               Prevent scheduling beyond midnight.
            */

            if (end >= 24 * 60) {
                break;
            }


            schedule.push({

                id:
                    Date.now() +
                    schedule.length,

                date:
                    dateToLocalISO(
                        sessionDate
                    ),

                subject:
                    topics[topicIndex].subject,

                topic:
                    topics[topicIndex].topic,

                difficulty:
                    topics[topicIndex].difficulty,

                start:
                    minutesToTime(start),

                end:
                    minutesToTime(end),

                status:
                    "scheduled"

            });


            topicIndex++;

        }


        dayOffset++;

    }


    /*
       If some topics couldn't fit before exam.
    */

    if (
        topicIndex < topics.length
    ) {

        showToast(
            "Not enough study time before the exam. Schedule was filled as much as possible."
        );

    }


    currentUser.planner =
        schedule;


    saveUsers();

    renderPlanner();

    renderDashboard();

    showToast(
        "Smart schedule generated!"
    );
}


/* =========================================================
   PLANNER RENDER
========================================================= */

function renderPlanner() {

    const container =
        document.getElementById(
            "plannerResult"
        );


    if (!container || !currentUser) {
        return;
    }


    if (!currentUser.planner.length) {

        container.innerHTML =
            `<p>No schedule generated yet.</p>`;

        return;
    }


    const sortedPlanner =
        [...currentUser.planner]
            .sort(function (a, b) {

                return (
                    new Date(
                        a.date + "T" + a.start
                    ) -
                    new Date(
                        b.date + "T" + b.start
                    )
                );

            });


    container.innerHTML =
        sortedPlanner
            .map(function (session) {

                const completed =
                    session.status === "completed";


                return `

                    <div class="plan-item">

                        <div class="plan-time">

                            ${formatDate(
                                session.date
                            )}

                            <br>

                            ${session.start}
                            -
                            ${session.end}

                        </div>

                        <div class="plan-info">

                            <strong>
                                ${escapeHTML(
                                    session.subject
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    session.topic
                                )}

                                •
                                ${escapeHTML(
                                    session.difficulty
                                )}

                            </span>

                        </div>

                        <div style="
                            margin-left:auto;
                        ">

                            ${
                                completed
                                    ? `
                                        <span
                                            class="secondary-btn"
                                            style="
                                                display:inline-block;
                                                cursor:default;
                                            "
                                        >
                                            ✓ Done
                                        </span>
                                      `
                                    : `
                                        <button
                                            class="secondary-btn"
                                            onclick="
                                                completeSession(
                                                    ${session.id}
                                                )
                                            "
                                        >
                                            ✓
                                        </button>
                                      `
                            }

                        </div>

                    </div>

                `;

            })
            .join("");
}


/* =========================================================
   COMPLETE STUDY SESSION
========================================================= */

function completeSession(id) {

    const session =
        currentUser.planner.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!session) {
        return;
    }


    if (session.status === "completed") {

        showToast(
            "This session is already completed."
        );

        return;
    }


    session.status =
        "completed";


    currentUser.studyMinutes += 60;


    recordStudyActivity();


    saveUsers();

    renderPlanner();

    renderDashboard();

    updateNotifications();


    showToast(
        "Study session completed!"
    );
}


/* =========================================================
   RESCHEDULE MISSED SESSIONS
========================================================= */

function rescheduleMissedSessions() {

    if (!currentUser.planner.length) {

        showToast(
            "No study schedule exists."
        );

        return;
    }


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const missed =
        currentUser.planner.filter(
            function (session) {

                return (
                    session.status ===
                    "scheduled" &&

                    new Date(
                        session.date
                    ) < today
                );

            }
        );


    if (!missed.length) {

        showToast(
            "No missed sessions found."
        );

        return;
    }


    /*
       Find next available date.
    */

    let nextDate =
        new Date(today);


    missed.forEach(
        function (session) {

            /*
               Move session forward one day
               at a time until it is not in
               the past.
            */

            nextDate.setDate(
                nextDate.getDate() + 1
            );


            session.date =
                dateToLocalISO(
                    nextDate
                );

        }
    );


    saveUsers();

    renderPlanner();

    renderDashboard();

    showToast(
        missed.length +
        " missed session(s) rescheduled."
    );
}


/* =========================================================
   POMODORO TIMER
========================================================= */

function startTimer() {

    if (timerInterval !== null) {
        return;
    }


    timerInterval =
        setInterval(function () {

            if (timerSeconds <= 0) {

                clearInterval(
                    timerInterval
                );

                timerInterval = null;


                /*
                   Add focus time only if
                   this was a 25-minute session.
                */

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

    if (timerInterval !== null) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }
}


function resetTimer() {

    pauseTimer();

    timerSeconds =
        25 * 60;


    const mode =
        document.getElementById(
            "timerMode"
        );


    if (mode) {
        mode.textContent =
            "FOCUS SESSION";
    }


    updateTimerDisplay();
}


function setTimer(minutes) {

    pauseTimer();

    timerSeconds =
        minutes * 60;


    const mode =
        document.getElementById(
            "timerMode"
        );


    if (mode) {

        mode.textContent =
            minutes <= 5
                ? "BREAK"
                : "FOCUS SESSION";

    }


    updateTimerDisplay();
}


function updateTimerDisplay() {

    const display =
        document.getElementById(
            "timerDisplay"
        );


    if (!display) {
        return;
    }


    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    display.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

    if (!currentUser) {
        return;
    }


    const fields = {

        profileName:
            currentUser.name,

        profileStudentId:
            currentUser.studentId,

        profileEmail:
            currentUser.email,

        profileCourse:
            currentUser.course,

        profileDepartment:
            currentUser.department,

        profileYear:
            currentUser.academicYear,

        profileSemester:
            currentUser.semester

    };


    Object.keys(fields).forEach(
        function (id) {

            const element =
                document.getElementById(id);


            if (element) {

                element.value =
                    fields[id] || "";

            }

        }
    );


    const avatar =
        document.getElementById(
            "profileAvatar"
        );


    if (avatar) {

        avatar.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();

    }
}


function saveProfile() {

    if (!currentUser) {
        return;
    }


    const getValue =
        function (id) {

            const element =
                document.getElementById(id);

            return element
                ? element.value.trim()
                : "";

        };


    currentUser.name =
        getValue("profileName");

    currentUser.studentId =
        getValue("profileStudentId");

    currentUser.course =
        getValue("profileCourse");

    currentUser.department =
        getValue("profileDepartment");

    currentUser.academicYear =
        getValue("profileYear");

    currentUser.semester =
        getValue("profileSemester");


    /*
       Email is intentionally not editable here,
       because it is being used as the login key.
    */


    saveUsers();

    renderEverything();

    showToast(
        "Profile updated successfully."
    );
}


/* =========================================================
   STUDENT DATABASE
========================================================= */

function renderStudentDatabase() {

    const body =
        document.getElementById(
            "studentTableBody"
        );


    const count =
        document.getElementById(
            "databaseStudentCount"
        );


    if (count) {

        count.textContent =
            users.length;

    }


    if (!body) {
        return;
    }


    if (!users.length) {

        body.innerHTML = `
            <tr>
                <td colspan="6">
                    No registered students.
                </td>
            </tr>
        `;

        return;
    }


    body.innerHTML =
        users.map(function (user) {

            return `

                <tr>

                    <td>
                        ${escapeHTML(
                            user.studentId
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.email
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.course
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.department
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.academicYear
                        )}
                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    if (!currentUser) {
        return;
    }


    const dashboardName =
        document.getElementById(
            "dashboardName"
        );


    if (dashboardName) {

        dashboardName.textContent =
            currentUser.name;

    }


    const topAvatar =
        document.getElementById(
            "topAvatar"
        );


    if (topAvatar) {

        topAvatar.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();

    }


    let totalTopics = 0;

    let completedTopics = 0;


    currentUser.subjects.forEach(
        function (subject) {

            const topics =
                Array.isArray(subject.topics)
                    ? subject.topics
                    : [];


            totalTopics +=
                topics.length;


            completedTopics +=
                topics.filter(
                    function (topic) {
                        return topic.completed;
                    }
                ).length;

        }
    );


    const progress =
        totalTopics > 0
            ? Math.round(
                completedTopics /
                totalTopics *
                100
            )
            : 0;


    const completedElement =
        document.getElementById(
            "completedTopics"
        );


    if (completedElement) {

        completedElement.textContent =
            completedTopics;

    }


    const progressElement =
        document.getElementById(
            "overallProgress"
        );


    if (progressElement) {

        progressElement.textContent =
            progress + "%";

    }


    const hoursElement =
        document.getElementById(
            "totalStudyHours"
        );


    if (hoursElement) {

        hoursElement.textContent =
            (
                currentUser.studyMinutes /
                60
            ).toFixed(1) + "h";

    }


    const streakElement =
        document.getElementById(
            "studyStreak"
        );


    if (streakElement) {

        streakElement.textContent =
            currentUser.streak || 0;

    }


    renderTodayPlan();

    renderSubjectProgress();

    renderDashboardTasks();

    renderNextExam();
}


/* =========================================================
   TODAY'S PLAN
========================================================= */

function renderTodayPlan() {

    const container =
        document.getElementById(
            "todayPlan"
        );


    if (!container || !currentUser) {
        return;
    }


    const today =
        dateToLocalISO(
            new Date()
        );


    const sessions =
        currentUser.planner
            .filter(function (session) {

                return (
                    session.date === today
                );

            })
            .sort(function (a, b) {

                return a.start.localeCompare(
                    b.start
                );

            });


    if (!sessions.length) {

        container.innerHTML = `
            <p style="
                font-size:12px;
                color:var(--muted);
            ">
                No study sessions scheduled for today.
            </p>
        `;

        return;
    }


    container.innerHTML =
        sessions.slice(0, 5)
            .map(function (session) {

                return `

                    <div class="plan-item">

                        <div class="plan-time">

                            ${session.start}
                            -
                            ${session.end}

                        </div>

                        <div class="plan-info">

                            <strong>
                                ${escapeHTML(
                                    session.subject
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    session.topic
                                )}
                            </span>

                        </div>

                    </div>

                `;

            })
            .join("");
}


/* =========================================================
   SUBJECT PROGRESS
========================================================= */

function renderSubjectProgress() {

    const container =
        document.getElementById(
            "subjectProgress"
        );


    if (!container || !currentUser) {
        return;
    }


    if (!currentUser.subjects.length) {

        container.innerHTML =
            `<p>No subjects added.</p>`;

        return;
    }


    container.innerHTML =
        currentUser.subjects
            .map(function (subject) {

                const topics =
                    Array.isArray(subject.topics)
                        ? subject.topics
                        : [];


                const total =
                    topics.length;


                const completed =
                    topics.filter(
                        function (topic) {
                            return topic.completed;
                        }
                    ).length;


                const progress =
                    total > 0
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
                                ${escapeHTML(
                                    subject.name
                                )}
                            </span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="
                                    width:${progress}%
                                "
                            ></div>

                        </div>

                    </div>

                `;

            })
            .join("");
}


/* =========================================================
   DASHBOARD TASKS
========================================================= */

function renderDashboardTasks() {

    const container =
        document.getElementById(
            "dashboardTasks"
        );


    if (!container || !currentUser) {
        return;
    }


    const tasks =
        currentUser.tasks
            .filter(function (task) {
                return !task.completed;
            })
            .sort(function (a, b) {

                return (
                    new Date(a.dueDate) -
                    new Date(b.dueDate)
                );

            })
            .slice(0, 5);


    if (!tasks.length) {

        container.innerHTML =
            `<p>No pending tasks.</p>`;

        return;
    }


    container.innerHTML =
        tasks.map(function (task) {

            return `

                <div class="task-item">

                    <input
                        type="checkbox"
                        onchange="
                            toggleTask(
                                ${task.id}
                            )
                        "
                    >

                    <div class="task-content">

                        <strong>
                            ${escapeHTML(
                                task.title
                            )}
                        </strong>

                        <small>
                            Due
                            ${formatDate(
                                task.dueDate
                            )}
                        </small>

                    </div>

                    <span class="
                        priority
                        priority-${task.priority.toLowerCase()}
                    ">
                        ${escapeHTML(
                            task.priority
                        )}
                    </span>

                </div>

            `;

        }).join("");
}


/* =========================================================
   NEXT EXAM
========================================================= */

function renderNextExam() {

    const countdown =
        document.getElementById(
            "dashboardCountdown"
        );


    if (!countdown || !currentUser) {
        return;
    }


    const upcomingExams =
        currentUser.exams
            .filter(function (exam) {

                return (
                    calculateDaysLeft(
                        exam.date
                    ) >= 0
                );

            })
            .sort(function (a, b) {

                return (
                    new Date(a.date) -
                    new Date(b.date)
                );

            });


    if (!upcomingExams.length) {

        countdown.textContent =
            "No upcoming exam";

        return;
    }


    const exam =
        upcomingExams[0];


    const days =
        calculateDaysLeft(
            exam.date
        );


    countdown.textContent =
        days +
        (days === 1 ? " day" : " days") +
        " — " +
        exam.subject;
}


/* =========================================================
   STUDY STREAK
========================================================= */

function recordStudyActivity() {

    if (!currentUser) {
        return;
    }


    const today =
        dateToLocalISO(
            new Date()
        );


    if (
        currentUser.lastStudyDate ===
        today
    ) {

        return;
    }


    if (currentUser.lastStudyDate) {

        const previous =
            parseLocalDate(
                currentUser.lastStudyDate
            );


        const current =
            parseLocalDate(
                today
            );


        const difference =
            Math.round(
                (
                    current.getTime() -
                    previous.getTime()
                ) /
                86400000
            );


        if (difference === 1) {

            currentUser.streak =
                Number(
                    currentUser.streak || 0
                ) + 1;

        } else {

            currentUser.streak = 1;

        }

    } else {

        currentUser.streak = 1;

    }


    currentUser.lastStudyDate =
        today;
}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );


    localStorage.setItem(
        "studyMateDarkMode",
        document.body.classList.contains(
            "dark"
        )
    );
}


function restoreDarkMode() {

    const enabled =
        localStorage.getItem(
            "studyMateDarkMode"
        );


    if (enabled === "true") {

        document.body.classList.add(
            "dark"
        );

    }
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function updateNotifications() {

    const element =
        document.getElementById(
            "notificationCount"
        );


    if (!element || !currentUser) {
        return;
    }


    let count = 0;


    count += currentUser.tasks.filter(
        function (task) {
            return !task.completed;
        }
    ).length;


    count += currentUser.exams.filter(
        function (exam) {

            const days =
                calculateDaysLeft(
                    exam.date
                );


            return (
                days >= 0 &&
                days <= 7
            );

        }
    ).length;


    element.textContent =
        count;
}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function difficultyScore(difficulty) {

    switch (difficulty) {

        case "Hard":
            return 3;

        case "Medium":
            return 2;

        case "Easy":
            return 1;

        default:
            return 1;

    }
}


function calculateDaysLeft(dateString) {

    if (!dateString) {
        return 0;
    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const target =
        parseLocalDate(
            dateString
        );


    return Math.ceil(
        (
            target.getTime() -
            today.getTime()
        ) /
        86400000
    );
}


function parseLocalDate(dateString) {

    const parts =
        dateString
            .split("-")
            .map(Number);


    return new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );
}


function dateToLocalISO(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        parseLocalDate(
            dateString
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function convertTimeToMinutes(time) {

    if (!time) {
        return 0;
    }


    const parts =
        time.split(":");


    const hours =
        Number(parts[0]) || 0;


    const minutes =
        Number(parts[1]) || 0;


    return (
        hours * 60 +
        minutes
    );
}


function minutesToTime(minutes) {

    /*
       Keep time inside 24 hours.
    */

    minutes =
        ((minutes % 1440) + 1440) %
        1440;


    const hours =
        Math.floor(
            minutes / 60
        );


    const mins =
        minutes % 60;


    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(mins).padStart(2, "0")
    );
}


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timeout
    );


    showToast.timeout =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEverything() {

    if (!currentUser) {
        return;
    }


    renderDashboard();

    renderSubjects();

    renderPlanner();

    renderTasks();

    renderNotes();

    renderExams();

    renderProfile();

    renderStudentDatabase();

    updateNotifications();

}


/* =========================================================
   PERIODIC UPDATES
========================================================= */

setInterval(
    function () {

        if (!currentUser) {
            return;
        }


        updateNotifications();

        renderNextExam();

    },
    60000
);
