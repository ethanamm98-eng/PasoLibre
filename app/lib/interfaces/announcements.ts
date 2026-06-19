export type AnnouncementForm = {
    id?: string;
    title: string;
    message: string;
    cta_label: string;
    cta_url: string;
    variant: "info" | "warning" | "success" | "urgent";
    status: "important" | "urgent" | "update" | "event" | "success" | "notice";
    color: "blue" | "indigo" | "emerald" | "amber" | "rose" | "slate";
    is_active: boolean;
    show_on_home: boolean;
    starts_at: string;
    ends_at: string;
  };
  
  export type AnnouncementRecord = {
    id: string;
    title: string;
    message: string;
    cta_label: string | null;
    cta_url: string | null;
    variant: "info" | "warning" | "success" | "urgent";
    status: "important" | "urgent" | "update" | "event" | "success" | "notice";
    color: "blue" | "indigo" | "emerald" | "amber" | "rose" | "slate";
    is_active: boolean;
    show_on_home: boolean;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
  };
  
  export type EmailRecipient = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  };