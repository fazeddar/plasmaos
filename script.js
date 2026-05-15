const clock = document.getElementById("clock");
const LOCAL_DESKTOP_ORIGIN = "http://127.0.0.1:5500";
const LEGACY_CLOUD_CONFIG_STORAGE_KEY = "plasma-cloud-config-v1";

// One-time app config: set these once and all users on this app instance sync automatically.
const APP_SUPABASE_URL = "https://zcdwkwqdlmwwtyvebtbb.supabase.co";
const APP_SUPABASE_ANON_KEY = "sb_publishable_jsWGsU6H-gufdxYQHRScrw_LsufA4Kb";
const APP_CLOUD_SYNC_ENABLED = Boolean(APP_SUPABASE_URL && APP_SUPABASE_ANON_KEY);
const CLOUD_SYNC_DEBOUNCE_MS = 900;

if (window.location.protocol === "file:") {
  const redirectedUrl = `${LOCAL_DESKTOP_ORIGIN}/plasma-desktop.html${window.location.search}${window.location.hash}`;
  window.location.replace(redirectedUrl);
}

localStorage.removeItem(LEGACY_CLOUD_CONFIG_STORAGE_KEY);

const panel = document.querySelector(".panel");
const settingsWindow = document.getElementById("settingsWindow");
const terminalWindow = document.getElementById("terminalWindow");
const browserWindow = document.getElementById("browserWindow");
const fetchWindow = document.getElementById("fetchWindow");
const filesWindow = document.getElementById("filesWindow");
const codeWindow = document.getElementById("codeWindow");
const placesWindow = document.getElementById("placesWindow");
const launcherInfoWindow = document.getElementById("launcherInfoWindow");
const mp3Window = document.getElementById("mp3Window");
const widgetsWindow = document.getElementById("widgetsWindow");
const soundScopeWindow = document.getElementById("soundScopeWindow");
const terminalOutput = document.getElementById("terminalOutput");
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalInput");
const browserFrame = document.getElementById("browserFrame");
const browserForm = document.getElementById("browserForm");
const browserInput = document.getElementById("browserInput");
const browserHint = document.getElementById("browserHint");
const browserBackButton = document.getElementById("browserBackButton");
const browserForwardButton = document.getElementById("browserForwardButton");
const browserTabsList = document.getElementById("browserTabsList");
const browserAddTabButton = document.getElementById("browserAddTabButton");
const browserMinimizeButton = document.getElementById("browserMinimizeButton");
const fetchScreen = document.getElementById("fetchScreen");
const applyThemeButton = document.getElementById("applyThemeButton");
const resetThemeButton = document.getElementById("resetThemeButton");
const accentColor = document.getElementById("accentColor");
const accent2Color = document.getElementById("accent2Color");
const bg1Color = document.getElementById("bg1Color");
const bg2Color = document.getElementById("bg2Color");
const panelOpacity = document.getElementById("panelOpacity");
const glassOpacity = document.getElementById("glassOpacity");
const glowToggle = document.getElementById("glowToggle");
const compactPanelToggle = document.getElementById("compactPanelToggle");
const draggableWindows = [
  settingsWindow,
  terminalWindow,
  browserWindow,
  fetchWindow,
  filesWindow,
  codeWindow,
  placesWindow,
  launcherInfoWindow,
  mp3Window,
  widgetsWindow,
  soundScopeWindow,
].filter(Boolean);

let savePickerWindow;
let gitCloneWindow;
let savePickerBackButton;
let savePickerUpButton;
let savePickerPathInput;
let savePickerGrid;
let savePickerFileNameInput;
let savePickerConfirmButton;
let savePickerCancelButton;
let gitCloneWindow_elem;
let gitUrlInput;
let gitFileTypeSelect;
let gitFetchButton;
let gitPreviewContainer;
let gitFileList;
let gitLoadButton;
let gitBackButton;

function initializeDeferredElements() {
  savePickerWindow = document.getElementById("savePickerWindow");
  savePickerBackButton = document.getElementById("savePickerBackButton");
  savePickerUpButton = document.getElementById("savePickerUpButton");
  savePickerPathInput = document.getElementById("savePickerPathInput");
  savePickerGrid = document.getElementById("savePickerGrid");
  savePickerFileNameInput = document.getElementById("savePickerFileNameInput");
  savePickerConfirmButton = document.getElementById("savePickerConfirmButton");
  savePickerCancelButton = document.getElementById("savePickerCancelButton");
  gitCloneWindow = document.getElementById("gitCloneWindow");
  gitUrlInput = document.getElementById("gitUrlInput");
  gitFileTypeSelect = document.getElementById("gitFileTypeSelect");
  gitFetchButton = document.getElementById("gitFetchButton");
  gitPreviewContainer = document.getElementById("gitPreviewContainer");
  gitFileList = document.getElementById("gitFileList");
  gitLoadButton = document.getElementById("gitLoadButton");
  gitBackButton = document.getElementById("gitBackButton");

  draggableWindows.push(savePickerWindow, gitCloneWindow);
}
const launcherButton = document.getElementById("launcherButton");
const launcherMenu = document.getElementById("launcherMenu");
const launcherSearchInput = document.getElementById("launcherSearchInput");
const launcherCategoryButtons = Array.from(document.querySelectorAll(".launcher-category"));
const launcherTiles = Array.from(document.querySelectorAll(".launcher-tile"));
const launcherGrid = document.querySelector(".launcher-grid");
const footerApplications = document.getElementById("footerApplications");
const footerPlaces = document.getElementById("footerPlaces");
const footerSleep = document.getElementById("footerSleep");
const footerRestart = document.getElementById("footerRestart");
const footerShutdown = document.getElementById("footerShutdown");
const sessionUsernameLabel = document.getElementById("sessionUsernameLabel");
const desktopShortcutsRoot = document.getElementById("desktopShortcuts");
const taskbarPinsRoot = document.getElementById("taskbarPins");
const appContextMenu = document.getElementById("appContextMenu");
const ctxOpenApp = document.getElementById("ctxOpenApp");
const ctxDesktopAction = document.getElementById("ctxDesktopAction");
const ctxTaskbarAction = document.getElementById("ctxTaskbarAction");
const loginGate = document.getElementById("loginGate");
const loginTitle = document.getElementById("loginTitle");
const loginSubtitle = document.getElementById("loginSubtitle");
const loginSelectSection = document.getElementById("loginSelectSection");
const loginCreateSection = document.getElementById("loginCreateSection");
const loginUserSelect = document.getElementById("loginUserSelect");
const loginUsernameInput = document.getElementById("loginUsernameInput");
const loginEnterButton = document.getElementById("loginEnterButton");
const loginAddUserButton = document.getElementById("loginAddUserButton");
const loginCreateButton = document.getElementById("loginCreateButton");
const loginBackButton = document.getElementById("loginBackButton");
const loginCloudStatus = document.getElementById("loginCloudStatus");
const loginCloudUrlInput = document.getElementById("loginCloudUrlInput");
const loginCloudAnonKeyInput = document.getElementById("loginCloudAnonKeyInput");
const loginCloudEnableToggle = document.getElementById("loginCloudEnableToggle");
const loginCloudSaveButton = document.getElementById("loginCloudSaveButton");
const toastContainer = document.getElementById("toastContainer");
const powerOverlay = document.getElementById("powerOverlay");
const powerOverlayTitle = document.getElementById("powerOverlayTitle");
const powerOverlayText = document.getElementById("powerOverlayText");
const powerOverlayButton = document.getElementById("powerOverlayButton");
const filesBackButton = document.getElementById("filesBackButton");
const filesForwardButton = document.getElementById("filesForwardButton");
const filesUpButton = document.getElementById("filesUpButton");
const filesPathInput = document.getElementById("filesPathInput");
const filesFindInput = document.getElementById("filesFindInput");
const filesPreviewButton = document.getElementById("filesPreviewButton");
const filesSplitButton = document.getElementById("filesSplitButton");
const filesSidebarList = document.getElementById("filesSidebarList");
const folderGrid = document.getElementById("folderGrid");
const filesPreviewPanel = document.getElementById("filesPreviewPanel");
const filesStatusLeft = document.getElementById("filesStatusLeft");
const filesStatusRight = document.getElementById("filesStatusRight");
const filesContent = filesWindow?.querySelector(".files-content");
const filesMenuButtons = Array.from(document.querySelectorAll("[data-files-menu]"));
const filesFileMenuButton = document.getElementById("filesFileMenuButton");
const filesMenuDropdown = document.getElementById("filesMenuDropdown");
const filesMenuNewFolder = document.getElementById("filesMenuNewFolder");
const filesMenuNewFolderNamed = document.getElementById("filesMenuNewFolderNamed");
const filesMenuNewFile = document.getElementById("filesMenuNewFile");
const filesMenuUploadFile = document.getElementById("filesMenuUploadFile");
const filesMenuRename = document.getElementById("filesMenuRename");
const filesMenuMove = document.getElementById("filesMenuMove");
const filesMenuDelete = document.getElementById("filesMenuDelete");
const codeLanguageSelect = document.getElementById("codeLanguageSelect");
const codeFileNameInput = document.getElementById("codeFileNameInput");
const codeEditor = document.getElementById("codeEditor");
const codeRunButton = document.getElementById("codeRunButton");
const codeNewButton = document.getElementById("codeNewButton");
const codeSaveButton = document.getElementById("codeSaveButton");
const codeOutputText = document.getElementById("codeOutputText");
const codeOutputFrame = document.getElementById("codeOutputFrame");
const codeTerminalOutput = document.getElementById("codeTerminalOutput");
const codeTerminalForm = document.getElementById("codeTerminalForm");
const codeTerminalInput = document.getElementById("codeTerminalInput");
const codeCloneButton = document.getElementById("codeCloneButton");
const codeAddTabButton = document.getElementById("codeAddTabButton");
const codeUndoButton = document.getElementById("codeUndoButton");
const codeRedoButton = document.getElementById("codeRedoButton");
const codeTabsList = document.getElementById("codeTabsList");
const codeTabButtons = Array.from(document.querySelectorAll(".code-tab"));
const codeSubtabButtons = Array.from(document.querySelectorAll(".code-subtab"));
const desktopWidgetHost = document.getElementById("desktopWidgetHost");
const widgetToggleButtons = Array.from(document.querySelectorAll("[data-widget-toggle]"));
const terminalWidgetEditHint = document.getElementById("terminalWidgetEditHint");
const mp3AudioElement = document.getElementById("mp3AudioElement");
const mp3FileInput = document.getElementById("mp3FileInput");
const mp3LoadButton = document.getElementById("mp3LoadButton");
const mp3PlayButton = document.getElementById("mp3PlayButton");
const mp3Timeline = document.getElementById("mp3Timeline");
const mp3TimeLabel = document.getElementById("mp3TimeLabel");
const mp3TrackLabel = document.getElementById("mp3TrackLabel");
const mp3ModeLabel = document.getElementById("mp3ModeLabel");
const mp3VisualizerCanvas = document.getElementById("mp3VisualizerCanvas");
const soundScopeCanvas = document.getElementById("soundScopeCanvas");
const soundScopeStatus = document.getElementById("soundScopeStatus");

const defaultTheme = {
  accent: "#d9d9d9",
  accent2: "#9d9d9d",
  bg1: "#2a2a2a",
  bg2: "#464646",
  panelOpacity: "0.68",
  glassOpacity: "0.82",
  glowEnabled: "true",
  compactPanel: "false",
};

const terminalCommands = new Map();
let topWindowZIndex = 20;
const shellStartedAt = Date.now();
let activeLauncherCategory = "Favorites";
let powerMode = "none";

const launcherCategoryMap = {
  "System Settings": ["Favorites", "All Applications", "Settings", "System"],
  Terminal: ["Favorites", "All Applications", "Development", "Utilities", "System"],
  Launcher: ["Favorites", "All Applications", "Utilities", "System"],
  Files: ["Favorites", "All Applications", "Office", "Utilities", "Graphics"],
  "Code Studio": ["Favorites", "All Applications", "Development", "Utilities"],
  Browser: ["Favorites", "All Applications", "Internet", "Apps"],
  "MP3 Player": ["Favorites", "All Applications", "Utilities", "Apps"],
  Widgets: ["Favorites", "All Applications", "Utilities"],
  Utilities: ["Favorites", "All Applications", "Utilities", "System"],
};

const usersStorageKey = "plasma-users-v1";
const maxUsers = 2;
const appCatalog = new Map();
let currentUser = "";
let userDesktopState = {
  desktopShortcuts: [],
  taskbarPins: [],
};
let contextAppMeta = null;
let supabaseClient = null;
let cloudSaveTimer = null;
let cloudConfig = {
  enabled: false,
  url: "",
  anonKey: "",
};

const terminalState = {
  username: "plasma",
  hostname: "desktop",
  cwd: "/home/plasma",
  history: [],
};

const widgetDefaults = {
  clock: true,
  player: true,
  fetch: false,
  ascii: false,
  soundScope: false,
};

let widgetState = { ...widgetDefaults };

const widgetSpecs = {
  clock: { title: "Clock", colSpan: 1, rowSpan: 1 },
  player: { title: "Now Playing", colSpan: 2, rowSpan: 1 },
  fetch: { title: "Fetch", colSpan: 2, rowSpan: 2 },
  ascii: { title: "ASCII Pulse", colSpan: 1, rowSpan: 1 },
  soundScope: { title: "Sound Scope", colSpan: 2, rowSpan: 1 },
};

const widgetEditGrid = {
  cols: 5,
  rows: 4,
  gap: 14,
  padding: 24,
  bottomPadding: 96,
};

let widgetLayout = {
  clock: 0,
  player: 1,
  fetch: 5,
  ascii: 3,
  soundScope: 10,
};

let widgetEditMode = false;
let widgetDragState = null;
let widgetAsciiTimer = null;
let widgetAsciiFrameIndex = 0;

const widgetAsciiFrames = [
  [
    "  .-^-.",
    " / o o \\",
    " |  V  |",
    "  \\_=_/",
    " /|:::|\\",
  ].join("\n"),
  [
    "  .-^-.",
    " / o o \\",
    " |  o  |",
    "  \\_=_/",
    " /|:::|\\",
  ].join("\n"),
  [
    "  .-^-.",
    " / o o \\",
    " |  -  |",
    "  \\_=_/",
    " /|:::|\\",
  ].join("\n"),
  [
    "  .-^-.",
    " / o o \\",
    " |  _  |",
    "  \\_=_/",
    " /|:::|\\",
  ].join("\n"),
];

const audioState = {
  context: null,
  mp3Source: null,
  mp3Analyser: null,
  soundSource: null,
  soundAnalyser: null,
  soundStream: null,
  soundModeEnabled: false,
  frame: null,
  dataBuffer: null,
};

const terminalDirs = new Set([
  "/",
  "/home",
  "/home/plasma",
  "/home/plasma/Desktop",
  "/home/plasma/Documents",
  "/home/plasma/Downloads",
  "/home/plasma/Pictures",
  "/etc",
  "/var",
  "/var/log",
]);

const terminalFiles = new Map([
  [
    "/etc/os-release",
    [
      'NAME="Plasma Desktop"',
      'PRETTY_NAME="Plasma Desktop Shell"',
      'ID=plasma-desktop',
      'VERSION="1.0"',
      'HOME_URL="https://mercurywork.shop"',
    ].join("\n"),
  ],
  [
    "/home/plasma/README.txt",
    [
      "Welcome to your Plasma terminal.",
      "Try: help, fetch, ls, pwd, uname -a, cat /etc/os-release",
    ].join("\n"),
  ],
  [
    "/var/log/boot.log",
    [
      "[  OK  ] Started Plasma desktop simulation.",
      "[  OK  ] Loaded launcher, terminal, and browser services.",
    ].join("\n"),
  ],
]);

const filesHomePath = "/home/plasma";
const filesTree = new Map([
  ["/", [{ name: "home", type: "folder" }]],
  ["/home", [{ name: "plasma", type: "folder" }]],
  [
    filesHomePath,
    [
      { name: "Desktop", type: "folder" },
      { name: "Documents", type: "folder" },
      { name: "Downloads", type: "folder" },
      { name: "Music", type: "folder" },
      { name: "Pictures", type: "folder" },
      { name: "Videos", type: "folder" },
      { name: "Trash", type: "folder" },
      { name: "welcome.txt", type: "file", size: 92, content: "Welcome to Files.\nUse File menu for rename, move, upload, and more." },
    ],
  ],
  ["/home/plasma/Desktop", []],
  ["/home/plasma/Documents", []],
  ["/home/plasma/Downloads", []],
  ["/home/plasma/Music", []],
  ["/home/plasma/Pictures", []],
  ["/home/plasma/Videos", []],
  ["/home/plasma/Trash", []],
]);

const filesState = {
  currentPath: filesHomePath,
  selectedEntryName: "",
  selectedEntryType: "",
  selectedSidebarPath: "",
  backStack: [],
  forwardStack: [],
  query: "",
  preview: false,
  split: false,
  ascending: true,
};

const filesUploadInput = document.createElement("input");
filesUploadInput.type = "file";
filesUploadInput.multiple = true;
filesUploadInput.hidden = true;
document.body.appendChild(filesUploadInput);

const filesSidebarItems = [
  { label: "Home", path: "/home/plasma" },
  { label: "Desktop", path: "/home/plasma/Desktop" },
  { label: "Documents", path: "/home/plasma/Documents" },
  { label: "Downloads", path: "/home/plasma/Downloads" },
  { label: "Music", path: "/home/plasma/Music" },
  { label: "Pictures", path: "/home/plasma/Pictures" },
  { label: "Videos", path: "/home/plasma/Videos" },
  { label: "Trash", path: "/home/plasma/Trash" },
  { label: "Root", path: "/" },
];

const fetchAsciiLines = [
  "                   -`",
  "                  .o+`",
  "                 `ooo/",
  "                `+oooo:",
  "               `+oooooo:",
  "               -+oooooo+:",
  "             `/:-:++oooo+:",
  "            `/++++/+++++++:",
  "           `/++++++++++++++:",
  "          `/+++ooooooooooooo/`",
  "         ./ooosssso++osssssso+`",
  "        .oossssso-````/ossssss+`",
  "       -osssssso.      :ssssssso.",
  "      :osssssss/        osssso+++.",
  "     /ossssssss/        +ssssooo/-",
  "   `/ossssso+/:-        -:/+osssso+-",
  "  `+sso+:-`                 `.-/+oso:",
  " `++:.                           `-/+/",
  " .`                                 `",
];

function getShellUptimeText() {
  const elapsedMs = Date.now() - shellStartedAt;
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function renderFetchScreen() {
  const infoLines = [
    `${terminalState.username}@${terminalState.hostname}`,
    "----------------------------",
    "OS: Plasma Desktop v1.0",
    "Kernel: 6.8.0-custom",
    `Uptime: ${getShellUptimeText()}`,
    "Packages: 1560 (virtual-pacman)",
    "Shell: plasma-terminal 1.0",
    `Resolution: ${window.innerWidth}x${window.innerHeight}`,
    "DE: Plasma Web",
    "WM: Custom JS compositor",
    `WM Theme: Graphite ${bg1Color.value}`,
    `Theme: Accent ${accentColor.value}`,
    "Icons: Arc-style monochrome",
    "Terminal: plasma terminal",
    "Terminal Font: Monospace 12",
    `CPU: Browser Engine (${navigator.hardwareConcurrency || 8} cores)`,
    "GPU: WebGL Renderer",
    `Memory: ${(navigator.deviceMemory || 8) * 1024}MiB / 15903MiB`,
    "",
    "████ ████ ████ ████ ████ ████ ████ ████",
    "████ ████ ████ ████ ████ ████ ████ ████",
  ];

  const leftWidth = fetchAsciiLines.reduce((max, line) => Math.max(max, line.length), 0) + 6;
  const totalLines = Math.max(fetchAsciiLines.length, infoLines.length);
  const outputLines = [`[${terminalState.username}@${terminalState.hostname} ~]$ neofetch --ascii_distro custom`, ""];

  for (let i = 0; i < totalLines; i += 1) {
    const left = fetchAsciiLines[i] || "";
    const right = infoLines[i] || "";
    outputLines.push(`${left.padEnd(leftWidth, " ")}${right}`);
  }

  fetchScreen.textContent = outputLines.join("\n");
}

function openFetchWindow() {
  renderFetchScreen();
  handleWindowToggle("fetchWindow", true);
}

function applyLauncherFilters() {
  const query = launcherSearchInput.value.trim().toLowerCase();

  launcherTiles.forEach((tile) => {
    const appName = tile.dataset.appName || tile.querySelector("strong")?.textContent?.trim() || "";
    const categories = launcherCategoryMap[appName] || ["All Applications"];
    const categoryVisible = activeLauncherCategory === "All Applications" || categories.includes(activeLauncherCategory);
    const queryVisible = !query || appName.toLowerCase().includes(query);
    tile.style.display = categoryVisible && queryVisible ? "grid" : "none";
  });

  launcherGrid.setAttribute("aria-label", activeLauncherCategory);
}

function resolvePath(inputPath = "", basePath = terminalState.cwd) {
  const rawPath = inputPath.trim();
  const startPath = rawPath.startsWith("/") ? rawPath : `${basePath}/${rawPath}`;
  const segments = startPath.split("/");
  const normalizedSegments = [];

  segments.forEach((segment) => {
    if (!segment || segment === ".") {
      return;
    }
    if (segment === "..") {
      normalizedSegments.pop();
      return;
    }
    normalizedSegments.push(segment);
  });

  return `/${normalizedSegments.join("/")}`;
}

function parentPath(path) {
  if (path === "/") {
    return null;
  }

  const parts = path.split("/").filter(Boolean);
  if (parts.length <= 1) {
    return "/";
  }

  return `/${parts.slice(0, -1).join("/")}`;
}

function baseName(path) {
  if (path === "/") {
    return "/";
  }

  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] || "/";
}

function isDirectory(path) {
  return terminalDirs.has(path);
}

function displayPath(path = terminalState.cwd) {
  const homePath = "/home/plasma";
  if (path === homePath) {
    return "~";
  }
  if (path.startsWith(`${homePath}/`)) {
    return `~${path.slice(homePath.length)}`;
  }
  return path;
}

function listDirectory(path = terminalState.cwd) {
  if (!isDirectory(path)) {
    return null;
  }

  const dirEntries = [];
  const fileEntries = [];

  terminalDirs.forEach((dirPath) => {
    if (dirPath === path) {
      return;
    }
    if (parentPath(dirPath) === path) {
      dirEntries.push(`${baseName(dirPath)}/`);
    }
  });

  terminalFiles.forEach((_, filePath) => {
    if (parentPath(filePath) === path) {
      fileEntries.push(baseName(filePath));
    }
  });

  const entries = [...dirEntries.sort(), ...fileEntries.sort()];
  return entries.join("  ");
}

function formatPrompt() {
  return `${terminalState.username}@${terminalState.hostname}:${displayPath()}$`;
}

function registerTerminalCommand(name, handler, helpText) {
  terminalCommands.set(name, { handler, helpText });
}

function printTerminalLine(text, className = "result") {
  const line = document.createElement("div");
  line.className = `terminal-line ${className}`;
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function printTerminalBanner() {
  printTerminalLine("Plasma Desktop terminal ready.", "result");
  printTerminalLine("Type help to see available commands.", "result");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2800);
}

function normalizeUsername(rawValue = "") {
  return rawValue.trim().replace(/\s+/g, " ").slice(0, 24);
}

function setCloudStatus(message) {
  if (loginCloudStatus) {
    loginCloudStatus.textContent = message;
  }
}

function readCloudConfigFromStorage() {
  return {
    enabled: APP_CLOUD_SYNC_ENABLED,
    url: APP_SUPABASE_URL.trim(),
    anonKey: APP_SUPABASE_ANON_KEY.trim(),
  };
}

function saveCloudConfigToStorage(nextConfig) {
  cloudConfig = {
    enabled: Boolean(nextConfig.enabled),
    url: (nextConfig.url || "").trim(),
    anonKey: (nextConfig.anonKey || "").trim(),
  };
}

function applyCloudConfigToInputs() {
  if (loginCloudUrlInput) {
    loginCloudUrlInput.value = cloudConfig.url;
  }
  if (loginCloudAnonKeyInput) {
    loginCloudAnonKeyInput.value = cloudConfig.anonKey;
  }
  if (loginCloudEnableToggle) {
    loginCloudEnableToggle.checked = cloudConfig.enabled;
  }
}

function collectCloudConfigFromInputs() {
  return {
    enabled: cloudConfig.enabled,
    url: cloudConfig.url,
    anonKey: cloudConfig.anonKey,
  };
}

function isCloudConfigured() {
  return cloudConfig.enabled && Boolean(cloudConfig.url) && Boolean(cloudConfig.anonKey);
}

async function ensureSupabaseClient() {
  if (!isCloudConfigured()) {
    return null;
  }
  if (supabaseClient) {
    return supabaseClient;
  }
  if (!window.supabase?.createClient) {
    setCloudStatus("Cloud sync: Supabase library unavailable, using local fallback");
    return null;
  }

  try {
    const candidate = window.supabase.createClient(cloudConfig.url, cloudConfig.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const probe = await candidate.from("plasma_users").select("username").limit(1);
    if (probe.error) {
      throw probe.error;
    }
    supabaseClient = candidate;
    setCloudStatus("Cloud sync: Connected");
    return supabaseClient;
  } catch (error) {
    supabaseClient = null;
    const message = String(error?.message || "");
    if (message.includes("PGRST205") || message.includes("schema cache") || message.includes("public.plasma_users")) {
      setCloudStatus("Cloud sync: Setup incomplete (run schema SQL), local mode");
    } else {
      setCloudStatus("Cloud sync: Could not connect, using local fallback");
    }
    return null;
  }
}

function getSavedUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(usersStorageKey) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((name) => typeof name === "string" && name.trim());
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

async function loadUsersFromCloud() {
  const client = await ensureSupabaseClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client.from("plasma_users").select("username").order("created_at", { ascending: true });
    if (error) {
      throw error;
    }
    const users = Array.isArray(data)
      ? data.map((row) => normalizeUsername(row.username || "")).filter(Boolean)
      : [];
    return users;
  } catch {
    setCloudStatus("Cloud sync: Read failed, using local fallback");
    return null;
  }
}

async function saveUsersToCloud(users) {
  const client = await ensureSupabaseClient();
  if (!client) {
    return false;
  }

  try {
    const uniqueUsers = users
      .map((name) => normalizeUsername(name))
      .filter(Boolean)
      .slice(0, maxUsers);
    const rows = uniqueUsers.map((username) => ({ username }));
    const { error } = await client.from("plasma_users").upsert(rows, { onConflict: "username" });
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    const message = String(error?.message || "");
    if (message.includes("row-level security policy") || message.includes("42501")) {
      setCloudStatus("Cloud sync: RLS blocked writes (run SQL policy step), local mode");
    } else {
      setCloudStatus("Cloud sync: Write failed, using local fallback");
    }
    return false;
  }
}

async function getSavedUsersWithFallback() {
  const localUsers = getSavedUsers();
  const cloudUsers = await loadUsersFromCloud();

  if (!cloudUsers) {
    return localUsers;
  }

  if (cloudUsers.length > 0) {
    saveUsers(cloudUsers);
    return cloudUsers;
  }

  if (localUsers.length > 0) {
    await saveUsersToCloud(localUsers);
    return localUsers;
  }

  return [];
}

function getUserStateStorageKey(username) {
  return `plasma-user-state-${username.toLowerCase()}`;
}

function getWidgetStateStorageKey(username) {
  return `plasma-widget-state-${username.toLowerCase()}`;
}

function loadWidgetState(username) {
  try {
    const parsed = JSON.parse(localStorage.getItem(getWidgetStateStorageKey(username)) || "null");
    if (!parsed || typeof parsed !== "object") {
      return {
        ...widgetDefaults,
        layout: { ...widgetLayout },
      };
    }

    const nextLayout = { ...widgetLayout };
    if (parsed.layout && typeof parsed.layout === "object") {
      Object.keys(nextLayout).forEach((widgetId) => {
        const raw = parsed.layout[widgetId];
        if (Number.isInteger(raw) && raw >= 0) {
          nextLayout[widgetId] = raw;
        }
      });
    }

    return {
      clock: parsed.clock !== false,
      player: parsed.player !== false,
      fetch: parsed.fetch !== false,
      ascii: parsed.ascii !== false,
      soundScope: parsed.soundScope === true,
      layout: nextLayout,
    };
  } catch {
    return {
      ...widgetDefaults,
      layout: { ...widgetLayout },
    };
  }
}

function saveWidgetState() {
  if (!currentUser) {
    return;
  }
  localStorage.setItem(
    getWidgetStateStorageKey(currentUser),
    JSON.stringify({
      clock: Boolean(widgetState.clock),
      player: Boolean(widgetState.player),
      fetch: Boolean(widgetState.fetch),
      ascii: Boolean(widgetState.ascii),
      soundScope: Boolean(widgetState.soundScope),
      layout: widgetLayout,
    })
  );
}

function getDefaultUserState() {
  return {
    desktopShortcuts: [],
    taskbarPins: [],
  };
}

function loadUserDesktopState(username) {
  try {
    const parsed = JSON.parse(localStorage.getItem(getUserStateStorageKey(username)) || "null");
    if (!parsed || typeof parsed !== "object") {
      return getDefaultUserState();
    }
    return {
      desktopShortcuts: Array.isArray(parsed.desktopShortcuts) ? parsed.desktopShortcuts : [],
      taskbarPins: Array.isArray(parsed.taskbarPins) ? parsed.taskbarPins : [],
    };
  } catch {
    return getDefaultUserState();
  }
}

function saveUserDesktopState() {
  if (!currentUser) {
    return;
  }
  localStorage.setItem(getUserStateStorageKey(currentUser), JSON.stringify(userDesktopState));

  if (cloudSaveTimer) {
    clearTimeout(cloudSaveTimer);
  }
  cloudSaveTimer = setTimeout(async () => {
    const client = await ensureSupabaseClient();
    if (!client || !currentUser) {
      return;
    }

    try {
      const { error } = await client.from("plasma_user_state").upsert(
        {
          username: currentUser,
          desktop_shortcuts: userDesktopState.desktopShortcuts,
          taskbar_pins: userDesktopState.taskbarPins,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "username" }
      );
      if (error) {
        throw error;
      }
      setCloudStatus("Cloud sync: Saved");
    } catch (error) {
      const message = String(error?.message || "");
      if (message.includes("row-level security policy") || message.includes("42501")) {
        setCloudStatus("Cloud sync: RLS blocked state save (run SQL policy step), local mode");
      } else {
        setCloudStatus("Cloud sync: Save failed, local fallback active");
      }
    }
  }, CLOUD_SYNC_DEBOUNCE_MS);
}

async function loadUserDesktopStateFromCloud(username) {
  const client = await ensureSupabaseClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from("plasma_user_state")
      .select("desktop_shortcuts, taskbar_pins")
      .eq("username", username)
      .maybeSingle();
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    return {
      desktopShortcuts: Array.isArray(data.desktop_shortcuts) ? data.desktop_shortcuts : [],
      taskbarPins: Array.isArray(data.taskbar_pins) ? data.taskbar_pins : [],
    };
  } catch {
    setCloudStatus("Cloud sync: State read failed, using local fallback");
    return null;
  }
}

async function hydrateStateFromCloud(username) {
  const cloudState = await loadUserDesktopStateFromCloud(username);
  if (!cloudState || currentUser !== username) {
    return;
  }
  userDesktopState = cloudState;
  localStorage.setItem(getUserStateStorageKey(username), JSON.stringify(cloudState));
  renderDesktopShortcuts();
  renderTaskbarPins();
  setCloudStatus("Cloud sync: Loaded");
}

function buildAppCatalog() {
  appCatalog.clear();
  launcherTiles.forEach((tile) => {
    const windowId = tile.dataset.openWindow;
    if (!windowId) {
      return;
    }
    const appName = tile.dataset.appName || tile.querySelector("strong")?.textContent?.trim() || windowId;
    const appIcon = tile.querySelector("span")?.textContent?.trim() || "•";
    appCatalog.set(windowId, { windowId, appName, appIcon });
  });
}

function getAppMeta(windowId) {
  return appCatalog.get(windowId) || null;
}

function openAppWindow(windowId) {
  if (!windowId) {
    return;
  }
  handleWindowToggle(windowId, true);
  toggleLauncherMenu(false);
}

function renderDesktopShortcuts() {
  if (!desktopShortcutsRoot) {
    return;
  }

  desktopShortcutsRoot.innerHTML = "";
  userDesktopState.desktopShortcuts.forEach((windowId) => {
    const appMeta = getAppMeta(windowId);
    if (!appMeta) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "desktop-shortcut";
    button.dataset.windowId = windowId;
    button.innerHTML = `<span class="shortcut-icon">${appMeta.appIcon}</span><span class="shortcut-label">${appMeta.appName}</span>`;
    button.addEventListener("click", () => openAppWindow(windowId));
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showAppContextMenu(event.clientX, event.clientY, appMeta);
    });
    desktopShortcutsRoot.appendChild(button);
  });
}

function renderTaskbarPins() {
  if (!taskbarPinsRoot) {
    return;
  }

  taskbarPinsRoot.innerHTML = "";
  userDesktopState.taskbarPins.forEach((windowId) => {
    const appMeta = getAppMeta(windowId);
    if (!appMeta) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "taskbar-app";
    button.dataset.windowId = windowId;
    button.title = appMeta.appName;
    button.textContent = appMeta.appIcon;
    button.addEventListener("click", () => openAppWindow(windowId));
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showAppContextMenu(event.clientX, event.clientY, appMeta);
    });
    taskbarPinsRoot.appendChild(button);
  });
}

function formatPlaybackTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "00:00";
  }
  const seconds = Math.floor(totalSeconds);
  const minutesPart = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secondsPart = (seconds % 60).toString().padStart(2, "0");
  return `${minutesPart}:${secondsPart}`;
}

function syncMp3PlayButtonLabels() {
  if (!mp3AudioElement) {
    return;
  }

  const nextLabel = mp3AudioElement.paused ? "▶" : "❚❚";
  if (mp3PlayButton) {
    mp3PlayButton.textContent = nextLabel;
  }

  const widgetPlayButton = document.getElementById("widgetPlayerPlayButton");
  if (widgetPlayButton) {
    widgetPlayButton.textContent = nextLabel;
  }
}

function updateMp3TimeDisplay() {
  if (!mp3AudioElement || !mp3TimeLabel || !mp3Timeline) {
    return;
  }

  const current = mp3AudioElement.currentTime || 0;
  const duration = mp3AudioElement.duration || 0;
  const ratio = duration > 0 ? current / duration : 0;
  mp3Timeline.value = String(Math.max(0, Math.min(1000, Math.round(ratio * 1000))));
  mp3TimeLabel.textContent = `${formatPlaybackTime(current)} / ${formatPlaybackTime(duration)}`;

  const widgetTimeline = document.getElementById("widgetPlayerTimeline");
  if (widgetTimeline) {
    widgetTimeline.value = mp3Timeline.value;
  }

  const playerProgress = document.getElementById("widgetPlayerProgress");
  if (playerProgress) {
    playerProgress.textContent = `${formatPlaybackTime(current)} / ${formatPlaybackTime(duration)}`;
  }
}

function updatePlayerWidgetDetails() {
  const playerTitle = document.getElementById("widgetPlayerTitle");
  const playerProgress = document.getElementById("widgetPlayerProgress");

  if (playerTitle) {
    playerTitle.textContent = mp3TrackLabel?.textContent || "No track loaded";
  }
  if (playerProgress) {
    playerProgress.textContent = mp3TimeLabel?.textContent || "00:00 / 00:00";
  }

  syncMp3PlayButtonLabels();
}

function updateWidgetButtons() {
  const labelMap = {
    clock: "Clock Widget",
    player: "Now Playing Widget",
    fetch: "Fetch Widget",
    ascii: "ASCII Animation Widget",
    soundScope: "Sound Scope Widget",
  };

  widgetToggleButtons.forEach((button) => {
    const key = button.dataset.widgetToggle;
    if (!key) {
      return;
    }
    const enabled = Boolean(widgetState[key]);
    button.classList.toggle("primary", enabled);
    button.textContent = `${enabled ? "Hide" : "Show"} ${labelMap[key] || "Widget"}`;
  });

  document.querySelectorAll("[data-widget-edit]").forEach((button) => {
    const isOn = button.getAttribute("data-widget-edit") === "on";
    button.classList.toggle("primary", widgetEditMode && isOn);
    if (isOn) {
      button.textContent = widgetEditMode ? "Widget Edit Mode Active" : "Enter Widget Edit Mode";
    }
  });
}

function getVisibleWidgetIds() {
  return Object.keys(widgetSpecs).filter((id) => Boolean(widgetState[id]));
}

function getWidgetGridMetrics() {
  if (!desktopWidgetHost) {
    return null;
  }

  const hostWidth = Math.max(200, desktopWidgetHost.clientWidth);
  const hostHeight = Math.max(200, desktopWidgetHost.clientHeight);
  const usableWidth = hostWidth - widgetEditGrid.padding * 2;
  const usableHeight = hostHeight - widgetEditGrid.padding - widgetEditGrid.bottomPadding;
  const cellWidth = Math.max(130, Math.floor((usableWidth - widgetEditGrid.gap * (widgetEditGrid.cols - 1)) / widgetEditGrid.cols));
  const cellHeight = Math.max(90, Math.floor((usableHeight - widgetEditGrid.gap * (widgetEditGrid.rows - 1)) / widgetEditGrid.rows));

  return {
    hostWidth,
    hostHeight,
    cellWidth,
    cellHeight,
  };
}

function getWidgetSlotRect(slot, widgetId, metrics) {
  const spec = widgetSpecs[widgetId] || { colSpan: 1, rowSpan: 1 };
  const col = slot % widgetEditGrid.cols;
  const row = Math.floor(slot / widgetEditGrid.cols);
  const left = widgetEditGrid.padding + col * (metrics.cellWidth + widgetEditGrid.gap);
  const top = widgetEditGrid.padding + row * (metrics.cellHeight + widgetEditGrid.gap);
  const width = metrics.cellWidth * spec.colSpan + widgetEditGrid.gap * (spec.colSpan - 1);
  const height = metrics.cellHeight * spec.rowSpan + widgetEditGrid.gap * (spec.rowSpan - 1);
  return { left, top, width, height, col, row };
}

function getWidgetCellsForSlot(slot, widgetId) {
  const spec = widgetSpecs[widgetId] || { colSpan: 1, rowSpan: 1 };
  const startCol = slot % widgetEditGrid.cols;
  const startRow = Math.floor(slot / widgetEditGrid.cols);
  const cells = [];

  for (let rowOffset = 0; rowOffset < spec.rowSpan; rowOffset += 1) {
    for (let colOffset = 0; colOffset < spec.colSpan; colOffset += 1) {
      const col = startCol + colOffset;
      const row = startRow + rowOffset;
      cells.push(row * widgetEditGrid.cols + col);
    }
  }

  return {
    cells,
    startCol,
    startRow,
    spec,
  };
}

function canPlaceWidgetAt(slot, widgetId, occupiedCells) {
  const { cells, startCol, startRow, spec } = getWidgetCellsForSlot(slot, widgetId);
  if (startCol + spec.colSpan > widgetEditGrid.cols || startRow + spec.rowSpan > widgetEditGrid.rows) {
    return false;
  }
  return cells.every((cell) => !occupiedCells.has(cell));
}

function buildOccupiedCellSet(excludeWidgetId = "") {
  const occupied = new Set();
  getVisibleWidgetIds().forEach((widgetId) => {
    if (widgetId === excludeWidgetId) {
      return;
    }
    const slot = Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0;
    const { cells } = getWidgetCellsForSlot(slot, widgetId);
    cells.forEach((cell) => occupied.add(cell));
  });
  return occupied;
}

function findBestSlotForWidget(widgetId, preferredSlot = 0) {
  const occupied = buildOccupiedCellSet(widgetId);
  if (canPlaceWidgetAt(preferredSlot, widgetId, occupied)) {
    return preferredSlot;
  }

  const totalSlots = widgetEditGrid.cols * widgetEditGrid.rows;
  for (let slot = 0; slot < totalSlots; slot += 1) {
    if (canPlaceWidgetAt(slot, widgetId, occupied)) {
      return slot;
    }
  }

  return preferredSlot;
}

function normalizeWidgetLayout() {
  getVisibleWidgetIds().forEach((widgetId) => {
    const requested = Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0;
    widgetLayout[widgetId] = findBestSlotForWidget(widgetId, requested);
  });
}

function renderWidgetEditGrid(metrics) {
  if (!desktopWidgetHost || !widgetEditMode) {
    return;
  }

  const grid = document.createElement("div");
  grid.className = "widget-edit-grid";

  const totalSlots = widgetEditGrid.cols * widgetEditGrid.rows;
  for (let slot = 0; slot < totalSlots; slot += 1) {
    const rect = getWidgetSlotRect(slot, "clock", metrics);
    const box = document.createElement("div");
    box.className = "widget-edit-grid-cell";
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
    box.style.width = `${metrics.cellWidth}px`;
    box.style.height = `${metrics.cellHeight}px`;
    grid.appendChild(box);
  }

  desktopWidgetHost.appendChild(grid);

  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.id = "widgetEditExitButton";
  exitButton.className = "widget-edit-exit-button";
  exitButton.textContent = "Exit Widget Edit";
  desktopWidgetHost.appendChild(exitButton);
}

function updateFetchWidgetDetails() {
  const fetchBody = document.getElementById("widgetFetchBody");
  if (!fetchBody) {
    return;
  }

  const lines = [
    `${terminalState.username}@${terminalState.hostname}`,
    `Uptime: ${getShellUptimeText()}`,
    `Resolution: ${window.innerWidth}x${window.innerHeight}`,
    `CPU: ${navigator.hardwareConcurrency || 8} cores`,
  ];

  fetchBody.textContent = lines.join("\n");
}

function updateAsciiWidgetFrame() {
  const asciiFrame = document.getElementById("widgetAsciiFrame");
  if (!asciiFrame) {
    return;
  }
  asciiFrame.textContent = widgetAsciiFrames[widgetAsciiFrameIndex % widgetAsciiFrames.length];
}

function syncAsciiAnimationTimer() {
  const shouldRun = Boolean(widgetState.ascii);
  if (shouldRun && !widgetAsciiTimer) {
    widgetAsciiTimer = setInterval(() => {
      widgetAsciiFrameIndex = (widgetAsciiFrameIndex + 1) % widgetAsciiFrames.length;
      updateAsciiWidgetFrame();
    }, 260);
  } else if (!shouldRun && widgetAsciiTimer) {
    clearInterval(widgetAsciiTimer);
    widgetAsciiTimer = null;
  }
}

function createWidgetElement(widgetId) {
  const widget = document.createElement("section");
  widget.className = "desktop-widget";
  widget.dataset.widgetId = widgetId;

  if (widgetEditMode) {
    widget.classList.add("is-editable");
  }

  const title = widgetSpecs[widgetId]?.title || "Widget";

  if (widgetId === "clock") {
    widget.innerHTML = `<div class="desktop-widget-title">${title}</div><div id="widgetClockValue" class="desktop-widget-value">--:--</div>`;
    return widget;
  }

  if (widgetId === "player") {
    widget.innerHTML = [
      `<div class="desktop-widget-title">${title}</div>`,
      '<div id="widgetPlayerTitle" class="desktop-widget-value">No track loaded</div>',
      '<div class="desktop-widget-player-controls">',
      '  <button id="widgetPlayerPlayButton" type="button" aria-label="Play or pause from widget">▶</button>',
      '  <input id="widgetPlayerTimeline" type="range" min="0" max="1000" value="0" aria-label="Widget timeline" />',
      '</div>',
      '<div id="widgetPlayerProgress" class="desktop-widget-title">00:00 / 00:00</div>',
      '<canvas id="widgetPlayerVisualizerCanvas" width="260" height="70" aria-label="Player widget visualizer"></canvas>',
    ].join("");
    return widget;
  }

  if (widgetId === "fetch") {
    widget.innerHTML = [
      `<div class="desktop-widget-title">${title}</div>`,
      '<pre id="widgetFetchBody" class="widget-fetch-body"></pre>',
    ].join("");
    return widget;
  }

  if (widgetId === "ascii") {
    widget.innerHTML = [
      `<div class="desktop-widget-title">${title}</div>`,
      '<pre id="widgetAsciiFrame" class="widget-ascii-frame"></pre>',
    ].join("");
    return widget;
  }

  widget.innerHTML = [
    `<div class="desktop-widget-title">${title}</div>`,
    '<canvas id="widgetSoundScopeCanvas" width="260" height="70" aria-label="Sound scope widget visualizer"></canvas>',
  ].join("");
  return widget;
}

function applyWidgetLayout(metrics) {
  if (!desktopWidgetHost || !metrics) {
    return;
  }

  getVisibleWidgetIds().forEach((widgetId) => {
    const element = desktopWidgetHost.querySelector(`[data-widget-id="${widgetId}"]`);
    if (!element) {
      return;
    }
    const slot = Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0;
    const rect = getWidgetSlotRect(slot, widgetId, metrics);
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top}px`;
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
  });
}

function setWidgetEditMode(enabled) {
  widgetEditMode = Boolean(enabled);
  renderDesktopWidgets();
  if (widgetEditMode) {
    showToast("Widget edit mode enabled");
  } else {
    showToast("Widget edit mode disabled");
  }
}

function renderDesktopWidgets() {
  if (!desktopWidgetHost) {
    return;
  }

  desktopWidgetHost.innerHTML = "";
  desktopWidgetHost.classList.toggle("is-edit-mode", widgetEditMode);

  normalizeWidgetLayout();

  const visibleWidgets = getVisibleWidgetIds();
  visibleWidgets.forEach((widgetId) => {
    desktopWidgetHost.appendChild(createWidgetElement(widgetId));
  });

  const metrics = getWidgetGridMetrics();
  if (metrics) {
    applyWidgetLayout(metrics);
    renderWidgetEditGrid(metrics);
  }

  updateWidgetButtons();
  updateClock();
  updatePlayerWidgetDetails();
  updateMp3TimeDisplay();
  updateFetchWidgetDetails();
  updateAsciiWidgetFrame();
  syncAsciiAnimationTimer();
}

async function ensureAudioContextReady() {
  if (!audioState.context) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      throw new Error("Web Audio API unavailable in this browser");
    }
    audioState.context = new AudioCtx();
  }

  if (audioState.context.state === "suspended") {
    await audioState.context.resume();
  }

  return audioState.context;
}

async function ensureMp3AnalyserReady() {
  if (!mp3AudioElement) {
    return null;
  }

  const context = await ensureAudioContextReady();
  if (!audioState.mp3Source) {
    audioState.mp3Source = context.createMediaElementSource(mp3AudioElement);
    audioState.mp3Analyser = context.createAnalyser();
    audioState.mp3Analyser.fftSize = 256;
    audioState.mp3Source.connect(audioState.mp3Analyser);
    audioState.mp3Analyser.connect(context.destination);
  }

  return audioState.mp3Analyser;
}

function resizeCanvas(canvas) {
  if (!canvas) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function drawAnalyserBars(canvas, analyser, tint = "#b8d8ff") {
  if (!canvas) {
    return;
  }

  resizeCanvas(canvas);
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(10, 16, 26, 0.84)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (!analyser) {
    return;
  }

  if (!audioState.dataBuffer || audioState.dataBuffer.length !== analyser.frequencyBinCount) {
    audioState.dataBuffer = new Uint8Array(analyser.frequencyBinCount);
  }
  analyser.getByteFrequencyData(audioState.dataBuffer);

  const bars = 44;
  const gap = 2;
  const barWidth = Math.max(2, Math.floor((canvas.width - gap * (bars - 1)) / bars));
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, tint);
  gradient.addColorStop(1, "#6f7b95");
  context.fillStyle = gradient;

  for (let index = 0; index < bars; index += 1) {
    const bufferIndex = Math.floor((index / bars) * audioState.dataBuffer.length);
    const amplitude = audioState.dataBuffer[bufferIndex] / 255;
    const barHeight = Math.max(4, amplitude * (canvas.height - 8));
    const x = index * (barWidth + gap);
    const y = canvas.height - barHeight;
    context.fillRect(x, y, barWidth, barHeight);
  }
}

function visualizerFrame() {
  const activeAnalyser = audioState.soundModeEnabled && audioState.soundAnalyser ? audioState.soundAnalyser : audioState.mp3Analyser;
  drawAnalyserBars(mp3VisualizerCanvas, activeAnalyser, "#a9cdf7");
  drawAnalyserBars(document.getElementById("widgetPlayerVisualizerCanvas"), activeAnalyser, "#a9cdf7");
  drawAnalyserBars(soundScopeCanvas, audioState.soundAnalyser, "#c0ffc2");
  drawAnalyserBars(document.getElementById("widgetSoundScopeCanvas"), audioState.soundAnalyser, "#c0ffc2");

  if (audioState.mp3Analyser || audioState.soundAnalyser || audioState.soundModeEnabled) {
    audioState.frame = window.requestAnimationFrame(visualizerFrame);
  } else {
    audioState.frame = null;
  }
}

function startVisualizerLoop() {
  if (!audioState.frame) {
    audioState.frame = window.requestAnimationFrame(visualizerFrame);
  }
}

function updateMp3ModeLabel() {
  if (!mp3ModeLabel) {
    return;
  }
  mp3ModeLabel.textContent = audioState.soundModeEnabled ? "mode: sound" : "mode: mp3";
}

function stopSoundMode() {
  if (audioState.soundStream) {
    audioState.soundStream.getTracks().forEach((track) => track.stop());
  }
  audioState.soundStream = null;
  audioState.soundSource = null;
  audioState.soundAnalyser = null;
  audioState.soundModeEnabled = false;
  widgetState.soundScope = false;
  saveWidgetState();
  renderDesktopWidgets();
  updateMp3ModeLabel();
  if (soundScopeStatus) {
    soundScopeStatus.textContent = "Sound mode stopped. Use terminal command: soundmode on";
  }
  handleWindowToggle("soundScopeWindow", false);
}

async function startSoundMode() {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    throw new Error("Browser audio capture is unavailable");
  }

  const context = await ensureAudioContextReady();
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  const audioTracks = stream.getAudioTracks();
  if (!audioTracks.length) {
    stream.getTracks().forEach((track) => track.stop());
    throw new Error("No audio track was shared. Enable tab audio and try again.");
  }

  stopSoundMode();
  audioState.soundStream = stream;
  audioState.soundSource = context.createMediaStreamSource(stream);
  audioState.soundAnalyser = context.createAnalyser();
  audioState.soundAnalyser.fftSize = 256;
  audioState.soundSource.connect(audioState.soundAnalyser);
  audioState.soundModeEnabled = true;
  widgetState.soundScope = true;
  saveWidgetState();
  renderDesktopWidgets();
  updateMp3ModeLabel();
  startVisualizerLoop();
  if (soundScopeStatus) {
    soundScopeStatus.textContent = "Sound mode active: visualizing captured browser audio";
  }

  audioTracks[0].addEventListener("ended", () => {
    stopSoundMode();
    showToast("Sound mode ended");
  });
}

function hasDesktopShortcut(windowId) {
  return userDesktopState.desktopShortcuts.includes(windowId);
}

function hasTaskbarPin(windowId) {
  return userDesktopState.taskbarPins.includes(windowId);
}

function addDesktopShortcut(windowId) {
  if (hasDesktopShortcut(windowId)) {
    showToast("Shortcut already on desktop");
    return;
  }
  userDesktopState.desktopShortcuts.push(windowId);
  saveUserDesktopState();
  renderDesktopShortcuts();
  showToast("Desktop shortcut added");
}

function removeDesktopShortcut(windowId) {
  userDesktopState.desktopShortcuts = userDesktopState.desktopShortcuts.filter((id) => id !== windowId);
  saveUserDesktopState();
  renderDesktopShortcuts();
  showToast("Desktop shortcut removed");
}

function pinTaskbar(windowId) {
  if (hasTaskbarPin(windowId)) {
    showToast("Already pinned to taskbar");
    return;
  }
  userDesktopState.taskbarPins.push(windowId);
  saveUserDesktopState();
  renderTaskbarPins();
  showToast("Pinned to taskbar");
}

function unpinTaskbar(windowId) {
  userDesktopState.taskbarPins = userDesktopState.taskbarPins.filter((id) => id !== windowId);
  saveUserDesktopState();
  renderTaskbarPins();
  showToast("Unpinned from taskbar");
}

function hideAppContextMenu() {
  if (!appContextMenu) {
    return;
  }
  appContextMenu.hidden = true;
  contextAppMeta = null;
}

function showAppContextMenu(clientX, clientY, appMeta) {
  if (!appContextMenu) {
    return;
  }

  contextAppMeta = appMeta;
  ctxOpenApp.textContent = `Open ${appMeta.appName}`;
  ctxDesktopAction.textContent = hasDesktopShortcut(appMeta.windowId) ? "Remove desktop shortcut" : "Add desktop shortcut";
  ctxTaskbarAction.textContent = hasTaskbarPin(appMeta.windowId) ? "Unpin from taskbar" : "Pin to taskbar";

  appContextMenu.hidden = false;
  const menuWidth = 210;
  const menuHeight = 120;
  const x = Math.min(clientX, window.innerWidth - menuWidth - 8);
  const y = Math.min(clientY, window.innerHeight - menuHeight - 8);
  appContextMenu.style.left = `${Math.max(8, x)}px`;
  appContextMenu.style.top = `${Math.max(8, y)}px`;
}

function initializeAppContextMenu() {
  if (!appContextMenu) {
    return;
  }

  ctxOpenApp?.addEventListener("click", () => {
    if (contextAppMeta) {
      openAppWindow(contextAppMeta.windowId);
    }
    hideAppContextMenu();
  });

  ctxDesktopAction?.addEventListener("click", () => {
    if (contextAppMeta) {
      if (hasDesktopShortcut(contextAppMeta.windowId)) {
        removeDesktopShortcut(contextAppMeta.windowId);
      } else {
        addDesktopShortcut(contextAppMeta.windowId);
      }
    }
    hideAppContextMenu();
  });

  ctxTaskbarAction?.addEventListener("click", () => {
    if (contextAppMeta) {
      if (hasTaskbarPin(contextAppMeta.windowId)) {
        unpinTaskbar(contextAppMeta.windowId);
      } else {
        pinTaskbar(contextAppMeta.windowId);
      }
    }
    hideAppContextMenu();
  });
}

function enterSession(username) {
  const cleanName = normalizeUsername(username);
  if (!cleanName) {
    return;
  }

  currentUser = cleanName;
  terminalState.username = cleanName.toLowerCase();
  if (sessionUsernameLabel) {
    sessionUsernameLabel.textContent = cleanName;
  }
  if (loginTitle) {
    loginTitle.textContent = cleanName;
  }

  userDesktopState = loadUserDesktopState(cleanName);
  const savedWidgetState = loadWidgetState(cleanName);
  widgetState = {
    clock: savedWidgetState.clock,
    player: savedWidgetState.player,
    fetch: savedWidgetState.fetch,
    ascii: savedWidgetState.ascii,
    soundScope: savedWidgetState.soundScope,
  };
  widgetLayout = { ...widgetLayout, ...(savedWidgetState.layout || {}) };
  widgetEditMode = false;
  widgetDragState = null;
  renderDesktopShortcuts();
  renderTaskbarPins();
  renderDesktopWidgets();
  void hydrateStateFromCloud(cleanName);

  if (loginGate) {
    loginGate.hidden = true;
  }

  showToast(`Signed in as ${cleanName}`);
}

function showLoginCreate(canGoBack) {
  if (!loginSelectSection || !loginCreateSection) {
    return;
  }
  loginSelectSection.hidden = true;
  loginCreateSection.hidden = false;
  if (loginEnterButton) {
    loginEnterButton.hidden = true;
  }
  if (loginBackButton) {
    loginBackButton.hidden = !canGoBack;
  }
  if (loginTitle) {
    loginTitle.textContent = "Create account";
  }
  if (loginSubtitle) {
    loginSubtitle.textContent = canGoBack ? "Create another profile for this desktop." : "Create your first profile to begin.";
  }
  setTimeout(() => {
    loginUsernameInput?.focus();
  }, 50);
}

function syncLoginTitleToSelectedUser() {
  if (!loginTitle || !loginUserSelect) {
    return;
  }
  const selected = normalizeUsername(loginUserSelect.value || "");
  loginTitle.textContent = selected || "User Name";
}

function showLoginSelect(users) {
  if (!loginSelectSection || !loginCreateSection || !loginUserSelect) {
    return;
  }

  loginCreateSection.hidden = true;
  loginSelectSection.hidden = false;
  if (loginEnterButton) {
    loginEnterButton.hidden = false;
  }

  loginUserSelect.innerHTML = "";
  users.forEach((username) => {
    const option = document.createElement("option");
    option.value = username;
    option.textContent = username;
    loginUserSelect.appendChild(option);
  });

  if (loginSubtitle) {
    loginSubtitle.textContent = "Select your account to continue.";
  }
  syncLoginTitleToSelectedUser();

  if (loginAddUserButton) {
    loginAddUserButton.hidden = users.length >= maxUsers;
  }
}

async function createUserAndEnter() {
  const username = normalizeUsername(loginUsernameInput?.value || "");
  if (!username) {
    showToast("Enter a username");
    return;
  }

  const users = await getSavedUsersWithFallback();
  const exists = users.some((name) => name.toLowerCase() === username.toLowerCase());
  if (exists) {
    showToast("That username already exists");
    return;
  }

  if (users.length >= maxUsers) {
    showToast("Only two users are allowed");
    return;
  }

  users.push(username);
  saveUsers(users);
  await saveUsersToCloud(users);
  enterSession(username);
}

async function refreshLoginUsers() {
  const users = await getSavedUsersWithFallback();
  if (users.length === 0) {
    showLoginCreate(false);
  } else {
    showLoginSelect(users);
  }
}

async function initializeLoginGate() {
  if (!loginGate) {
    return;
  }

  cloudConfig = readCloudConfigFromStorage();
  applyCloudConfigToInputs();

  if (!cloudConfig.enabled) {
    setCloudStatus("Cloud sync: Local mode");
  } else if (isCloudConfigured()) {
    await ensureSupabaseClient();
  } else {
    setCloudStatus("Cloud sync: Local mode");
  }

  await refreshLoginUsers();

  loginEnterButton?.addEventListener("click", async () => {
    const selected = loginUserSelect?.value;
    if (!selected) {
      showToast("Select a user");
      return;
    }
    const users = await getSavedUsersWithFallback();
    if (!users.some((name) => name.toLowerCase() === selected.toLowerCase())) {
      showToast("User not found");
      await refreshLoginUsers();
      return;
    }
    enterSession(selected);
  });

  loginUserSelect?.addEventListener("change", () => {
    syncLoginTitleToSelectedUser();
  });

  loginBackButton?.addEventListener("click", () => {
    void refreshLoginUsers();
  });

  loginCreateButton?.addEventListener("click", () => {
    void createUserAndEnter();
  });
  loginUsernameInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void createUserAndEnter();
    }
  });

  loginCloudSaveButton?.addEventListener("click", async () => {
    const nextConfig = collectCloudConfigFromInputs();
    saveCloudConfigToStorage(nextConfig);
    supabaseClient = null;
    await refreshLoginUsers();
  });
}

function updateClock() {
  const now = new Date();
  const clockText = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  clock.textContent = clockText;

  const widgetClock = document.getElementById("widgetClockValue");
  if (widgetClock) {
    widgetClock.textContent = clockText;
  }

  updateFetchWidgetDetails();
}

function setThemeVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

function applyThemeFromInputs() {
  setThemeVariable("--accent", accentColor.value);
  setThemeVariable("--accent-2", accent2Color.value);
  setThemeVariable("--bg-1", bg1Color.value);
  setThemeVariable("--bg-2", bg2Color.value);
  setThemeVariable("--panel-opacity", panelOpacity.value);
  setThemeVariable("--glass-opacity", glassOpacity.value);
  setThemeVariable("--show-glow", glowToggle.checked ? "1" : "0");
  setThemeVariable("--compact-panel", compactPanelToggle.checked ? "1" : "0");
  panel.classList.toggle("compact", compactPanelToggle.checked);
  document.querySelectorAll(".desktop-glow").forEach((glow) => {
    glow.style.display = glowToggle.checked ? "block" : "none";
  });
  saveTheme();
}

function saveTheme() {
  const theme = {
    accent: accentColor.value,
    accent2: accent2Color.value,
    bg1: bg1Color.value,
    bg2: bg2Color.value,
    panelOpacity: panelOpacity.value,
    glassOpacity: glassOpacity.value,
    glowEnabled: String(glowToggle.checked),
    compactPanel: String(compactPanelToggle.checked),
  };
  localStorage.setItem("plasma-theme", JSON.stringify(theme));
}

function loadTheme() {
  const savedTheme = localStorage.getItem("plasma-theme");
  const theme = savedTheme ? { ...defaultTheme, ...JSON.parse(savedTheme) } : defaultTheme;

  accentColor.value = theme.accent;
  accent2Color.value = theme.accent2;
  bg1Color.value = theme.bg1;
  bg2Color.value = theme.bg2;
  panelOpacity.value = theme.panelOpacity;
  glassOpacity.value = theme.glassOpacity;
  glowToggle.checked = theme.glowEnabled === "true";
  compactPanelToggle.checked = theme.compactPanel === "true";

  applyThemeFromInputs();
}

function openWindow(windowElement) {
  windowElement.classList.remove("is-minimized");
  windowElement.classList.add("is-open");
  bringWindowToFront(windowElement);
}

function closeWindow(windowElement) {
  windowElement.classList.remove("is-minimized");
  windowElement.classList.remove("is-open");
}

function getWindowTitle(windowElement) {
  return windowElement.querySelector(".window-title strong")?.textContent?.trim()
    || windowElement.querySelector(".browser-window-label")?.textContent?.trim()
    || windowElement.getAttribute("aria-label")
    || "Application";
}

function ensureWindowMinimizedBar(windowElement) {
  let minimizedBar = windowElement.querySelector(":scope > .window-minimized-bar");
  if (!minimizedBar) {
    minimizedBar = document.createElement("div");
    minimizedBar.className = "window-minimized-bar window-drag-handle";

    const minimizedLabel = document.createElement("span");
    minimizedLabel.className = "window-minimized-label";
    minimizedBar.appendChild(minimizedLabel);

    minimizedBar.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        return;
      }
      windowElement.classList.remove("is-minimized");
      bringWindowToFront(windowElement);
    });

    windowElement.prepend(minimizedBar);
  }

  const minimizedLabel = minimizedBar.querySelector(".window-minimized-label");
  if (minimizedLabel) {
    minimizedLabel.textContent = getWindowTitle(windowElement);
  }

  return minimizedBar;
}

function minimizeWindow(windowElement) {
  if (!windowElement) {
    return;
  }

  ensureWindowMinimizedBar(windowElement);
  windowElement.classList.add("is-minimized");
  windowElement.classList.add("is-open");
  bringWindowToFront(windowElement);
}

function initializeWindowMinimizeButtons() {
  document.querySelectorAll(".window").forEach((windowElement) => {
    ensureWindowMinimizedBar(windowElement);

    if (windowElement.id === "browserWindow") {
      return;
    }

    const closeButton = windowElement.querySelector("[data-close-window]");
    if (!closeButton || windowElement.querySelector("[data-minimize-window]")) {
      return;
    }

    let controls = closeButton.parentElement;
    if (!controls || !controls.classList.contains("window-controls")) {
      controls = document.createElement("div");
      controls.className = "window-controls";
      closeButton.replaceWith(controls);
      controls.appendChild(closeButton);
    }

    const minimizeButton = document.createElement("button");
    minimizeButton.type = "button";
    minimizeButton.className = "window-minimize";
    minimizeButton.dataset.minimizeWindow = windowElement.id;
    minimizeButton.setAttribute("aria-label", `Minimize ${getWindowTitle(windowElement).toLowerCase()}`);
    minimizeButton.textContent = "—";
    controls.prepend(minimizeButton);
  });

  document.querySelectorAll("[data-minimize-window]").forEach((button) => {
    button.addEventListener("click", () => {
      minimizeWindow(document.getElementById(button.dataset.minimizeWindow));
    });
  });
}

function handleWindowToggle(windowId, shouldOpen) {
  const windowElement = document.getElementById(windowId);
  if (!windowElement) {
    return;
  }

  if (shouldOpen) {
    openWindow(windowElement);
  } else {
    closeWindow(windowElement);
  }
}

function toggleLauncherMenu(forceOpen) {
  launcherMenu.classList.toggle("is-open", forceOpen);
}

function setPowerOverlay(mode) {
  powerMode = mode;
  if (mode === "none") {
    powerOverlay.classList.remove("is-open");
    powerOverlay.setAttribute("aria-hidden", "true");
    return;
  }

  if (mode === "sleep") {
    powerOverlayTitle.textContent = "Sleeping";
    powerOverlayText.textContent = "Press any key or click anywhere to wake.";
    powerOverlayButton.style.display = "none";
  }

  if (mode === "shutdown") {
    powerOverlayTitle.textContent = "System powered off";
    powerOverlayText.textContent = "Press the power button to start Plasma again.";
    powerOverlayButton.style.display = "inline-flex";
  }

  powerOverlay.classList.add("is-open");
  powerOverlay.setAttribute("aria-hidden", "false");
}

function bringWindowToFront(windowElement) {
  topWindowZIndex += 1;
  windowElement.style.zIndex = String(topWindowZIndex);
}

function makeWindowDraggable(windowElement) {
  const handles = Array.from(windowElement.querySelectorAll(".window-header, .window-drag-handle"));
  if (!handles.length) {
    return;
  }

  handles.forEach((handle) => {
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    handle.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, input, textarea, select, a")) {
        return;
      }

      const rect = windowElement.getBoundingClientRect();
      windowElement.style.left = `${rect.left}px`;
      windowElement.style.top = `${rect.top}px`;
      windowElement.style.right = "auto";
      windowElement.style.bottom = "auto";

      bringWindowToFront(windowElement);
      isDragging = true;
      dragOffsetX = event.clientX - rect.left;
      dragOffsetY = event.clientY - rect.top;
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener("pointermove", (event) => {
      if (!isDragging) {
        return;
      }

      const nextLeft = Math.max(10, Math.min(window.innerWidth - 120, event.clientX - dragOffsetX));
      const nextTop = Math.max(10, Math.min(window.innerHeight - 80, event.clientY - dragOffsetY));
      windowElement.style.left = `${nextLeft}px`;
      windowElement.style.top = `${nextTop}px`;
    });

    handle.addEventListener("pointerup", () => {
      isDragging = false;
    });

    handle.addEventListener("pointercancel", () => {
      isDragging = false;
    });
  });
}

document.querySelectorAll("[data-open-window]").forEach((button) => {
  button.addEventListener("click", () => {
    openAppWindow(button.dataset.openWindow);
  });
});

launcherTiles.forEach((tile) => {
  tile.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const appMeta = getAppMeta(tile.dataset.openWindow);
    if (!appMeta) {
      return;
    }
    showAppContextMenu(event.clientX, event.clientY, appMeta);
  });
});

document.querySelectorAll("[data-close-window]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.closeWindow === "soundScopeWindow") {
      stopSoundMode();
      return;
    }
    handleWindowToggle(button.dataset.closeWindow, false);
  });
});

initializeWindowMinimizeButtons();

applyThemeButton.addEventListener("click", applyThemeFromInputs);
resetThemeButton.addEventListener("click", () => {
  localStorage.removeItem("plasma-theme");
  loadTheme();
});

[accentColor, accent2Color, bg1Color, bg2Color, panelOpacity, glassOpacity, glowToggle, compactPanelToggle].forEach((input) => {
  input.addEventListener("input", applyThemeFromInputs);
});

function initializeWidgetsSystem() {
  if (!desktopWidgetHost) {
    return;
  }

  renderDesktopWidgets();

  const getNearestValidSlot = (widgetId, clientX, clientY) => {
    const hostRect = desktopWidgetHost.getBoundingClientRect();
    const localX = clientX - hostRect.left;
    const localY = clientY - hostRect.top;
    const metrics = getWidgetGridMetrics();
    if (!metrics) {
      return Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0;
    }

    const occupied = buildOccupiedCellSet(widgetId);
    let bestSlot = Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    const totalSlots = widgetEditGrid.cols * widgetEditGrid.rows;

    for (let slot = 0; slot < totalSlots; slot += 1) {
      if (!canPlaceWidgetAt(slot, widgetId, occupied)) {
        continue;
      }
      const rect = getWidgetSlotRect(slot, widgetId, metrics);
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(centerX - localX, centerY - localY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestSlot = slot;
      }
    }

    return bestSlot;
  };

  desktopWidgetHost.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.id === "widgetEditExitButton") {
      setWidgetEditMode(false);
      saveWidgetState();
      return;
    }

    if (target.id === "widgetPlayerPlayButton") {
      mp3PlayButton?.click();
    }
  });

  desktopWidgetHost.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    if (target.id !== "widgetPlayerTimeline") {
      return;
    }
    if (!mp3Timeline) {
      return;
    }
    mp3Timeline.value = target.value;
    mp3Timeline.dispatchEvent(new Event("input", { bubbles: true }));
  });

  desktopWidgetHost.addEventListener("pointerdown", (event) => {
    if (!widgetEditMode || event.button !== 0) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const widget = target.closest("[data-widget-id]");
    if (!(widget instanceof HTMLElement)) {
      return;
    }

    if (target.closest("button, input, select, textarea, a")) {
      return;
    }

    const dragHandle = target.closest("[data-widget-id]");
    if (!(dragHandle instanceof HTMLElement)) {
      return;
    }

    const widgetId = widget.dataset.widgetId;
    if (!widgetId) {
      return;
    }

    event.preventDefault();
    widgetDragState = {
      widgetId,
      pointerId: event.pointerId,
      slot: Number.isInteger(widgetLayout[widgetId]) ? widgetLayout[widgetId] : 0,
    };
    widget.classList.add("is-dragging");
    widget.setPointerCapture(event.pointerId);
  });

  desktopWidgetHost.addEventListener("pointermove", (event) => {
    if (!widgetDragState || !widgetEditMode || widgetDragState.pointerId !== event.pointerId) {
      return;
    }

    const nextSlot = getNearestValidSlot(widgetDragState.widgetId, event.clientX, event.clientY);
    if (nextSlot === widgetDragState.slot) {
      return;
    }

    widgetDragState.slot = nextSlot;
    widgetLayout[widgetDragState.widgetId] = nextSlot;
    const metrics = getWidgetGridMetrics();
    if (metrics) {
      applyWidgetLayout(metrics);
    }
  });

  const finishDrag = (event) => {
    if (!widgetDragState || widgetDragState.pointerId !== event.pointerId) {
      return;
    }

    const draggedWidget = desktopWidgetHost.querySelector(`[data-widget-id="${widgetDragState.widgetId}"]`);
    if (draggedWidget instanceof HTMLElement) {
      draggedWidget.classList.remove("is-dragging");
      if (draggedWidget.hasPointerCapture(event.pointerId)) {
        draggedWidget.releasePointerCapture(event.pointerId);
      }
    }

    widgetLayout[widgetDragState.widgetId] = widgetDragState.slot;
    widgetDragState = null;
    saveWidgetState();
    renderDesktopWidgets();
  };

  desktopWidgetHost.addEventListener("pointerup", finishDrag);
  desktopWidgetHost.addEventListener("pointercancel", finishDrag);

  widgetToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.widgetToggle;
      if (!key || !(key in widgetState) || key === "soundScope") {
        return;
      }
      widgetState[key] = !widgetState[key];

      if (widgetState[key] && !Number.isInteger(widgetLayout[key])) {
        widgetLayout[key] = findBestSlotForWidget(key, 0);
      }

      saveWidgetState();
      renderDesktopWidgets();

      const labelMap = {
        clock: "Clock",
        player: "Now Playing",
        fetch: "Fetch",
        ascii: "ASCII",
      };
      showToast(`${labelMap[key] || "Widget"} ${widgetState[key] ? "enabled" : "disabled"}`);
    });
  });

  document.querySelectorAll("[data-widget-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.getAttribute("data-widget-edit");
      if (mode === "on") {
        setWidgetEditMode(true);
      } else if (mode === "off") {
        setWidgetEditMode(false);
      }
      saveWidgetState();
    });
  });

  window.addEventListener("resize", () => {
    const metrics = getWidgetGridMetrics();
    if (metrics) {
      applyWidgetLayout(metrics);
    }
  });

  if (terminalWidgetEditHint) {
    terminalWidgetEditHint.textContent = "Terminal command: widget edit on|off|status";
  }
}

function handleWidgetEditTerminalCommand(args) {
  const mode = (args[0] || "status").toLowerCase();

  if (mode === "on" || mode === "start") {
    setWidgetEditMode(true);
    saveWidgetState();
    return "widget edit: on";
  }

  if (mode === "off" || mode === "stop") {
    setWidgetEditMode(false);
    saveWidgetState();
    return "widget edit: off";
  }

  if (mode === "status") {
    return widgetEditMode ? "widget edit: on" : "widget edit: off";
  }

  return "Usage: widget edit on|off|status";
}

function initializeMp3Player() {
  if (!mp3AudioElement || !mp3FileInput || !mp3LoadButton || !mp3PlayButton || !mp3Timeline) {
    return;
  }

  mp3LoadButton.addEventListener("click", () => {
    mp3FileInput.value = "";
    mp3FileInput.click();
  });

  mp3FileInput.addEventListener("change", async () => {
    const file = mp3FileInput.files?.[0];
    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    mp3AudioElement.src = objectUrl;
    if (mp3TrackLabel) {
      mp3TrackLabel.textContent = file.name;
    }
    updatePlayerWidgetDetails();
    updateMp3TimeDisplay();

    try {
      await ensureMp3AnalyserReady();
      await mp3AudioElement.play();
      syncMp3PlayButtonLabels();
      startVisualizerLoop();
    } catch {
      syncMp3PlayButtonLabels();
      showToast("Track loaded");
    }
  });

  mp3PlayButton.addEventListener("click", async () => {
    if (!mp3AudioElement.src) {
      showToast("Load an MP3 first");
      return;
    }
    try {
      await ensureMp3AnalyserReady();
      if (mp3AudioElement.paused) {
        await mp3AudioElement.play();
      } else {
        mp3AudioElement.pause();
      }
      syncMp3PlayButtonLabels();
      startVisualizerLoop();
    } catch (error) {
      showToast(`Audio error: ${error.message}`);
    }
  });

  mp3Timeline.addEventListener("input", () => {
    if (!mp3AudioElement.duration) {
      return;
    }
    const ratio = Number(mp3Timeline.value) / 1000;
    mp3AudioElement.currentTime = mp3AudioElement.duration * ratio;
    updateMp3TimeDisplay();
  });

  mp3AudioElement.addEventListener("timeupdate", updateMp3TimeDisplay);
  mp3AudioElement.addEventListener("loadedmetadata", updateMp3TimeDisplay);
  mp3AudioElement.addEventListener("play", () => {
    syncMp3PlayButtonLabels();
    startVisualizerLoop();
  });
  mp3AudioElement.addEventListener("pause", () => {
    syncMp3PlayButtonLabels();
  });
  mp3AudioElement.addEventListener("ended", () => {
    syncMp3PlayButtonLabels();
    updateMp3TimeDisplay();
  });

  updateMp3TimeDisplay();
  updateMp3ModeLabel();
  syncMp3PlayButtonLabels();
  startVisualizerLoop();
}

registerTerminalCommand("help", () => {
  return Array.from(terminalCommands.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, command]) => `${name} - ${command.helpText || "(no description)"}`)
    .join("\n");
}, "List available commands");

registerTerminalCommand("clear", () => {
  terminalOutput.innerHTML = "";
  return "";
}, "Clear the terminal output");

registerTerminalCommand("date", () => new Date().toString(), "Show the current date and time");

registerTerminalCommand("echo", (args) => args.join(" "), "Print text back to the terminal");

registerTerminalCommand("theme", () => {
  return [
    `accent=${accentColor.value}`,
    `accent2=${accent2Color.value}`,
    `bg1=${bg1Color.value}`,
    `bg2=${bg2Color.value}`,
  ].join("\n");
}, "Show the current theme values");

registerTerminalCommand("fetch", () => {
  openFetchWindow();
  return "";
}, "Open neofetch-style window with ASCII art");

registerTerminalCommand("neofetch", () => {
  openFetchWindow();
  return "";
}, "Open neofetch-style window with ASCII art");

registerTerminalCommand("screenfetch", () => {
  openFetchWindow();
  return "";
}, "Open neofetch-style window with ASCII art");

registerTerminalCommand("pwd", () => terminalState.cwd, "Print working directory");

registerTerminalCommand("whoami", () => terminalState.username, "Show current user");

registerTerminalCommand("hostname", () => terminalState.hostname, "Show host name");

registerTerminalCommand("uname", (args) => {
  if (args.includes("-a")) {
    return "Linux plasma-desktop 6.8.0-custom #1 SMP PREEMPT x86_64 GNU/Linux";
  }
  return "Linux";
}, "Show system information");

registerTerminalCommand("ls", (args) => {
  const targetPath = resolvePath(args[0] || ".", terminalState.cwd);
  const result = listDirectory(targetPath);
  if (result === null) {
    return `ls: cannot access '${args[0] || "."}': No such directory`;
  }
  return result;
}, "List directory contents");

registerTerminalCommand("cd", (args) => {
  const targetInput = args[0] || "/home/plasma";
  const targetPath = resolvePath(targetInput, terminalState.cwd);

  if (!isDirectory(targetPath)) {
    return `cd: ${targetInput}: No such directory`;
  }

  terminalState.cwd = targetPath;
  return "";
}, "Change directory");

registerTerminalCommand("cat", (args) => {
  if (!args.length) {
    return "cat: missing file operand";
  }

  const output = [];
  args.forEach((pathInput) => {
    const resolved = resolvePath(pathInput, terminalState.cwd);
    if (!terminalFiles.has(resolved)) {
      output.push(`cat: ${pathInput}: No such file`);
      return;
    }
    output.push(terminalFiles.get(resolved));
  });

  return output.join("\n");
}, "Print file contents");

registerTerminalCommand("mkdir", (args) => {
  if (!args.length) {
    return "mkdir: missing operand";
  }

  for (const pathInput of args) {
    const resolved = resolvePath(pathInput, terminalState.cwd);
    const parent = parentPath(resolved);

    if (!parent || !isDirectory(parent)) {
      return `mkdir: cannot create directory '${pathInput}': No such parent directory`;
    }

    if (terminalDirs.has(resolved) || terminalFiles.has(resolved)) {
      return `mkdir: cannot create directory '${pathInput}': File exists`;
    }

    terminalDirs.add(resolved);
  }

  return "";
}, "Create directories");

registerTerminalCommand("touch", (args) => {
  if (!args.length) {
    return "touch: missing file operand";
  }

  for (const pathInput of args) {
    const resolved = resolvePath(pathInput, terminalState.cwd);
    const parent = parentPath(resolved);

    if (!parent || !isDirectory(parent)) {
      return `touch: cannot touch '${pathInput}': No such directory`;
    }

    if (terminalDirs.has(resolved)) {
      return `touch: cannot touch '${pathInput}': Is a directory`;
    }

    if (!terminalFiles.has(resolved)) {
      terminalFiles.set(resolved, "");
    }
  }

  return "";
}, "Create empty files");

registerTerminalCommand("history", () => {
  return terminalState.history.map((entry, index) => `${index + 1}  ${entry}`).join("\n");
}, "Show command history");

registerTerminalCommand("uptime", () => {
  return `up ${getShellUptimeText()}`;
}, "Show session uptime");

registerTerminalCommand("mp3", () => {
  handleWindowToggle("mp3Window", true);
  return "Opened MP3 Player window";
}, "Open the MP3 Player window");

registerTerminalCommand("widgets", () => {
  handleWindowToggle("widgetsWindow", true);
  return "Opened Widgets window";
}, "Open the desktop widget manager");

registerTerminalCommand("widget", (args) => {
  const sub = (args[0] || "").toLowerCase();
  if (sub !== "edit") {
    return "Usage: widget edit on|off|status";
  }
  return handleWidgetEditTerminalCommand(args.slice(1));
}, "Control widget edit mode");

registerTerminalCommand("soundmode", (args) => {
  const mode = (args[0] || "status").toLowerCase();

  if (mode === "on" || mode === "start") {
    void (async () => {
      try {
        await startSoundMode();
        handleWindowToggle("soundScopeWindow", true);
        printTerminalLine("Sound mode enabled. Browser audio is now visualized.", "result");
      } catch (error) {
        printTerminalLine(`soundmode: ${error.message}`, "error");
      }
    })();
    return "Starting sound mode... choose a browser tab/window and share audio.";
  }

  if (mode === "off" || mode === "stop") {
    stopSoundMode();
    return "Sound mode stopped";
  }

  if (mode === "status") {
    return audioState.soundModeEnabled ? "soundmode: on" : "soundmode: off";
  }

  return "Usage: soundmode on|off|status";
}, "Terminal-only browser audio visualizer mode");

window.registerTerminalCommand = registerTerminalCommand;

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawInput = terminalInput.value.trim();
  if (!rawInput) {
    return;
  }

  const [commandNameRaw, ...args] = rawInput.split(/\s+/);
  const commandName = commandNameRaw.toLowerCase();
  const command = terminalCommands.get(commandName);
  terminalState.history.push(rawInput);

  printTerminalLine(`${formatPrompt()} ${rawInput}`, "command");

  if (!command) {
    printTerminalLine(`command not found: ${commandName}`, "error");
    terminalInput.value = "";
    return;
  }

  const result = command.handler(args);
  if (result) {
    result.split("\n").forEach((line) => printTerminalLine(line, "result"));
  }

  terminalInput.value = "";
});

draggableWindows.forEach(makeWindowDraggable);
draggableWindows.forEach(bringWindowToFront);

launcherCategoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLauncherCategory = button.dataset.category || "All Applications";
    launcherCategoryButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    applyLauncherFilters();
    showToast(`Category: ${activeLauncherCategory}`);
  });
});

launcherSearchInput.addEventListener("input", applyLauncherFilters);

footerApplications.addEventListener("click", () => {
  activeLauncherCategory = "All Applications";
  launcherCategoryButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.category === "All Applications"));
  setTimeout(() => {
    launcherSearchInput.focus();
  }, 50);
  applyLauncherFilters();
  showToast("Showing all apps");
});

footerPlaces.addEventListener("click", () => {
  handleWindowToggle("placesWindow", true);
  toggleLauncherMenu(false);
  showToast("Opened Places");
});

footerSleep.addEventListener("click", () => {
  setPowerOverlay("sleep");
  toggleLauncherMenu(false);
});

footerRestart.addEventListener("click", () => {
  toggleLauncherMenu(false);
  showToast("Restarting desktop shell...");
  setTimeout(() => window.location.reload(), 900);
});

footerShutdown.addEventListener("click", () => {
  setPowerOverlay("shutdown");
  toggleLauncherMenu(false);
});

powerOverlay.addEventListener("click", () => {
  if (powerMode === "sleep") {
    setPowerOverlay("none");
  }
});

powerOverlayButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setPowerOverlay("none");
  showToast("System powered on");
});

function filesNormalizePath(inputPath = "", basePath = filesState.currentPath) {
  const rawValue = inputPath.trim();
  if (!rawValue) {
    return basePath;
  }

  const expanded = rawValue === "~" || rawValue === "~/" ? filesHomePath : rawValue.replace(/^~\//, `${filesHomePath}/`);
  const startPath = expanded.startsWith("/") ? expanded : `${basePath}/${expanded}`;
  const parts = startPath.split("/");
  const normalized = [];

  parts.forEach((part) => {
    if (!part || part === ".") {
      return;
    }
    if (part === "..") {
      normalized.pop();
      return;
    }
    normalized.push(part);
  });

  return `/${normalized.join("/")}`;
}

function filesDisplayPath(path) {
  if (path === filesHomePath) {
    return "~";
  }
  if (path.startsWith(`${filesHomePath}/`)) {
    return `~${path.slice(filesHomePath.length)}`;
  }
  return path;
}

function filesJoinPath(parent, childName) {
  return parent === "/" ? `/${childName}` : `${parent}/${childName}`;
}

function filesGetEntries(path) {
  return filesTree.get(path) || [];
}

function filesPathExists(path) {
  return filesTree.has(path);
}

function filesFindEntry(path, name) {
  return filesGetEntries(path).find((entry) => entry.name === name) || null;
}

function filesGetPathParent(path) {
  if (path === "/") {
    return null;
  }
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return `/${parts.join("/")}` || "/";
}

function filesResolveEntry(pathInput, basePath = filesState.currentPath) {
  const resolved = filesNormalizePath(pathInput, basePath);
  const parent = filesGetPathParent(resolved);
  if (!parent || !filesTree.has(parent)) {
    return null;
  }

  const name = resolved.split("/").filter(Boolean).pop();
  if (!name) {
    return null;
  }

  const entry = filesFindEntry(parent, name);
  if (!entry) {
    return null;
  }

  return {
    path: resolved,
    parentPath: parent,
    entry,
  };
}

function filesHumanSize(size = 0) {
  if (!size) {
    return "0 B";
  }
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function filesHasName(path, name) {
  return filesGetEntries(path).some((entry) => entry.name === name);
}

function filesGenerateName(path, seed, extension = "") {
  let index = 1;
  let candidate = `${seed}${extension}`;
  while (filesHasName(path, candidate)) {
    index += 1;
    candidate = `${seed} ${index}${extension}`;
  }
  return candidate;
}

function filesListEntries(path) {
  const values = [...filesGetEntries(path)];
  values.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    return filesState.ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  if (!filesState.query) {
    return values;
  }

  const queryLower = filesState.query.toLowerCase();
  return values.filter((entry) => entry.name.toLowerCase().includes(queryLower));
}

function renderFilesSidebar() {
  if (!filesSidebarList) {
    return;
  }

  filesSidebarList.innerHTML = "";

  filesSidebarItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "side-item file-jump";
    button.textContent = item.label;
    button.dataset.path = item.path;
    button.classList.toggle("side-active", filesState.selectedSidebarPath === item.path);
    button.addEventListener("click", () => {
      filesState.selectedSidebarPath = item.path;
      filesNavigateTo(item.path, true);
    });
    filesSidebarList.appendChild(button);
  });
}

function renderFilesPreview(entries) {
  if (!filesPreviewPanel) {
    return;
  }

  const shouldShowPanel = filesState.preview || filesState.split;
  filesPreviewPanel.classList.toggle("is-open", shouldShowPanel);

  if (!shouldShowPanel) {
    filesPreviewPanel.textContent = "";
    return;
  }

  if (filesState.selectedEntryName) {
    const selected = filesFindEntry(filesState.currentPath, filesState.selectedEntryName);
    if (selected) {
      if (selected.type === "folder") {
        const selectedPath = filesJoinPath(filesState.currentPath, selected.name);
        const childCount = filesGetEntries(selectedPath).length;
        filesPreviewPanel.textContent = [
          `Name: ${selected.name}`,
          `Type: folder`,
          `Path: ${selectedPath}`,
          `Contains: ${childCount} item${childCount === 1 ? "" : "s"}`,
        ].join("\n");
        return;
      }

      const textPreview = (selected.content || "").slice(0, 520);
      filesPreviewPanel.textContent = [
        `Name: ${selected.name}`,
        `Type: file`,
        `Size: ${filesHumanSize(selected.size || 0)}`,
        "",
        textPreview || "(binary or empty file)",
      ].join("\n");
      return;
    }
  }

  const listing = entries.length ? entries.map((entry) => entry.name).join("\n") : "(empty)";
  filesPreviewPanel.textContent = `Path: ${filesState.currentPath}\n\n${filesState.split ? "Split pane mirror:\n" : "Preview:\n"}${listing}`;
}

function renderFilesGrid() {
  if (!folderGrid) {
    return;
  }

  const entries = filesListEntries(filesState.currentPath);
  folderGrid.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "simple-list-title";
    empty.textContent = filesState.query ? "No items match your search." : "Folder is empty.";
    folderGrid.appendChild(empty);
  }

  entries.forEach((entry) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "folder-card";
    if (entry.type === "file") {
      card.classList.add("file-entry");
    }
    card.setAttribute("aria-label", `${entry.type === "folder" ? "Open folder" : "Open file"} ${entry.name}`);
    card.dataset.entryName = entry.name;
    card.dataset.entryType = entry.type;

    if (filesState.selectedEntryName === entry.name && filesState.selectedEntryType === entry.type) {
      card.classList.add("selected");
    }

    const icon = document.createElement("div");
    icon.className = "folder-icon";

    const title = document.createElement("strong");
    title.textContent = entry.name;

    const meta = document.createElement("span");
    meta.textContent = entry.type === "folder" ? "folder" : `file · ${filesHumanSize(entry.size || 0)}`;

    card.append(icon, title, meta);

    card.addEventListener("click", () => {
      const sameSelection = filesState.selectedEntryName === entry.name && filesState.selectedEntryType === entry.type;
      if (sameSelection) {
        if (entry.type === "folder") {
          filesNavigateTo(filesJoinPath(filesState.currentPath, entry.name), true);
          return;
        }
        filesState.preview = true;
        renderFilesGrid();
        updateFilesToolbarState();
        return;
      }

      filesState.selectedEntryName = entry.name;
      filesState.selectedEntryType = entry.type;
      renderFilesGrid();
      updateFilesStatus(entries.length);
      renderFilesPreview(entries);
    });

    card.addEventListener("dblclick", () => {
      if (entry.type === "folder") {
        filesNavigateTo(filesJoinPath(filesState.currentPath, entry.name), true);
      } else {
        filesState.preview = true;
        renderFilesGrid();
        updateFilesToolbarState();
      }
    });

    folderGrid.appendChild(card);
  });

  renderFilesPreview(entries);
  updateFilesStatus(entries.length);
}

function updateFilesStatus(entryCount) {
  if (filesStatusLeft) {
    const selectedText = filesState.selectedEntryName ? ` | selected: ${filesState.selectedEntryName}` : "";
    filesStatusLeft.textContent = `${filesDisplayPath(filesState.currentPath)}${selectedText}`;
  }

  if (filesStatusRight) {
    filesStatusRight.textContent = `${entryCount} item${entryCount === 1 ? "" : "s"}`;
  }
}

function updateFilesToolbarState() {
  if (filesPathInput) {
    filesPathInput.value = filesState.currentPath;
  }
  if (filesBackButton) {
    filesBackButton.disabled = filesState.backStack.length === 0;
  }
  if (filesForwardButton) {
    filesForwardButton.disabled = filesState.forwardStack.length === 0;
  }
  if (filesUpButton) {
    filesUpButton.disabled = filesState.currentPath === "/";
  }
  if (filesPreviewButton) {
    filesPreviewButton.classList.toggle("side-active", filesState.preview);
  }
  if (filesSplitButton) {
    filesSplitButton.classList.toggle("side-active", filesState.split);
  }
  if (filesContent) {
    filesContent.classList.toggle("has-preview", filesState.preview);
    filesContent.classList.toggle("is-split", filesState.split);
  }
}

function filesNavigateTo(targetPathInput, pushHistory = true) {
  const targetPath = filesNormalizePath(targetPathInput);
  if (!filesPathExists(targetPath)) {
    showToast(`Path not found: ${targetPathInput}`);
    return;
  }

  if (targetPath === filesState.currentPath) {
    return;
  }

  if (pushHistory) {
    filesState.backStack.push(filesState.currentPath);
    filesState.forwardStack = [];
  }

  filesState.currentPath = targetPath;
  filesState.selectedEntryName = "";
  filesState.selectedEntryType = "";
  filesState.selectedSidebarPath = filesSidebarItems.find((item) => item.path === targetPath)?.path || "";

  renderFilesSidebar();
  renderFilesGrid();
  updateFilesToolbarState();
}

function filesNavigateBack() {
  const previousPath = filesState.backStack.pop();
  if (!previousPath) {
    return;
  }

  filesState.forwardStack.push(filesState.currentPath);
  filesState.currentPath = previousPath;
  filesState.selectedEntryName = "";
  filesState.selectedEntryType = "";
  filesState.selectedSidebarPath = filesSidebarItems.find((item) => item.path === previousPath)?.path || "";
  renderFilesSidebar();
  renderFilesGrid();
  updateFilesToolbarState();
}

function filesNavigateForward() {
  const nextPath = filesState.forwardStack.pop();
  if (!nextPath) {
    return;
  }

  filesState.backStack.push(filesState.currentPath);
  filesState.currentPath = nextPath;
  filesState.selectedEntryName = "";
  filesState.selectedEntryType = "";
  filesState.selectedSidebarPath = filesSidebarItems.find((item) => item.path === nextPath)?.path || "";
  renderFilesSidebar();
  renderFilesGrid();
  updateFilesToolbarState();
}

function filesNavigateUp() {
  const parent = filesGetPathParent(filesState.currentPath);
  if (!parent) {
    return;
  }
  filesNavigateTo(parent, true);
}

function filesCreateFolder(nameInput = "") {
  const enteredName = nameInput.trim();
  const nextName = enteredName || filesGenerateName(filesState.currentPath, "New Folder");
  if (filesHasName(filesState.currentPath, nextName)) {
    showToast("An item with that name already exists");
    return;
  }

  filesGetEntries(filesState.currentPath).push({ name: nextName, type: "folder" });
  filesTree.set(filesJoinPath(filesState.currentPath, nextName), []);
  filesState.selectedEntryName = nextName;
  filesState.selectedEntryType = "folder";
  renderFilesGrid();
  showToast(`Created folder ${nextName}`);
}

function filesCreateTextFile(nameInput = "") {
  let nextName = nameInput.trim() || filesGenerateName(filesState.currentPath, "new-file", ".txt");
  if (!nextName.includes(".")) {
    nextName = `${nextName}.txt`;
  }
  if (filesHasName(filesState.currentPath, nextName)) {
    showToast("An item with that name already exists");
    return;
  }

  filesGetEntries(filesState.currentPath).push({
    name: nextName,
    type: "file",
    size: 0,
    content: "",
    mime: "text/plain",
  });
  filesState.selectedEntryName = nextName;
  filesState.selectedEntryType = "file";
  renderFilesGrid();
  showToast(`Created file ${nextName}`);
}

function filesDeleteFolderRecursive(path) {
  const entries = filesGetEntries(path);
  entries.forEach((entry) => {
    if (entry.type === "folder") {
      filesDeleteFolderRecursive(filesJoinPath(path, entry.name));
    }
  });
  filesTree.delete(path);
}

function filesRenameSelected() {
  if (!filesState.selectedEntryName) {
    showToast("Select an item first");
    return;
  }

  const selected = filesFindEntry(filesState.currentPath, filesState.selectedEntryName);
  if (!selected) {
    showToast("Selected item not found");
    return;
  }

  const nextNameRaw = window.prompt("Rename to:", selected.name);
  if (!nextNameRaw) {
    return;
  }

  const nextName = nextNameRaw.trim();
  if (!nextName || nextName === selected.name) {
    return;
  }
  if (filesHasName(filesState.currentPath, nextName)) {
    showToast("Name already exists");
    return;
  }

  if (selected.type === "folder") {
    const oldPath = filesJoinPath(filesState.currentPath, selected.name);
    const newPath = filesJoinPath(filesState.currentPath, nextName);
    const oldChildren = filesTree.get(oldPath) || [];
    filesTree.set(newPath, oldChildren);
    filesTree.delete(oldPath);

    for (const [folderPath, list] of [...filesTree.entries()]) {
      list.forEach((entry) => {
        if (entry.type !== "folder") {
          return;
        }
        const entryPath = filesJoinPath(folderPath, entry.name);
        if (entryPath.startsWith(`${oldPath}/`)) {
          const suffix = entryPath.slice(oldPath.length);
          const nextNested = `${newPath}${suffix}`;
          const nestedChildren = filesTree.get(entryPath);
          if (nestedChildren) {
            filesTree.set(nextNested, nestedChildren);
            filesTree.delete(entryPath);
          }
        }
      });
    }
  }

  selected.name = nextName;
  filesState.selectedEntryName = nextName;
  renderFilesGrid();
  showToast("Renamed item");
}

function filesDeleteSelected() {
  if (!filesState.selectedEntryName) {
    showToast("Select an item first");
    return;
  }

  const entries = filesGetEntries(filesState.currentPath);
  const index = entries.findIndex((entry) => entry.name === filesState.selectedEntryName && entry.type === filesState.selectedEntryType);
  if (index < 0) {
    showToast("Selected item not found");
    return;
  }

  const [removed] = entries.splice(index, 1);
  if (removed.type === "folder") {
    filesDeleteFolderRecursive(filesJoinPath(filesState.currentPath, removed.name));
  }

  filesState.selectedEntryName = "";
  filesState.selectedEntryType = "";
  renderFilesGrid();
  showToast(`Deleted ${removed.name}`);
}

function filesMoveSelected() {
  if (!filesState.selectedEntryName) {
    showToast("Select an item first");
    return;
  }

  const destinationRaw = window.prompt("Move to folder path:", filesState.currentPath);
  if (!destinationRaw) {
    return;
  }

  const destination = filesNormalizePath(destinationRaw, filesState.currentPath);
  if (!filesPathExists(destination)) {
    showToast("Destination folder not found");
    return;
  }

  const sourceEntries = filesGetEntries(filesState.currentPath);
  const index = sourceEntries.findIndex((entry) => entry.name === filesState.selectedEntryName && entry.type === filesState.selectedEntryType);
  if (index < 0) {
    showToast("Selected item not found");
    return;
  }

  const [entry] = sourceEntries.splice(index, 1);
  const targetEntries = filesGetEntries(destination);
  if (targetEntries.some((item) => item.name === entry.name)) {
    sourceEntries.splice(index, 0, entry);
    showToast("Destination already contains this name");
    return;
  }

  targetEntries.push(entry);
  if (entry.type === "folder") {
    const oldPath = filesJoinPath(filesState.currentPath, entry.name);
    const newPath = filesJoinPath(destination, entry.name);
    const movedChildren = filesTree.get(oldPath) || [];
    filesTree.set(newPath, movedChildren);
    filesTree.delete(oldPath);

    for (const [folderPath, list] of [...filesTree.entries()]) {
      list.forEach((childEntry) => {
        if (childEntry.type !== "folder") {
          return;
        }
        const childPath = filesJoinPath(folderPath, childEntry.name);
        if (childPath.startsWith(`${oldPath}/`)) {
          const suffix = childPath.slice(oldPath.length);
          const movedNestedPath = `${newPath}${suffix}`;
          const nestedChildren = filesTree.get(childPath);
          if (nestedChildren) {
            filesTree.set(movedNestedPath, nestedChildren);
            filesTree.delete(childPath);
          }
        }
      });
    }
  }

  filesState.selectedEntryName = "";
  filesState.selectedEntryType = "";
  renderFilesGrid();
  showToast(`Moved ${entry.name} to ${destination}`);
}

function setFilesDropdownVisible(visible) {
  if (!filesMenuDropdown || !filesFileMenuButton) {
    return;
  }
  filesMenuDropdown.hidden = !visible;
  filesFileMenuButton.setAttribute("aria-expanded", visible ? "true" : "false");
}

function filesSaveOrUpdateFile(path, name, content, mime = "text/plain") {
  const entries = filesGetEntries(path);
  const existing = entries.find((entry) => entry.name === name);
  const size = new Blob([content]).size;

  if (existing) {
    existing.type = "file";
    existing.content = content;
    existing.size = size;
    existing.mime = mime;
    return;
  }

  entries.push({ name, type: "file", size, content, mime });
}

function initializeFilesExplorer() {
  if (!filesWindow || !folderGrid || !filesSidebarList) {
    return;
  }

  renderFilesSidebar();
  renderFilesGrid();
  updateFilesToolbarState();
  setFilesDropdownVisible(false);

  filesMenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.filesMenu;

      if (action === "file") {
        setFilesDropdownVisible(filesMenuDropdown?.hidden ?? true);
        return;
      }

      setFilesDropdownVisible(false);

      if (action === "edit") {
        filesState.selectedEntryName = "";
        filesState.selectedEntryType = "";
        renderFilesGrid();
        showToast("Selection cleared");
        return;
      }

      if (action === "view") {
        filesState.preview = !filesState.preview;
        renderFilesGrid();
        updateFilesToolbarState();
        showToast(filesState.preview ? "Preview enabled" : "Preview disabled");
        return;
      }

      if (action === "go") {
        filesNavigateTo(filesHomePath, true);
        showToast("Moved to home folder");
        return;
      }

      if (action === "tools") {
        filesState.ascending = !filesState.ascending;
        renderFilesGrid();
        showToast(filesState.ascending ? "Sort: A to Z" : "Sort: Z to A");
        return;
      }

      if (action === "settings") {
        handleWindowToggle("settingsWindow", true);
        showToast("Opened Settings");
        return;
      }

      if (action === "help") {
        showToast("Files help: select items, click selected item to open, use File menu for CRUD/move/upload.");
      }
    });
  });

  filesMenuNewFolder?.addEventListener("click", () => {
    filesCreateFolder();
    setFilesDropdownVisible(false);
  });

  filesMenuNewFolderNamed?.addEventListener("click", () => {
    const entered = window.prompt("Folder name:", "New Folder");
    if (entered?.trim()) {
      filesCreateFolder(entered);
    }
    setFilesDropdownVisible(false);
  });

  filesMenuNewFile?.addEventListener("click", () => {
    const entered = window.prompt("File name:", "notes.txt");
    if (entered?.trim()) {
      filesCreateTextFile(entered);
    }
    setFilesDropdownVisible(false);
  });

  filesMenuRename?.addEventListener("click", () => {
    filesRenameSelected();
    setFilesDropdownVisible(false);
  });

  filesMenuMove?.addEventListener("click", () => {
    filesMoveSelected();
    setFilesDropdownVisible(false);
  });

  filesMenuDelete?.addEventListener("click", () => {
    filesDeleteSelected();
    setFilesDropdownVisible(false);
  });

  filesMenuUploadFile?.addEventListener("click", () => {
    filesUploadInput.value = "";
    filesUploadInput.click();
    setFilesDropdownVisible(false);
  });

  filesUploadInput.addEventListener("change", async () => {
    const files = Array.from(filesUploadInput.files || []);
    if (!files.length) {
      return;
    }

    for (const file of files) {
      const textContent = file.type.startsWith("text/") ? await file.text() : "";
      let name = file.name;
      if (filesHasName(filesState.currentPath, name)) {
        const dotIndex = file.name.lastIndexOf(".");
        if (dotIndex > 0) {
          const base = file.name.slice(0, dotIndex);
          const ext = file.name.slice(dotIndex);
          name = filesGenerateName(filesState.currentPath, base, ext);
        } else {
          name = filesGenerateName(filesState.currentPath, file.name);
        }
      }

      filesSaveOrUpdateFile(filesState.currentPath, name, textContent, file.type || "application/octet-stream");
      const item = filesFindEntry(filesState.currentPath, name);
      if (item) {
        item.size = file.size;
      }
    }

    renderFilesGrid();
    showToast(`Uploaded ${files.length} file${files.length === 1 ? "" : "s"}`);
  });

  filesBackButton?.addEventListener("click", filesNavigateBack);
  filesForwardButton?.addEventListener("click", filesNavigateForward);
  filesUpButton?.addEventListener("click", () => {
    filesNavigateUp();
    setFilesDropdownVisible(false);
  });

  filesPathInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    filesNavigateTo(filesPathInput.value, true);
    setFilesDropdownVisible(false);
  });

  filesFindInput?.addEventListener("input", () => {
    filesState.query = filesFindInput.value.trim();
    filesState.selectedEntryName = "";
    filesState.selectedEntryType = "";
    renderFilesGrid();
    setFilesDropdownVisible(false);
  });

  filesPreviewButton?.addEventListener("click", () => {
    setFilesDropdownVisible(false);
    filesState.preview = !filesState.preview;
    renderFilesGrid();
    updateFilesToolbarState();
  });

  filesSplitButton?.addEventListener("click", () => {
    setFilesDropdownVisible(false);
    filesState.split = !filesState.split;
    renderFilesGrid();
    updateFilesToolbarState();
    showToast(filesState.split ? "Split view enabled" : "Split view disabled");
  });

  filesWindow?.addEventListener("click", (event) => {
    if (!filesMenuDropdown || filesMenuDropdown.hidden) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const isInsideDropdown = target.closest("#filesMenuDropdown");
    const isFileButton = target.closest("#filesFileMenuButton");
    if (target.closest("button, input, select, textarea, a")) {
    }
  });

    const dragHandle = target.closest("[data-widget-id]");
    if (!(dragHandle instanceof HTMLElement)) {
      return;
    }
}

const codeState = {
  language: "javascript",
  terminalCwd: filesHomePath,
  pyodide: null,
  pyodideLoading: null,
  currentTab: "web-1",
  currentSubtab: "html",
  tabCounter: { web: 1, javascript: 1 },
  tabs: {
    "web-1": {
      html: { content: "", filename: "index.html" },
      css: { content: "", filename: "styles.css" },
      js: { content: "const message = 'Hello from Code Studio';\nconsole.log(message);", filename: "main.js" },
    },
    "js-1": {
      content: "const message = 'Hello from Code Studio';\nconsole.log(message);",
      filename: "main.js",
    },
  },
  editHistory: {
    "web-1": { past: [], future: [] },
    "js-1": { past: [], future: [] },
  },
};

const savePickerState = {
  currentPath: filesHomePath,
  backStack: [],
  targetFileName: "",
  callback: null,
};

const gitCloneState = {
  files: [],
  selectedFiles: [],
};

const codeTemplates = {
  javascript: {
    file: "main.js",
    code: [
      "const message = 'Hello from Code Studio';",
      "console.log(message);",
    ].join("\n"),
  },
  html: {
    file: "index.html",
    code: [
      "<!doctype html>",
      "<html>",
      "  <head><title>Preview</title></head>",
      "  <body>",
      "    <h1>Hello from HTML</h1>",
      "  </body>",
      "</html>",
    ].join("\n"),
  },
  css: {
    file: "styles.css",
    code: [
      "body {",
      "  font-family: sans-serif;",
      "  background: linear-gradient(120deg, #1f1f1f, #353535);",
      "  color: #f5f5f5;",
      "}",
      "h1 { color: #d9d9d9; }",
    ].join("\n"),
  },
  python: {
    file: "main.py",
    code: [
      "print('Hello from Python')",
      "for i in range(3):",
      "    print('line', i)",
    ].join("\n"),
  },
  typescript: {
    file: "main.ts",
    code: [
      "type User = { name: string };",
      "const user: User = { name: 'TypeScript user' };",
      "console.log(user.name);",
    ].join("\n"),
  },
  rust: { file: "main.rs", code: "fn main() {\n    println!(\"Hello from Rust\");\n}" },
  c: { file: "main.c", code: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello from C\\n\");\n    return 0;\n}" },
  cpp: { file: "main.cpp", code: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello from C++\\n\";\n    return 0;\n}" },
  java: { file: "Main.java", code: "class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from Java\");\n  }\n}" },
};

function codeAppendTerminalLine(text, className = "result") {
  if (!codeTerminalOutput) {
    return;
  }
  const line = document.createElement("div");
  line.className = `terminal-line ${className}`;
  line.textContent = text;
  codeTerminalOutput.appendChild(line);
  codeTerminalOutput.scrollTop = codeTerminalOutput.scrollHeight;
}

function codeSetLanguage(language) {
  const next = codeTemplates[language] ? language : "javascript";
  codeState.language = next;
  if (codeLanguageSelect) {
    codeLanguageSelect.value = next;
  }
  if (codeFileNameInput) {
    codeFileNameInput.value = codeTemplates[next].file;
  }
  if (codeEditor) {
    codeEditor.value = codeTemplates[next].code;
  }
}

function codeSetOutput(text) {
  if (codeOutputText) {
    codeOutputText.textContent = text;
  }
}

async function codeEnsurePyodide() {
  if (codeState.pyodide) {
    return codeState.pyodide;
  }

  if (!codeState.pyodideLoading) {
    codeState.pyodideLoading = new Promise((resolve, reject) => {
      if (window.loadPyodide) {
        resolve(window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/" }));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js";
      script.onload = () => resolve(window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/" }));
      script.onerror = () => reject(new Error("Unable to load Pyodide"));
      document.head.appendChild(script);
    }).then((instance) => {
      codeState.pyodide = instance;
      return instance;
    });
  }

  return codeState.pyodideLoading;
}

async function runCodeStudio() {
  if (!codeEditor || !codeOutputFrame) {
    return;
  }

  let language = codeLanguageSelect?.value || codeState.language;
  let source = codeEditor.value;
  
  const tabType = codeState.currentTab.split("-")[0];
  
  // Handle Web tab - combine HTML, CSS, JS
  if (tabType === "web") {
    const tab = codeState.tabs[codeState.currentTab];
    const htmlContent = tab.html.content || "<html><body><h1>Hello</h1></body></html>";
    const cssContent = tab.css.content || "";
    const jsContent = tab.js.content || "";
    
    const wrappedJs = `
      const push = (msg) => parent.postMessage({ source: 'code-studio', message: String(msg) }, '*');
      console.log = (...args) => push(args.join(' '));
      window.onerror = (msg, src, line, col, err) => { push(err && err.stack ? err.stack : msg); };
      try { ${jsContent.replace(/<\/script>/gi, "</scr" + "ipt>")} } catch (e) { push(e && e.stack ? e.stack : e.message); }
    `;
    
    const combined = htmlContent
      .replace("</head>", `<style>${cssContent}</style></head>`)
      .replace("</body>", `<script>${wrappedJs}</script></body>`);
    
    codeOutputFrame.srcdoc = combined;
    codeSetOutput("Rendered Web preview (HTML + CSS + JavaScript).");
    return;
  }

  codeState.language = language;
  codeOutputFrame.srcdoc = "";
  codeSetOutput("");

  if (language === "html") {
    codeOutputFrame.srcdoc = source;
    codeSetOutput("Rendered HTML preview.");
    return;
  }

  if (language === "css") {
    codeOutputFrame.srcdoc = `<!doctype html><html><head><style>${source}</style></head><body><h1>CSS Preview</h1><p>Edit styles on the left.</p></body></html>`;
    codeSetOutput("Rendered CSS preview.");
    return;
  }

  if (language === "javascript" || language === "typescript") {
    const payload = `<!doctype html><html><body><script>
      const push = (msg) => parent.postMessage({ source: 'code-studio', message: String(msg) }, '*');
      console.log = (...args) => push(args.join(' '));
      window.onerror = (msg, src, line, col, err) => { push(err && err.stack ? err.stack : msg); };
      try {\n${source.replace(/<\/script>/gi, "</scr" + "ipt>")}\n} catch (e) { push(e && e.stack ? e.stack : e.message); }
    <\/script></body></html>`;
    codeOutputFrame.srcdoc = payload;
    codeSetOutput(language === "typescript" ? "TypeScript runs as plain JavaScript in-browser." : "JavaScript executed in sandboxed preview.");
    return;
  }

  if (language === "python") {
    try {
      codeSetOutput("Loading Python runtime...");
      const pyodide = await codeEnsurePyodide();
      const indented = source
        .split("\n")
        .map((line) => `    ${line}`)
        .join("\n");

      const wrapped = [
        "import sys, io, traceback",
        "_buf = io.StringIO()",
        "_old = sys.stdout",
        "sys.stdout = _buf",
        "try:",
        indented || "    pass",
        "except Exception:",
        "    traceback.print_exc(file=_buf)",
        "finally:",
        "    sys.stdout = _old",
        "_buf.getvalue()",
      ].join("\n");

      const result = await pyodide.runPythonAsync(wrapped);
      codeSetOutput(result || "(no output)");
    } catch (error) {
      codeSetOutput(`Python runtime error: ${error.message}`);
    }
    return;
  }

  codeSetOutput(
    `${language.toUpperCase()} editing is supported, but compiling/running requires a real backend toolchain. Use the desktop terminal for local compilers.`
  );
}



function codeSaveToCurrentFolder(preferredName = "") {
  if (!codeEditor || !codeFileNameInput) {
    return;
  }

  const requested = preferredName || codeFileNameInput.value.trim() || codeTemplates[codeState.language]?.file || "untitled.txt";
  filesSaveOrUpdateFile(filesState.currentPath, requested, codeEditor.value, "text/plain");
  filesState.selectedEntryName = requested;
  filesState.selectedEntryType = "file";
  renderFilesGrid();
  showToast(`Saved ${requested} in ${filesDisplayPath(filesState.currentPath)}`);
}

function codeSelectTab(tabId) {
  codeSaveCurrentTab();
  codeState.currentTab = tabId;
  
  // Update active tab button
  document.querySelectorAll(".code-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tabId === tabId);
  });

  const tabType = tabId.split("-")[0];
  const webSubtabs = document.getElementById("webSubtabs");
  if (webSubtabs) {
    if (tabType === "web") {
      webSubtabs.parentElement.classList.add("visible");
      codeSelectSubtab("html");
      codeLanguageSelect.value = "html";
    } else {
      webSubtabs.parentElement.classList.remove("visible");
      codeState.language = "javascript";
      codeLanguageSelect.value = "javascript";
    }
  }

  codeUpdateEditor();
}

function codeSelectSubtab(subtab) {
  const tabType = codeState.currentTab.split("-")[0];
  if (tabType !== "web") return;

  codeState.currentSubtab = subtab;
  codeSubtabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.subtab === subtab);
  });

  const langMap = { html: "html", css: "css", js: "javascript" };
  codeState.language = langMap[subtab] || "javascript";

  if (codeLanguageSelect) {
    codeLanguageSelect.value = codeState.language;
  }

  codeUpdateEditor();
}

function codeUpdateEditor() {
  if (!codeEditor || !codeFileNameInput) return;

  let tabData;
  const tabType = codeState.currentTab.split("-")[0];
  
  if (tabType === "web") {
    tabData = codeState.tabs[codeState.currentTab][codeState.currentSubtab];
  } else {
    tabData = codeState.tabs[codeState.currentTab];
  }

  if (tabData) {
    codeEditor.value = tabData.content;
    codeFileNameInput.value = tabData.filename;
  }
  
  updateUndoRedoButtons();
}

function codeSaveCurrentTab() {
  if (!codeEditor) return;

  const tabType = codeState.currentTab.split("-")[0];
  const currentTabData = codeState.tabs[codeState.currentTab];
  if (!currentTabData) return; // tab was deleted
  
  if (tabType === "web") {
    const tabData = currentTabData[codeState.currentSubtab];
    if (tabData) {
      tabData.content = codeEditor.value;
    }
  } else {
    currentTabData.content = codeEditor.value;
  }
}

function codeAddToHistory() {
  if (!codeEditor) return;
  
  const tabHistory = codeState.editHistory[codeState.currentTab];
  if (!tabHistory) {
    codeState.editHistory[codeState.currentTab] = { past: [], future: [] };
  }
  
  tabHistory.past.push(codeEditor.value);
  tabHistory.future = [];
  
  if (tabHistory.past.length > 50) {
    tabHistory.past.shift();
  }
  
  updateUndoRedoButtons();
}

function codeUndo() {
  const tabHistory = codeState.editHistory[codeState.currentTab];
  if (!tabHistory || tabHistory.past.length === 0) return;

  tabHistory.future.push(codeEditor.value);
  codeEditor.value = tabHistory.past.pop();
  
  codeSaveCurrentTab();
  updateUndoRedoButtons();
}

function codeRedo() {
  const tabHistory = codeState.editHistory[codeState.currentTab];
  if (!tabHistory || tabHistory.future.length === 0) return;

  tabHistory.past.push(codeEditor.value);
  codeEditor.value = tabHistory.future.pop();
  
  codeSaveCurrentTab();
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const tabHistory = codeState.editHistory[codeState.currentTab] || { past: [], future: [] };
  if (codeUndoButton) {
    codeUndoButton.disabled = tabHistory.past.length === 0;
  }
  if (codeRedoButton) {
    codeRedoButton.disabled = tabHistory.future.length === 0;
  }
}

function codeCreateNewTab() {
  const choice = confirm("Select tab type:\nOK = Web, Cancel = JavaScript");
  const tabType = choice ? "web" : "javascript";
  
  const counter = ++codeState.tabCounter[tabType];
  const tabId = `${tabType}-${counter}`;
  
  if (tabType === "web") {
    codeState.tabs[tabId] = {
      html: { content: "", filename: "index.html" },
      css: { content: "", filename: "styles.css" },
      js: { content: "", filename: "script.js" },
    };
  } else {
    codeState.tabs[tabId] = {
      content: "",
      filename: "main.js",
    };
  }
  
  codeState.editHistory[tabId] = { past: [], future: [] };
  
  renderCodeTabs();
  codeSelectTab(tabId);
  showToast(`Created new ${tabType === "web" ? "Web" : "JavaScript"} tab`);
}

function codeCloseTab(tabId) {
  const tabCount = Object.keys(codeState.tabs).length;
  if (tabCount <= 1) {
    showToast("You must keep at least one tab open");
    return;
  }
  
  // Update currentTab before deleting so codeSaveCurrentTab won't try to save a deleted tab
  const wasActive = codeState.currentTab === tabId;
  const remainingTabs = Object.keys(codeState.tabs).filter(id => id !== tabId);
  
  if (wasActive && remainingTabs.length > 0) {
    codeState.currentTab = remainingTabs[0];
  }
  
  delete codeState.tabs[tabId];
  delete codeState.editHistory[tabId];
  
  renderCodeTabs();
  
  if (wasActive) {
    codeSelectTab(codeState.currentTab);
  }
  
  showToast("Tab closed");
}

function renderCodeTabs() {
  if (!codeTabsList) return;
  
  codeTabsList.innerHTML = "";
  
  Object.keys(codeState.tabs).forEach((tabId) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `code-tab ${tabId === codeState.currentTab ? "active" : ""}`;
    btn.dataset.tabId = tabId;
    
    const tabType = tabId.split("-")[0];
    const tabNum = tabId.split("-")[1];
    const displayName = tabType === "web" ? `Web ${tabNum}` : `JS ${tabNum}`;
    
    const span = document.createElement("span");
    span.textContent = displayName;
    
    const closeSpan = document.createElement("span");
    closeSpan.className = "code-tab-close";
    closeSpan.textContent = "×";
    closeSpan.style.cursor = "pointer";
    closeSpan.addEventListener("click", (e) => {
      e.stopPropagation();
      codeCloseTab(tabId);
    });
    
    btn.appendChild(span);
    btn.appendChild(closeSpan);
    
    btn.addEventListener("click", () => codeSelectTab(tabId));
    
    codeTabsList.appendChild(btn);
  });
}

function codeSelectTab(tabId) {
  codeSaveCurrentTab();
  codeState.currentTab = tabId;
  
  // Update active tab button
  document.querySelectorAll(".code-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tabId === tabId);
  });

  const tabType = tabId.split("-")[0];
  const webSubtabs = document.getElementById("webSubtabs");
  if (webSubtabs) {
    if (tabType === "web") {
      webSubtabs.parentElement.classList.add("visible");
      codeSelectSubtab("html");
      codeLanguageSelect.value = "html";
    } else {
      webSubtabs.parentElement.classList.remove("visible");
      codeState.language = "javascript";
      codeLanguageSelect.value = "javascript";
    }
  }

  codeUpdateEditor();
}

function initializeSavePicker() {
  if (!savePickerWindow) return;

  savePickerBackButton?.addEventListener("click", () => {
    const prev = savePickerState.backStack.pop();
    if (prev) {
      savePickerState.currentPath = prev;
      renderSavePickerGrid();
    }
  });

  savePickerUpButton?.addEventListener("click", () => {
    const parent = filesGetPathParent(savePickerState.currentPath);
    if (parent) {
      savePickerState.backStack.push(savePickerState.currentPath);
      savePickerState.currentPath = parent;
      renderSavePickerGrid();
    }
  });

  savePickerCancelButton?.addEventListener("click", () => {
    handleWindowToggle("savePickerWindow", false);
  });

  savePickerConfirmButton?.addEventListener("click", () => {
    const filename = savePickerFileNameInput?.value?.trim();
    if (!filename) {
      showToast("Enter a filename");
      return;
    }
    filesSaveOrUpdateFile(savePickerState.currentPath, filename, codeEditor.value, "text/plain");
    filesState.selectedEntryName = filename;
    filesState.selectedEntryType = "file";
    renderFilesGrid();
    handleWindowToggle("savePickerWindow", false);
    showToast(`Saved ${filename}`);
  });
}

function renderSavePickerGrid() {
  if (!savePickerGrid || !savePickerPathInput) return;

  savePickerPathInput.value = savePickerState.currentPath;
  savePickerGrid.innerHTML = "";

  const entries = filesListEntries(savePickerState.currentPath);
  entries.filter((e) => e.type === "folder").forEach((entry) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "folder-card";
    card.style.cursor = "pointer";

    const icon = document.createElement("div");
    icon.className = "folder-icon";

    const title = document.createElement("strong");
    title.textContent = entry.name;

    card.appendChild(icon);
    card.appendChild(title);

    card.addEventListener("click", () => {
      savePickerState.backStack.push(savePickerState.currentPath);
      savePickerState.currentPath = filesJoinPath(savePickerState.currentPath, entry.name);
      renderSavePickerGrid();
    });

    savePickerGrid.appendChild(card);
  });
}

function openSavePicker(defaultName = "") {
  savePickerState.currentPath = filesState.currentPath || filesHomePath;
  savePickerState.backStack = [];
  if (savePickerFileNameInput) {
    savePickerFileNameInput.value = defaultName || codeFileNameInput?.value || "main.js";
  }
  renderSavePickerGrid();
  handleWindowToggle("savePickerWindow", true);
}

function initializeGitClone() {
  if (!gitCloneWindow) return;

  gitFetchButton?.addEventListener("click", async () => {
    const url = gitUrlInput?.value?.trim();
    if (!url) {
      showToast("Enter a Git URL");
      return;
    }

    showToast("Fetching repository...");
    gitFetchButton.disabled = true;

    try {
      // Parse GitHub URL
      const match = url.match(/github\.com[/:]([\w-]+)\/([\w-]+)/);
      if (!match) {
        showToast("Invalid GitHub URL. Format: github.com/owner/repo");
        return;
      }

      const [, owner, repo] = match;
      const fileType = gitFileTypeSelect?.value || "javascript";
      const ext = { javascript: ".js", python: ".py", html: ".html", css: ".css", typescript: ".ts", json: ".json", markdown: ".md" }[fileType] || ".txt";

      // Fetch repository contents
      const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
      const contentsResponse = await fetch(contentsUrl);

      if (!contentsResponse.ok) {
        showToast("Repository not found or API limit reached");
        gitFetchButton.disabled = false;
        return;
      }

      const files = await contentsResponse.json();
      gitCloneState.files = [];

      // Filter files by type and fetch content
      for (const file of files) {
        if (file.type === "file") {
          const fileName = file.name.toLowerCase();
          let isMatching = false;

          if (fileType === "javascript" && (fileName.endsWith(".js") || fileName.endsWith(".ts"))) {
            isMatching = true;
          } else if (fileType === "python" && fileName.endsWith(".py")) {
            isMatching = true;
          } else if (fileType === "html" && fileName.endsWith(".html")) {
            isMatching = true;
          } else if (fileType === "css" && fileName.endsWith(".css")) {
            isMatching = true;
          } else if (fileType === "json" && fileName.endsWith(".json")) {
            isMatching = true;
          } else if (fileType === "markdown" && (fileName.endsWith(".md") || fileName === "readme")) {
            isMatching = true;
          }

          if (isMatching) {
            const contentResponse = await fetch(file.raw_url || file.download_url);
            const content = await contentResponse.text();
            gitCloneState.files.push({
              name: file.name,
              type: fileType,
              content: content,
              selected: false,
            });
          }
        }
      }

      if (gitCloneState.files.length === 0) {
        showToast(`No ${fileType} files found in repository`);
        gitFetchButton.disabled = false;
        return;
      }

      renderGitFileList();
      if (gitPreviewContainer) {
        gitPreviewContainer.style.display = "grid";
      }
      showToast(`Found ${gitCloneState.files.length} files`);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      gitFetchButton.disabled = false;
    }
  });

  gitLoadButton?.addEventListener("click", () => {
    const selected = gitCloneState.files.filter((f) => f.selected);
    if (!selected.length) {
      showToast("Select at least one file");
      return;
    }

    // Load files into appropriate tabs
    selected.forEach((file) => {
      const fileType = file.type;
      
      if (fileType === "javascript" || fileType === "typescript" || fileType === "python") {
        // Load into JavaScript tab
        const tabId = "js-1";
        if (!codeState.tabs[tabId]) {
          codeState.tabs[tabId] = { content: "", filename: file.name };
          codeState.editHistory[tabId] = { past: [], future: [] };
        }
        codeState.tabs[tabId].content = file.content;
        codeState.tabs[tabId].filename = file.name;
      } else if (fileType === "html") {
        // Load into Web tab HTML
        const tabId = "web-1";
        if (codeState.tabs[tabId]) {
          codeState.tabs[tabId].html.content = file.content;
          codeState.tabs[tabId].html.filename = file.name;
        }
      } else if (fileType === "css") {
        // Load into Web tab CSS
        const tabId = "web-1";
        if (codeState.tabs[tabId]) {
          codeState.tabs[tabId].css.content = file.content;
          codeState.tabs[tabId].css.filename = file.name;
        }
      }
    });

    // Switch to the first loaded tab
    if (selected[0].type === "html" || selected[0].type === "css") {
      codeSelectTab("web-1");
    } else {
      codeSelectTab("js-1");
    }

    codeUpdateEditor();
    handleWindowToggle("gitCloneWindow", false);
    showToast(`Loaded ${selected.length} file(s)`);
  });

  gitBackButton?.addEventListener("click", () => {
    if (gitPreviewContainer) {
      gitPreviewContainer.style.display = "none";
    }
    gitCloneState.files = [];
    gitCloneState.selectedFiles = [];
  });
}


function renderGitFileList() {
  if (!gitFileList) return;

  gitFileList.innerHTML = "";
  gitCloneState.files.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "git-file-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = file.selected || false;
    checkbox.addEventListener("change", () => {
      gitCloneState.files[index].selected = checkbox.checked;
    });

    const label = document.createElement("label");
    label.textContent = file.name;

    item.appendChild(checkbox);
    item.appendChild(label);
    gitFileList.appendChild(item);
  });
}

function initializeCodeStudio() {
  if (!codeEditor || !codeLanguageSelect || !codeTerminalForm || !codeTerminalInput) {
    return;
  }

  codeSetLanguage("javascript");
  codeAppendTerminalLine("Code Studio terminal ready. Type help.");
  
  renderCodeTabs();

  // Undo/Redo buttons
  codeUndoButton?.addEventListener("click", () => {
    codeUndo();
  });

  codeRedoButton?.addEventListener("click", () => {
    codeRedo();
  });

  // New tab button
  codeAddTabButton?.addEventListener("click", () => {
    codeCreateNewTab();
  });

  // Code editor change tracking
  codeEditor?.addEventListener("input", () => {
    // Don't add to history on every keystroke, only on logical intervals
  });

  // Keyboard shortcuts
  codeEditor?.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      codeUndo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
      e.preventDefault();
      codeRedo();
    }
  });

  // Auto-save to history on blur
  codeEditor?.addEventListener("blur", () => {
    codeAddToHistory();
  });

  codeSubtabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      codeSaveCurrentTab();
      codeSelectSubtab(btn.dataset.subtab);
    });
  });

  codeLanguageSelect.addEventListener("change", () => {
    codeSaveCurrentTab();
    const newLang = codeLanguageSelect.value;
    const tabType = codeState.currentTab.split("-")[0];
    if (tabType === "web") {
      const subtabMap = { html: "html", css: "css", javascript: "js" };
      const subtab = subtabMap[newLang];
      if (subtab) codeSelectSubtab(subtab);
    }
    codeSetLanguage(newLang);
  });

  codeNewButton?.addEventListener("click", () => {
    codeSetLanguage(codeLanguageSelect.value || "javascript");
    showToast("Loaded language template");
  });

  codeSaveButton?.addEventListener("click", () => {
    codeSaveCurrentTab();
    openSavePicker(codeFileNameInput?.value || "main.js");
  });

  codeCloneButton?.addEventListener("click", () => {
    handleWindowToggle("gitCloneWindow", true);
  });

  codeRunButton?.addEventListener("click", () => {
    codeSaveCurrentTab();
    runCodeStudio();
  });

  window.addEventListener("message", (event) => {
    if (event.data?.source !== "code-studio") {
      return;
    }
    const prior = codeOutputText?.textContent?.trim();
    const next = prior ? `${prior}\n${event.data.message}` : event.data.message;
    codeSetOutput(next);
  });

  codeTerminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = codeTerminalInput.value.trim();
    if (!raw) {
      return;
    }

    codeAppendTerminalLine(`code@studio:${filesDisplayPath(codeState.terminalCwd)}$ ${raw}`, "command");
    const [commandName, ...args] = raw.split(/\s+/);
    const command = commandName.toLowerCase();

    if (command === "help") {
      codeAppendTerminalLine("help, ls, cd, pwd, cat, save [name], run, lang <name>, node, python, pnpm, npm, clear", "result");
    } else if (command === "clear") {
      codeTerminalOutput.innerHTML = "";
    } else if (command === "pwd") {
      codeAppendTerminalLine(codeState.terminalCwd, "result");
    } else if (command === "ls") {
      const path = filesNormalizePath(args[0] || ".", codeState.terminalCwd);
      if (!filesPathExists(path)) {
        codeAppendTerminalLine(`ls: ${args[0] || "."}: No such directory`, "error");
      } else {
        const names = filesListEntries(path).map((entry) => (entry.type === "folder" ? `${entry.name}/` : entry.name));
        codeAppendTerminalLine(names.join("  ") || "(empty)", "result");
      }
    } else if (command === "cd") {
      const path = filesNormalizePath(args[0] || filesHomePath, codeState.terminalCwd);
      if (!filesPathExists(path)) {
        codeAppendTerminalLine(`cd: ${args[0] || ""}: No such directory`, "error");
      } else {
        codeState.terminalCwd = path;
      }
    } else if (command === "cat") {
      if (!args[0]) {
        codeAppendTerminalLine("cat: missing file operand", "error");
      } else {
        const resolved = filesResolveEntry(args[0], codeState.terminalCwd);
        if (!resolved || resolved.entry.type !== "file") {
          codeAppendTerminalLine(`cat: ${args[0]}: No such file`, "error");
        } else {
          codeAppendTerminalLine(resolved.entry.content || "", "result");
        }
      }
    } else if (command === "save") {
      const name = args[0] || codeFileNameInput?.value || "untitled.txt";
      codeSaveToCurrentFolder(name);
    } else if (command === "run") {
      runCodeStudio();
      codeAppendTerminalLine("Executed current editor content.", "result");
    } else if (command === "lang") {
      const requested = (args[0] || "").toLowerCase();
      if (!codeTemplates[requested]) {
        codeAppendTerminalLine(`Unsupported language: ${requested}`, "error");
      } else {
        codeSetLanguage(requested);
        codeAppendTerminalLine(`Language set to ${requested}`, "result");
      }
    } else if (command === "node") {
      codeAppendTerminalLine("Node.js runtime is not available directly in browser sandbox. Use Run for JavaScript execution.", "error");
    } else if (command === "pnpm" || command === "npm") {
      codeAppendTerminalLine(`${command} is unavailable in browser-only mode. Use your real system terminal for package commands.`, "error");
    } else if (command === "python") {
      codeAppendTerminalLine("Use Run while Python is selected to execute with Pyodide.", "result");
    } else {
      codeAppendTerminalLine(`command not found: ${command}`, "error");
    }

    codeTerminalInput.value = "";
  });
}

function normalizeAddress(rawValue) {
  const value = rawValue.trim();
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Looks like a domain if it has a dot and no spaces
  if (!value.includes(" ") && value.includes(".") && /^[a-zA-Z0-9.-]+(\/.*)?$/.test(value)) {
    return `https://${value}`;
  }

  return `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(value)}`;
}

const browserState = {
  tabs: [],
  currentTabId: null,
  nextId: 1,
};

const BROWSER_SCRAMJET_ORIGIN = "http://127.0.0.1:4141";

function getBrowserScramjetUrl(targetUrl = "") {
  if (!targetUrl) {
    return `${BROWSER_SCRAMJET_ORIGIN}/`;
  }
  // Use the demo UI (no embed=1) so Scramjet's own JS context handles rewriting
  return `${BROWSER_SCRAMJET_ORIGIN}/?goto=${encodeURIComponent(targetUrl)}`;
}

function buildSearchResultsPage(md) {
  function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escAttr(s) { return String(s).replace(/"/g,'&quot;'); }
  function decodeDdgUrl(ddgUrl) {
    // Extract actual URL from DuckDuckGo redirect: https://duckduckgo.com/l/?uddg=<encoded>
    try {
      const m = ddgUrl.match(/[?&]uddg=([^&]+)/);
      if (m) return decodeURIComponent(m[1]);
    } catch {}
    return ddgUrl;
  }

  const cut = md.indexOf('Markdown Content:');
  if (cut !== -1) md = md.slice(cut + 17);

  const results = [];
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    // Pattern: "1.[Title](url)" or "10.[Title](url)"
    const numLink = line.match(/^\d+\.\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
    if (numLink) {
      const title = numLink[1];
      const rawUrl = numLink[2];
      const url = decodeDdgUrl(rawUrl);
      let desc = '';
      let domain = '';
      // Next non-empty line is description
      i++;
      if (i < lines.length) {
        const descLine = lines[i].trim();
        if (descLine && !descLine.match(/^\d+\.\[/)) {
          desc = descLine.replace(/\*\*([^*]+)\*\*/g, '$1'); // strip bold
          i++;
        }
      }
      // Next non-empty line is the domain
      if (i < lines.length) {
        const domLine = lines[i].trim();
        if (domLine && !domLine.match(/^\d+\.\[/)) {
          domain = domLine.split(' ')[0]; // take just domain part
          i++;
        }
      }
      results.push({ title, url, desc, domain });
      continue;
    }
    i++;
  }

  let resultsHtml = '';
  if (!results.length) {
    resultsHtml = '<p style="color:#888;padding:16px;text-align:center">No results found.</p>';
  } else {
    for (const r of results) {
      resultsHtml += '<div class="result">';
      resultsHtml += `<div class="result-title"><a href="#" data-url="${escAttr(r.url)}">${escHtml(r.title)}</a></div>`;
      resultsHtml += `<div class="result-url">${escHtml(r.domain || r.url.replace(/^https?:\/\//, ''))}</div>`;
      if (r.desc) resultsHtml += `<div class="result-desc">${escHtml(r.desc.substring(0, 220))}</div>`;
      resultsHtml += '</div>';
    }
  }

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#111;color:#e8e8e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;padding:16px 20px}
.result{margin:10px 0;padding:10px 12px;border-radius:6px;background:#1c1c1c;border:1px solid #2a2a2a;transition:border-color .15s}
.result:hover{border-color:#444}
.result-title{font-size:14px;font-weight:500;margin-bottom:3px}
.result-title a{color:#6ab0ff;text-decoration:none}
.result-title a:hover{text-decoration:underline}
.result-url{font-size:11px;color:#5a9a5a;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.result-desc{font-size:12px;color:#aaa;line-height:1.5}
</style></head><body>
${resultsHtml}
<script>
document.body.addEventListener('click',function(e){
  var a=e.target.closest('[data-url]');
  if(a){e.preventDefault();parent.postMessage({type:'browser-navigate',url:a.dataset.url},'*');}
});
<\/script>
</body></html>`;
}

function getBrowserHomePageHtml() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0f0f0f; color: #f1f1f1; font-family: Segoe UI, sans-serif; }
      .home { width: min(720px, 92vw); }
      h1 { margin: 0 0 10px; font-size: 1.5rem; font-weight: 600; }
      p { margin: 0 0 16px; color: #b8b8b8; }
      form { display: grid; grid-template-columns: 1fr auto; gap: 8px; }
      input { border: 1px solid #3b3b3b; background: #1b1b1b; color: #f1f1f1; padding: 12px; font: inherit; }
      button { border: 1px solid #4a4a4a; background: #2d2d2d; color: #f1f1f1; padding: 12px 14px; font: inherit; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="home">
      <h1>Browser Home</h1>
      <p>Search the web or enter a website address.</p>
      <form id="homeSearchForm">
        <input id="homeSearchInput" type="text" placeholder="Search or enter address" />
        <button type="submit">Search</button>
      </form>
    </div>
    <script>
      document.getElementById('homeSearchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const value = document.getElementById('homeSearchInput').value.trim();
        if (!value) return;
        parent.postMessage({ type: 'browser-home-search', query: value }, '*');
      });
    <\/script>
  </body>
</html>`;
}

function getBrowserMirrorCandidates(targetUrl) {
  const stripped = targetUrl.replace(/^https?:\/\//i, "");
  return [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`,
    `https://r.jina.ai/http://${stripped}`,
  ];
}

function fetchWithTimeout(url, timeoutMs = 6000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
    }),
  ]);
}

function getCurrentBrowserTab() {
  return browserState.tabs.find((tab) => tab.id === browserState.currentTabId) || null;
}

function getBrowserTabTitle(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    if (parsed.hostname.includes("duckduckgo.com")) {
      const query = parsed.searchParams.get("q");
      return query ? `Search: ${query.replace(/\+/g, ' ')}` : "Search";
    }
    return parsed.hostname || "New Tab";
  } catch {
    return "New Tab";
  }
}

function isDirectSearchUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    return parsed.hostname.includes("duckduckgo.com");
  } catch {
    return false;
  }
}

function isLikelyHtml(content = "") {
  const trimmed = content.trimStart();
  if (/Markdown Content:|URL Source:|^Title:/im.test(content)) {
    return false;
  }
  return /^(<!doctype|<html|<head|<body|<!--)/i.test(trimmed);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractBrowserPreviewText(rawContent) {
  let source = rawContent || "";

  if (/<(html|body|head|pre|div|article|main)\b/i.test(source)) {
    try {
      const parsedDocument = new DOMParser().parseFromString(source, "text/html");
      source = parsedDocument.body?.innerText || source;
    } catch {
      source = rawContent || "";
    }
  }

  const contentStart = source.indexOf("Markdown Content:");
  if (contentStart >= 0) {
    source = source.slice(contentStart + "Markdown Content:".length);
  }

  return source
    .replace(/^Title:\s.*$/gim, "")
    .replace(/^URL Source:\s.*$/gim, "")
    .replace(/^Markdown Content:\s*/gim, "")
    .trim();
}

function renderBrowserPreviewPage(targetUrl, rawContent = "Preview unavailable.") {
  const previewText = extractBrowserPreviewText(rawContent);
  const safeText = escapeHtml(previewText || "Preview unavailable.");
  const withMarkdownLinks = safeText
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">[image: $1]</a>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/(https?:\/\/[\w\-./?=&%#:+~]+)/g, '<a href="$1">$1</a>');

  const lines = withMarkdownLinks.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return "<br />";
    }
    if (/^#{1,6}\s+/.test(trimmed)) {
      const level = Math.min(6, trimmed.match(/^#+/)[0].length);
      return `<h${level}>${trimmed.replace(/^#{1,6}\s+/, "")}</h${level}>`;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      return `<li>${trimmed.replace(/^[-*+]\s+/, "")}</li>`;
    }
    return `<p>${trimmed}</p>`;
  }).join("");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="${targetUrl}">
    <style>
      body {
        margin: 0;
        background: #101010;
        color: #f4f4f4;
        font-family: Segoe UI, sans-serif;
      }
      .card {
        width: min(720px, calc(100vw - 32px));
        margin: 18px auto;
        border: 1px solid #2f2f2f;
        background: rgba(18, 18, 18, 0.96);
        padding: 18px;
        display: grid;
        gap: 12px;
      }
      .url {
        color: #9b9b9b;
        word-break: break-all;
        font-size: 0.88rem;
      }
      .reason {
        color: #e2e2e2;
        line-height: 1.5;
      }
      .content {
        padding: 12px;
        border: 1px solid #2f2f2f;
        background: #161616;
        color: #d8d8d8;
      }
      .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
        margin: 1.1em 0 0.4em;
        line-height: 1.2;
      }
      .content p, .content li {
        line-height: 1.55;
        margin: 0 0 10px;
      }
      .content a {
        color: #8ab4f8;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      button {
        border: 1px solid #444;
        background: #262626;
        color: #fff;
        padding: 10px 12px;
        font: inherit;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <strong>Browser preview</strong>
      <div class="url">${escapeHtml(targetUrl)}</div>
      <div class="reason">Showing a text preview because the page did not load as standard browser HTML.</div>
      <div class="content">${lines || `<p>${escapeHtml(previewText || "Preview unavailable.")}</p>`}</div>
      <div class="actions">
        <button type="button" onclick="parent.postMessage({ type: 'browser-home-search', query: '' }, '*')">Home</button>
        <button type="button" onclick="history.back()">Back</button>
      </div>
    </div>
  </body>
</html>`;
}

function updateBrowserNavButtons() {
  const tab = getCurrentBrowserTab();
  if (!tab) {
    browserBackButton.disabled = true;
    browserForwardButton.disabled = true;
    return;
  }
  browserBackButton.disabled = tab.historyIndex <= 0;
  browserForwardButton.disabled = tab.historyIndex >= tab.history.length - 1;
}

function renderBrowserTabs() {
  if (!browserTabsList) {
    return;
  }

  browserTabsList.innerHTML = "";
  browserState.tabs.forEach((tab) => {
    const tabButton = document.createElement("button");
    tabButton.type = "button";
    tabButton.className = `browser-tab ${tab.id === browserState.currentTabId ? "active" : ""}`;
    tabButton.dataset.tabId = tab.id;

    const label = document.createElement("span");
    label.className = "browser-tab-label";
    label.textContent = tab.title || "New Tab";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "browser-tab-close";
    closeButton.textContent = "×";
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closeBrowserTab(tab.id);
    });

    tabButton.appendChild(label);
    tabButton.appendChild(closeButton);
    tabButton.addEventListener("click", () => selectBrowserTab(tab.id));
    browserTabsList.appendChild(tabButton);
  });
}

function createBrowserTab() {
  const newTab = {
    id: `tab-${browserState.nextId++}`,
    title: "New Tab",
    url: "",
    history: [],
    historyIndex: -1,
  };
  browserState.tabs.push(newTab);
  browserState.currentTabId = newTab.id;
  renderBrowserTabs();
  showBrowserHomePage();
}

function closeBrowserTab(tabId) {
  if (browserState.tabs.length <= 1) {
    showToast("At least one tab must stay open");
    return;
  }

  const closingIndex = browserState.tabs.findIndex((tab) => tab.id === tabId);
  if (closingIndex === -1) {
    return;
  }

  const wasCurrent = browserState.currentTabId === tabId;
  browserState.tabs.splice(closingIndex, 1);

  if (wasCurrent) {
    const fallbackIndex = Math.max(0, closingIndex - 1);
    browserState.currentTabId = browserState.tabs[fallbackIndex].id;
    const nextTab = getCurrentBrowserTab();
    if (nextTab && nextTab.url) {
      browserInput.value = nextTab.url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
      loadBrowserMirror(nextTab.url, false);
    } else {
      showBrowserHomePage();
    }
  }

  renderBrowserTabs();
  updateBrowserNavButtons();
}

function selectBrowserTab(tabId) {
  browserState.currentTabId = tabId;
  renderBrowserTabs();
  const tab = getCurrentBrowserTab();
  if (!tab || !tab.url) {
    showBrowserHomePage();
    return;
  }
  browserInput.value = tab.url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  loadBrowserMirror(tab.url, false);
}

function showBrowserHomePage() {
  const tab = getCurrentBrowserTab();
  if (!tab) {
    return;
  }
  tab.title = "New Tab";
  tab.url = "";
  browserInput.value = "";
  browserFrame.srcdoc = getBrowserHomePageHtml();
  browserHint.textContent = "Home";
  renderBrowserTabs();
  updateBrowserNavButtons();
}

async function loadBrowserMirror(targetUrl, trackInHistory = true) {
  const tab = getCurrentBrowserTab();
  if (!tab) {
    return;
  }

  const normalized = normalizeAddress(targetUrl);
  if (!normalized) {
    showBrowserHomePage();
    return;
  }

  if (trackInHistory) {
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    tab.history.push(normalized);
    tab.historyIndex = tab.history.length - 1;
  }

  tab.url = normalized;
  tab.title = getBrowserTabTitle(normalized);
  browserInput.value = normalized.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  renderBrowserTabs();
  updateBrowserNavButtons();

  browserFrame.srcdoc = "";
  
  // Check if this is a search URL - use mirror for searches to avoid Scramjet's JS rewriting bugs
  if (normalized.includes("duckduckgo.com")) { // covers both duckduckgo.com and lite.duckduckgo.com
    // Show loading state immediately
    browserFrame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{background:#111;color:#e8e8e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;padding:40px;text-align:center}
      .spinner{display:inline-block;width:18px;height:18px;border:2px solid #444;border-top-color:#888;border-radius:50%;animation:spin .7s linear infinite;margin-right:8px;vertical-align:middle}
      @keyframes spin{to{transform:rotate(360deg)}}
    </style></head><body><span class="spinner"></span>Loading results...</body></html>`;
    const jinaUrl = `https://r.jina.ai/${encodeURIComponent(normalized)}`;
    fetch(jinaUrl)
      .then(r => r.text())
      .then(md => {
        browserFrame.srcdoc = buildSearchResultsPage(md);
      })
      .catch(err => {
        browserFrame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>body{background:#111;color:#f66;font-family:sans-serif;padding:20px}</style></head><body>Search error: ${err.message}</body></html>`;
      });
    browserHint.textContent = `DuckDuckGo: ${decodeURIComponent(normalized.substring(normalized.indexOf('q=') + 2, normalized.indexOf('q=') + 50)).replace(/\+/g, ' ')}`;
  } else {
    // For other URLs, use Scramjet proxy
    // Must remove srcdoc attribute entirely — if it's present (even empty) it takes precedence over src
    browserFrame.removeAttribute("srcdoc");
    browserFrame.src = getBrowserScramjetUrl(normalized);
    browserHint.textContent = `Scramjet: ${normalized}`;
  }
}

function navigateBrowserBack() {
  const tab = getCurrentBrowserTab();
  if (!tab || tab.historyIndex <= 0) {
    return;
  }
  tab.historyIndex -= 1;
  const nextUrl = tab.history[tab.historyIndex];
  loadBrowserMirror(nextUrl, false);
}

function navigateBrowserForward() {
  const tab = getCurrentBrowserTab();
  if (!tab || tab.historyIndex >= tab.history.length - 1) {
    return;
  }
  tab.historyIndex += 1;
  const nextUrl = tab.history[tab.historyIndex];
  loadBrowserMirror(nextUrl, false);
}

function initializeBrowserTabs() {
  if (!browserTabsList || !browserForm || !browserInput) {
    return;
  }

  browserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = browserInput.value.trim();
    if (!value) {
      showBrowserHomePage();
      return;
    }
    loadBrowserMirror(value, true);
  });

  browserBackButton?.addEventListener("click", navigateBrowserBack);
  browserForwardButton?.addEventListener("click", navigateBrowserForward);
  browserAddTabButton?.addEventListener("click", createBrowserTab);
  browserMinimizeButton?.addEventListener("click", () => minimizeWindow(browserWindow));

  window.addEventListener("message", (event) => {
    if (event.data?.type === "browser-navigate" && event.data.url) {
      loadBrowserMirror(event.data.url, true);
      return;
    }
    if (event.data?.type === "browser-home-search") {
      if (!event.data.query) {
        showBrowserHomePage();
        return;
      }
      loadBrowserMirror(event.data.query, true);
    }
  });

  createBrowserTab();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideAppContextMenu();
    closeWindow(settingsWindow);
    closeWindow(terminalWindow);
    closeWindow(browserWindow);
    closeWindow(fetchWindow);
    closeWindow(filesWindow);
    closeWindow(codeWindow);
    closeWindow(placesWindow);
    closeWindow(launcherInfoWindow);
    closeWindow(mp3Window);
    closeWindow(widgetsWindow);
    closeWindow(soundScopeWindow);
    if (audioState.soundModeEnabled) {
      stopSoundMode();
    }
    closeWindow(savePickerWindow);
    closeWindow(gitCloneWindow);
    toggleLauncherMenu(false);
    if (powerMode !== "none") {
      setPowerOverlay("none");
    }
  }

  if (powerMode === "sleep") {
    setPowerOverlay("none");
  }
});

launcherButton.addEventListener("click", () => {
  toggleLauncherMenu(!launcherMenu.classList.contains("is-open"));
});

document.addEventListener("click", (event) => {
  const clickedLauncher = launcherMenu.contains(event.target) || launcherButton.contains(event.target) || event.target.closest(".launcher");
  if (!clickedLauncher) {
    toggleLauncherMenu(false);
  }

  if (!event.target.closest("#appContextMenu") && !event.target.closest(".launcher-tile") && !event.target.closest(".desktop-shortcut") && !event.target.closest(".taskbar-app")) {
    hideAppContextMenu();
  }
});

loadTheme();
buildAppCatalog();
initializeAppContextMenu();
initializeDeferredElements();
initializeWidgetsSystem();
initializeMp3Player();
initializeFilesExplorer();
initializeCodeStudio();
initializeSavePicker();
initializeGitClone();
initializeBrowserTabs();
initializeLoginGate();
applyLauncherFilters();
updateClock();
setInterval(updateClock, 1000);
setInterval(() => {
  if (fetchWindow.classList.contains("is-open")) {
    renderFetchScreen();
  }
}, 1000);
printTerminalBanner();