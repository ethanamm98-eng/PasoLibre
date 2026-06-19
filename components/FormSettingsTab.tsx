"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FormSettingsTab() {
  const [responsesOpen, setResponsesOpen] = useState(true);
  const [presentationOpen, setPresentationOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* SETTINGS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 space-y-8">
        <h2 className="text-xl font-semibold">Settings</h2>

        {/* Make this a quiz */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-800">Make this a quiz</h3>
            <p className="text-sm text-gray-500">
              Assign point values, set answers, and automatically provide
              feedback
            </p>
          </div>
          <Toggle />
        </div>

        {/* Responses */}
        <CollapsibleHeader
          title="Responses"
          description="Manage how responses are collected and protected"
          open={responsesOpen}
          onClick={() => setResponsesOpen(!responsesOpen)}
        />

        {responsesOpen && (
          <div className="pl-4 space-y-5 border-l border-slate-200">
            <SelectRow
              title="Collect email addresses"
              options={["Do not collect", "Verified", "Responder input"]}
            />

            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-gray-800">
                  Send responders a copy of their response
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Requires collect email addresses
                </p>
              </div>

              <Select options={["Off", "When requested", "Always"]} />
            </div>

            <ToggleRow
              title="Allow response editing"
              subtitle="Responses can be changed after being submitted"
            />

            <ToggleRow
              title="Limit to 1 response"
              subtitle="Respondents will be required to sign in to Google"
            />
          </div>
        )}

        {/* Presentation */}
        <CollapsibleHeader
          title="Presentation"
          description="Manage how the form and responses are presented"
          open={presentationOpen}
          onClick={() => setPresentationOpen(!presentationOpen)}
        />

        {presentationOpen && (
          <div className="pl-4 space-y-6 border-l border-slate-200">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Form presentation
              </h4>
              <ToggleRow title="Show progress bar" />
              <ToggleRow title="Shuffle question order" />
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                After submission
              </h4>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">
                  Confirmation message
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  defaultValue="Thanks for submitting your contact info!"
                />
              </div>

              <ToggleRow
                title="Show link to submit another response"
                subtitle="Disabled when Limit to 1 response is enabled"
              />

              <ToggleRow
                title="View results summary"
                subtitle="Share results summary with respondents"
              />
            </div>
          </div>
        )}
      </div>

      {/* DEFAULTS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 space-y-4">
        <h2 className="text-xl font-semibold">Defaults</h2>

        {/* Responses */}
        <CollapsibleHeader
          title="Form Defaults"
          description="Settings applied to this form and new forms"
          open={responsesOpen}
          onClick={() => setResponsesOpen(!responsesOpen)}
        />

        {responsesOpen && (
          <div className="pl-4 space-y-5 border-l border-slate-200">
            <SelectRow
              title="Collect email addresses"
              options={["Do not collect", "Verified", "Responder input"]}
            />

            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-gray-800">
                  Send responders a copy of their response
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Requires collect email addresses
                </p>
              </div>

              <Select options={["Off", "When requested", "Always"]} />
            </div>

            <ToggleRow
              title="Allow response editing"
              subtitle="Responses can be changed after being submitted"
            />

            <ToggleRow
              title="Limit to 1 response"
              subtitle="Respondents will be required to sign in to Google"
            />
          </div>
        )}

        {/* Presentation */}
        <CollapsibleHeader
          title="Question Defaults"
          description="Settings applied to all new questions
"
          open={presentationOpen}
          onClick={() => setPresentationOpen(!presentationOpen)}
        />

        {presentationOpen && (
          <div className="pl-4 space-y-6 border-l border-slate-200">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Form presentation
              </h4>
              <ToggleRow title="Show progress bar" />
              <ToggleRow title="Shuffle question order" />
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                After submission
              </h4>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">
                  Confirmation message
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  defaultValue="Thanks for submitting your contact info!"
                />
              </div>

              <ToggleRow
                title="Show link to submit another response"
                subtitle="Disabled when Limit to 1 response is enabled"
              />

              <ToggleRow
                title="View results summary"
                subtitle="Share results summary with respondents"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------
   REUSABLE PIECES
----------------------------- */

function Toggle() {
  return (
    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition">
      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
    </button>
  );
}

function ToggleRow({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <Toggle />
    </div>
  );
}

function SelectRow({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="flex justify-between items-center">
      <h4 className="font-medium text-gray-800">{title}</h4>
      <Select options={options} />
    </div>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}

function CollapsibleHeader({
  title,
  description,
  open,
  onClick,
}: {
  title: string;
  description: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left"
    >
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}
