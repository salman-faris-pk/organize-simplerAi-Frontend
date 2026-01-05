import { NavItem, NavSectionItems } from "@/components/nav-section";



interface DashboardLayoutProps {
  children: React.ReactNode;
};

const pipelines: NavSectionItems = {
  label: "Pipelines",
  icon: "layers",
  items: [
    {
      label: "Text Recognition",
      href: "/text-recognition",
      icon: "textSelect",
    },
    {
      label: "Data Extraction",
      href: "/data-extraction",
      icon: "braces",
    },
    {
      label: "Verification",
      href: "/verification",
      icon: "checkCircle",
    },
  ],
};

const organizedData: NavSectionItems = {
  label: "Oragnized Data",
  icon: "grid",
  items: [
    {
      label: "Receipts",
      href: "/receipts",
      icon: "receipt",
    },
    {
      label: "Invoices",
      href: "/invoices",
      icon: "invoice",
    },
    {
      label: "Card Statements",
      href: "/card-statements",
      icon: "creditCard",
    },
  ],
};

const bottomItems: NavItem[] = [
  {
    label: "Help",
    href: "/help",
    icon: "help",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

const DashboardLayout = ({children}: DashboardLayoutProps) => {
  return (
    <div>layout</div>
  ) 
}

export default DashboardLayout