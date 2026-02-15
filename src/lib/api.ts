export type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  authorName: string;
  authorImageUrl?: string;
  authorBio?: string;
  status: "draft" | "published" | "archived";
  contentType?: "news" | "blog" | "story";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ResourceItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes?: number;
  language?: string;
  publishedYear?: number;
  isPublished: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CareerItem = {
  _id: string;
  title: string;
  referenceNumber?: string;
  coverImageUrl?: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements?: string;
  applicationUrl?: string;
  deadline?: string;
  status: "open" | "closed" | "paused";
  createdAt: string;
  updatedAt: string;
};

export type CareerApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  county?: string;
  cvUrl?: string;
  coverLetter?: string;
};

export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl?: string;
  venue?: string;
  isVirtual: boolean;
  startAt: string;
  endAt?: string;
  registrationUrl?: string;
  capacity?: number;
  status: "scheduled" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
};

export type EventRegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  county?: string;
  notes?: string;
};

export type TeamMemberItem = {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VideoItem = {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GalleryItem = {
  _id: string;
  title: string;
  imageUrl: string;
  caption?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdvertisementItem = {
  _id: string;
  title: string;
  imageUrl: string;
  targetUrl?: string;
  altText?: string;
  placement: "homepage-sidebar";
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  data: T;
  message?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Debug logging in development
const isDev = import.meta.env.DEV;

function debugLog(...args: unknown[]) {
  if (isDev) {
    console.debug("[API]", ...args);
  }
}

export { isDev };

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };

  debugLog(`${init?.method || "GET"} ${url}`);

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload?.message) {
        message = payload.message;
      }
    } catch (_error) {
      // Keep fallback message if response body is not JSON.
    }
    console.error(`[API Error] ${init?.method || "GET"} ${url}:`, message);
    throw new Error(message);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  debugLog(`[API Success] ${url}`);
  return payload.data;
}

export function getNews(limit = 12) {
  return fetchJson<BlogItem[]>(`/news?limit=${limit}`);
}

export function getNewsBySlug(slug: string) {
  return fetchJson<BlogItem>(`/news/${slug}`);
}

export function getBlogs(limit = 12, type?: string) {
  const query = new URLSearchParams({
    status: "published",
    limit: String(limit),
  });
  if (type && type !== "all") {
    query.set("type", type);
  }

  return fetchJson<BlogItem[]>(`/blogs?${query.toString()}`);
}

export function getResources(params?: { category?: string; search?: string }) {
  const query = new URLSearchParams({ limit: "100" });
  if (params?.category && params.category !== "All") {
    query.set("category", params.category);
  }
  if (params?.search) {
    query.set("search", params.search);
  }

  return fetchJson<ResourceItem[]>(`/resources?${query.toString()}`);
}

export function getCareers(limit = 50, status = "open") {
  const query = new URLSearchParams({
    limit: String(limit),
    status,
  });
  return fetchJson<CareerItem[]>(`/careers?${query.toString()}`);
}

export function getCareerById(id: string) {
  return fetchJson<CareerItem>(`/careers/${id}`);
}

export function applyForCareer(id: string, payload: CareerApplicationPayload) {
  return fetchJson<{ _id: string; career: string; email: string }>(`/careers/${id}/apply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getEvents(limit = 10, upcoming = true) {
  const query = new URLSearchParams({
    limit: String(limit),
    upcoming: String(upcoming),
  });
  return fetchJson<EventItem[]>(`/events?${query.toString()}`);
}

export function getEventBySlug(slug: string) {
  return fetchJson<EventItem>(`/events/${slug}`);
}

export function registerForEvent(slug: string, payload: EventRegistrationPayload) {
  return fetchJson<{ _id: string; eventSlug: string; email: string }>(`/events/${slug}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getHomepageAd() {
  return fetchJson<AdvertisementItem | null>("/ads/homepage");
}

export function checkApiHealth() {
  return fetchJson<{ status: string; database: string }>("/health");
}

export function trackResourceDownload(id: string, email?: string) {
  return fetchJson<{ id: string; downloadCount: number }>(`/resources/${id}/download`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function createSubscription(payload: { email: string; fullName?: string; source?: string }) {
  return fetchJson<{ _id: string; email: string }>(`/subscriptions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function checkSubscription(email: string) {
  const query = new URLSearchParams({ email: email.toLowerCase() });
  return fetchJson<{ isSubscribed: boolean; email: string; subscribedAt?: string }>(`/subscriptions/check?${query.toString()}`);
}

export function getTeamMembers() {
  return fetchJson<TeamMemberItem[]>("/team");
}

export function getVideos() {
  return fetchJson<VideoItem[]>("/videos");
}

export function getGalleryItems() {
  return fetchJson<GalleryItem[]>("/gallery");
}

export type AdminEntity =
  | "blogs"
  | "resources"
  | "careers"
  | "events"
  | "ads"
  | "subscriptions"
  | "event-registrations"
  | "team-members"
  | "videos"
  | "gallery-items"
  | "career-applications";

export type AdminSessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type AdminAuthPayload = {
  token: string;
  user: AdminSessionUser;
};

function getAdminAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function adminLogin(email: string, password: string) {
  return fetchJson<AdminAuthPayload>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function adminLogout(token: string) {
  return fetchJson<{ success: boolean }>("/admin/logout", {
    method: "POST",
    headers: getAdminAuthHeaders(token),
  });
}

export function adminMe(token: string) {
  return fetchJson<AdminSessionUser>("/admin/me", {
    headers: getAdminAuthHeaders(token),
  });
}

export type AdminManagedUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export function adminListUsers(token: string) {
  return fetchJson<AdminManagedUser[]>("/admin/users", {
    headers: getAdminAuthHeaders(token),
  });
}

export function adminCreateUser(payload: { name: string; email: string; password: string; role?: "admin" | "user"; isActive?: boolean }, token: string) {
  return fetchJson<AdminManagedUser>("/admin/users", {
    method: "POST",
    headers: getAdminAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function adminUpdateUser(id: string, payload: { name?: string; email?: string; password?: string; role?: "admin" | "user"; isActive?: boolean }, token: string) {
  return fetchJson<AdminManagedUser>(`/admin/users/${id}`, {
    method: "PUT",
    headers: getAdminAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function adminExportSubscribersCsv(token: string, params?: { from?: string; to?: string }) {
  const query = new URLSearchParams();
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  const suffix = query.toString() ? `?${query.toString()}` : "";

  const response = await fetch(`${API_BASE_URL}/admin/subscriptions/export.csv${suffix}`, {
    method: "GET",
    headers: getAdminAuthHeaders(token),
  });

  if (!response.ok) {
    let message = `Export failed (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload?.message) message = payload.message;
    } catch (_error) {
      // ignore json parse issues and keep fallback message
    }
    throw new Error(message);
  }

  return response.blob();
}

export async function adminExportEventRegistrationsCsv(token: string, params?: { from?: string; to?: string }) {
  const query = new URLSearchParams();
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  const suffix = query.toString() ? `?${query.toString()}` : "";

  const response = await fetch(`${API_BASE_URL}/admin/event-registrations/export.csv${suffix}`, {
    method: "GET",
    headers: getAdminAuthHeaders(token),
  });

  if (!response.ok) {
    let message = `Export failed (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload?.message) message = payload.message;
    } catch (_error) {
      // ignore json parse issues and keep fallback message
    }
    throw new Error(message);
  }

  return response.blob();
}

export async function adminExportCareerApplicationsCsv(token: string, params?: { from?: string; to?: string }) {
  const query = new URLSearchParams();
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  const suffix = query.toString() ? `?${query.toString()}` : "";

  const response = await fetch(`${API_BASE_URL}/admin/career-applications/export.csv${suffix}`, {
    method: "GET",
    headers: getAdminAuthHeaders(token),
  });

  if (!response.ok) {
    let message = `Export failed (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload?.message) message = payload.message;
    } catch (_error) {
      // ignore json parse issues and keep fallback message
    }
    throw new Error(message);
  }

  return response.blob();
}

export function adminList<T>(entity: AdminEntity, token: string) {
  return fetchJson<T[]>(`/admin/${entity}`, {
    headers: getAdminAuthHeaders(token),
  });
}

export function adminCreate<T>(entity: AdminEntity, payload: Record<string, unknown>, token: string) {
  return fetchJson<T>(`/admin/${entity}`, {
    method: "POST",
    headers: getAdminAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function adminUpdate<T>(entity: AdminEntity, id: string, payload: Record<string, unknown>, token: string) {
  return fetchJson<T>(`/admin/${entity}/${id}`, {
    method: "PUT",
    headers: getAdminAuthHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function adminDelete(entity: AdminEntity, id: string, token: string) {
  return fetchJson<{ success: boolean }>(`/admin/${entity}/${id}`, {
    method: "DELETE",
    headers: getAdminAuthHeaders(token),
  });
}

export function adminBulkAction(entity: AdminEntity, ids: string[], action: "publish" | "unpublish" | "delete", token: string) {
  return fetchJson<{ affectedCount: number }>(`/admin/${entity}/bulk`, {
    method: "POST",
    headers: getAdminAuthHeaders(token),
    body: JSON.stringify({ ids, action }),
  });
}

export async function adminUploadImage(file: File, token: string) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: "POST",
    headers: getAdminAuthHeaders(token),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed (${response.status})`);
  }

  const payload = (await response.json()) as ApiResponse<{ fileName: string; fileUrl: string; size: number; mimetype: string }>;
  return payload.data;
}
