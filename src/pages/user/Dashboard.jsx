import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Circle,
  CirclePlus,
  ExternalLink,
  Globe,
  LayoutTemplate,
  Mail,
  MapPin,
  Pencil,
  RefreshCw,
  Users,
} from "lucide-react";
import axios from "@/axiosConfig";
import {
  fetchEventsUrl,
  getPublishedWebsitesUrl,
  getSubmissionsUrl,
} from "@/config/urls";
import { buildWebsiteUrl, formatDate } from "@/utils/utils";
import { sectionKeys } from "@/templates/photographyClass/constants";
import CMSLoader from "@/components/loaders/CMSLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Modal from "@/pages/user/components/Modal";
import AddEventForm from "@/pages/user/components/AddEventForm";

const domainName = import.meta.env.VITE_DOMAIN_NAME;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getLeadStatusBadge(status) {
  switch (status) {
    case "sent":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "failed":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-amber-100 text-amber-700 border-amber-200";
  }
}

function getStartOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.getTime();
}

function KpiCard({ title, value, subtitle, icon, to, tone = "default" }) {
  const toneClasses = {
    default: "text-muted-foreground bg-muted",
    success: "text-emerald-700 bg-emerald-50 border-emerald-200",
    warning: "text-amber-700 bg-amber-50 border-amber-200",
    danger: "text-rose-700 bg-rose-50 border-rose-200",
  };

  return (
    <Link to={to} className="group block">
      <Card className="h-full py-5 gap-3 transition-all duration-200 hover:shadow-md hover:border-foreground/20">
        <CardHeader className="px-5 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${toneClasses[tone]}`}
          >
            {icon}
          </div>
        </CardHeader>
        <CardContent className="px-5">
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <p className="mt-1 text-xs text-muted-foreground flex items-center justify-between">
            <span className="truncate">{subtitle}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [publishedWebsites, setPublishedWebsites] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchWarning, setFetchWarning] = useState(false);

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setFetchWarning(false);

    const [eventsRes, websitesRes, submissionsRes] = await Promise.allSettled([
      axios.get(fetchEventsUrl),
      axios.get(getPublishedWebsitesUrl),
      axios.get(getSubmissionsUrl),
    ]);

    let anyFailed = false;

    if (eventsRes.status === "fulfilled") {
      setEvents(eventsRes.value?.data?.data || []);
    } else {
      anyFailed = true;
    }

    if (websitesRes.status === "fulfilled") {
      setPublishedWebsites(websitesRes.value?.data?.data || []);
    } else {
      anyFailed = true;
    }

    if (submissionsRes.status === "fulfilled") {
      setSubmissions(submissionsRes.value?.data?.data || []);
    } else {
      anyFailed = true;
    }

    setFetchWarning(anyFailed);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchDashboardData(false);
  }, [fetchDashboardData]);

  const handleAddEventSuccess = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Detect locally staged edits from WebsiteEditor that haven't been saved to DB yet
  const unsavedLocalSectionsCount = useMemo(() => {
    return sectionKeys.reduce((count, key) => {
      return localStorage.getItem(key) ? count + 1 : count;
    }, 0);
  }, []);

  // Map published websites by eventId and websiteId for O(1) lookup
  const publishedByEventId = useMemo(() => {
    const map = new Map();
    publishedWebsites.forEach((item) => {
      if (item?.website?.belongsToThisEvent) {
        map.set(item.website.belongsToThisEvent, item.website);
      }
      if (item?.website?._id) {
        map.set(item.website._id, item.website);
      }
    });
    return map;
  }, [publishedWebsites]);

  const metrics = useMemo(() => {
    const startOfToday = getStartOfToday();
    const sevenDaysAgo = Date.now() - SEVEN_DAYS_MS;

    const upcomingEvents = [];
    const pastEvents = [];
    let eventsWithoutWebsite = 0;
    let draftWebsitesCount = 0;

    events.forEach((event) => {
      const eventTime = event?.date ? new Date(event.date).getTime() : NaN;
      const isUpcoming = !Number.isNaN(eventTime) && eventTime >= startOfToday;

      if (isUpcoming) {
        upcomingEvents.push(event);
      } else {
        pastEvents.push(event);
      }

      if (!event.website) {
        eventsWithoutWebsite += 1;
      } else {
        const isPublished =
          publishedByEventId.has(event._id) ||
          publishedByEventId.has(event.website);
        if (!isPublished) {
          draftWebsitesCount += 1;
        }
      }
    });

    // Sort upcoming soonest-first; past most-recent-first
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    const orderedEvents = [...upcomingEvents, ...pastEvents].slice(0, 5);

    const recentSubmissionsCount = submissions.filter((item) => {
      const created = item?.createdAt ? new Date(item.createdAt).getTime() : 0;
      return created >= sevenDaysAgo;
    }).length;

    const failedEmailsCount = submissions.filter(
      (item) => item?.emailStatus === "failed"
    ).length;

    const recentLeads = [...submissions]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const firstEventWithoutSite = events.find((event) => !event.website);
    const firstDraftEvent = events.find(
      (event) =>
        event.website &&
        !publishedByEventId.has(event._id) &&
        !publishedByEventId.has(event.website)
    );

    return {
      upcomingCount: upcomingEvents.length,
      nextEvent: upcomingEvents[0] || null,
      orderedEvents,
      eventsWithoutWebsite,
      draftWebsitesCount,
      recentSubmissionsCount,
      failedEmailsCount,
      attentionCount: eventsWithoutWebsite + failedEmailsCount,
      recentLeads,
      firstEventWithoutSite,
      firstDraftEvent,
    };
  }, [events, publishedByEventId, submissions]);

  const showSetupChecklist =
    events.length === 0 ||
    events.every((e) => !e.website) ||
    publishedWebsites.length === 0;

  if (loading) {
    return <CMSLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Overview of your events, published websites, and incoming leads ·{" "}
            {formatDate(new Date())}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/templates">
              <LayoutTemplate className="h-4 w-4" />
              Browse Templates
            </Link>
          </Button>
          <Modal
            title="Add New Event"
            description="Create a new event to build and publish its website."
            triggerer={
              <Button size="sm">
                <CirclePlus className="h-4 w-4" />
                New Event
              </Button>
            }
            content={<AddEventForm onAddSuccess={handleAddEventSuccess} />}
          />
        </div>
      </div>

      {/* Partial fetch warning */}
      {fetchWarning && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>
              Some dashboard data could not be loaded. Showing available
              information.
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-amber-900 hover:bg-amber-100"
            onClick={() => fetchDashboardData(true)}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Unsaved local editor changes banner */}
      {unsavedLocalSectionsCount > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <Pencil className="h-4 w-4 shrink-0" />
            <span>
              You have{" "}
              <strong>{unsavedLocalSectionsCount}</strong> unsaved website{" "}
              {unsavedLocalSectionsCount === 1 ? "section" : "sections"} stored
              locally in this browser. Open your website editor and click{" "}
              <strong>Save All</strong> to persist them.
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-amber-300 bg-white hover:bg-amber-100 shrink-0"
            asChild
          >
            <Link to="/events">Go to Events</Link>
          </Button>
        </div>
      )}

      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Upcoming Events"
          value={metrics.upcomingCount}
          subtitle={
            metrics.nextEvent
              ? `Next: ${metrics.nextEvent.eventName} (${formatDate(
                  metrics.nextEvent.date
                )})`
              : `${events.length} total event${events.length === 1 ? "" : "s"}`
          }
          icon={<Calendar className="h-4 w-4" />}
          to="/events"
        />

        <KpiCard
          title="Live Websites"
          value={publishedWebsites.length}
          subtitle={`${metrics.draftWebsitesCount} draft · ${metrics.eventsWithoutWebsite} without site`}
          icon={<Globe className="h-4 w-4" />}
          to="/websites"
          tone={publishedWebsites.length > 0 ? "success" : "default"}
        />

        <KpiCard
          title="Total Leads"
          value={submissions.length}
          subtitle={
            metrics.recentSubmissionsCount > 0
              ? `+${metrics.recentSubmissionsCount} in the last 7 days`
              : "No new leads in last 7 days"
          }
          icon={<Mail className="h-4 w-4" />}
          to="/leads"
        />

        <KpiCard
          title="Needs Attention"
          value={metrics.attentionCount}
          subtitle={
            metrics.attentionCount === 0
              ? "All events & emails look good"
              : `${metrics.eventsWithoutWebsite} missing site · ${metrics.failedEmailsCount} failed email`
          }
          icon={
            metrics.attentionCount === 0 ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )
          }
          to={metrics.failedEmailsCount > 0 ? "/leads" : "/events"}
          tone={
            metrics.failedEmailsCount > 0
              ? "danger"
              : metrics.eventsWithoutWebsite > 0
              ? "warning"
              : "success"
          }
        />
      </div>

      {/* Onboarding / Launch Progress Checklist */}
      {showSetupChecklist && (
        <Card className="py-5 gap-4 bg-accent/40">
          <CardHeader className="px-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Launch Your Event Website
              </CardTitle>
              <CardDescription>
                Complete these steps to take your event online and start
                collecting leads.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {events.length > 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      1. Create an event
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {events.length > 0
                        ? `${events.length} created`
                        : "Add title, date & venue"}
                    </p>
                  </div>
                </div>
                {events.length === 0 && (
                  <Modal
                    title="Add New Event"
                    description="Create a new event to build and publish its website."
                    triggerer={
                      <Button size="sm" variant="outline">
                        Create
                      </Button>
                    }
                    content={
                      <AddEventForm onAddSuccess={handleAddEventSuccess} />
                    }
                  />
                )}
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {events.some((e) => e.website) ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      2. Pick a template
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Clone & customize sections
                    </p>
                  </div>
                </div>
                {!events.some((e) => e.website) &&
                  metrics.firstEventWithoutSite && (
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        to={`/events/${metrics.firstEventWithoutSite._id}/select-website-template`}
                      >
                        Pick
                      </Link>
                    </Button>
                  )}
              </div>

              {/* Step 3 */}
              <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {publishedWebsites.length > 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      3. Publish subdomain
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Share your live event URL
                    </p>
                  </div>
                </div>
                {publishedWebsites.length === 0 && metrics.firstDraftEvent && (
                  <Button size="sm" variant="outline" asChild>
                    <Link
                      to={`/events/${metrics.firstDraftEvent._id}/edit-website/${metrics.firstDraftEvent.website}`}
                    >
                      Publish
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Events & Website Readiness */}
        <Card className="lg:col-span-7 py-5 gap-4">
          <CardHeader className="px-6 flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle className="text-base">
                Events & Website Status
              </CardTitle>
              <CardDescription>
                Quick access to manage your events and their site status
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/events">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="px-6">
            {metrics.orderedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium">No events yet</p>
                <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-xs">
                  Create your first event to choose a template and publish a
                  dedicated website.
                </p>
                <Modal
                  title="Add New Event"
                  description="Create a new event to build and publish its website."
                  triggerer={
                    <Button size="sm">
                      <CirclePlus className="h-4 w-4" />
                      Create First Event
                    </Button>
                  }
                  content={
                    <AddEventForm onAddSuccess={handleAddEventSuccess} />
                  }
                />
              </div>
            ) : (
              <div className="divide-y">
                {metrics.orderedEvents.map((event) => {
                  const publishedSite =
                    publishedByEventId.get(event._id) ||
                    (event.website
                      ? publishedByEventId.get(event.website)
                      : null);

                  const isLive = Boolean(publishedSite);
                  const isDraft = Boolean(event.website) && !isLive;
                  const eventDateMs = event?.date
                    ? new Date(event.date).getTime()
                    : NaN;
                  const isPast =
                    !Number.isNaN(eventDateMs) &&
                    eventDateMs < getStartOfToday();

                  return (
                    <div
                      key={event._id}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to={`/events/${event._id}`}
                            className="font-semibold text-sm hover:underline truncate"
                          >
                            {event.eventName}
                          </Link>

                          {isLive && (
                            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              Live
                            </span>
                          )}
                          {isDraft && (
                            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                              Draft
                            </span>
                          )}
                          {!event.website && (
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                              No Website
                            </span>
                          )}
                          {isPast && (
                            <span className="inline-flex items-center rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                              Past
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(event.date)}
                            {event.time ? ` · ${event.time}` : ""}
                          </span>
                          {event.location && (
                            <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </span>
                          )}
                          {Number(event.expectedNumberOfPeople) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {event.expectedNumberOfPeople}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!event.website ? (
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              to={`/events/${event._id}/select-website-template`}
                            >
                              Choose Template
                            </Link>
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                to={`/events/${event._id}/edit-website/${event.website}`}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                {isDraft ? "Continue Editing" : "Edit"}
                              </Link>
                            </Button>
                            {isLive && publishedSite?.subdomain && (
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                asChild
                                title={`Open ${publishedSite.subdomain}.${domainName || ""}`}
                              >
                                <a
                                  href={buildWebsiteUrl(publishedSite.subdomain)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4 text-blue-600" />
                                </a>
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Recent Leads Feed */}
        <Card className="lg:col-span-5 py-5 gap-4">
          <CardHeader className="px-6 flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle className="text-base">Recent Leads</CardTitle>
              <CardDescription>
                Latest visitor form submissions across your sites
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/leads">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="px-6">
            {metrics.recentLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Mail className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium">No submissions yet</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Once your event website is live and visitors submit a form,
                  leads will show up here.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {metrics.recentLeads.map((lead) => {
                  const fullName = `${lead.firstname || ""} ${
                    lead.lastname || ""
                  }`.trim();

                  return (
                    <div
                      key={lead._id}
                      className="py-3 first:pt-0 last:pb-0 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium capitalize truncate">
                          {fullName || lead.visitorEmail || "Visitor"}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize shrink-0 ${getLeadStatusBadge(
                            lead.emailStatus
                          )}`}
                          title={lead.emailError || ""}
                        >
                          {lead.emailStatus || "pending"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="truncate">
                          {lead.subdomain
                            ? `${lead.subdomain}${
                                domainName ? `.${domainName}` : ""
                              }`
                            : lead.visitorEmail}
                        </span>
                        <span className="shrink-0">
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>

                      {lead.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {lead.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
