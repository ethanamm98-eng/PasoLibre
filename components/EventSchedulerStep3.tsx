"use client";
import { daysOfWeek, months, monthsWithIds } from "../helpers/calendar";
import { useLanguage } from "../context/language";
import FloatingLabelInput from "./elements/FloatingLabelInput";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";
import { Section } from "./EventSchedulerForm";
import { SchedulerForm } from "../lib/interfaces/events";

const EventSchedulerStep3 = ({
  schedulerForm,
  handleChange,
  handlePeriodChange,
  errors,
  allDaysSelected,
  allMonthsSelected,
  formatReadableDate,
}: {
  schedulerForm: SchedulerForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handlePeriodChange: (field: string, value: string) => void;
  errors: {
    date?: string;
    time?: string;
    recurrence?: string;
    daysOfWeekCsv?: string;
    dayOfMonth?: string;
    monthsCsv?: string;
    month?: string;
  };
  allDaysSelected: boolean;
  allMonthsSelected: boolean;
  formatReadableDate: (dateStr: string) => string;
}) => {
  const { language } = useLanguage(); // es or en

  const t = {
    en: {
      dateTime: "Date & Time",
      scheduleType: "Schedule Type",
      oneTime: "One-Time",
      recurrent: "Recurrent",
      date: "Date",
      nextRecurrenceDate: "Next Recurrence Date",
      chooseRecurrenceSettings:
        "Choose recurrence settings to generate the next date",
      automaticDate:
        "This date is assigned automatically based on the recurrence settings below.",
      time: "Time",
      recurrenceSettings: "Recurrence Settings",
      recurrence: "Recurrence",
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
      selectDays: "Select Days",
      selectAllDays: "Select All Days",
      unselectAllDays: "Unselect All Days",
      dayOfMonth: "Day of Month",
      month: "Month",
      selectMonths: "Select Months",
      selectAllMonths: "Select All Months",
      unselectAllMonths: "Unselect All Months",
    },
    es: {
      dateTime: "Fecha y Hora",
      scheduleType: "Tipo de Programación",
      oneTime: "Una Sola Vez",
      recurrent: "Recurrente",
      date: "Fecha",
      nextRecurrenceDate: "Próxima Fecha de Recurrencia",
      chooseRecurrenceSettings:
        "Selecciona la configuración de recurrencia para generar la próxima fecha",
      automaticDate:
        "Esta fecha se asigna automáticamente según la configuración de recurrencia a continuación.",
      time: "Hora",
      recurrenceSettings: "Configuración de Recurrencia",
      recurrence: "Recurrencia",
      weekly: "Semanal",
      monthly: "Mensual",
      yearly: "Anual",
      selectDays: "Seleccionar Días",
      selectAllDays: "Seleccionar Todos los Días",
      unselectAllDays: "Deseleccionar Todos los Días",
      dayOfMonth: "Día del Mes",
      month: "Mes",
      selectMonths: "Seleccionar Meses",
      selectAllMonths: "Seleccionar Todos los Meses",
      unselectAllMonths: "Deseleccionar Todos los Meses",
    },
  }[language as "en" | "es"];

  const translateDay = (day: string) => {
    if (language !== "es") return day;

    const dayMap: Record<string, string> = {
      Sunday: "Domingo",
      Monday: "Lunes",
      Tuesday: "Martes",
      Wednesday: "Miércoles",
      Thursday: "Jueves",
      Friday: "Viernes",
      Saturday: "Sábado",
    };

    return dayMap[day] || day;
  };

  const translateMonth = (month: string) => {
    if (language !== "es") return month;

    const monthMap: Record<string, string> = {
      January: "Enero",
      February: "Febrero",
      March: "Marzo",
      April: "Abril",
      May: "Mayo",
      June: "Junio",
      July: "Julio",
      August: "Agosto",
      September: "Septiembre",
      October: "Octubre",
      November: "Noviembre",
      December: "Diciembre",
    };

    return monthMap[month] || month;
  };

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <Section title={t.dateTime}>
        <div>
          <FloatingLabelSelect
            id="scheduleType"
            name="scheduleType"
            label={t.scheduleType}
            value={schedulerForm?.scheduleType as string}
            onChange={handleChange}
            options={[
              { value: "one-time", label: t.oneTime },
              { value: "recurrent", label: t.recurrent },
            ]}
          />
        </div>

        {schedulerForm?.scheduleType !== "recurrent" ? (
          <div>
            <FloatingLabelInput
              id="date"
              name="date"
              label={t.date}
              type="date"
              value={schedulerForm?.date as string}
              autoComplete="date"
              onChange={handleChange}
              maxLength={50}
            />
            {errors?.date && (
              <p className="mt-1 text-xs text-red-500">{errors?.date}</p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              {t.nextRecurrenceDate}
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              {schedulerForm?.date
                ? formatReadableDate(schedulerForm.date)
                : t.chooseRecurrenceSettings}
            </p>

            <p className="mt-1 text-xs text-slate-500">{t.automaticDate}</p>

            {errors?.date && (
              <p className="mt-2 text-xs text-red-500">{errors?.date}</p>
            )}
          </div>
        )}

        <div>
          <FloatingLabelInput
            id="time"
            name="time"
            label={t.time}
            type="time"
            value={schedulerForm?.time as string}
            autoComplete="time"
            onChange={handleChange}
            maxLength={50}
          />
          {errors?.time && (
            <p className="mt-1 text-xs text-red-500">{errors?.time}</p>
          )}
        </div>
      </Section>

      {schedulerForm?.scheduleType === "recurrent" && (
        <Section title={t.recurrenceSettings}>
          <div>
            <FloatingLabelSelect
              id="recurrence"
              name="recurrence"
              label={t.recurrence}
              value={schedulerForm?.recurrence as string}
              onChange={handleChange}
              options={[
                { value: "Weekly", label: t.weekly },
                { value: "Monthly", label: t.monthly },
                { value: "Yearly", label: t.yearly },
              ]}
            />
            {errors?.recurrence && (
              <p className="mt-1 text-xs text-red-500">{errors?.recurrence}</p>
            )}
          </div>

          {schedulerForm?.recurrence === "Weekly" && (
            <div className="mt-2">
              <div className="flex items-center justify-between gap-3">
                <label className="my-auto text-xs font-light text-gray-600">
                  {t.selectDays}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (allDaysSelected) {
                      handlePeriodChange("daysOfWeekCsv", "");
                      return;
                    }
                    handlePeriodChange("daysOfWeekCsv", daysOfWeek.join(","));
                  }}
                  className="mb-2 rounded-full border border-solid border-blue-600 px-4 py-1 text-xs text-blue-600 transition hover:bg-blue-50"
                >
                  {allDaysSelected ? t.unselectAllDays : t.selectAllDays}
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {daysOfWeek?.map((day) => {
                  const selectedDays =
                    schedulerForm?.daysOfWeekCsv?.split(",").filter(Boolean) ||
                    [];
                  const isSelected = selectedDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const updatedDays = isSelected
                          ? selectedDays.filter((d: string) => d !== day)
                          : [...selectedDays, day];

                        handlePeriodChange(
                          "daysOfWeekCsv",
                          updatedDays.join(",")
                        );
                      }}
                      className={`rounded-full border px-3 py-1 text-sm transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                          : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {translateDay(day)}
                    </button>
                  );
                })}
              </div>

              {errors?.daysOfWeekCsv && (
                <p className="mt-1 text-xs text-red-500">
                  {errors?.daysOfWeekCsv}
                </p>
              )}
            </div>
          )}

          {(schedulerForm?.recurrence === "Monthly" ||
            schedulerForm?.recurrence === "Yearly") && (
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <FloatingLabelInput
                  id="dayOfMonth"
                  name="dayOfMonth"
                  label={t.dayOfMonth}
                  type="number"
                  value={schedulerForm?.dayOfMonth as number}
                  autoComplete="dayOfMonth"
                  onChange={handleChange}
                  maxLength={50}
                />
                {errors?.dayOfMonth && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors?.dayOfMonth}
                  </p>
                )}
              </div>

              {schedulerForm?.recurrence === "Yearly" && (
                <div>
                  <FloatingLabelInput
                    id="month"
                    name="month"
                    label={t.month}
                    type="number"
                    value={schedulerForm?.month as number}
                    autoComplete="month"
                    onChange={handleChange}
                    maxLength={50}
                  />
                  {errors?.month && (
                    <p className="mt-1 text-xs text-red-500">{errors?.month}</p>
                  )}
                </div>
              )}

              {schedulerForm?.recurrence === "Monthly" && (
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="my-auto text-xs font-light text-gray-600">
                      {t.selectMonths}
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (allMonthsSelected) {
                          handlePeriodChange("monthsCsv", "");
                          return;
                        }
                        handlePeriodChange("monthsCsv", months.join(","));
                      }}
                      className="mb-2 rounded-full border border-solid border-blue-600 px-4 py-1 text-xs text-blue-600 transition hover:bg-blue-50"
                    >
                      {allMonthsSelected
                        ? t.unselectAllMonths
                        : t.selectAllMonths}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {monthsWithIds?.map((m) => {
                      const selectedMonths =
                        schedulerForm?.monthsCsv
                          ?.split(",")
                          .filter(Boolean)
                          .map(String) || [];
                      const isSelected = selectedMonths.includes(m?.name);

                      return (
                        <button
                          key={m.num}
                          type="button"
                          onClick={() => {
                            const updated = isSelected
                              ? selectedMonths.filter(
                                  (n: string) => n !== m?.name
                                )
                              : [...selectedMonths, m?.name];

                            handlePeriodChange("monthsCsv", updated.join(","));
                          }}
                          className={`rounded-full border px-3 py-1 text-sm transition ${
                            isSelected
                              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                              : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {translateMonth(m.name)}
                        </button>
                      );
                    })}
                  </div>

                  {errors?.monthsCsv && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors?.monthsCsv}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

export default EventSchedulerStep3;
