let accessToken: string | null = null;
let onLogout: (() => void) | null = null;

export function registerLogoutHandler(fn: () => void) {
  onLogout = fn;
}

export function setStoredAccessToken(token: string | null) {
  console.log(`in func: ${accessToken}`);
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function forceLogout() {
  accessToken = null;
  onLogout?.();
}
