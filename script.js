/* =========================
   GLOBAL
========================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #4f46e5;
    --primary-dark: #3730a3;
    --background: #f5f7fb;
    --card: #ffffff;
    --text: #1f2937;
    --muted: #6b7280;
    --border: #e5e7eb;
    --green: #10b981;
    --orange: #f59e0b;
    --red: #ef4444;
    --blue: #3b82f6;
    --purple: #8b5cf6;
}

body {
    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background: var(--background);
    color: var(--text);
    min-height: 100vh;
}


/* =========================
   UTILITIES
========================= */

.hidden {
    display: none !important;
}

button,
input,
select,
textarea {
    font-family: inherit;
}

button {
    cursor: pointer;
}

.message {
    min-height: 22px;
    margin-top: 10px;
    font-size: 14px;
}

.success {
    color: var(--green);
}

.error {
    color: var(--red);
}


/* =========================
   AUTH
========================= */

.auth-screen {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background:
        linear-gradient(
            135deg,
            #4f46e5,
            #7c3aed
        );
}

.auth-card {
    width: 100%;
    max-width: 430px;

    background: white;

    border-radius: 20px;

    padding: 35px;

    box-shadow:
        0 25px 60px rgba(0, 0, 0, 0.2);
}

.logo {
    width: 70px;
    height: 70px;

    margin: 0 auto 15px;

    border-radius: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #eef2ff;

    font-size: 35px;
}

.auth-card h1 {
    text-align: center;
    font-size: 28px;
}

.subtitle {
    text-align: center;
    color: var(--muted);
    margin: 7px 0 30px;
}

.auth-card h2 {
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 18px;
}

.input-group label {
    display: block;
    margin-bottom: 7px;

    font-size: 14px;
    font-weight: 600;
}

.input-group input,
.input-group select,
.input-group textarea,
.filter-bar input,
.filter-bar select {
    width: 100%;

    padding: 12px 14px;

    border: 1px solid var(--border);
    border-radius: 9px;

    outline: none;

    background: white;
    color: var(--text);

    transition: 0.2s;
}

.input-group textarea {
    min-height: 100px;
    resize: vertical;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
    border-color: var(--primary);

    box-shadow:
        0 0 0 3px rgba(79, 70, 229, 0.1);
}

.primary-btn {
    border: none;

    background: var(--primary);
    color: white;

    padding: 12px 18px;

    border-radius: 9px;

    font-weight: 600;

    transition: 0.2s;
}

.primary-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.full-btn {
    width: 100%;
}

.small-btn {
    padding: 10px 15px;
}

.switch-text {
    text-align: center;
    margin-top: 20px;

    color: var(--muted);
    font-size: 14px;
}

.link-btn {
    background: none;
    border: none;

    color: var(--primary);

    font-weight: 600;
}


/* =========================
   SIDEBAR
========================= */

.app {
    min-height: 100vh;
}

.sidebar {
    position: fixed;

    left: 0;
    top: 0;

    width: 250px;
    height: 100vh;

    background: #111827;
    color: white;

    padding: 22px;

    display: flex;
    flex-direction: column;

    z-index: 100;
}

.sidebar-logo {
    font-size: 20px;
    font-weight: bold;

    margin-bottom: 30px;

    display: flex;
    align-items: center;
    gap: 10px;
}

.student-mini-profile {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 12px;

    background: rgba(255, 255, 255, 0.08);

    border-radius: 12px;

    margin-bottom: 25px;
}

.avatar {
    width: 40px;
    height: 40px;

    border-radius: 50%;

    background: var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
}

.student-mini-profile strong {
    display: block;
    font-size: 14px;
}

.student-mini-profile small {
    display: block;

    color: #9ca3af;

    margin-top: 3px;
}

.sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.nav-btn {
    width: 100%;

    background: transparent;
    border: none;

    color: #d1d5db;

    padding: 12px;

    border-radius: 8px;

    text-align: left;

    font-size: 14px;

    transition: 0.2s;
}

.nav-btn:hover,
.nav-btn.active {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.sidebar-bottom {
    margin-top: auto;

    display: flex;
    flex-direction: column;
    gap: 6px;
}

.logout-btn {
    border: none;

    background: rgba(239, 68, 68, 0.15);

    color: #fca5a5;

    padding: 12px;

    border-radius: 8px;

    text-align: left;
}


/* =========================
   MAIN
========================= */

.main-content {
    margin-left: 250px;

    padding: 35px;

    min-height: 100vh;
}

.mobile-header {
    display: none;
}

.content-section {
    display: none;
}

.active-section {
    display: block;
}

.page-header {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 20px;

    margin-bottom: 25px;
}

.page-header h1 {
    font-size: 28px;
}

.page-header p {
    color: var(--muted);
    margin-top: 5px;
}


/* =========================
   STATISTICS
========================= */

.stats-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 18px;

    margin-bottom: 25px;
}

.stat-card {
    background: var(--card);

    border-radius: 14px;

    padding: 20px;

    display: flex;
    align-items: center;
    gap: 15px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.04);
}

.stat-icon {
    width: 48px;
    height: 48px;

    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;
}

.stat-card span {
    display: block;

    color: var(--muted);

    font-size: 13px;
}

.stat-card strong {
    display: block;

    font-size: 25px;

    margin-top: 4px;
}

.blue .stat-icon {
    background: #dbeafe;
}

.green .stat-icon {
    background: #d1fae5;
}

.orange .stat-icon {
    background: #fef3c7;
}

.purple .stat-icon {
    background: #ede9fe;
}


/* =========================
   PANELS
========================= */

.dashboard-grid {
    display: grid;

    grid-template-columns:
        2fr 1fr;

    gap: 20px;

    margin-bottom: 20px;
}

.panel {
    background: var(--card);

    border-radius: 14px;

    padding: 22px;

    margin-bottom: 20px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.04);
}

.panel-header {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: 18px;
}

.panel-header h2 {
    font-size: 18px;
}

.text-btn {
    background: none;
    border: none;

    color: var(--primary);

    font-weight: 600;
}


/* =========================
   TASKS
========================= */

.task-list,
.large-task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-item {
    border: 1px solid var(--border);

    border-radius: 10px;

    padding: 14px;

    display: flex;

    align-items: center;

    gap: 12px;
}

.task-check {
    width: 20px;
    height: 20px;

    accent-color: var(--primary);

    cursor: pointer;
}

.task-info {
    flex: 1;
}

.task-title {
    font-weight: 600;
}

.task-title.completed {
    text-decoration: line-through;
    color: var(--muted);
}

.task-meta {
    color: var(--muted);

    font-size: 12px;

    margin-top: 5px;
}

.priority {
    padding: 5px 8px;

    border-radius: 20px;

    font-size: 11px;

    font-weight: bold;
}

.priority-high {
    background: #fee2e2;
    color: #b91c1c;
}

.priority-medium {
    background: #fef3c7;
    color: #92400e;
}

.priority-low {
    background: #dcfce7;
    color: #166534;
}

.task-actions {
    display: flex;
    gap: 5px;
}

.icon-btn {
    border: none;

    background: #f3f4f6;

    width: 34px;
    height: 34px;

    border-radius: 7px;
}

.icon-btn:hover {
    background: #e5e7eb;
}

.delete-btn:hover {
    color: var(--red);
}


/* =========================
   FILTER
========================= */

.filter-bar {
    display: flex;

    gap: 12px;

    margin-bottom: 20px;
}

.filter-bar input {
    max-width: 500px;
}

.filter-bar select {
    width: 180px;
}


/* =========================
   PROGRESS CIRCLE
========================= */

.progress-container {
    display: flex;

    align-items: center;
    flex-direction: column;

    padding: 15px;
}

.circular-progress {
    width: 150px;
    height: 150px;

    border-radius: 50%;

    background:
        conic-gradient(
            var(--primary) 0deg,
            #e5e7eb 0deg
        );

    display: flex;

    align-items: center;
    justify-content: center;

    position: relative;
}

.circular-progress::before {
    content: "";

    position: absolute;

    width: 112px;
    height: 112px;

    border-radius: 50%;

    background: white;
}

.circular-progress span {
    position: relative;

    font-size: 24px;
    font-weight: bold;
}


/* =========================
   SUBJECTS
========================= */

.subject-grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 18px;
}

.subject-card {
    background: white;

    border-radius: 14px;

    padding: 20px;

    border-left: 5px solid var(--primary);

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.04);
}

.subject-card h3 {
    margin-bottom: 8px;
}

.subject-card p {
    color: var(--muted);
    font-size: 13px;
}

.subject-actions {
    display: flex;

    justify-content: flex-end;

    margin-top: 15px;
}

.empty-state {
    padding: 30px;

    text-align: center;

    color: var(--muted);
}


/* =========================
   TIMETABLE
========================= */

.timetable-wrapper {
    overflow-x: auto;

    background: white;

    border-radius: 14px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.04);
}

.timetable {
    width: 100%;

    border-collapse: collapse;

    min-width: 900px;
}

.timetable th,
.timetable td {
    border: 1px solid var(--border);

    padding: 14px;

    text-align: center;

    height: 70px;
}

.timetable th {
    background: #f9fafb;

    font-size: 13px;
}

.schedule-cell {
    background: #eef2ff;

    color: var(--primary-dark);

    border-radius: 7px;

    padding: 7px;

    font-size: 12px;

    font-weight: 600;
}

.schedule-cell button {
    border: none;

    background: transparent;

    margin-left: 5px;
}


/* =========================
   PROGRESS PAGE
========================= */

.progress-dashboard {
    display: grid;

    grid-template-columns:
        1fr 2fr;

    gap: 20px;

    margin-bottom: 20px;
}

.big-progress-card {
    background: white;

    border-radius: 14px;

    padding: 30px;

    text-align: center;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.04);
}

.big-progress-card h2 {
    margin-bottom: 25px;
}

.big-circle {
    width: 200px;
    height: 200px;

    margin: auto;

    border-radius: 50%;

    background:
        conic-gradient(
            var(--primary) 0deg,
            #e5e7eb 0deg
        );

    display: flex;

    align-items: center;
    justify-content: center;

    position: relative;
}

.big-circle::before {
    content: "";

    position: absolute;

    width: 155px;
    height: 155px;

    border-radius: 50%;

    background: white;
}

.big-circle span {
    position: relative;

    font-size: 35px;
    font-weight: bold;
}

.progress-stat {
    display: grid;

    grid-template-columns:
        100px 1fr 50px;

    align-items: center;

    gap: 15px;

    margin-bottom: 20px;
}

.progress-bar {
    height: 10px;

    background: #e5e7eb;

    border-radius: 20px;

    overflow: hidden;
}

.progress-fill {
    height: 100%;

    width: 0%;

    border-radius: 20px;

    transition: width 0.4s;
}

.green-fill {
    background: var(--green);
}

.orange-fill {
    background: var(--orange);
}

.subject-progress-row {
    margin-bottom: 20px;
}

.subject-progress-header {
    display: flex;

    justify-content: space-between;

    margin-bottom: 7px;

    font-size: 14px;
}


/* =========================
   MODALS
========================= */

.modal {
    display: none;

    position: fixed;

    inset: 0;

    background:
        rgba(0, 0, 0, 0.5);

    z-index: 1000;

    align-items: center;
    justify-content: center;

    padding: 20px;
}

.modal.show {
    display: flex;
}

.modal-content {
    width: 100%;

    max-width: 500px;

    max-height: 90vh;

    overflow-y: auto;

    background: white;

    border-radius: 15px;

    padding: 25px;
}

.modal-header {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
}

.modal-header h2 {
    font-size: 21px;
}

.close-btn {
    width: 35px;
    height: 35px;

    border: none;

    background: #f3f4f6;

    border-radius: 8px;

    font-size: 22px;
}

.form-row {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 15px;
}


/* =========================
   DARK MODE
========================= */

body.dark {
    --background: #0f172a;
    --card: #1e293b;
    --text: #f1f5f9;
    --muted: #94a3b8;
    --border: #334155;
}

body.dark .input-group input,
body.dark .input-group select,
body.dark .input-group textarea,
body.dark .filter-bar input,
body.dark .filter-bar select {
    background: #0f172a;
    color: white;
    border-color: #334155;
}

body.dark .subject-card,
body.dark .timetable-wrapper,
body.dark .big-progress-card,
body.dark .circular-progress::before,
body.dark .big-circle::before {
    background: var(--card);
}

body.dark .timetable th {
    background: #0f172a;
}

body.dark .task-item {
    border-color: var(--border);
}

body.dark .modal-content {
    background: #1e293b;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1100px) {

    .stats-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .subject-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

}

@media (max-width: 800px) {

    .sidebar {
        transform: translateX(-100%);

        transition: 0.3s;
    }

    .sidebar.mobile-open {
        transform: translateX(0);
    }

    .main-content {
        margin-left: 0;

        padding: 20px;
    }

    .mobile-header {
        display: flex;

        align-items: center;

        gap: 15px;

        margin-bottom: 25px;

        font-size: 18px;
    }

    .menu-btn {
        border: none;

        background: white;

        width: 40px;
        height: 40px;

        border-radius: 8px;

        font-size: 20px;
    }

    .dashboard-grid,
    .progress-dashboard {
        grid-template-columns: 1fr;
    }

}

@media (max-width: 600px) {

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .subject-grid {
        grid-template-columns: 1fr;
    }

    .page-header {
        flex-direction: column;

        align-items: flex-start;
    }

    .filter-bar {
        flex-direction: column;
    }

    .filter-bar input,
    .filter-bar select {
        max-width: none;
        width: 100%;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .task-item {
        align-items: flex-start;
    }

    .task-actions {
        flex-direction: column;
    }

    .auth-card {
        padding: 25px 20px;
    }

}
