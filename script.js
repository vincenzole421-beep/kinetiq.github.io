/* =====================================================
   STUDYSPARK - VIBRANT STUDY PLANNER
   ===================================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --purple: #7c3aed;
    --purple-dark: #5b21b6;
    --pink: #ec4899;
    --blue: #2563eb;
    --cyan: #06b6d4;
    --green: #10b981;
    --orange: #f97316;
    --yellow: #facc15;
    --red: #ef4444;

    --dark: #172033;
    --gray: #64748b;
    --light-gray: #f1f5f9;
    --white: #ffffff;

    --shadow: 0 15px 40px rgba(30, 41, 59, 0.10);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    background: #f8fafc;
    color: var(--dark);
}


/* =====================================================
   UTILITY
   ===================================================== */

.hidden {
    display: none !important;
}


/* =====================================================
   LOGIN
   ===================================================== */

.login-page {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 30px;

    position: relative;
    overflow: hidden;

    background:
        linear-gradient(
            135deg,
            #5b21b6,
            #7c3aed 40%,
            #ec4899 100%
        );
}

.background-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(2px);
    opacity: 0.25;
}

.shape-one {
    width: 300px;
    height: 300px;

    background: #22d3ee;

    top: -100px;
    left: -80px;
}

.shape-two {
    width: 400px;
    height: 400px;

    background: #facc15;

    bottom: -180px;
    right: -100px;
}

.shape-three {
    width: 200px;
    height: 200px;

    background: #ffffff;

    top: 30%;
    right: 10%;
}

.login-card {
    width: 100%;
    max-width: 450px;

    padding: 42px;

    background: rgba(255, 255, 255, 0.96);

    border-radius: 28px;

    box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.25);

    position: relative;
    z-index: 2;

    animation: loginAppear 0.7s ease;
}

@keyframes loginAppear {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;
}

.logo span {
    font-size: 38px;
}

.logo h1 {
    font-size: 32px;
    font-weight: 800;
}

.logo h1 span {
    color: var(--pink);
}

.login-subtitle {
    text-align: center;

    margin-top: 10px;
    margin-bottom: 30px;

    color: var(--gray);
}

.input-group {
    margin-bottom: 20px;
}

.input-group label,
.form-group label {
    display: block;

    font-size: 14px;
    font-weight: 700;

    margin-bottom: 8px;

    color: #334155;
}

.input-wrapper {
    display: flex;
    align-items: center;

    border: 2px solid #e2e8f0;

    border-radius: 14px;

    padding: 0 14px;

    transition: 0.25s;

    background: white;
}

.input-wrapper:focus-within {
    border-color: var(--purple);

    box-shadow:
        0 0 0 4px rgba(124, 58, 237, 0.1);
}

.input-wrapper > span {
    margin-right: 10px;
}

.input-wrapper input {
    width: 100%;

    padding: 14px 0;

    border: none;
    outline: none;

    font-size: 15px;
}

.eye-button {
    border: none;
    background: transparent;

    cursor: pointer;

    font-size: 18px;
}

.login-button {
    width: 100%;

    border: none;

    padding: 15px;

    border-radius: 14px;

    color: white;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--pink)
        );

    box-shadow:
        0 10px 25px rgba(124, 58, 237, 0.3);

    transition: 0.25s;
}

.login-button:hover {
    transform: translateY(-2px);

    box-shadow:
        0 15px 30px rgba(124, 58, 237, 0.4);
}

.error-message {
    color: var(--red);

    font-size: 13px;

    min-height: 20px;

    margin-bottom: 8px;
}

.demo-info {
    margin-top: 20px;

    text-align: center;

    font-size: 12px;

    color: var(--gray);

    line-height: 1.5;
}


/* =====================================================
   APPLICATION
   ===================================================== */

.app-page {
    min-height: 100vh;

    display: flex;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #eef2ff
        );
}


/* =====================================================
   SIDEBAR
   ===================================================== */

.sidebar {
    width: 270px;

    min-height: 100vh;

    padding: 25px 18px;

    background:
        linear-gradient(
            180deg,
            #24104f,
            #3b0764,
            #4c1d95
        );

    color: white;

    display: flex;
    flex-direction: column;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 20;
}

.sidebar-logo {
    display: flex;
    align-items: center;

    gap: 10px;

    padding: 0 12px 25px;
}

.sidebar-logo span {
    font-size: 30px;
}

.sidebar-logo h2 {
    font-size: 23px;
}

.sidebar-logo h2 span {
    color: #f9a8d4;
}

.student-mini-card {
    display: flex;
    align-items: center;

    gap: 12px;

    padding: 13px;

    margin-bottom: 25px;

    border-radius: 16px;

    background: rgba(255, 255, 255, 0.1);
}

.avatar {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    color: white;
    font-weight: 800;

    background:
        linear-gradient(
            135deg,
            #ec4899,
            #8b5cf6
        );
}

.student-mini-card strong {
    display: block;
    font-size: 14px;
}

.student-mini-card small {
    color: #d8b4fe;
}

.navigation {
    display: flex;
    flex-direction: column;

    gap: 8px;
}

.nav-item {
    border: none;
    background: transparent;

    color: #ddd6fe;

    width: 100%;

    text-align: left;

    padding: 13px 15px;

    border-radius: 12px;

    cursor: pointer;

    display: flex;
    align-items: center;

    gap: 12px;

    font-size: 14px;
    font-weight: 600;

    transition: 0.25s;
}

.nav-item:hover {
    color: white;

    background: rgba(255, 255, 255, 0.1);

    transform: translateX(3px);
}

.nav-item.active {
    color: white;

    background:
        linear-gradient(
            135deg,
            #8b5cf6,
            #ec4899
        );

    box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.2);
}

.logout-button {
    margin-top: auto;

    border: 1px solid rgba(255,255,255,0.15);

    background: rgba(255,255,255,0.08);

    color: white;

    padding: 13px;

    border-radius: 12px;

    cursor: pointer;

    font-weight: 600;

    transition: 0.25s;
}

.logout-button:hover {
    background: rgba(239,68,68,0.25);
}


/* =====================================================
   MAIN
   ===================================================== */

.main-content {
    margin-left: 270px;

    width: calc(100% - 270px);

    padding: 30px;

    min-height: 100vh;
}

.topbar {
    display: flex;

    justify-content: space-between;
    align-items: center;

    margin-bottom: 25px;
}

.welcome-small {
    color: var(--gray);

    font-size: 14px;
}

.topbar h1 {
    font-size: 28px;
}

.date-display {
    padding: 12px 18px;

    background: white;

    border-radius: 14px;

    box-shadow: var(--shadow);

    color: var(--gray);

    font-size: 14px;
}


/* =====================================================
   SECTIONS
   ===================================================== */

.content-section {
    display: none;

    animation: sectionAppear 0.35s ease;
}

.content-section.active-section {
    display: block;
}

@keyframes sectionAppear {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


/* =====================================================
   HERO
   ===================================================== */

.hero-banner {
    border-radius: 25px;

    padding: 35px;

    margin-bottom: 25px;

    color: white;

    display: flex;

    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    position: relative;

    background:
        linear-gradient(
            120deg,
            #7c3aed,
            #8b5cf6,
            #ec4899
        );

    box-shadow:
        0 20px 40px rgba(124, 58, 237, 0.2);
}

.hero-banner::after {
    content: "";

    width: 220px;
    height: 220px;

    position: absolute;

    right: -60px;
    top: -80px;

    border-radius: 50%;

    background: rgba(255,255,255,0.1);
}

.hero-tag,
.section-tag {
    font-size: 12px;

    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 1px;
}

.hero-banner h2 {
    font-size: 30px;

    max-width: 600px;

    margin: 10px 0;
}

.hero-banner h2 span {
    color: #fef08a;
}

.hero-banner p {
    color: #ede9fe;

    max-width: 600px;
}

.hero-emoji {
    font-size: 90px;

    position: relative;
    z-index: 2;

    animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}


/* =====================================================
   STAT CARDS
   ===================================================== */

.stats-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 18px;

    margin-bottom: 25px;
}

.stat-card {
    background: white;

    padding: 20px;

    border-radius: 20px;

    display: flex;
    align-items: center;

    gap: 15px;

    box-shadow: var(--shadow);

    border-left: 5px solid transparent;

    transition: 0.25s;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-card.purple {
    border-color: var(--purple);
}

.stat-card.green {
    border-color: var(--green);
}

.stat-card.orange {
    border-color: var(--orange);
}

.stat-card.blue {
    border-color: var(--blue);
}

.stat-icon {
    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 14px;

    font-size: 23px;
}

.purple .stat-icon {
    background: #ede9fe;
}

.green .stat-icon {
    background: #d1fae5;
}

.orange .stat-icon {
    background: #ffedd5;
}

.blue .stat-icon {
    background: #dbeafe;
}

.stat-card span {
    display: block;

    color: var(--gray);

    font-size: 13px;

    margin-bottom: 4px;
}

.stat-card strong {
    font-size: 25px;
}


/* =====================================================
   DASHBOARD GRID
   ===================================================== */

.dashboard-grid {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 20px;
}

.panel {
    background: white;

    padding: 25px;

    border-radius: 20px;

    box-shadow: var(--shadow);
}

.panel-header {
    display: flex;

    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
}

.panel-header h3 {
    font-size: 18px;
}

.panel-header p {
    color: var(--gray);

    font-size: 13px;

    margin-top: 4px;
}

.progress-number {
    font-size: 25px;

    font-weight: 800;

    color: var(--purple);
}

.large-progress {
    width: 100%;

    height: 15px;

    border-radius: 20px;

    background: #e2e8f0;

    overflow: hidden;
}

.large-progress-fill {
    height: 100%;

    width: 0%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            #7c3aed,
            #ec4899
        );

    transition: width 0.6s ease;
}

.progress-message {
    color: var(--gray);

    font-size: 13px;

    margin-top: 15px;
}


/* =====================================================
   TASK PREVIEW
   ===================================================== */

.task-preview {
    max-height: 230px;

    overflow-y: auto;
}

.preview-task {
    display: flex;

    align-items: center;

    gap: 12px;

    padding: 12px 0;

    border-bottom: 1px solid #eef2f7;
}

.preview-task:last-child {
    border-bottom: none;
}

.preview-check {
    width: 10px;
    height: 10px;

    border-radius: 50%;

    background: var(--purple);
}

.preview-task.completed .preview-check {
    background: var(--green);
}

.preview-task strong {
    display: block;

    font-size: 14px;
}

.preview-task small {
    color: var(--gray);

    font-size: 12px;
}


/* =====================================================
   SECTION HEADER
   ===================================================== */

.section-heading {
    display: flex;

    justify-content: space-between;
    align-items: center;

    margin-bottom: 25px;
}

.section-tag {
    color: var(--purple);
}

.section-heading h2 {
    font-size: 30px;

    margin: 5px 0;
}

.section-heading p {
    color: var(--gray);
}


/* =====================================================
   BUTTONS
   ===================================================== */

.primary-button {
    border: none;

    padding: 13px 20px;

    border-radius: 12px;

    color: white;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--pink)
        );

    font-weight: 700;

    cursor: pointer;

    box-shadow:
        0 8px 20px rgba(124, 58, 237, 0.2);

    transition: 0.25s;
}

.primary-button:hover {
    transform: translateY(-2px);
}

.small-action {
    border: none;

    color: var(--purple);

    background: #ede9fe;

    padding: 8px 12px;

    border-radius: 10px;

    cursor: pointer;

    font-weight: 700;
}

.full-width {
    width: 100%;
}


/* =====================================================
   FILTER
   ===================================================== */

.filter-bar {
    display: flex;

    gap: 8px;

    margin-bottom: 20px;
}

.filter-button {
    border: none;

    padding: 9px 16px;

    border-radius: 20px;

    background: white;

    color: var(--gray);

    cursor: pointer;

    font-weight: 600;

    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.filter-button.active {
    color: white;

    background: var(--purple);
}


/* =====================================================
   TASK LIST
   ===================================================== */

.task-list {
    display: grid;

    gap: 14px;
}

.task-card {
    background: white;

    padding: 20px;

    border-radius: 18px;

    display: flex;

    align-items: center;

    gap: 15px;

    box-shadow: var(--shadow);

    border-left: 5px solid var(--purple);

    transition: 0.25s;
}

.task-card:hover {
    transform: translateX(3px);
}

.task-card.completed {
    opacity: 0.65;

    border-left-color: var(--green);
}

.task-checkbox {
    width: 22px;
    height: 22px;

    accent-color: var(--purple);

    cursor: pointer;
}

.task-info {
    flex: 1;
}

.task-info h3 {
    font-size: 16px;

    margin-bottom: 5px;
}

.task-card.completed h3 {
    text-decoration: line-through;
}

.task-meta {
    display: flex;

    flex-wrap: wrap;

    gap: 8px;
}

.task-meta span {
    font-size: 11px;

    padding: 5px 8px;

    border-radius: 20px;

    background: #f1f5f9;

    color: var(--gray);
}

.priority-high {
    color: #b91c1c !important;
    background: #fee2e2 !important;
}

.priority-medium {
    color: #b45309 !important;
    background: #fef3c7 !important;
}

.priority-low {
    color: #047857 !important;
    background: #d1fae5 !important;
}

.delete-button {
    border: none;

    width: 35px;
    height: 35px;

    border-radius: 10px;

    background: #fee2e2;

    color: #dc2626;

    cursor: pointer;

    transition: 0.2s;
}

.delete-button:hover {
    background: #fecaca;
}


/* =====================================================
   SCHEDULE
   ===================================================== */

.schedule-list {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(280px, 1fr));

    gap: 18px;
}

.schedule-card {
    background: white;

    padding: 22px;

    border-radius: 20px;

    box-shadow: var(--shadow);

    position: relative;

    overflow: hidden;
}

.schedule-card::before {
    content: "";

    position: absolute;

    left: 0;
    top: 0;
    bottom: 0;

    width: 5px;

    background:
        linear-gradient(
            180deg,
            var(--cyan),
            var(--blue)
        );
}

.schedule-time {
    font-size: 25px;

    font-weight: 800;

    color: var(--blue);

    margin-bottom: 8px;
}

.schedule-card h3 {
    margin-bottom: 8px;
}

.schedule-card p {
    color: var(--gray);

    font-size: 13px;
}

.schedule-delete {
    position: absolute;

    right: 15px;
    top: 15px;

    border: none;

    background: #fee2e2;

    color: #dc2626;

    border-radius: 8px;

    padding: 7px;

    cursor: pointer;
}


/* =====================================================
   TIMER
   ===================================================== */

.timer-container {
    background: white;

    border-radius: 25px;

    box-shadow: var(--shadow);

    padding: 45px;

    display: flex;
    flex-direction: column;

    align-items: center;

    text-align: center;
}

.timer-circle {
    width: 300px;
    height: 300px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
        conic-gradient(
            var(--purple),
            var(--pink),
            var(--orange),
            var(--purple)
        );

    box-shadow:
        0 20px 50px rgba(124, 58, 237, 0.25);
}

.timer-inner {
    width: 250px;
    height: 250px;

    border-radius: 50%;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    background: white;
}

.timer-inner span {
    color: var(--gray);

    font-size: 14px;
}

.timer-inner strong {
    font-size: 55px;

    margin-top: 5px;
}

.timer-controls {
    display: flex;

    gap: 10px;

    margin-top: 30px;
}

.timer-button {
    border: none;

    padding: 12px 20px;

    border-radius: 12px;

    cursor: pointer;

    font-weight: 700;
}

.timer-button.start {
    background: #d1fae5;
    color: #047857;
}

.timer-button.pause {
    background: #fef3c7;
    color: #b45309;
}

.timer-button.reset {
    background: #fee2e2;
    color: #b91c1c;
}

.timer-presets {
    display: flex;

    gap: 8px;

    margin-top: 20px;
}

.timer-presets button {
    border: 1px solid #e2e8f0;

    background: white;

    padding: 8px 15px;

    border-radius: 20px;

    cursor: pointer;
}


/* =====================================================
   NOTES
   ===================================================== */

.notes-container {
    background: white;

    border-radius: 20px;

    padding: 20px;

    box-shadow: var(--shadow);
}

#notesArea {
    width: 100%;

    min-height: 450px;

    resize: vertical;

    border: none;

    outline: none;

    font-family: inherit;

    font-size: 16px;

    line-height: 1.7;

    color: var(--dark);
}

.notes-footer {
    border-top: 1px solid #e2e8f0;

    padding-top: 15px;

    display: flex;

    justify-content: space-between;

    color: var(--gray);

    font-size: 12px;
}


/* =====================================================
   MODALS
   ===================================================== */

.modal {
    position: fixed;

    inset: 0;

    background: rgba(15, 23, 42, 0.65);

    display: none;

    align-items: center;
    justify-content: center;

    padding: 20px;

    z-index: 100;
}

.modal.show {
    display: flex;
}

.modal-card {
    width: 100%;

    max-width: 600px;

    background: white;

    padding: 30px;

    border-radius: 22px;

    position: relative;

    box-shadow:
        0 30px 80px rgba(0,0,0,0.3);

    animation: modalAppear 0.25s ease;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-card h2 {
    margin-bottom: 25px;
}

.close-modal {
    position: absolute;

    right: 20px;
    top: 15px;

    border: none;

    background: #f1f5f9;

    width: 35px;
    height: 35px;

    border-radius: 50%;

    font-size: 22px;

    cursor: pointer;
}

.form-row {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 15px;
}

.form-group {
    margin-bottom: 18px;
}

.form-group input,
.form-group select {
    width: 100%;

    padding: 13px;

    border: 2px solid #e2e8f0;

    border-radius: 12px;

    outline: none;

    font-family: inherit;

    background: white;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--purple);

    box-shadow:
        0 0 0 4px rgba(124,58,237,0.08);
}


/* =====================================================
   EMPTY STATE
   ===================================================== */

.empty-state {
    background: white;

    border-radius: 20px;

    padding: 50px 20px;

    text-align: center;

    box-shadow: var(--shadow);

    color: var(--gray);
}

.empty-state .empty-icon {
    font-size: 50px;

    margin-bottom: 10px;
}

.empty-state h3 {
    color: var(--dark);

    margin-bottom: 5px;
}


/* =====================================================
   RESPONSIVE
   ===================================================== */

@media (max-width: 1100px) {

    .stats-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}


@media (max-width: 800px) {

    .sidebar {
        width: 80px;

        padding: 20px 10px;
    }

    .sidebar-logo h2,
    .student-mini-card div:not(.avatar),
    .nav-item:not(.active)::after,
    .nav-item {
        font-size: 0;
    }

    .sidebar-logo {
        justify-content: center;
    }

    .sidebar-logo span {
        font-size: 25px;
    }

    .student-mini-card {
        justify-content: center;
    }

    .nav-item {
        justify-content: center;

        font-size: 20px;
    }

    .nav-item span {
        font-size: 20px;
    }

    .logout-button {
        font-size: 0;
    }

    .logout-button::before {
        content: "🚪";

        font-size: 20px;
    }

    .main-content {
        margin-left: 80px;

        width: calc(100% - 80px);

        padding: 20px;
    }

    .hero-banner {
        padding: 25px;
    }

    .hero-emoji {
        font-size: 60px;
    }
}


@media (max-width: 600px) {

    .login-card {
        padding: 30px 22px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .topbar {
        flex-direction: column;

        align-items: flex-start;

        gap: 12px;
    }

    .hero-banner {
        flex-direction: column;

        align-items: flex-start;
    }

    .hero-banner h2 {
        font-size: 24px;
    }

    .hero-emoji {
        align-self: center;
    }

    .section-heading {
        flex-direction: column;

        align-items: flex-start;

        gap: 15px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .timer-circle {
        width: 250px;
        height: 250px;
    }

    .timer-inner {
        width: 210px;
        height: 210px;
    }

    .timer-inner strong {
        font-size: 43px;
    }

    .timer-controls {
        flex-wrap: wrap;

        justify-content: center;
    }

    .notes-footer {
        flex-direction: column;

        gap: 8px;
    }
}
