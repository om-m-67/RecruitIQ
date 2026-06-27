/* ==========================================================
   RecruitIQ — API Client
   Aligned with backend Mongoose schemas.
   Base URL is read from config; all calls return Promises.
========================================================== */

const API_BASE = "http://localhost:5000/api"; // change for production

/* ── Generic fetch wrapper ── */
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("riq_token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

/* ==========================================================
   AUTH  —  /api/auth
========================================================== */
const Auth = {

  /**
   * POST /api/auth/register
   * Body: { role, firstName, lastName, email, password, phone }
   */
  register(payload) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * POST /api/auth/login
   * Body: { email, password }
   * Returns: { token, user }
   */
  login(email, password) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * POST /api/auth/forgot-password
   * Body: { email }
   */
  forgotPassword(email) {
    return apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  /**
   * POST /api/auth/reset-password
   * Body: { token, newPassword }
   */
  resetPassword(token, newPassword) {
    return apiFetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    });
  },

  /** Save token + basic user to localStorage after login */
  saveSession(token, user) {
    localStorage.setItem("riq_token", token);
    localStorage.setItem("riq_user", JSON.stringify(user));
  },

  /** Clear session on logout */
  clearSession() {
    localStorage.removeItem("riq_token");
    localStorage.removeItem("riq_user");
  },

  /** Get current logged-in user from localStorage */
  getUser() {
    try {
      return JSON.parse(localStorage.getItem("riq_user")) || null;
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!localStorage.getItem("riq_token");
  },
};

/* ==========================================================
   USERS  —  /api/users
========================================================== */
const Users = {

  /** GET /api/users  — admin only */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/users${qs ? "?" + qs : ""}`);
  },

  /** GET /api/users/:id */
  getById(id) {
    return apiFetch(`/users/${id}`);
  },

  /** PATCH /api/users/:id
   * Editable fields from User schema:
   * { firstName, lastName, phone, profileImage, isActive }
   */
  update(id, payload) {
    return apiFetch(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** DELETE /api/users/:id  — admin only */
  delete(id) {
    return apiFetch(`/users/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   CANDIDATE PROFILE  —  /api/candidate/profile
   Maps to CandidateProfile schema
========================================================== */
const CandidateProfile = {

  /** GET /api/candidate/profile  — own profile */
  get() {
    return apiFetch("/candidate/profile");
  },

  /**
   * PUT /api/candidate/profile
   * Full profile update — any subset of CandidateProfile fields:
   * headline, summary, dateOfBirth, gender, phone, socialLinks,
   * address, currentJobTitle, currentCompany, experienceLevel,
   * totalExperience, skills, languages, education, workExperience,
   * projects, certifications, jobPreferences, availability
   */
  update(payload) {
    return apiFetch("/candidate/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /** POST /api/candidate/profile/resume  (multipart) */
  uploadResume(formData) {
    const token = localStorage.getItem("riq_token");
    return fetch(`${API_BASE}/candidate/profile/resume`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }).then((r) => r.json());
  },

  /** DELETE /api/candidate/profile/resume */
  deleteResume() {
    return apiFetch("/candidate/profile/resume", { method: "DELETE" });
  },
};

/* ==========================================================
   JOBS  —  /api/jobs
   Maps to Job schema
========================================================== */
const Jobs = {

  /**
   * GET /api/jobs
   * Query params: status, workMode, employmentType, city, country,
   *               experienceMin, experienceMax, search, page, limit
   */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/jobs${qs ? "?" + qs : ""}`);
  },

  /** GET /api/jobs/:id */
  getById(id) {
    return apiFetch(`/jobs/${id}`);
  },

  /**
   * POST /api/jobs  — recruiter/admin only
   * Required fields from Job schema:
   * { title, company, employmentType, workMode, experience, vacancies, description }
   * Optional: department, location, salary, responsibilities, requirements,
   *           requiredSkills, preferredSkills, educationRequirement,
   *           benefits, screeningQuestions, applicationDeadline, status }
   */
  create(payload) {
    return apiFetch("/jobs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/jobs/:id  — same fields as create, all optional
   */
  update(id, payload) {
    return apiFetch(`/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/jobs/:id/status
   * Body: { status }  — "Draft" | "Open" | "Paused" | "Closed" | "Expired"
   */
  updateStatus(id, status) {
    return apiFetch(`/jobs/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** DELETE /api/jobs/:id  — soft-delete (sets isDeleted: true) */
  delete(id) {
    return apiFetch(`/jobs/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   APPLICATIONS  —  /api/applications
   Maps to Application schema
========================================================== */
const Applications = {

  /**
   * POST /api/applications/:jobId
   * Body: full application snapshot from Application schema —
   * { coverLetter, screeningAnswers, resume (if overriding profile) }
   * Candidate's CandidateProfile data is merged on the backend.
   */
  apply(jobId, payload) {
    return apiFetch(`/applications/${jobId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** GET /api/applications  — candidate sees own; recruiter sees their jobs */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/applications${qs ? "?" + qs : ""}`);
  },

  /** GET /api/applications/:id */
  getById(id) {
    return apiFetch(`/applications/${id}`);
  },

  /**
   * PATCH /api/applications/:id/status  — recruiter/admin only
   * Body: { status }
   * Enum: "Applied" | "Under Review" | "Shortlisted" |
   *       "Interview Scheduled" | "Interviewing" | "Selected" |
   *       "Offered" | "Hired" | "Rejected" | "Withdrawn"
   */
  updateStatus(id, status) {
    return apiFetch(`/applications/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** POST /api/applications/:id/withdraw  — candidate only */
  withdraw(id) {
    return apiFetch(`/applications/${id}/withdraw`, { method: "POST" });
  },

  /** DELETE /api/applications/:id  — soft-delete */
  delete(id) {
    return apiFetch(`/applications/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   COMPANIES  —  /api/companies
   Maps to Company schema
========================================================== */
const Companies = {

  /** GET /api/companies  — public + admin */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/companies${qs ? "?" + qs : ""}`);
  },

  /** GET /api/companies/:id */
  getById(id) {
    return apiFetch(`/companies/${id}`);
  },

  /**
   * POST /api/companies  — admin only
   * Required: { name, industry, owner }
   * Optional: legalName, tagline, description, companyType,
   *           specializations, website, careersPage, companyEmail,
   *           phone, address, companySize, foundedYear,
   *           socialLinks, subscriptionPlan
   */
  create(payload) {
    return apiFetch("/companies", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/companies/:id
   * Same optional fields as create
   */
  update(id, payload) {
    return apiFetch(`/companies/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** DELETE /api/companies/:id  — soft-delete */
  delete(id) {
    return apiFetch(`/companies/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   INTERVIEWS  —  /api/interviews
   Maps to Interview schema
========================================================== */
const Interviews = {

  /** GET /api/interviews  — filtered by user role */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/interviews${qs ? "?" + qs : ""}`);
  },

  /** GET /api/interviews/:id */
  getById(id) {
    return apiFetch(`/interviews/${id}`);
  },

  /**
   * POST /api/interviews  — recruiter only
   * Required from Interview schema:
   * { application, roundNumber, roundName, interviewType, interviewMode,
   *   schedule: { startDateTime, endDateTime }, interviewers }
   * Optional: meeting, location
   */
  schedule(payload) {
    return apiFetch("/interviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/interviews/:id
   * Update schedule, interviewers, meeting link, etc.
   */
  update(id, payload) {
    return apiFetch(`/interviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/interviews/:id/status
   * Body: { status }
   * Enum: "Scheduled" | "Rescheduled" | "Completed" |
   *       "Cancelled" | "No Show" | "Pending Feedback"
   */
  updateStatus(id, status) {
    return apiFetch(`/interviews/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /**
   * PATCH /api/interviews/:id/feedback  — interviewer only
   * Body: { feedback: { rating, comments, recommendation }, result }
   * recommendation enum: "Strong Hire" | "Hire" | "Hold" | "No Hire" | "Strong No Hire"
   * result enum: "Passed" | "Failed" | "Hold" | "Next Round"
   */
  submitFeedback(id, payload) {
    return apiFetch(`/interviews/${id}/feedback`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/interviews/:id/confirm  — candidate only
   * Body: { candidateConfirmation }  — "Accepted" | "Declined"
   */
  confirm(id, decision) {
    return apiFetch(`/interviews/${id}/confirm`, {
      method: "PATCH",
      body: JSON.stringify({ candidateConfirmation: decision }),
    });
  },
};

/* ==========================================================
   NOTES  —  /api/notes
   Maps to Note schema
========================================================== */
const Notes = {

  /** GET /api/notes?applicationId=:id */
  getByApplication(applicationId) {
    return apiFetch(`/notes?applicationId=${applicationId}`);
  },

  /**
   * POST /api/notes
   * Required: { application, content }
   * Optional: { interview, title,
   *             visibility: "Internal" | "Hiring Team" | "Admin Only" }
   */
  create(payload) {
    return apiFetch("/notes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * PATCH /api/notes/:id
   * Editable: { title, content, visibility }
   */
  update(id, payload) {
    return apiFetch(`/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** DELETE /api/notes/:id  — soft-delete */
  delete(id) {
    return apiFetch(`/notes/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   NOTIFICATIONS  —  /api/notifications
   Maps to Notification schema
========================================================== */
const Notifications = {

  /**
   * GET /api/notifications
   * Returns notifications for the logged-in user.
   * Query: { isRead, notificationType, page, limit }
   */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/notifications${qs ? "?" + qs : ""}`);
  },

  /** PATCH /api/notifications/:id/read  — marks one as read */
  markRead(id) {
    return apiFetch(`/notifications/${id}/read`, { method: "PATCH" });
  },

  /** PATCH /api/notifications/read-all  — marks all as read */
  markAllRead() {
    return apiFetch("/notifications/read-all", { method: "PATCH" });
  },

  /** DELETE /api/notifications/:id */
  delete(id) {
    return apiFetch(`/notifications/${id}`, { method: "DELETE" });
  },
};

/* ==========================================================
   ACTIVITY LOG  —  /api/activity  (admin only)
   Maps to ActivityLog schema
========================================================== */
const ActivityLog = {

  /**
   * GET /api/activity
   * Query: { activityType, action, userId, page, limit }
   * activityType enum: "Authentication" | "Profile" | "Company" |
   *   "Job" | "Application" | "Interview" | "Note" | "Notification" | "System"
   * action enum: "Created" | "Updated" | "Deleted" | "Applied" |
   *   "Scheduled" | "Rescheduled" | "Completed" | "Cancelled" |
   *   "Accepted" | "Rejected" | "Viewed" | "Downloaded" | "Uploaded" |
   *   "Login" | "Logout" | "Password Changed"
   */
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/activity${qs ? "?" + qs : ""}`);
  },
};
