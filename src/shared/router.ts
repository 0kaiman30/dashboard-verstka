export const appRoutes = {
  DASHBOARD: "/",
  MYWALLET: "/mywallet",
  TRANSACTIONS: "/transactions",
  SETTINGS: "/settings",
} as const;

export const navItems = [
  { path: appRoutes.DASHBOARD, title: "Dashboard" },
  { path: appRoutes.MYWALLET, title: "My Wallet" },
  { path: appRoutes.TRANSACTIONS, title: "Transactions" },
  { path: appRoutes.SETTINGS, title: "Settings" },
];
