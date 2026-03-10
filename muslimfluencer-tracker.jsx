import { useState } from "react";

const PLATFORMS = ["Instagram", "TikTok", "YouTube"];

const PLATFORM_TASKS = {
  Instagram: ["Reels posted", "Stories posted", "Grid posts", "Carousels posted"],
  TikTok: ["TikToks posted", "Duets/Stitches", "Lives hosted"],
  YouTube: ["Long-form videos", "YouTube Shorts", "Community posts"],
};

const defaultWeekData = () => ({
  weekOf: "",
  followers: { Instagram: "", TikTok: "", YouTube: "" },
  followerGoal: { Instagram: "", TikTok: "", YouTube: "" },
  postsPlanned: { Instagram: "", TikTok: "", YouTube: "" },
  postsPublished: { Instagram: "", TikTok: "", YouTube: "" },
  platformTasks: {
    Instagram: { "Reels posted": "", "Stories posted": "", "Grid posts": "", "Carousels posted": "" },
    TikTok: { "TikToks posted": "", "Duets/Stitches": "", "Lives hosted": "" },
    YouTube: { "Long-form videos": "", "YouTube Shorts": "", "Community posts": "" },
  },
  filmingBatched: "",
  batchedHours: "",
  contentReady: "",
  postedOnSchedule: { Instagram: "", TikTok: "", YouTube: "" },
  dmsReplied: "",
  commentsReplied: "",
  engagementRate: { Instagram: "", TikTok: "", YouTube: "" },
  topContent: {
    Instagram: { url: "", title: "", views: "", likes: "", shares: "", watchTime: "", followerGain: "" },
    TikTok:    { url: "", title: "", views: "", likes: "", shares: "", watchTime: "", followerGain: "" },
    YouTube:   { url: "", title: "", views: "", likes: "", shares: "", watchTime: "", followerGain: "" },
  },
  biggestWin: "",
  biggestChallenge: "",
  nextWeekFocus: "",
  rating: "",
});

const COLORS = {
  green: "#22C55E",
  gold: "#FFFFFF",
  dark: "#FFFFFF",
  card: "#F7F7F7",
  border: "#E5E5E5",
  muted: "#9B9B9B",
  text: "#111111",
  accent: "#111111",
};

const platformColors = {
  Instagram: "#111111",
  TikTok: "#111111",
  YouTube: "#111111",
};

export default function App() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [clientName, setClientName] = useState("");
  const [weeks, setWeeks] = useState(Array.from({ length: 6 }, defaultWeekData));
  const [activeTab, setActiveTab] = useState("overview");

  const updateField = (field, value) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[currentWeek - 1] = { ...updated[currentWeek - 1], [field]: value };
      return updated;
    });
  };

  const updateNested = (field, key, value) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[currentWeek - 1] = {
        ...updated[currentWeek - 1],
        [field]: { ...updated[currentWeek - 1][field], [key]: value },
      };
      return updated;
    });
  };

  const updateDeepNested = (field, platform, key, value) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[currentWeek - 1] = {
        ...updated[currentWeek - 1],
        [field]: {
          ...updated[currentWeek - 1][field],
          [platform]: {
            ...updated[currentWeek - 1][field][platform],
            [key]: value,
          },
        },
      };
      return updated;
    });
  };

  const updateTopContent = (platform, field, value) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[currentWeek - 1] = {
        ...updated[currentWeek - 1],
        topContent: {
          ...updated[currentWeek - 1].topContent,
          [platform]: {
            ...updated[currentWeek - 1].topContent[platform],
            [field]: value,
          },
        },
      };
      return updated;
    });
  };

  const getThumbnailUrl = (url) => {
    try {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
      if (url.includes("tiktok.com")) return null;
      if (url.includes("instagram.com")) return null;
    } catch {}
    return null;
  };

  const platformIcons = { Instagram: "📸", TikTok: "🎵", YouTube: "▶️" };


  const getConsistencyScore = (w) => {
    let score = 0, total = 0;
    PLATFORMS.forEach((p) => {
      if (w.postsPlanned[p] && w.postsPublished[p]) {
        total++;
        const ratio = parseInt(w.postsPublished[p]) / parseInt(w.postsPlanned[p]);
        if (ratio >= 1) score++;
        else if (ratio >= 0.75) score += 0.75;
        else if (ratio >= 0.5) score += 0.5;
      }
    });
    return total > 0 ? Math.round((score / total) * 100) : null;
  };

  const getFollowerGrowth = (w, p) => {
    if (!w.followers[p] || !w.followerGoal[p]) return null;
    const curr = parseInt(w.followers[p]);
    const goal = parseInt(w.followerGoal[p]);
    return goal > 0 ? Math.round((curr / goal) * 100) : null;
  };

  const totalFollowers = PLATFORMS.reduce((sum, p) => sum + (parseInt(week.followers[p]) || 0), 0);

  const inputStyle = {
    background: "#FFFFFF",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.text,
    borderRadius: "6px",
    padding: "9px 12px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: "11px",
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
    display: "block",
    fontWeight: "600",
  };

  const cardStyle = {
    background: "#FFFFFF",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "16px",
  };

  const sectionTitle = {
    fontSize: "12px",
    fontWeight: "800",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F5", color: COLORS.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#FFFFFF", borderBottom: `1px solid ${COLORS.border}`, padding: "20px 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "22px", letterSpacing: "-0.5px", marginBottom: "2px" }}>
              <span style={{ fontWeight: "800", color: "#111" }}>muslim</span><span style={{ fontWeight: "400", color: "#111" }}>fluencer.</span>
            </div>
            <div style={{ fontSize: "13px", color: COLORS.muted, fontWeight: "400" }}>Content Accountability Tracker</div>
          </div>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Your name..."
            style={{ ...inputStyle, width: "180px", fontSize: "13px" }}
          />
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>

        {/* Week Selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {Array.from({ length: 6 }, (_, i) => {
            const w = weeks[i];
            const score = getConsistencyScore(w);
            const active = currentWeek === i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentWeek(i + 1)}
                style={{
                  flex: "1",
                  minWidth: "100px",
                  padding: "12px 8px",
                  borderRadius: "8px",
                  border: active ? `2px solid #111` : `1px solid ${COLORS.border}`,
                  background: active ? "#111" : "#FFFFFF",
                  color: active ? "#FFFFFF" : COLORS.muted,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Week {i + 1}</div>
                {score !== null ? (
                  <div style={{ fontSize: "18px", fontWeight: "700", color: score >= 80 ? (active ? "#22C55E" : COLORS.green) : score >= 50 ? (active ? "#FFF" : "#111") : "#E74C3C" }}>{score}%</div>
                ) : (
                  <div style={{ fontSize: "12px", color: COLORS.muted }}>—</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "#FFFFFF", padding: "4px", borderRadius: "8px", border: `1px solid ${COLORS.border}` }}>
          {["overview", "platforms", "top content", "engagement", "reflection"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: "none",
                background: activeTab === tab ? "#111" : "transparent",
                color: activeTab === tab ? "#FFF" : COLORS.muted,
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={cardStyle}>
              <div style={sectionTitle}>📅 Week Info</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Week of (date)</label>
                  <input type="date" value={week.weekOf} onChange={(e) => updateField("weekOf", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Self Rating (1–10)</label>
                  <input type="number" min="1" max="10" placeholder="7" value={week.rating} onChange={(e) => updateField("rating", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Follower Counts */}
            <div style={cardStyle}>
              <div style={sectionTitle}>📈 Follower Count This Week</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {PLATFORMS.map((p) => {
                  const growth = getFollowerGrowth(week, p);
                  return (
                    <div key={p} style={{ background: "#F7F7F7", borderRadius: "8px", padding: "16px", border: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontSize: "11px", color: "#111", fontWeight: "800", letterSpacing: "1px", marginBottom: "10px", textTransform: "uppercase" }}>{p}</div>
                      <div>
                        <label style={labelStyle}>Current followers</label>
                        <input type="number" placeholder="e.g. 1200" value={week.followers[p]} onChange={(e) => updateNested("followers", p, e.target.value)} style={inputStyle} />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <label style={labelStyle}>Follower goal</label>
                        <input type="number" placeholder="e.g. 1500" value={week.followerGoal[p]} onChange={(e) => updateNested("followerGoal", p, e.target.value)} style={inputStyle} />
                      </div>
                      {growth !== null && (
                        <div style={{ marginTop: "10px", fontSize: "20px", fontWeight: "700", color: growth >= 100 ? COLORS.green : growth >= 75 ? "#111" : "#E74C3C" }}>
                          {growth}% <span style={{ fontSize: "11px", color: COLORS.muted, fontWeight: "400" }}>of goal</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {totalFollowers > 0 && (
                <div style={{ marginTop: "16px", padding: "12px 16px", background: "#111", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#aaa", textTransform: "uppercase", letterSpacing: "1px" }}>Total Followers Across All Platforms</span>
                  <span style={{ fontSize: "22px", fontWeight: "800", color: "#FFF" }}>{totalFollowers.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Posting Consistency */}
            <div style={cardStyle}>
              <div style={sectionTitle}>✅ Posting Consistency</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {PLATFORMS.map((p) => {
                  const planned = parseInt(week.postsPlanned[p]) || 0;
                  const published = parseInt(week.postsPublished[p]) || 0;
                  const pct = planned > 0 ? Math.round((published / planned) * 100) : null;
                  return (
                    <div key={p} style={{ background: "#F7F7F7", borderRadius: "8px", padding: "16px", border: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontSize: "11px", color: "#111", fontWeight: "800", letterSpacing: "1px", marginBottom: "10px", textTransform: "uppercase" }}>{p}</div>
                      <div>
                        <label style={labelStyle}>Posts planned</label>
                        <input type="number" placeholder="e.g. 4" value={week.postsPlanned[p]} onChange={(e) => updateNested("postsPlanned", p, e.target.value)} style={inputStyle} />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <label style={labelStyle}>Posts published</label>
                        <input type="number" placeholder="e.g. 3" value={week.postsPublished[p]} onChange={(e) => updateNested("postsPublished", p, e.target.value)} style={inputStyle} />
                      </div>
                      {pct !== null && (
                        <div style={{ marginTop: "10px" }}>
                          <div style={{ height: "4px", background: "#E5E5E5", borderRadius: "2px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: pct >= 100 ? COLORS.green : pct >= 75 ? "#111" : "#E74C3C", borderRadius: "2px", transition: "width 0.4s" }} />
                          </div>
                          <div style={{ fontSize: "12px", color: COLORS.muted, marginTop: "6px" }}>{pct}% completed</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filming & Batching */}
            <div style={cardStyle}>
              <div style={sectionTitle}>🎬 Content Filming & Batching</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Did you batch content this week?</label>
                  <select value={week.filmingBatched} onChange={(e) => updateField("filmingBatched", e.target.value)} style={inputStyle}>
                    <option value="">Select...</option>
                    <option value="yes">Yes ✅</option>
                    <option value="partial">Partially ⚠️</option>
                    <option value="no">No ❌</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Hours spent filming/editing</label>
                  <input type="number" placeholder="e.g. 3" value={week.batchedHours} onChange={(e) => updateField("batchedHours", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Pieces of content ready ahead?</label>
                  <input type="number" placeholder="e.g. 5" value={week.contentReady} onChange={(e) => updateField("contentReady", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Posted on Schedule */}
            <div style={cardStyle}>
              <div style={sectionTitle}>🗓️ Posted on Schedule?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {PLATFORMS.map((p) => (
                  <div key={p}>
                    <label style={{ ...labelStyle, color: platformColors[p] }}>{p}</label>
                    <select value={week.postedOnSchedule[p]} onChange={(e) => updateNested("postedOnSchedule", p, e.target.value)} style={inputStyle}>
                      <option value="">Select...</option>
                      <option value="always">Always ✅</option>
                      <option value="mostly">Mostly ⚠️</option>
                      <option value="sometimes">Sometimes 😬</option>
                      <option value="rarely">Rarely ❌</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PLATFORMS TAB */}
        {activeTab === "platforms" && (
          <div>
            {PLATFORMS.map((platform) => (
              <div key={platform} style={{ ...cardStyle, borderColor: COLORS.border }}>
                <div style={{ ...sectionTitle, color: "#111" }}>
                  {platform === "Instagram" ? "📸" : platform === "TikTok" ? "🎵" : "▶️"} {platform} — Content Breakdown
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  {PLATFORM_TASKS[platform].map((task) => (
                    <div key={task}>
                      <label style={labelStyle}>{task}</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={week.platformTasks[platform][task]}
                        onChange={(e) => updateDeepNested("platformTasks", platform, task, e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TOP CONTENT TAB */}
        {activeTab === "top content" && (
          <div>
            <div style={{ ...cardStyle, background: "#F7F7F7", border: "none", padding: "14px 20px", marginBottom: "20px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: COLORS.muted, lineHeight: "1.6" }}>
                Paste the link to your <strong style={{ color: "#111" }}>top performing post</strong> from each platform this week, then log its key metrics below. Update these numbers as the post continues to grow — the tracker will show you how each piece performs over time.
              </p>
            </div>

            {PLATFORMS.map((platform) => {
              const post = week.topContent[platform];
              const thumb = getThumbnailUrl(post.url);
              const totalEngagement = (parseInt(post.likes) || 0) + (parseInt(post.shares) || 0);

              return (
                <div key={platform} style={cardStyle}>
                  {/* Platform Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                    <div style={sectionTitle}>
                      {platformIcons[platform]} {platform} — Top Post
                    </div>
                    {post.url && (
                      <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "#111", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", border: "1px solid #111", padding: "5px 12px", borderRadius: "5px" }}>
                        View Post ↗
                      </a>
                    )}
                  </div>

                  {/* URL + Title */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <label style={labelStyle}>Post URL / Link</label>
                      <input
                        type="url"
                        placeholder={`https://${platform.toLowerCase()}.com/...`}
                        value={post.url}
                        onChange={(e) => updateTopContent(platform, "url", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Content title / description</label>
                      <input
                        type="text"
                        placeholder="e.g. How I grew 1k followers in a week..."
                        value={post.title}
                        onChange={(e) => updateTopContent(platform, "title", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* YouTube Thumbnail Preview */}
                  {thumb && (
                    <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden", border: `1px solid ${COLORS.border}`, maxWidth: "320px" }}>
                      <img src={thumb} alt="YouTube thumbnail" style={{ width: "100%", display: "block" }} />
                    </div>
                  )}

                  {/* Instagram / TikTok link preview placeholder */}
                  {post.url && !thumb && (post.url.includes("instagram.com") || post.url.includes("tiktok.com")) && (
                    <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#F7F7F7", borderRadius: "8px", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "20px" }}>{platformIcons[platform]}</span>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "#111" }}>{post.title || "Linked post"}</div>
                        <div style={{ fontSize: "11px", color: COLORS.muted, marginTop: "2px", wordBreak: "break-all" }}>{post.url.slice(0, 60)}{post.url.length > 60 ? "..." : ""}</div>
                      </div>
                    </div>
                  )}

                  {/* Metrics Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                    {[
                      { field: "views", label: "Views", placeholder: "e.g. 12400", icon: "👁️" },
                      { field: "likes", label: "Likes", placeholder: "e.g. 840", icon: "❤️" },
                      { field: "shares", label: "Shares / Reposts", placeholder: "e.g. 120", icon: "🔁" },
                      { field: "watchTime", label: platform === "YouTube" ? "Avg Watch Time" : "Avg View Duration", placeholder: platform === "YouTube" ? "e.g. 4:32" : "e.g. 0:18", icon: "⏱️" },
                      { field: "followerGain", label: "Followers Gained", placeholder: "e.g. 47", icon: "📈" },
                    ].map(({ field, label, placeholder, icon }) => (
                      <div key={field} style={{ background: "#F7F7F7", borderRadius: "8px", padding: "12px", border: `1px solid ${COLORS.border}` }}>
                        <div style={{ fontSize: "16px", marginBottom: "6px" }}>{icon}</div>
                        <label style={{ ...labelStyle, marginBottom: "6px" }}>{label}</label>
                        <input
                          type={field === "watchTime" ? "text" : "number"}
                          placeholder={placeholder}
                          value={post[field]}
                          onChange={(e) => updateTopContent(platform, field, e.target.value)}
                          style={{ ...inputStyle, fontSize: "13px", padding: "7px 10px" }}
                        />
                        {post[field] && field !== "watchTime" && (
                          <div style={{ fontSize: "15px", fontWeight: "800", color: "#111", marginTop: "8px" }}>
                            {parseInt(post[field]).toLocaleString()}
                          </div>
                        )}
                        {post[field] && field === "watchTime" && (
                          <div style={{ fontSize: "15px", fontWeight: "800", color: "#111", marginTop: "8px" }}>{post[field]}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary bar */}
                  {(post.views || post.likes || post.followerGain) && (
                    <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {post.views && (
                        <div style={{ padding: "6px 14px", background: "#111", borderRadius: "20px", fontSize: "12px", color: "#FFF", fontWeight: "700" }}>
                          👁️ {parseInt(post.views).toLocaleString()} views
                        </div>
                      )}
                      {totalEngagement > 0 && (
                        <div style={{ padding: "6px 14px", background: "#111", borderRadius: "20px", fontSize: "12px", color: "#FFF", fontWeight: "700" }}>
                          💬 {totalEngagement.toLocaleString()} engagements
                        </div>
                      )}
                      {post.followerGain && (
                        <div style={{ padding: "6px 14px", background: COLORS.green, borderRadius: "20px", fontSize: "12px", color: "#FFF", fontWeight: "700" }}>
                          +{parseInt(post.followerGain).toLocaleString()} followers from this post
                        </div>
                      )}
                      {post.views && post.likes && (
                        <div style={{ padding: "6px 14px", background: "#F7F7F7", border: `1px solid ${COLORS.border}`, borderRadius: "20px", fontSize: "12px", color: "#111", fontWeight: "700" }}>
                          ❤️ {((parseInt(post.likes) / parseInt(post.views)) * 100).toFixed(1)}% like rate
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Cross-platform winner */}
            {PLATFORMS.some(p => week.topContent[p].views) && (
              <div style={{ ...cardStyle, background: "#111", border: "none" }}>
                <div style={{ ...sectionTitle, color: "#FFF" }}>🏆 This Week's Top Performer</div>
                {(() => {
                  const best = PLATFORMS.filter(p => week.topContent[p].views).sort((a, b) => parseInt(week.topContent[b].views) - parseInt(week.topContent[a].views))[0];
                  const post = week.topContent[best];
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ fontSize: "32px" }}>{platformIcons[best]}</div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "800", color: "#FFF", marginBottom: "4px" }}>{post.title || best + " post"}</div>
                        <div style={{ fontSize: "13px", color: "#aaa" }}>{best} &nbsp;·&nbsp; {parseInt(post.views).toLocaleString()} views</div>
                      </div>
                      {post.url && (
                        <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: "11px", color: "#FFF", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", border: "1px solid #FFF", padding: "5px 12px", borderRadius: "5px" }}>
                          View ↗
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ENGAGEMENT TAB */}
        {activeTab === "engagement" && (
          <div>
            <div style={cardStyle}>
              <div style={sectionTitle}>💬 Community Engagement</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>DMs replied to this week</label>
                  <input type="number" placeholder="e.g. 15" value={week.dmsReplied} onChange={(e) => updateField("dmsReplied", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Comments replied to this week</label>
                  <input type="number" placeholder="e.g. 30" value={week.commentsReplied} onChange={(e) => updateField("commentsReplied", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>📊 Engagement Rate (%) by Platform</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {PLATFORMS.map((p) => (
                  <div key={p} style={{ background: "#F7F7F7", borderRadius: "8px", padding: "16px", border: `1px solid ${COLORS.border}` }}>
                    <label style={{ ...labelStyle }}>{p} Avg. Engagement %</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 4.2"
                      value={week.engagementRate[p]}
                      onChange={(e) => updateNested("engagementRate", p, e.target.value)}
                      style={inputStyle}
                    />
                    {week.engagementRate[p] && (
                      <div style={{
                        marginTop: "10px",
                        fontSize: "22px",
                        fontWeight: "800",
                        color: parseFloat(week.engagementRate[p]) >= 5 ? COLORS.green : parseFloat(week.engagementRate[p]) >= 3 ? "#111" : "#E74C3C"
                      }}>
                        {parseFloat(week.engagementRate[p]).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px", padding: "10px 14px", background: "#F7F7F7", border: `1px solid ${COLORS.border}`, borderRadius: "8px", fontSize: "12px", color: COLORS.muted }}>
                🟢 5%+ = Excellent &nbsp;|&nbsp; ⚫ 3–5% = Good &nbsp;|&nbsp; 🔴 Below 3% = Needs improvement
              </div>
            </div>
          </div>
        )}

        {/* REFLECTION TAB */}
        {activeTab === "reflection" && (
          <div>
            <div style={cardStyle}>
              <div style={sectionTitle}>🌟 Weekly Reflection</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Biggest win this week</label>
                  <textarea
                    placeholder="What went well? What are you proud of? Alhamdulillah..."
                    value={week.biggestWin}
                    onChange={(e) => updateField("biggestWin", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Biggest challenge this week</label>
                  <textarea
                    placeholder="What was hard? What blocked you?"
                    value={week.biggestChallenge}
                    onChange={(e) => updateField("biggestChallenge", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Main focus for next week</label>
                  <textarea
                    placeholder="What will you do differently? What's the #1 priority?"
                    value={week.nextWeekFocus}
                    onChange={(e) => updateField("nextWeekFocus", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
              </div>
            </div>

            {/* 6-Week Summary */}
            <div style={cardStyle}>
              <div style={sectionTitle}>📋 6-Week Progress Snapshot</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr>
                      {["Week", "IG Followers", "TikTok Followers", "YT Followers", "Consistency", "Rating"].map((h) => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: COLORS.muted, fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeks.map((w, i) => {
                      const score = getConsistencyScore(w);
                      return (
                        <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}`, background: currentWeek === i + 1 ? "#F0F0F0" : "transparent" }}>
                          <td style={{ padding: "10px 12px", color: "#111", fontWeight: currentWeek === i + 1 ? "800" : "400" }}>Week {i + 1}</td>
                          <td style={{ padding: "10px 12px", color: w.followers.Instagram ? COLORS.text : COLORS.muted }}>{w.followers.Instagram ? parseInt(w.followers.Instagram).toLocaleString() : "—"}</td>
                          <td style={{ padding: "10px 12px", color: w.followers.TikTok ? COLORS.text : COLORS.muted }}>{w.followers.TikTok ? parseInt(w.followers.TikTok).toLocaleString() : "—"}</td>
                          <td style={{ padding: "10px 12px", color: w.followers.YouTube ? COLORS.text : COLORS.muted }}>{w.followers.YouTube ? parseInt(w.followers.YouTube).toLocaleString() : "—"}</td>
                          <td style={{ padding: "10px 12px" }}>
                            {score !== null ? (
                              <span style={{ color: score >= 80 ? COLORS.green : score >= 50 ? "#111" : "#E74C3C", fontWeight: "700" }}>{score}%</span>
                            ) : "—"}
                          </td>
                          <td style={{ padding: "10px 12px", color: w.rating ? COLORS.text : COLORS.muted }}>{w.rating ? `${w.rating}/10` : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "32px", padding: "16px", color: COLORS.muted, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
          <span style={{ fontWeight: "800", color: "#111" }}>muslim</span><span style={{ fontWeight: "400", color: "#111" }}>fluencer.</span> &nbsp;•&nbsp; 6-Week Creator Program
        </div>
      </div>
    </div>
  );
}
