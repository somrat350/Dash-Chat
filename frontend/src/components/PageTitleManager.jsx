import { useEffect } from "react";
import { useLocation } from "react-router";

const APP_NAME = "DashChat";

const routeTitleRules = [
  { match: (path) => path === "/", title: "Home" },
  { match: (path) => path === "/about", title: "About" },
  { match: (path) => path === "/features", title: "Features" },
  { match: (path) => path === "/contact", title: "Contact" },
  { match: (path) => path === "/privacy", title: "Privacy" },
  { match: (path) => path === "/auth/login", title: "Login" },
  { match: (path) => path === "/auth/register", title: "Register" },
  {
    match: (path) => path === "/auth/forgot-password",
    title: "Forgot Password",
  },
  {
    match: (path) => path === "/conversation" || path === "/conversation/chat",
    title: "Chats",
  },
  { match: (path) => path === "/conversation/profile", title: "Profile" },
  { match: (path) => path === "/conversation/setting", title: "Setting" },
  { match: (path) => path === "/conversation/channel", title: "Channel" },
  {
    match: (path) => path === "/conversation/community",
    title: "Community",
  },
  {
    match: (path) =>
      path === "/conversation/calls" || path === "/conversation/calls/recent",
    title: "Recent Calls",
  },
  {
    match: (path) => path === "/conversation/calls/missed",
    title: "Missed Calls",
  },
  {
    match: (path) => path === "/conversation/calls/scheduled",
    title: "Scheduled Calls",
  },
];

const getPageTitle = (pathname) => {
  const matchedRule = routeTitleRules.find((rule) => rule.match(pathname));
  return matchedRule ? `${APP_NAME} | ${matchedRule.title}` : APP_NAME;
};

const PageTitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
};

export default PageTitleManager;
