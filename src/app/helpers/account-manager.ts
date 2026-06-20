import { User } from "../account-manager/page";

export const buildExportRows = ({
  filteredUsers,
}: {
  filteredUsers: User[];
}) => {
  return filteredUsers?.map((user: User) => ({
    Name: `${user.firstName} ${user.lastName}`,
    Username: user.username,
    Email: user.email,
    Phone: user.phone || "",
    Gender: user.gender || "",
    Pronouns: user.pronouns || "",
    "Date of Birth": user.dob || "",
    "Sexual Orientation": user.sexualOrientation || "",
    Occupation: user.occupation || "",
    city: user.city || "",
    country: user.country || "",
  }));
};

export const exportCSV = async ({
  filteredUsers,
  setExportLoading,
  setGlobalError,
}: {
  filteredUsers: User[];
  setExportLoading: (format: "pdf" | "csv" | null) => void;
  setGlobalError: (message: string) => void;
}) => {
  try {
    setExportLoading("csv");

    const formattedUsers = filteredUsers?.map((user: User) => ({
      ...user,
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      email: user?.email,
      phone: user?.phone || "",
      gender: user?.gender || "",
      pronouns: user?.pronouns || "",
      dob: user?.dob ? new Date(user?.dob).toLocaleDateString() : "",
      sexualOrientation: user?.sexualOrientation || "",
      occupation: user?.occupation || "",
      city: user?.city || "",
      country: user?.country || "",
    }));

    console.log("Exporting CSV for users:", formattedUsers, filteredUsers);

    const rows = buildExportRows({ filteredUsers: formattedUsers as User[] });
    const headers = Object.keys(
      rows[0] || {
        Name: "",
        Username: "",
        Email: "",
        Phone: "",
        Gender: "",
        Pronouns: "",
        "Date of Birth": "",
        "Sexual Orientation": "",
        Occupation: "",
        // Events: "",
        city: "",
        country: "",
      }
    );

    const csv = [
      headers.join(","),
      ...rows.map((row: Record<string, string | undefined>) =>
        headers
          .map((header) => {
            const value = String(row[header] ?? "");
            const escaped = value.replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `user-accounts-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("CSV export error:", error);
    setGlobalError(
      error instanceof Error ? error.message : "Failed to export CSV."
    );
  } finally {
    setExportLoading(null);
  }
};

export const exportPDF = async ({
  filteredUsers,
  setExportLoading,
  setGlobalError,
}: {
  filteredUsers: User[];
  setExportLoading: (format: "pdf" | "csv" | null) => void;
  setGlobalError: (message: string) => void;
}) => {
  try {
    setExportLoading("pdf");

    const [{ default: jsPDF }, autoTableModule] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);

    const autoTable = autoTableModule.default;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Paso Libre - User Accounts", 14, 18);

    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 26);

    const rows = filteredUsers?.map((user: Partial<User>) => [
      `${user.firstName || ""} ${user.lastName || ""}`,
      user.username || "",
      user.email || "",
      user.eventsCount !== undefined ? String(user.eventsCount) : "",
    ]);

    autoTable(doc, {
      startY: 32,
      head: [["Name", "Username", "Email", "Events"]],
      body: rows,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [13, 77, 176],
      },
    });

    doc.save(`user-accounts-${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error("PDF export error:", error);
    if (error instanceof Error) {
      setGlobalError(error.message || "Failed to export PDF.");
    } else {
      setGlobalError("Failed to export PDF.");
    }
  } finally {
    setExportLoading(null);
  }
};
