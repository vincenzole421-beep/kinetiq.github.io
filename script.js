```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #4f46e5;
    --primary-dark: #3730a3;
    --primary-light: #eef2ff;

    --background: #f5f7fb;
    --card: #ffffff;

    --text: #171717;
    --muted: #737373;

    --border: #e5e7eb;

    --success: #22c55e;
    --danger: #ef4444;

    --sidebar: #ffffff;
}

body.dark {
    --background: #111827;
    --card: #1f2937;

    --text: #f9fafb;
    --muted: #9ca3af;

    --border: #374151;

    --sidebar: #111827;

    --primary-light: #312e81;
}

body {
    font-family: Arial, Helvetica, sans-serif;

    background: var(--background);

    color: var(--text);

    min-height: 100vh;
}


/* =====================================================
   AUTHENTICATION
===================================================== */

.auth-screen {

    min-height: 100vh;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        linear-gradient(
            135deg,
            #eef2ff,
            #f5f3ff,
            #ffffff
        );
}

.auth-card {

    width: 100%;

    max-width: 440px;

    background: white;

    border-radius: 20px;

    padding: 35px;

    box-shadow:
        0 20px 60px
        rgba(0,0,0,.12);

}

.auth-logo {

    width: 65px;

    height: 65px;

    display: grid;

    place-items: center;

    background: var(--primary-light);

    border-radius: 18px;

    font-size: 32px;

    margin: auto;
}

.auth-card > h1 {

    text-align: center;

    margin-top: 15px;

    color: var(--primary);
}

.auth-subtitle {

    text-align: center;

    color: #737373;

    margin: 8px 0 30px;
}

.auth-card h2 {

    margin-bottom: 10px;
}

.form-info {

    color: #737373;

    font-size: 13px;

    margin-bottom: 20px;
}

.auth-card label {

    display: block;

    font-size: 13px;

    font-weight: bold;

    margin:

    15px 0 6px;
}

.auth-card input {

    width: 100%;

    padding: 13px;

    border: 1px solid #d1d5db;

    border-radius: 9px;

    outline: none;

    font-size: 15px;
}

.auth-card input:focus {

    border-color: var(--primary);

    box-shadow:
        0 0 0 3px
        rgba(79,70,229,.12);
}

.password-box {

    position: relative;
}

.password-box input {

    padding-right: 50px;
}

.password-toggle {

    position: absolute;

    right: 8px;

    top: 50%;

    transform: translateY(-50%);

    border: none;

    background: transparent;

    cursor: pointer;

    font-size: 18px;
}

.primary-btn {

    border: none;

    background: var(--primary);

    color: white;

    padding: 12px 18px;

    border-radius: 9px;

    cursor: pointer;

    font-weight: bold;

}

.primary-btn:hover {

    background: var(--primary-dark);
}

.full {

    width: 100%;

    margin-top: 18px;
}

.auth-message {

    min-height: 20px;

    margin-top: 12px;

    font-size: 13px;

    text-align: center;
}

.auth-message.error {

    color: var(--danger);
}

.auth-message.success {

    color: var(--success);
}

.switch-auth {

    text-align: center;

    margin-top: 20px;

    color: #737373;

    font-size: 14px;
}

.switch-auth button {

    border: none;

    background: transparent;

    color: var(--primary);

    cursor: pointer;

    font-weight: bold;
}

.security-note {

    margin-top: 25px;

    padding: 12px;

    border-radius: 9px;

    background: #f3f4f6;

    color: #4b5563;

    font-size: 12px;

    text-align: center;
}

.hidden {

    display: none !important;
}


/* =====================================================
   APPLICATION
===================================================== */

.app-hidden {

    display: none;
}

.sidebar {

    width: 250px;

    min-height: 100vh;

    background: var(--sidebar);

    border-right: 1px solid var(--border);

    padding: 25px 15px;

    position: fixed;

    left: 0;

    top: 0;

    z-index: 100;
}

.logo {

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 10px;

    margin-bottom: 20px;
}

.logo span {

    font-size: 28px;
}

.logo h2 {

    font-size: 21px;
}


/* STUDENT PROFILE */

.student-profile {

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 12px;

    background: var(--primary-light);

    border-radius: 12px;

    margin-bottom: 20px;
}

.student-avatar {

    width: 38px;

    height: 38px;

    border-radius: 50%;

    display: grid;

    place-items: center;

    background: white;

    font-size: 20px;
}

.student-profile strong {

    display: block;

    font-size: 13px;
}

.student-profile small {

    color: var(--muted);

    font-size: 11px;
}


nav {

    display: flex;

    flex-direction: column;

    gap: 4px;
}

.nav-item {

    border: none;

    background: transparent;

    color: var(--text);

    padding: 12px;

    text-align: left;

    border-radius: 9px;

    cursor: pointer;

    font-size: 14px;
}

.nav-item:hover,
.nav-item.active {

    background: var(--primary-light);

    color: var(--primary);
}


.sidebar-bottom {

    position: absolute;

    bottom: 20px;

    left: 15px;

    right: 15px;

    display: flex;

    flex-direction: column;

    gap: 5px;
}

.sidebar-bottom button {

    border: none;

    background: transparent;

    color: var(--text);

    padding: 12px;

    text-align: left;

    border-radius: 8px;

    cursor: pointer;
}

.sidebar-bottom button:hover {

    background: var(--primary-light);
}


/* MAIN */

.main {

    margin-left: 250px;

    width: calc(100% - 250px);

    padding: 25px;
}

.topbar {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;
}

.topbar h1 {

    font-size: 28px;
}

.small-text {

    color: var(--muted);

    font-size: 13px;
}

.top-actions {

    display: flex;

    gap: 10px;
}

.top-actions input {

    width: 230px;

    padding: 11px 14px;

    border: 1px solid var(--border);

    border-radius: 10px;

    background: var(--card);

    color: var(--text);
}

#mobileMenu {

    display: none;

    border: 1px solid var(--border);

    background: var(--card);

    color: var(--text);

    padding: 10px;

    border-radius: 8px;
}


/* PAGES */

.page {

    display: none;
}

.active-page {

    display: block;
}


/* WELCOME */

.welcome-card {

    background:
        linear-gradient(
            135deg,
            #4f46e5,
            #7c3aed
        );

    color: white;

    border-radius: 18px;

    padding: 30px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;
}

.welcome-card h2 {

    margin: 10px 0;

    font-size: 25px;
}

.welcome-icon {

    font-size: 70px;
}


/* STATS */

.stats-grid {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 18px;

    margin-bottom: 25px;
}

.stat-card {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 14px;

    padding: 20px;

    display: flex;

    align-items: center;

    gap: 15px;
}

.stat-card > span {

    font-size: 28px;
}

.stat-card p {

    color: var(--muted);

    font-size: 13px;
}

.stat-card h2 {

    margin-top: 5px;
}


/* CARDS */

.card {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 14px;

    padding: 20px;

    margin-bottom: 20px;
}

.card-header,
.section-header,
.modal-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 15px;
}

.card-header {

    margin-bottom: 18px;
}

.section-header {

    margin-bottom: 25px;
}

.section-header h2 {

    font-size: 25px;
}

.section-header p {

    color: var(--muted);

    margin-top: 5px;
}


/* DASHBOARD */

.dashboard-grid {

    display: grid;

    grid-template-columns: 2fr 1fr;

    gap: 20px;
}

.center-text {

    text-align: center;

    color: var(--muted);
}

.progress-circle {

    width: 170px;

    height: 170px;

    margin: 20px auto;

    border-radius: 50%;

    background:
        conic-gradient(
            var(--primary) 0deg,
            var(--border) 0deg
        );

    display: grid;

    place-items: center;
}

.progress-circle div {

    width: 125px;

    height: 125px;

    border-radius: 50%;

    background: var(--card);

    display: grid;

    place-items: center;

    font-size: 25px;

    font-weight: bold;
}


/* BUTTONS */

.small-btn,
.secondary-btn {

    border: 1px solid var(--border);

    background: var(--card);

    color: var(--text);

    padding: 9px 14px;

    border-radius: 8px;

    cursor: pointer;
}


/* TASKS */

.task-item {

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 15px 5px;

    border-bottom: 1px solid var(--border);
}

.task-item:last-child {

    border-bottom: none;
}

.task-checkbox {

    width: 20px;

    height: 20px;

    accent-color: var(--primary);
}

.task-info {

    flex: 1;
}

.task-info h4 {

    margin-bottom: 5px;
}

.task-info p {

    color: var(--muted);

    font-size: 13px;
}

.task-item.completed h4 {

    text-decoration: line-through;

    opacity: .5;
}

.priority {

    padding: 4px 9px;

    border-radius: 20px;

    font-size: 11px;
}

.priority.High {

    background: #fee2e2;

    color: #dc2626;
}

.priority.Medium {

    background: #fef3c7;

    color: #d97706;
}

.priority.Low {

    background: #dcfce7;

    color: #16a34a;
}

.delete-btn {

    background: transparent;

    border: none;

    color: var(--danger);

    cursor: pointer;

    font-size: 17px;
}

.filter-bar {

    display: flex;

    gap: 10px;

    margin-bottom: 20px;
}

.filter-bar select {

    padding: 10px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: var(--card);

    color: var(--text);
}


/* SUBJECTS / EXAMS / GOALS / NOTES */

.subject-grid,
.exam-grid,
.goal-grid,
.note-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 18px;
}

.subject-card,
.exam-card,
.goal-card,
.note-card {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 14px;

    padding: 20px;
}

.subject-color {

    width: 45px;

    height: 45px;

    border-radius: 10px;

    margin-bottom: 15px;
}

.subject-card p,
.exam-card p,
.goal-card p {

    color: var(--muted);

    font-size: 14px;

    margin-bottom: 7px;
}

.exam-card {

    border-top: 4px solid var(--danger);
}

.exam-days {

    font-size: 25px;

    font-weight: bold;

    color: var(--primary);

    margin: 15px 0;
}


/* TIMETABLE */

.timetable-container {

    overflow-x: auto;
}

.timetable-grid {

    min-width: 700px;

    display: grid;

    grid-template-columns:
        repeat(7, 1fr);

    gap: 10px;
}

.day-column {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 12px;

    min-height: 300px;
}

.day-header {

    padding: 13px;

    background: var(--primary-light);

    color: var(--primary);

    font-weight: bold;

    text-align: center;

    border-radius:
        12px 12px 0 0;
}

.schedule-item {

    margin: 10px;

    padding: 10px;

    background: var(--primary-light);

    border-left:
        3px solid var(--primary);

    border-radius: 7px;

    font-size: 13px;
}

.schedule-item strong {

    display: block;

    margin-bottom: 5px;
}


/* GOALS */

.goal-progress {

    height: 9px;

    background: var(--border);

    border-radius: 10px;

    overflow: hidden;

    margin: 15px 0;
}

.goal-progress div {

    height: 100%;

    background: var(--primary);
}


/* TIMER */

.timer-container {

    max-width: 650px;

    margin: auto;
}

.timer-card {

    text-align: center;

    padding: 45px;
}

#timerDisplay {

    font-size: 85px;

    font-weight: bold;

    margin: 30px 0;
}

.timer-buttons {

    display: flex;

    justify-content: center;

    gap: 10px;

    flex-wrap: wrap;
}

.timer-presets {

    margin-top: 25px;

    display: flex;

    justify-content: center;

    gap: 10px;
}

.timer-presets button {

    border: 1px solid var(--border);

    background: var(--card);

    color: var(--text);

    padding: 9px 15px;

    border-radius: 8px;

    cursor: pointer;
}


/* NOTES */

.note-card {

    min-height: 180px;
}

.note-content {

    color: var(--muted);

    white-space: pre-wrap;

    line-height: 1.6;

    margin-top: 12px;
}


/* PROGRESS */

.progress-grid {

    display: grid;

    grid-template-columns: 2fr 1fr;

    gap: 20px;
}

.large-progress {

    height: 20px;

    background: var(--border);

    border-radius: 20px;

    margin: 30px 0 15px;

    overflow: hidden;
}

.large-progress div {

    height: 100%;

    width: 0;

    background: var(--primary);

    transition: .3s;
}

.study-time {

    text-align: center;

    padding: 30px;
}

.study-time span {

    font-size: 45px;
}

.study-time strong {

    display: block;

    font-size: 45px;

    margin-top: 10px;
}

.study-time p {

    color: var(--muted);
}


/* MODAL */

.modal {

    position: fixed;

    inset: 0;

    background:
        rgba(0,0,0,.55);

    display: none;

    align-items: center;

    justify-content: center;

    padding: 20px;

    z-index: 1000;
}

.modal.show {

    display: flex;
}

.modal-content {

    width: 100%;

    max-width: 500px;

    background: var(--card);

    color: var(--text);

    border-radius: 15px;

    padding: 25px;

    max-height: 90vh;

    overflow-y: auto;
}

.modal-header {

    margin-bottom: 20px;
}

.modal-header button {

    border: none;

    background: transparent;

    color: var(--text);

    font-size: 28px;

    cursor: pointer;
}

form label {

    display: block;

    font-size: 13px;

    font-weight: bold;

    margin: 14px 0 6px;
}

form input,
form select,
form textarea {

    width: 100%;

    padding: 11px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: var(--card);

    color: var(--text);
}


/* RESPONSIVE */

@media(max-width:1000px) {

    .stats-grid {

        grid-template-columns:
            repeat(2,1fr);
    }

    .subject-grid,
    .exam-grid,
    .goal-grid,
    .note-grid {

        grid-template-columns:
            repeat(2,1fr);
    }
}

@media(max-width:700px) {

    .sidebar {

        transform:
            translateX(-100%);

        transition: .3s;
    }

    .sidebar.open {

        transform:
            translateX(0);
    }

    .main {

        margin-left: 0;

        width: 100%;

        padding: 15px;
    }

    #mobileMenu {

        display: block;
    }

    .top-actions input {

        width: 150px;
    }

    .stats-grid,
    .dashboard-grid,
    .progress-grid {

        grid-template-columns: 1fr;
    }

    .subject-grid,
    .exam-grid,
    .goal-grid,
    .note-grid {

        grid-template-columns: 1fr;
    }

    .welcome-card {

        padding: 20px;
    }

    .welcome-icon {

        font-size: 45px;
    }

    #timerDisplay {

        font-size: 60px;
    }
}

@media(max-width:450px) {

    .auth-card {

        padding: 25px 18px;
    }

    .top-actions input {

        width: 110px;
    }

    .filter-bar {

        flex-direction: column;
    }
}
```
