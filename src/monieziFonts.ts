const FONT_STYLE_ID = 'moniezi-embedded-fonts';

const FONT_URLS = {
  appRegularWoff2: '/fonts/moniezi-app-regular.woff2',
  appBoldWoff2: '/fonts/moniezi-app-bold.woff2',
  reportRegularWoff2: '/fonts/moniezi-report-regular.woff2',
  reportBoldWoff2: '/fonts/moniezi-report-bold.woff2',
  appRegularOtf: '/fonts/moniezi-app-regular.otf',
  appBoldOtf: '/fonts/moniezi-app-bold.otf',
  reportRegularOtf: '/fonts/moniezi-report-regular.otf',
  reportBoldOtf: '/fonts/moniezi-report-bold.otf',
} as const;

const fontFaceCss = `
@font-face {
  font-family: 'MonieziApp';
  src: url(${FONT_URLS.appRegularWoff2}) format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'MonieziApp';
  src: url(${FONT_URLS.appBoldWoff2}) format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'MonieziReport';
  src: url(${FONT_URLS.reportRegularWoff2}) format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'MonieziReport';
  src: url(${FONT_URLS.reportBoldWoff2}) format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
:root {
  --moniezi-app-font: 'MonieziApp', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  --moniezi-report-font: 'MonieziReport', 'MonieziApp', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
}
html body,
#root {
  font-family: var(--moniezi-app-font);
}
.moniezi-report-font,
.moniezi-report-font * {
  font-family: var(--moniezi-report-font);
}
.moniezi-report-font {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'liga' 1, 'calt' 1;
}
`;

export const installMonieziFonts = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(FONT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = FONT_STYLE_ID;
  style.textContent = fontFaceCss;
  document.head.appendChild(style);
};

export const waitForMonieziFonts = async () => {
  if (typeof document === 'undefined') return;
  installMonieziFonts();
  const fontsApi = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fontsApi?.load) return;
  await Promise.all([
    fontsApi.load(`400 14px MonieziApp`),
    fontsApi.load(`700 14px MonieziApp`),
    fontsApi.load(`400 14px MonieziReport`),
    fontsApi.load(`700 14px MonieziReport`),
  ]);
};

let appRegularOtfPromise: Promise<Uint8Array> | null = null;
let appBoldOtfPromise: Promise<Uint8Array> | null = null;
let reportRegularOtfPromise: Promise<Uint8Array> | null = null;
let reportBoldOtfPromise: Promise<Uint8Array> | null = null;

const fetchFontBytes = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load font asset: ${url}`);
  return new Uint8Array(await response.arrayBuffer());
};

export const getEmbeddedAppRegularOtf = () => {
  if (!appRegularOtfPromise) appRegularOtfPromise = fetchFontBytes(FONT_URLS.appRegularOtf);
  return appRegularOtfPromise;
};

export const getEmbeddedAppBoldOtf = () => {
  if (!appBoldOtfPromise) appBoldOtfPromise = fetchFontBytes(FONT_URLS.appBoldOtf);
  return appBoldOtfPromise;
};

export const getEmbeddedReportRegularOtf = () => {
  if (!reportRegularOtfPromise) reportRegularOtfPromise = fetchFontBytes(FONT_URLS.reportRegularOtf);
  return reportRegularOtfPromise;
};

export const getEmbeddedReportBoldOtf = () => {
  if (!reportBoldOtfPromise) reportBoldOtfPromise = fetchFontBytes(FONT_URLS.reportBoldOtf);
  return reportBoldOtfPromise;
};
