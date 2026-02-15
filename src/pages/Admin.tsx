import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AdminEntity,
  AdminManagedUser,
  AdminSessionUser,
  adminBulkAction,
  adminCreate,
  adminCreateUser,
  adminDelete,
  adminExportCareerApplicationsCsv,
  adminExportEventRegistrationsCsv,
  adminExportSubscribersCsv,
  adminList,
  adminListUsers,
  adminLogin,
  adminLogout,
  adminMe,
  adminUpdate,
  adminUpdateUser,
  adminUploadImage,
} from "@/lib/api";

const ADMIN_TOKEN_KEY = "jukwaa_admin_token";
type AdminSection = AdminEntity | "users";

type Option = { label: string; value: string };
type DatePreset = "all" | "today" | "this-month" | "last-30-days" | "custom";
type FieldType = "text" | "textarea" | "number" | "date" | "datetime-local" | "url" | "select" | "checkbox";
type FieldConfig = { name: string; label: string; type: FieldType; required?: boolean; options?: Option[] };
type EntityConfig = { label: string; summaryKey: string; imageField?: string; fields: FieldConfig[]; defaults: Record<string, unknown>; readOnly?: boolean };

const ENTITY_CONFIG: Record<AdminEntity, EntityConfig> = {
  blogs: {
    label: "Posts",
    summaryKey: "title",
    imageField: "coverImageUrl",
    defaults: { title: "", slug: "", excerpt: "", content: "", coverImageUrl: "", authorName: "", status: "draft", contentType: "news", publishedAt: "" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "authorName", label: "Author", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: [{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }, { label: "Archived", value: "archived" }] },
      { name: "contentType", label: "Type", type: "select", options: [{ label: "News", value: "news" }, { label: "Blog", value: "blog" }, { label: "Story", value: "story" }] },
      { name: "coverImageUrl", label: "Cover Image URL", type: "url" },
      { name: "publishedAt", label: "Published At", type: "datetime-local" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content", type: "textarea", required: true },
    ],
  },
  resources: {
    label: "Resources",
    summaryKey: "title",
    defaults: { title: "", slug: "", description: "", category: "", fileName: "", fileUrl: "", fileSizeBytes: 0, language: "English", publishedYear: new Date().getFullYear(), isPublished: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "fileName", label: "File Name", type: "text", required: true },
      { name: "fileUrl", label: "File URL", type: "url", required: true },
      { name: "fileSizeBytes", label: "File Size", type: "number" },
      { name: "language", label: "Language", type: "text" },
      { name: "publishedYear", label: "Year", type: "number" },
      { name: "isPublished", label: "Published", type: "checkbox" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  careers: {
    label: "Careers",
    summaryKey: "title",
    imageField: "coverImageUrl",
    defaults: { title: "", referenceNumber: "", coverImageUrl: "", department: "", location: "", employmentType: "full-time", description: "", requirements: "", applicationUrl: "", deadline: "", status: "open" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "referenceNumber", label: "Reference Number", type: "text", required: true },
      { name: "coverImageUrl", label: "Cover Image URL", type: "url" },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "employmentType", label: "Employment Type", type: "select", options: [{ label: "Full-time", value: "full-time" }, { label: "Part-time", value: "part-time" }, { label: "Contract", value: "contract" }, { label: "Internship", value: "internship" }, { label: "Volunteer", value: "volunteer" }] },
      { name: "deadline", label: "Deadline", type: "date" },
      { name: "status", label: "Status", type: "select", options: [{ label: "Open", value: "open" }, { label: "Closed", value: "closed" }, { label: "Paused", value: "paused" }] },
      { name: "applicationUrl", label: "Application URL", type: "url" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "requirements", label: "Requirements", type: "textarea" },
    ],
  },
  events: {
    label: "Events",
    summaryKey: "title",
    imageField: "coverImageUrl",
    defaults: { title: "", slug: "", description: "", coverImageUrl: "", venue: "", isVirtual: false, startAt: "", endAt: "", registrationUrl: "", capacity: 0, status: "scheduled" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "coverImageUrl", label: "Cover Image URL", type: "url" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "isVirtual", label: "Virtual", type: "checkbox" },
      { name: "startAt", label: "Start At", type: "datetime-local", required: true },
      { name: "endAt", label: "End At", type: "datetime-local" },
      { name: "registrationUrl", label: "Registration URL", type: "url" },
      { name: "capacity", label: "Capacity", type: "number" },
      { name: "status", label: "Status", type: "select", options: [{ label: "Scheduled", value: "scheduled" }, { label: "Cancelled", value: "cancelled" }, { label: "Completed", value: "completed" }] },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  ads: {
    label: "Advertisements",
    summaryKey: "title",
    imageField: "imageUrl",
    defaults: { title: "", imageUrl: "", targetUrl: "", altText: "", placement: "homepage-sidebar", isActive: true, startsAt: "", endsAt: "" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "imageUrl", label: "Image URL", type: "url", required: true },
      { name: "targetUrl", label: "Target URL", type: "url" },
      { name: "altText", label: "Alt Text", type: "text" },
      { name: "placement", label: "Placement", type: "select", options: [{ label: "Homepage Sidebar", value: "homepage-sidebar" }] },
      { name: "isActive", label: "Active", type: "checkbox" },
      { name: "startsAt", label: "Starts At", type: "date" },
      { name: "endsAt", label: "Ends At", type: "date" },
    ],
  },
  "team-members": {
    label: "Team Members",
    summaryKey: "name",
    imageField: "imageUrl",
    defaults: { name: "", role: "", imageUrl: "", bio: "", order: 0, isActive: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "imageUrl", label: "Image URL", type: "url" },
      { name: "order", label: "Display Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" },
      { name: "bio", label: "Bio", type: "textarea" },
    ],
  },
  videos: {
    label: "Videos",
    summaryKey: "title",
    defaults: { title: "", videoUrl: "", thumbnailUrl: "", description: "", order: 0, isActive: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "videoUrl", label: "Video URL", type: "url", required: true },
      { name: "thumbnailUrl", label: "Thumbnail URL", type: "url" },
      { name: "order", label: "Display Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  "gallery-items": {
    label: "Gallery",
    summaryKey: "title",
    imageField: "imageUrl",
    defaults: { title: "", imageUrl: "", caption: "", order: 0, isActive: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "imageUrl", label: "Image URL", type: "url", required: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "order", label: "Display Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
  },
  subscriptions: {
    label: "Subscribers",
    summaryKey: "email",
    readOnly: true,
    defaults: {},
    fields: [],
  },
  "event-registrations": {
    label: "Event Registrations",
    summaryKey: "fullName",
    readOnly: true,
    defaults: {},
    fields: [],
  },
  "career-applications": {
    label: "Applicants",
    summaryKey: "fullName",
    readOnly: true,
    defaults: {},
    fields: [],
  },
};

const USER_DEFAULTS = { name: "", email: "", role: "user", isActive: true, password: "" };

function toYmd(date: Date) {
  return date.toISOString().slice(0, 10);
}

function applyDatePreset(
  preset: DatePreset,
  setFrom: (value: string) => void,
  setTo: (value: string) => void
) {
  const now = new Date();
  if (preset === "all" || preset === "custom") {
    setFrom("");
    setTo("");
    return;
  }
  if (preset === "today") {
    const today = toYmd(now);
    setFrom(today);
    setTo(today);
    return;
  }
  if (preset === "this-month") {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    setFrom(toYmd(firstDay));
    setTo(toYmd(now));
    return;
  }
  const last30 = new Date(now);
  last30.setDate(last30.getDate() - 29);
  setFrom(toYmd(last30));
  setTo(toYmd(now));
}

function toDateInput(value: unknown) {
  if (!value) return "";
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}
function toDateTimeLocalInput(value: unknown) {
  if (!value) return "";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function normalizeFormData(entity: AdminEntity, item?: Record<string, unknown>) {
  const config = ENTITY_CONFIG[entity];
  const base = { ...config.defaults };
  if (!item) return base;
  config.fields.forEach((field) => {
    const value = item[field.name];
    if (value === undefined || value === null) return;
    if (field.type === "date") base[field.name] = toDateInput(value);
    else if (field.type === "datetime-local") base[field.name] = toDateTimeLocalInput(value);
    else if (field.type === "checkbox") base[field.name] = Boolean(value);
    else base[field.name] = value;
  });
  return base;
}

function payloadFromForm(entity: AdminEntity, formData: Record<string, unknown>) {
  const config = ENTITY_CONFIG[entity];
  const payload: Record<string, unknown> = {};
  config.fields.forEach((field) => {
    const value = formData[field.name];
    if (field.type === "checkbox") payload[field.name] = Boolean(value);
    else if (value === "" || value === null || value === undefined) return;
    else if (field.type === "number") {
      const n = Number(value);
      if (!Number.isNaN(n)) payload[field.name] = n;
    } else if (field.type === "date" || field.type === "datetime-local") payload[field.name] = new Date(String(value)).toISOString();
    else payload[field.name] = value;
  });
  return payload;
}

function getStatus(entity: AdminEntity, item: Record<string, unknown>) {
  if (entity === "resources") return Boolean(item.isPublished) ? "published" : "unpublished";
  if (entity === "ads") return Boolean(item.isActive) ? "active" : "inactive";
  if (entity === "team-members") return Boolean(item.isActive) ? "active" : "inactive";
  if (entity === "videos") return Boolean(item.isActive) ? "active" : "inactive";
  if (entity === "gallery-items") return Boolean(item.isActive) ? "active" : "inactive";
  return String(item.status || "-");
}

const Admin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AdminSessionUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("blogs");

  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, unknown>>(normalizeFormData("blogs"));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const [users, setUsers] = useState<AdminManagedUser[]>([]);
  const [userForm, setUserForm] = useState<Record<string, unknown>>({ ...USER_DEFAULTS });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [subscriberFrom, setSubscriberFrom] = useState("");
  const [subscriberTo, setSubscriberTo] = useState("");
  const [subscriberPreset, setSubscriberPreset] = useState<DatePreset>("all");
  const [registrationFrom, setRegistrationFrom] = useState("");
  const [registrationTo, setRegistrationTo] = useState("");
  const [registrationPreset, setRegistrationPreset] = useState<DatePreset>("all");
  const [applicantFrom, setApplicantFrom] = useState("");
  const [applicantTo, setApplicantTo] = useState("");
  const [applicantPreset, setApplicantPreset] = useState<DatePreset>("all");

  const isUsersSection = activeSection === "users";
  const isAdmin = currentUser?.role === "admin";
  const contentEntity = (isUsersSection ? "blogs" : activeSection) as AdminEntity;
  const config = useMemo(() => ENTITY_CONFIG[contentEntity], [contentEntity]);
  const isReadOnlySection = config.readOnly === true;
  const totalCount = isUsersSection ? users.length : items.length;

  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!saved) return;
    adminMe(saved)
      .then((me) => {
        setToken(saved);
        setCurrentUser(me);
      })
      .catch(() => localStorage.removeItem(ADMIN_TOKEN_KEY));
  }, []);

  useEffect(() => {
    setSelectedIds([]);
    setEditingId(null);
    setFormData(normalizeFormData(contentEntity));
    setUploadFile(null);
    setEditingUserId(null);
    setUserForm({ ...USER_DEFAULTS });
    setError(null);
    setInfo(null);
  }, [activeSection, contentEntity]);

  useEffect(() => {
    if (!token || isUsersSection) return;
    let cancelled = false;
    setIsLoading(true);
    adminList<Record<string, unknown>>(contentEntity, token)
      .then((data) => !cancelled && setItems(data))
      .catch((err: Error) => !cancelled && setError(err.message || "Failed loading content"))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [token, contentEntity, isSaving, isUsersSection]);

  useEffect(() => {
    if (!token || !isUsersSection || !isAdmin) return;
    let cancelled = false;
    setIsLoading(true);
    adminListUsers(token)
      .then((data) => !cancelled && setUsers(data))
      .catch((err: Error) => !cancelled && setError(err.message || "Failed loading users"))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [token, isUsersSection, isAdmin, isSaving]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setCurrentUser(data.user);
      setPassword("");
      setInfo(`Welcome ${data.user.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const onLogout = async () => {
    if (token) {
      try {
        await adminLogout(token);
      } catch (_error) {
        // Ignore and clear local session.
      }
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setCurrentUser(null);
  };

  const onNewContent = () => {
    if (isReadOnlySection) return;
    setEditingId(null);
    setFormData(normalizeFormData(contentEntity));
    setUploadFile(null);
    setInfo("New content form ready");
  };

  const onEditContent = (item: Record<string, unknown>) => {
    if (isReadOnlySection) return;
    setEditingId(String(item._id || ""));
    setFormData(normalizeFormData(contentEntity, item));
    setUploadFile(null);
    setInfo("Editing content");
  };

  const onDeleteContent = async (id: string) => {
    if (isReadOnlySection) return;
    if (!token) return;
    if (!window.confirm("Delete this item?")) return;
    setIsSaving(true);
    try {
      await adminDelete(contentEntity, id, token);
      setInfo("Deleted");
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      if (editingId === id) onNewContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onBulk = async (action: "publish" | "unpublish" | "delete") => {
    if (isReadOnlySection) return;
    if (!token || selectedIds.length === 0) return;
    if (action === "delete" && !window.confirm(`Delete ${selectedIds.length} items?`)) return;
    setIsSaving(true);
    try {
      const data = await adminBulkAction(contentEntity, selectedIds, action, token);
      setInfo(`Updated ${data.affectedCount} items`);
      setSelectedIds([]);
      if (editingId && selectedIds.includes(editingId)) onNewContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk action failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || isReadOnlySection) return;
    const formEl = event.currentTarget;

    const payload: Record<string, unknown> = {};
    const missingRequired: string[] = [];
    config.fields.forEach((field) => {
      const control = formEl.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      const fallbackValue = formData[field.name];

      if (field.type === "checkbox") {
        const checked = control ? (control as HTMLInputElement).checked : Boolean(fallbackValue);
        payload[field.name] = checked;
        return;
      }

      const rawValue = control ? control.value : String(fallbackValue ?? "");
      const value = String(rawValue ?? "").trim();

      if (field.required && !value) {
        missingRequired.push(field.label);
        return;
      }

      if (!value) return;

      if (field.type === "number") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) payload[field.name] = parsed;
        return;
      }

      if (field.type === "date" || field.type === "datetime-local") {
        payload[field.name] = new Date(value).toISOString();
        return;
      }

      payload[field.name] = value;
    });

    if (missingRequired.length > 0) {
      setError(`Please fill required fields: ${missingRequired.join(", ")}`);
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) await adminUpdate(contentEntity, editingId, payload, token);
      else await adminCreate(contentEntity, payload, token);
      onNewContent();
      setInfo(editingId ? "Updated" : "Created");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onUpload = async () => {
    if (!token || isReadOnlySection || !config.imageField || !uploadFile) return;
    setIsUploading(true);
    try {
      const data = await adminUploadImage(uploadFile, token);
      setFormData((prev) => ({ ...prev, [config.imageField as string]: data.fileUrl }));
      setUploadFile(null);
      setInfo("Image uploaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const onEditUser = (user: AdminManagedUser) => {
    setEditingUserId(user._id);
    setUserForm({ name: user.name, email: user.email, role: user.role, isActive: user.isActive, password: "" });
    setInfo("Editing user");
  };

  const onNewUser = () => {
    setEditingUserId(null);
    setUserForm({ ...USER_DEFAULTS });
    setInfo("New user form ready");
  };

  const onSaveUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!token || !isAdmin) return;
    setIsSaving(true);
    try {
      const payload = {
        name: String(userForm.name || "").trim(),
        email: String(userForm.email || "").trim(),
        role: (String(userForm.role || "user") === "admin" ? "admin" : "user") as "admin" | "user",
        isActive: Boolean(userForm.isActive),
        password: String(userForm.password || ""),
      };

      if (editingUserId) {
        const updatePayload: { name: string; email: string; role: "admin" | "user"; isActive: boolean; password?: string } = {
          name: payload.name,
          email: payload.email,
          role: payload.role,
          isActive: payload.isActive,
        };
        if (payload.password) updatePayload.password = payload.password;
        await adminUpdateUser(editingUserId, updatePayload, token);
      } else {
        await adminCreateUser(payload, token);
      }
      setInfo(editingUserId ? "User updated" : "User created");
      onNewUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : "User save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const onExportSubscribers = async () => {
    if (!token || !isAdmin) return;
    try {
      const blob = await adminExportSubscribersCsv(token, {
        from: subscriberFrom || undefined,
        to: subscriberTo || undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const labelFrom = subscriberFrom || "all";
      const labelTo = subscriberTo || "today";
      link.href = url;
      link.download = `subscribers-${labelFrom}_to_${labelTo}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setInfo("Subscribers CSV downloaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "CSV export failed");
    }
  };

  const onExportEventRegistrations = async () => {
    if (!token || !isAdmin) return;
    try {
      const blob = await adminExportEventRegistrationsCsv(token, {
        from: registrationFrom || undefined,
        to: registrationTo || undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const labelFrom = registrationFrom || "all";
      const labelTo = registrationTo || "today";
      link.href = url;
      link.download = `event-registrations-${labelFrom}_to_${labelTo}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setInfo("Event registrations CSV downloaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "CSV export failed");
    }
  };

  const onExportApplicants = async () => {
    if (!token || !isAdmin) return;
    try {
      const blob = await adminExportCareerApplicationsCsv(token, {
        from: applicantFrom || undefined,
        to: applicantTo || undefined,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const labelFrom = applicantFrom || "all";
      const labelTo = applicantTo || "today";
      link.href = url;
      link.download = `career-applications-${labelFrom}_to_${labelTo}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setInfo("Applicants CSV downloaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "CSV export failed");
    }
  };

  const toggleRow = (id: string) => setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () => {
    const ids = items.map((item) => String(item._id || "")).filter(Boolean);
    setSelectedIds(selectedIds.length === ids.length ? [] : ids);
  };

  const clearSubscriberRange = () => {
    setSubscriberPreset("all");
    setSubscriberFrom("");
    setSubscriberTo("");
  };

  const clearRegistrationRange = () => {
    setRegistrationPreset("all");
    setRegistrationFrom("");
    setRegistrationTo("");
  };

  const clearApplicantRange = () => {
    setApplicantPreset("all");
    setApplicantFrom("");
    setApplicantTo("");
  };

  if (!token) {
    return (
      <section className="bg-muted min-h-[calc(100vh-220px)] py-16">
        <div className="site-container max-w-lg">
          <div className="bg-background border rounded-xl p-8 shadow-card">
            <h1 className="text-2xl font-heading font-bold mb-2">Admin Login</h1>
            <form onSubmit={onLogin} className="space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" required />
              <button type="submit" className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold">Login</button>
            </form>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </div>
        </div>
      </section>
    );
  }

  const sections: Array<{ key: AdminSection; label: string }> = [
    { key: "blogs", label: "Posts" },
    { key: "resources", label: "Resources" },
    { key: "careers", label: "Careers" },
    { key: "events", label: "Events" },
    { key: "ads", label: "Advertisements" },
    { key: "team-members", label: "Team Members" },
    { key: "videos", label: "Videos" },
    { key: "gallery-items", label: "Gallery" },
    { key: "subscriptions", label: "Subscribers" },
    { key: "event-registrations", label: "Event Registrations" },
    { key: "career-applications", label: "Applicants" },
    ...(isAdmin ? [{ key: "users" as AdminSection, label: "Users" }] : []),
  ];

  return (
    <section className="bg-[#f0f2f5] min-h-screen py-6">
      <div className="site-container">
        <div className="grid lg:grid-cols-[250px_1fr] gap-6">
          <aside className="bg-[#1e1e2f] text-white rounded-xl p-4 h-fit lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-wider text-white/60 mb-3">Dashboard</p>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.key ? "bg-white text-[#1e1e2f] font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-white/20 pt-3 text-xs text-white/70">
              <p>{currentUser?.name}</p>
              <p className="uppercase">{currentUser?.role}</p>
              <button type="button" onClick={onLogout} className="mt-3 text-left underline">Logout</button>
            </div>
          </aside>

          <div className="space-y-4">
            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-primary">{info}</p>}

            {!isUsersSection && (
              <>
                <div className="bg-white rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h2 className="font-heading font-semibold">{config.label}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Total: {totalCount}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {isReadOnlySection && contentEntity === "subscriptions" && isAdmin && (
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={subscriberPreset}
                            onChange={(e) => {
                              const preset = e.target.value as DatePreset;
                              setSubscriberPreset(preset);
                              applyDatePreset(preset, setSubscriberFrom, setSubscriberTo);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="Date preset"
                          >
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="this-month">This Month</option>
                            <option value="last-30-days">Last 30 Days</option>
                            <option value="custom">Custom</option>
                          </select>
                          <input
                            type="date"
                            value={subscriberFrom}
                            onChange={(e) => {
                              setSubscriberPreset("custom");
                              setSubscriberFrom(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="From date"
                          />
                          <input
                            type="date"
                            value={subscriberTo}
                            onChange={(e) => {
                              setSubscriberPreset("custom");
                              setSubscriberTo(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="To date"
                          />
                          <button type="button" onClick={clearSubscriberRange} className="rounded-md border px-2 py-1.5 text-xs">Clear</button>
                          <button type="button" onClick={onExportSubscribers} className="rounded-md border px-3 py-1.5 text-xs">Export CSV</button>
                        </div>
                      )}
                      {isReadOnlySection && contentEntity === "event-registrations" && isAdmin && (
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={registrationPreset}
                            onChange={(e) => {
                              const preset = e.target.value as DatePreset;
                              setRegistrationPreset(preset);
                              applyDatePreset(preset, setRegistrationFrom, setRegistrationTo);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="Date preset"
                          >
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="this-month">This Month</option>
                            <option value="last-30-days">Last 30 Days</option>
                            <option value="custom">Custom</option>
                          </select>
                          <input
                            type="date"
                            value={registrationFrom}
                            onChange={(e) => {
                              setRegistrationPreset("custom");
                              setRegistrationFrom(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="From date"
                          />
                          <input
                            type="date"
                            value={registrationTo}
                            onChange={(e) => {
                              setRegistrationPreset("custom");
                              setRegistrationTo(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="To date"
                          />
                          <button type="button" onClick={clearRegistrationRange} className="rounded-md border px-2 py-1.5 text-xs">Clear</button>
                          <button type="button" onClick={onExportEventRegistrations} className="rounded-md border px-3 py-1.5 text-xs">Export CSV</button>
                        </div>
                      )}
                      {isReadOnlySection && contentEntity === "career-applications" && isAdmin && (
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={applicantPreset}
                            onChange={(e) => {
                              const preset = e.target.value as DatePreset;
                              setApplicantPreset(preset);
                              applyDatePreset(preset, setApplicantFrom, setApplicantTo);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="Date preset"
                          >
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="this-month">This Month</option>
                            <option value="last-30-days">Last 30 Days</option>
                            <option value="custom">Custom</option>
                          </select>
                          <input
                            type="date"
                            value={applicantFrom}
                            onChange={(e) => {
                              setApplicantPreset("custom");
                              setApplicantFrom(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="From date"
                          />
                          <input
                            type="date"
                            value={applicantTo}
                            onChange={(e) => {
                              setApplicantPreset("custom");
                              setApplicantTo(e.target.value);
                            }}
                            className="rounded-md border px-2 py-1.5 text-xs"
                            aria-label="To date"
                          />
                          <button type="button" onClick={clearApplicantRange} className="rounded-md border px-2 py-1.5 text-xs">Clear</button>
                          <button type="button" onClick={onExportApplicants} className="rounded-md border px-3 py-1.5 text-xs">Export CSV</button>
                        </div>
                      )}
                      {!isReadOnlySection && (
                        <>
                          <button type="button" onClick={() => onBulk("publish")} disabled={selectedIds.length === 0 || isSaving} className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-60">Publish</button>
                          <button type="button" onClick={() => onBulk("unpublish")} disabled={selectedIds.length === 0 || isSaving} className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-60">Unpublish</button>
                          <button type="button" onClick={() => onBulk("delete")} disabled={selectedIds.length === 0 || isSaving} className="rounded-md border px-3 py-1.5 text-xs text-destructive disabled:opacity-60">Delete</button>
                          <button type="button" onClick={onNewContent} className="rounded-md border px-3 py-1.5 text-xs">New</button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="overflow-auto rounded-lg border">
                    <table className="w-full text-sm bg-white">
                      <thead className="bg-muted/60">
                        <tr>
                          <th className="px-3 py-2">{!isReadOnlySection && <input type="checkbox" checked={items.length > 0 && selectedIds.length === items.length} onChange={toggleAll} />}</th>
                          <th className="px-3 py-2 text-left">Title</th>
                          <th className="px-3 py-2 text-left">Status</th>
                          <th className="px-3 py-2 text-left">Updated</th>
                          <th className="px-3 py-2 text-left">{isReadOnlySection ? "Source" : "Actions"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr><td colSpan={5} className="px-3 py-4 text-muted-foreground">Loading...</td></tr>
                        ) : items.length === 0 ? (
                          <tr><td colSpan={5} className="px-3 py-4 text-muted-foreground">No content yet.</td></tr>
                        ) : (
                          items.map((item) => {
                            const id = String(item._id || "");
                            const title = String(item[config.summaryKey] || item.title || item.slug || "Untitled");
                            return (
                              <tr key={id} className="border-t">
                                <td className="px-3 py-2">{!isReadOnlySection && <input type="checkbox" checked={selectedIds.includes(id)} onChange={() => toggleRow(id)} />}</td>
                                <td className="px-3 py-2">{title}</td>
                                <td className="px-3 py-2 capitalize">{getStatus(contentEntity, item)}</td>
                                <td className="px-3 py-2 text-muted-foreground">{String(item.updatedAt || "").slice(0, 10) || "-"}</td>
                                <td className="px-3 py-2">
                                  {isReadOnlySection ? (
                                    <span className="text-xs text-muted-foreground">
                                      {contentEntity === "subscriptions"
                                        ? String(item.source || "website")
                                        : contentEntity === "event-registrations"
                                          ? String(item.eventSlug || item.eventTitle || "-")
                                          : contentEntity === "career-applications"
                                            ? String(item.careerReferenceNumber || item.careerTitle || "-")
                                          : "website"}
                                    </span>
                                  ) : (
                                    <div className="flex gap-2">
                                      <button type="button" onClick={() => onEditContent(item)} className="text-xs rounded-md border px-2 py-1">Edit</button>
                                      <button type="button" onClick={() => onDeleteContent(id)} className="text-xs rounded-md border px-2 py-1 text-destructive">Delete</button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {!isReadOnlySection && (
                <form onSubmit={onSaveContent} className="bg-white rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-semibold">{editingId ? "Edit Content" : "Create Content"}</h3>
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                  </div>
                  {config.imageField && (
                    <div className="mb-3 rounded-md border p-3">
                      <p className="text-xs mb-2">Upload image to fill <code>{config.imageField}</code></p>
                      <div className="flex gap-2 flex-wrap">
                        <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} className="text-xs" />
                        <button type="button" onClick={onUpload} disabled={!uploadFile || isUploading} className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-60">{isUploading ? "Uploading..." : "Upload"}</button>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-3">
                    {config.fields.map((field) => {
                      const value = formData[field.name];
                      const wide = field.type === "textarea";
                      return (
                        <div key={field.name} className={wide ? "md:col-span-2" : ""}>
                          <label className="block text-xs font-medium mb-1">{field.label}</label>
                          {field.type === "textarea" && <textarea name={field.name} rows={field.name === "content" || field.name === "description" ? 5 : 3} value={String(value || "")} onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required={field.required} />}
                          {field.type === "checkbox" && <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm w-full"><input name={field.name} type="checkbox" checked={Boolean(value)} onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.checked }))} />{field.label}</label>}
                          {field.type === "select" && <select name={field.name} value={String(value || "")} onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required={field.required}>{(field.options || []).map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select>}
                          {["text", "url", "number", "date", "datetime-local"].includes(field.type) && <input name={field.name} type={field.type} value={String(value || "")} onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required={field.required} />}
                        </div>
                      );
                    })}
                  </div>
                  <button type="submit" disabled={isSaving} className="mt-4 w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold disabled:opacity-60">{isSaving ? "Saving..." : editingId ? "Update" : "Create"}</button>
                </form>
                )}
              </>
            )}

            {isUsersSection && isAdmin && (
              <>
                <div className="bg-white rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-heading font-semibold">Users</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Total: {users.length}</p>
                    </div>
                    <button type="button" onClick={onNewUser} className="rounded-md border px-3 py-1.5 text-xs">New User</button>
                  </div>
                  <div className="overflow-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/60">
                        <tr>
                          <th className="px-3 py-2 text-left">Name</th>
                          <th className="px-3 py-2 text-left">Email</th>
                          <th className="px-3 py-2 text-left">Role</th>
                          <th className="px-3 py-2 text-left">Status</th>
                          <th className="px-3 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr><td colSpan={5} className="px-3 py-4 text-muted-foreground">Loading...</td></tr>
                        ) : users.length === 0 ? (
                          <tr><td colSpan={5} className="px-3 py-4 text-muted-foreground">No users yet.</td></tr>
                        ) : (
                          users.map((user) => (
                            <tr key={user._id} className="border-t">
                              <td className="px-3 py-2">{user.name}</td>
                              <td className="px-3 py-2">{user.email}</td>
                              <td className="px-3 py-2 capitalize">{user.role}</td>
                              <td className="px-3 py-2">{user.isActive ? "Active" : "Disabled"}</td>
                              <td className="px-3 py-2"><button type="button" onClick={() => onEditUser(user)} className="text-xs rounded-md border px-2 py-1">Edit</button></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <form onSubmit={onSaveUser} className="bg-white rounded-xl border p-4">
                  <h3 className="font-heading font-semibold mb-3">{editingUserId ? "Edit User" : "Create User"}</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs mb-1">Name</label>
                      <input type="text" value={String(userForm.name || "")} onChange={(e) => setUserForm((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Email</label>
                      <input type="email" value={String(userForm.email || "")} onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Role</label>
                      <select value={String(userForm.role || "user")} onChange={(e) => setUserForm((p) => ({ ...p, role: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs mb-1">{editingUserId ? "Password (optional)" : "Password"}</label>
                      <input type="password" value={String(userForm.password || "")} onChange={(e) => setUserForm((p) => ({ ...p, password: e.target.value }))} className="w-full rounded-md border px-3 py-2 text-sm" required={!editingUserId} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={Boolean(userForm.isActive)} onChange={(e) => setUserForm((p) => ({ ...p, isActive: e.target.checked }))} />
                        Active user
                      </label>
                    </div>
                  </div>
                  <button type="submit" disabled={isSaving} className="mt-4 w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold disabled:opacity-60">{isSaving ? "Saving..." : editingUserId ? "Update User" : "Create User"}</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
