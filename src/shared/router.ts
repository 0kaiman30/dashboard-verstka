export const appRoutes = {
  DASHBOARD: "/",
  MYWALLET: "/mywallet",
  TRANSACTIONS: "/transactions",
  SETTINGS: "/settings",
} as const;

export const navItems = [
  { path: appRoutes.DASHBOARD, title: "Дашборд" },
  { path: appRoutes.MYWALLET, title: "Кошелек" },
  { path: appRoutes.TRANSACTIONS, title: "Транзакции" },
  { path: appRoutes.SETTINGS, title: "Настройки" },
];
