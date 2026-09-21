/* =========================================
   ONLINE STUDY PLANNER APP
   Complete JavaScript
   ========================================= */

"use strict";

/* =========================================
   APPLICATION STATE
   ========================================= */

const App = {

    tasks: JSON.parse(localStorage.getItem("studyTasks")) || [],

    subjects: JSON.parse(localStorage.getItem("studySubjects")) || [
        {
            id: 1,
            name: "Mathematics",
            color: "#6366f1",
            hours: 0
        },
        {
            id: 2,
            name: "Science",
            color: "#10b981",
            hours: 0
        },
        {
            id: 3,
            name: "English",
            color: "#f59e0b",
            hours: 0
        }
    ],

    goals: JSON.parse(localStorage.getItem("studyGoals")) || [],

    currentDate: new Date(),

    timer: {
        interval: null,
        seconds: 25 * 60,
        totalSeconds: 25 * 60,
        running: false,
        mode: "focus"
    }
};


/* =========================================
   DOM HELPERS
   ========================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================
   INITIALIZATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});


function initializeApp() {

    setupNavigation();

    setupModal();

    setupTaskEvents();

    setupTheme();

    setupTimer();

    setupSearch();

    setupCalendarControls();

    setupSettings();

    renderAll();

}


/* =========================================
   SAVE DATA
   ========================================= */

function saveData() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(App.tasks)
    );

    localStorage.setItem(
        "studySubjects",
        JSON.stringify(App.subjects)
    );

    localStorage.setItem(
        "studyGoals",
        JSON.stringify(App.goals)
    );
}


/* =========================================
   GENERATE ID
   ========================================= */

function generateId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}


/* =========================================
   NAVIGATION
   ========================================= */

function setupNavigation() {

    const navLinks = $$(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            this.classList.add("active");

            const page =
                this.dataset.page ||
                this.getAttribute("href")?.replace("#", "");

            showPage(page);

            closeMobileSidebar();

        });

    });


    const menuToggle = $(".menu-toggle");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            const sidebar = $(".sidebar");
            const overlay = $(".sidebar-overlay");

            sidebar?.classList.toggle("open");
            overlay?.classList.toggle("active");

        });

    }


    const overlay = $(".sidebar-overlay");

    if (overlay) {

        overlay.addEventListener("click", closeMobileSidebar);

    }

}


function closeMobileSidebar() {

    $(".sidebar")?.classList.remove("open");

    $(".sidebar-overlay")?.classList.remove("active");

}


function showPage(page) {

    const pages = $$(".page");

    pages.forEach(p => {

        p.classList.add("hidden");

    });


    const target = document.getElementById(page);

    if (target) {

        target.classList.remove("hidden");
        target.classList.add("fade-in");

    }


    const title = $(".page-title");

    if (title) {

        const titles = {

            dashboard: "Dashboard",
            tasks: "My Tasks",
            calendar: "Calendar",
            subjects: "Subjects",
            goals: "Goals",
            timer: "Study Timer",
            statistics: "Statistics",
            settings: "Settings"

        };

        title.textContent =
            titles[page] || "Study Planner";

    }

}


/* =========================================
   MODAL
   ========================================= */

function setupModal() {

    const modal = $(".modal-overlay");

    const closeButtons =
        $$(".modal-close, [data-close-modal]");


    closeButtons.forEach(button => {

        button.addEventListener("click", closeModal);

    });


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }

}


function openModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {

        modal.classList.add("active");

    }

}


function closeModal() {

    $$(".modal-overlay").forEach(modal => {

        modal.classList.remove("active");

    });

}


/* =========================================
   TASK MANAGEMENT
   ========================================= */

function setupTaskEvents() {

    const taskForm =
        $("#taskForm");

    if (taskForm) {

        taskForm.addEventListener(
            "submit",
            handleTaskSubmit
        );

    }


    document.addEventListener("click", event => {

        const addButton =
            event.target.closest(
                "#addTaskBtn, [data-add-task]"
            );

        if (addButton) {

            resetTaskForm();

            openModal("taskModal");

        }


        const editButton =
            event.target.closest("[data-edit-task]");

        if (editButton) {

            editTask(
                Number(editButton.dataset.editTask)
            );

        }


        const deleteButton =
            event.target.closest("[data-delete-task]");

        if (deleteButton) {

            deleteTask(
                Number(deleteButton.dataset.deleteTask)
            );

        }

    });

}


function handleTaskSubmit(event) {

    event.preventDefault();

    const form = event.target;

    const id =
        Number(form.dataset.editingId || 0);


    const task = {

        id: id || generateId(),

        title:
            form.querySelector("[name='title']")?.value
            .trim(),

        subject:
            form.querySelector("[name='subject']")?.value
            .trim() || "General",

        date:
            form.querySelector("[name='date']")?.value,

        time:
            form.querySelector("[name='time']")?.value,

        priority:
            form.querySelector("[name='priority']")?.value
            || "medium",

        duration:
            Number(
                form.querySelector("[name='duration']")?.value
            ) || 60,

        notes:
            form.querySelector("[name='notes']")?.value
            .trim() || "",

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    if (!task.title) {

        showNotification(
            "Please enter a task title.",
            "error"
        );

        return;

    }


    if (id) {

        const index =
            App.tasks.findIndex(
                item => item.id === id
            );

        if (index !== -1) {

            task.completed =
                App.tasks[index].completed;

            task.createdAt =
                App.tasks[index].createdAt;

            App.tasks[index] = task;

            showNotification(
                "Task updated successfully.",
                "success"
            );

        }

    } else {

        App.tasks.push(task);

        showNotification(
            "Task added successfully.",
            "success"
        );

    }


    saveData();

    closeModal();

    resetTaskForm();

    renderAll();

}


function resetTaskForm() {

    const form = $("#taskForm");

    if (!form) return;

    form.reset();

    delete form.dataset.editingId;


    const submitButton =
        form.querySelector("[type='submit']");

    if (submitButton) {

        submitButton.textContent = "Add Task";

    }

}


function editTask(id) {

    const task =
        App.tasks.find(item => item.id === id);

    if (!task) return;


    const form = $("#taskForm");

    if (!form) return;


    form.dataset.editingId = id;


    const fields = {

        title: task.title,

        subject: task.subject,

        date: task.date,

        time: task.time,

        priority: task.priority,

        duration: task.duration,

        notes: task.notes

    };


    Object.entries(fields).forEach(
        ([name, value]) => {

            const input =
                form.querySelector(`[name="${name}"]`);

            if (input) {

                input.value = value ?? "";

            }

        }
    );


    const submitButton =
        form.querySelector("[type='submit']");

    if (submitButton) {

        submitButton.textContent =
            "Update Task";

    }


    openModal("taskModal");

}


function deleteTask(id) {

    const task =
        App.tasks.find(item => item.id === id);

    if (!task) return;


    const confirmed =
        confirm(
            `Delete "${task.title}"?`
        );

    if (!confirmed) return;


    App.tasks =
        App.tasks.filter(
            item => item.id !== id
        );


    saveData();

    renderAll();

    showNotification(
        "Task deleted.",
        "success"
    );

}


function toggleTask(id) {

    const task =
        App.tasks.find(item => item.id === id);

    if (!task) return;


    task.completed = !task.completed;

    saveData();

    renderAll();


    if (task.completed) {

        showNotification(
            "Task completed! 🎉",
            "success"
        );

    }

}


/* =========================================
   RENDER TASKS
   ========================================= */

function renderTasks(tasks = App.tasks) {

    const containers =
        $$(".task-list");

    containers.forEach(container => {

        if (!tasks.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">📚</div>

                    <h3>No tasks found</h3>

                    <p>
                        Add a study task to get started.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            tasks.map(task => createTaskHTML(task))
            .join("");


        container
            .querySelectorAll("[data-task-checkbox]")
            .forEach(checkbox => {

                checkbox.addEventListener(
                    "change",
                    () => {

                        toggleTask(
                            Number(
                                checkbox.dataset.taskCheckbox
                            )
                        );

                    }
                );

            });

    });

}


function createTaskHTML(task) {

    const priorityClass = {

        low: "badge-success",

        medium: "badge-warning",

        high: "badge-danger"

    }[task.priority] || "badge-primary";


    return `

        <div class="
            task-item
            ${task.completed ? "task-completed" : ""}
        ">

            <input
                type="checkbox"
                class="task-checkbox"
                data-task-checkbox="${task.id}"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-details">

                <div class="task-title">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-meta">

                    <span>
                        📚 ${escapeHTML(task.subject)}
                    </span>

                    ${
                        task.date
                        ? `<span>📅 ${formatDate(task.date)}</span>`
                        : ""
                    }

                    ${
                        task.time
                        ? `<span>⏰ ${escapeHTML(task.time)}</span>`
                        : ""
                    }

                    <span>
                        ⏱️ ${task.duration} min
                    </span>

                    <span class="badge ${priorityClass}">
                        ${capitalize(task.priority)}
                    </span>

                </div>

            </div>

            <div class="task-actions">

                <button
                    class="icon-button"
                    title="Edit"
                    data-edit-task="${task.id}"
                >
                    ✏️
                </button>

                <button
                    class="icon-button"
                    title="Delete"
                    data-delete-task="${task.id}"
                >
                    🗑️
                </button>

            </div>

        </div>

    `;

}


/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

function updateDashboardStats() {

    const total =
        App.tasks.length;

    const completed =
        App.tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    const totalMinutes =
        App.tasks.reduce(
            (sum, task) =>
                sum + Number(task.duration || 0),
            0
        );


    const completionRate =
        total
            ? Math.round((completed / total) * 100)
            : 0;


    setText(
        "#totalTasks",
        total
    );

    setText(
        "#completedTasks",
        completed
    );

    setText(
        "#pendingTasks",
        pending
    );

    setText(
        "#completionRate",
        completionRate + "%"
    );

    setText(
        "#studyHours",
        (totalMinutes / 60).toFixed(1)
    );

}


/* =========================================
   SEARCH & FILTER
   ========================================= */

function setupSearch() {

    const searchInput =
        $("#taskSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterTasks
        );

    }


    const filter =
        $("#taskFilter");


    if (filter) {

        filter.addEventListener(
            "change",
            filterTasks
        );

    }

}


function filterTasks() {

    const search =
        ($("#taskSearch")?.value || "")
        .toLowerCase()
        .trim();


    const filter =
        $("#taskFilter")?.value || "all";


    let filtered =
        App.tasks.filter(task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search) ||

                task.subject
                    .toLowerCase()
                    .includes(search);


            let matchesFilter = true;


            if (filter === "completed") {

                matchesFilter =
                    task.completed;

            }


            if (filter === "pending") {

                matchesFilter =
                    !task.completed;

            }


            if (
                ["low", "medium", "high"]
                .includes(filter)
            ) {

                matchesFilter =
                    task.priority === filter;

            }


            return matchesSearch &&
                   matchesFilter;

        });


    renderTasks(filtered);

}


/* =========================================
   SUBJECT MANAGEMENT
   ========================================= */

function renderSubjects() {

    const containers =
        $$(".subject-grid");


    containers.forEach(container => {

        if (!App.subjects.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">📚</div>

                    <h3>No subjects</h3>

                    <p>Add your first subject.</p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            App.subjects
                .map(subject => {

                    const subjectTasks =
                        App.tasks.filter(
                            task =>
                                task.subject ===
                                subject.name
                        );

                    const completed =
                        subjectTasks.filter(
                            task =>
                                task.completed
                        ).length;

                    const total =
                        subjectTasks.length;

                    const percentage =
                        total
                            ? Math.round(
                                (completed / total) *
                                100
                            )
                            : 0;


                    return `

                        <div class="subject-card">

                            <div class="subject-header">

                                <span
                                    class="subject-color"
                                    style="
                                        background:
                                        ${subject.color}
                                    "
                                ></span>

                                <span class="subject-name">
                                    ${escapeHTML(subject.name)}
                                </span>

                                <span class="subject-hours">
                                    ${subject.hours || 0} hrs
                                </span>

                            </div>

                            <div class="progress-container">

                                <div class="progress-info">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        ${percentage}%
                                    </span>

                                </div>

                                <div class="progress-bar">

                                    <div
                                        class="progress-fill"
                                        style="
                                            width:
                                            ${percentage}%
                                        "
                                    ></div>

                                </div>

                            </div>

                        </div>

                    `;

                })
                .join("");

    });

}


/* =========================================
   CALENDAR
   ========================================= */

function setupCalendarControls() {

    $("#prevMonth")?.addEventListener(
        "click",
        () => {

            App.currentDate.setMonth(
                App.currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


    $("#nextMonth")?.addEventListener(
        "click",
        () => {

            App.currentDate.setMonth(
                App.currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


    $("#todayBtn")?.addEventListener(
        "click",
        () => {

            App.currentDate =
                new Date();

            renderCalendar();

        }
    );

}


function renderCalendar() {

    const grid =
        $("#calendarGrid");


    if (!grid) return;


    const year =
        App.currentDate.getFullYear();

    const month =
        App.currentDate.getMonth();


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const today =
        new Date();


    setText(
        "#calendarTitle",
        new Intl.DateTimeFormat(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        ).format(App.currentDate)
    );


    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    let html =
        dayNames.map(
            day => `
                <div class="calendar-day-name">
                    ${day}
                </div>
            `
        ).join("");


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        html += `<div></div>`;

    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


        const hasTask =
            App.tasks.some(
                task =>
                    task.date === dateString
            );


        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();


        html += `

            <div
                class="
                    calendar-day
                    ${isToday ? "today" : ""}
                    ${hasTask ? "has-task" : ""}
                "
                data-calendar-date="${dateString}"
            >
                ${day}
            </div>

        `;

    }


    grid.innerHTML = html;


    grid
        .querySelectorAll("[data-calendar-date]")
        .forEach(dayElement => {

            dayElement.addEventListener(
                "click",
                () => {

                    const date =
                        dayElement.dataset.calendarDate;

                    showTasksForDate(date);

                }
            );

        });

}


function showTasksForDate(date) {

    const tasks =
        App.tasks.filter(
            task => task.date === date
        );


    if (!tasks.length) {

        showNotification(
            `No tasks scheduled for ${formatDate(date)}.`,
            "warning"
        );

        return;

    }


    renderTasks(tasks);

    showNotification(
        `${tasks.length} task(s) scheduled for ${formatDate(date)}.`,
        "success"
    );

}


/* =========================================
   POMODORO TIMER
   ========================================= */

function setupTimer() {

    $("#startTimer")?.addEventListener(
        "click",
        startTimer
    );


    $("#pauseTimer")?.addEventListener(
        "click",
        pauseTimer
    );


    $("#resetTimer")?.addEventListener(
        "click",
        resetTimer
    );


    $$("[data-timer-mode]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setTimerMode(
                        button.dataset.timerMode
                    );

                }
            );

        });


    updateTimerDisplay();

}


function startTimer() {

    if (App.timer.running) return;


    App.timer.running = true;


    App.timer.interval =
        setInterval(() => {

            App.timer.seconds--;

            updateTimerDisplay();


            if (App.timer.seconds <= 0) {

                timerFinished();

            }

        }, 1000);

}


function pauseTimer() {

    App.timer.running = false;

    clearInterval(
        App.timer.interval
    );

}


function resetTimer() {

    pauseTimer();

    App.timer.seconds =
        App.timer.totalSeconds;

    updateTimerDisplay();

}


function setTimerMode(mode) {

    pauseTimer();


    App.timer.mode = mode;


    const durations = {

        focus: 25 * 60,

        short: 5 * 60,

        long: 15 * 60

    };


    App.timer.totalSeconds =
        durations[mode] || durations.focus;

    App.timer.seconds =
        App.timer.totalSeconds;


    $$("[data-timer-mode]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.timerMode === mode
            );

        });


    updateTimerDisplay();

}


function timerFinished() {

    pauseTimer();

    App.timer.seconds = 0;

    updateTimerDisplay();


    showNotification(
        "Timer finished! Take a short break. 🎉",
        "success"
    );


    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(
            "Study Planner",
            {
                body:
                    "Your study session has finished."
            }
        );

    }

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            App.timer.seconds / 60
        );

    const seconds =
        App.timer.seconds % 60;


    const formatted =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    setText(
        "#timerDisplay",
        formatted
    );


    setText(
        ".pomodoro-time",
        formatted
    );


    const circle =
        $(".pomodoro-circle");


    if (circle) {

        const percentage =
            App.timer.totalSeconds
                ? (
                    App.timer.seconds /
                    App.timer.totalSeconds
                ) * 360
                : 0;


        circle.style.background =
            `conic-gradient(
                var(--primary) ${percentage}deg,
                var(--border) ${percentage}deg
            )`;

    }

}


/* =========================================
   DARK MODE
   ========================================= */

function setupTheme() {

    const savedTheme =
        localStorage.getItem("studyTheme");


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    const themeButton =
        $("#themeToggle");


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleTheme
        );

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "studyTheme",
        dark ? "dark" : "light"
    );

}


/* =========================================
   SETTINGS
   ========================================= */

function setupSettings() {

    const notificationToggle =
        $("#notificationToggle");


    if (notificationToggle) {

        notificationToggle.addEventListener(
            "change",
            async event => {

                if (
                    event.target.checked &&
                    "Notification" in window
                ) {

                    await Notification.requestPermission();

                }

            }
        );

    }


    $("#clearDataBtn")?.addEventListener(
        "click",
        clearAllData
    );

}


function clearAllData() {

    const confirmed =
        confirm(
            "This will permanently delete all your study data. Continue?"
        );


    if (!confirmed) return;


    App.tasks = [];

    App.subjects = [];

    App.goals = [];


    saveData();

    renderAll();


    showNotification(
        "All study data has been cleared.",
        "success"
    );

}


/* =========================================
   GOALS
   ========================================= */

function renderGoals() {

    const container =
        $("#goalsList");


    if (!container) return;


    if (!App.goals.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">🎯</div>

                <h3>No goals yet</h3>

                <p>
                    Create a study goal to stay motivated.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        App.goals
            .map(goal => {

                const percentage =
                    Math.min(
                        100,
                        Math.round(
                            (goal.progress /
                            goal.target) * 100
                        )
                    );


                return `

                    <div class="goal-item">

                        <div class="goal-header">

                            <span class="goal-title">
                                ${escapeHTML(goal.title)}
                            </span>

                            <span class="goal-percentage">
                                ${percentage}%
                            </span>

                        </div>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${percentage}%"
                            ></div>

                        </div>

                    </div>

                `;

            })
            .join("");

}


/* =========================================
   WEEKLY STATISTICS
   ========================================= */

function renderWeeklyChart() {

    const chart =
        $("#weeklyChart");


    if (!chart) return;


    const today =
        new Date();


    const data = [];


    for (let i = 6; i >= 0; i--) {

        const date =
            new Date(today);

        date.setDate(
            today.getDate() - i
        );


        const dateString =
            date.toISOString()
                .split("T")[0];


        const minutes =
            App.tasks
                .filter(
                    task =>
                        task.date === dateString &&
                        task.completed
                )
                .reduce(
                    (sum, task) =>
                        sum +
                        Number(task.duration || 0),
                    0
                );


        data.push({

            label:
                date.toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                ),

            minutes

        });

    }


    const max =
        Math.max(
            ...data.map(item => item.minutes),
            60
        );


    chart.innerHTML =
        data.map(item => {

            const height =
                Math.max(
                    5,
                    (item.minutes / max) * 100
                );


            return `

                <div class="chart-bar-container">

                    <div
                        class="chart-bar"
                        style="height:${height}%"
                        title="${item.minutes} minutes"
                    ></div>

                    <div class="chart-label">
                        ${item.label}
                    </div>

                </div>

            `;

        }).join("");

}


/* =========================================
   UPCOMING TASKS
   ========================================= */

function renderUpcomingTasks() {

    const container =
        $("#upcomingTasks");


    if (!container) return;


    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );


    const upcoming =
        App.tasks
            .filter(task => {

                if (
                    !task.date ||
                    task.completed
                ) {
                    return false;
                }

                const date =
                    new Date(task.date);

                return date >= today;

            })
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            )
            .slice(0, 5);


    renderTasksIntoContainer(
        container,
        upcoming
    );

}


function renderTasksIntoContainer(
    container,
    tasks
) {

    if (!tasks.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">🎉</div>

                <h3>All caught up!</h3>

                <p>
                    You have no upcoming tasks.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        tasks
            .map(task => createTaskHTML(task))
            .join("");


    container
        .querySelectorAll("[data-task-checkbox]")
        .forEach(checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    toggleTask(
                        Number(
                            checkbox.dataset.taskCheckbox
                        )
                    );

                }
            );

        });

}


/* =========================================
   RENDER EVERYTHING
   ========================================= */

function renderAll() {

    renderTasks();

    renderSubjects();

    renderGoals();

    renderCalendar();

    renderWeeklyChart();

    renderUpcomingTasks();

    updateDashboardStats();

}


/* =========================================
   NOTIFICATIONS
   ========================================= */

function showNotification(
    message,
    type = "success"
) {

    let container =
        $(".notification-container");


    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "notification-container";

        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement("div");


    notification.className =
        `notification ${type}`;


    const icons = {

        success: "✅",

        error: "❌",

        warning: "⚠️",

        info: "ℹ️"

    };


    notification.innerHTML = `

        <span>
            ${icons[type] || icons.info}
        </span>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    container.appendChild(
        notification
    );


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateX(30px)";


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3000);

}


/* =========================================
   UTILITY FUNCTIONS
   ========================================= */

function setText(
    selector,
    value
) {

    const element =
        document.querySelector(selector);

    if (element) {

        element.textContent = value;

    }

}


function formatDate(dateString) {

    if (!dateString) return "";

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


function capitalize(value) {

    if (!value) return "";

    return value.charAt(0).toUpperCase() +
        value.slice(1);

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   KEYBOARD SHORTCUTS
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Escape = close modal */

        if (event.key === "Escape") {

            closeModal();

        }


        /* Ctrl/Cmd + K = search */

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            const search =
                $("#taskSearch");

            if (search) {

                search.focus();

            }

        }

    }
);


/* =========================================
   AUTO SAVE
   ========================================= */

window.addEventListener(
    "beforeunload",
    saveData
);


/* =========================================
   EXPOSE FUNCTIONS
   ========================================= */

window.StudyPlanner = {

    addTask(task) {

        App.tasks.push({

            id: generateId(),

            completed: false,

            createdAt:
                new Date().toISOString(),

            ...task

        });

        saveData();

        renderAll();

    },

    deleteTask,

    editTask,

    toggleTask,

    openModal,

    closeModal,

    showNotification,

    setTimerMode,

    startTimer,

    pauseTimer,

    resetTimer

};
