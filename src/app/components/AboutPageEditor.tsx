"use client";
import { useState } from "react";
import ImageUpload from "./elements/ImageUpload";

export type LanguageKey = "en" | "es";

type HeroImage = {
  title: string;
  src: string;
};

type PageParagraph = {
  text: string;
  highlight: string[];
};

type MeetPlace = {
  name: string;
  icon: string;
};

type AboutLanguageContent = {
  heroTitle: string;
  heroTagline: string;
  heroDescriptionStart: string;
  heroDescriptionHighlight: string[];
  heroDescriptionEnd: string;
  heroImages: HeroImage[];

  missionTitle: string;
  missionText: string;
  missionHighlight: string;
  missionTextEnd: string;

  visionTitle: string;
  visionText: string;
  visionHighlight: string;
  visionTextEnd: string;

  pageContent: {
    title: string;
    paragraphs: PageParagraph[];
  };

  meetPlaces: {
    backgroundWord: string;
    title: string;
    description: string;
    places: MeetPlace[];
  };

  instagramSection: {
    backgroundWord: string;
    title: string;
    description: string;
  };

  whatsappTitle: string;
  whatsappText: string;
  whatsappButton: string;
};

export type AboutDraft = Record<LanguageKey, AboutLanguageContent>;

interface Props {
  draft: AboutDraft;
  setDraft: React.Dispatch<React.SetStateAction<AboutDraft>>;
}

type PathKey = string | number;

const cloneDraft = (draft: AboutDraft): AboutDraft => {
  if (typeof structuredClone === "function") {
    return structuredClone(draft);
  }

  return JSON.parse(JSON.stringify(draft)) as AboutDraft;
};

export default function AboutPageEditor({ draft, setDraft }: Props) {
  const [activeLang, setActiveLang] = useState<LanguageKey>("es");

  const content = draft[activeLang];

  const updateField = (path: PathKey[], value: string) => {
    setDraft((prev) => {
      const updated = cloneDraft(prev);
      let current: unknown = updated[activeLang];

      for (let i = 0; i < path.length - 1; i += 1) {
        if (
          current &&
          (typeof current === "object" || Array.isArray(current))
        ) {
          current = (current as Record<string, unknown>)[String(path[i])];
        }
      }

      if (
        current &&
        (typeof current === "object" || Array.isArray(current))
      ) {
        (current as Record<string, unknown>)[String(path[path.length - 1])] =
          value;
      }

      return updated;
    });
  };

  const addArrayItem = <T,>(path: PathKey[], newItem: T) => {
    setDraft((prev) => {
      const updated = cloneDraft(prev);
      let current: unknown = updated[activeLang];

      for (const key of path) {
        if (
          current &&
          (typeof current === "object" || Array.isArray(current))
        ) {
          current = (current as Record<string, unknown>)[String(key)];
        }
      }

      if (Array.isArray(current)) {
        current.push(newItem);
      }

      return updated;
    });
  };

  const removeArrayItem = (path: PathKey[], index: number) => {
    setDraft((prev) => {
      const updated = cloneDraft(prev);
      let current: unknown = updated[activeLang];

      for (const key of path) {
        if (
          current &&
          (typeof current === "object" || Array.isArray(current))
        ) {
          current = (current as Record<string, unknown>)[String(key)];
        }
      }

      if (Array.isArray(current)) {
        current.splice(index, 1);
      }

      return updated;
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setActiveLang("en")}
          className={`px-4 py-2 rounded-lg ${
            activeLang === "en" ? "bg-blue-600" : "bg-neutral-800"
          }`}
        >
          English
        </button>

        <button
          type="button"
          onClick={() => setActiveLang("es")}
          className={`px-4 py-2 rounded-lg ${
            activeLang === "es" ? "bg-blue-600" : "bg-neutral-800"
          }`}
        >
          Español
        </button>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Hero Section
        </h2>

        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => updateField(["heroTitle"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Hero Title"
        />

        <input
          type="text"
          value={content.heroTagline}
          onChange={(e) => updateField(["heroTagline"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Hero Tagline"
        />

        <input
          type="text"
          value={content.heroDescriptionStart}
          onChange={(e) =>
            updateField(["heroDescriptionStart"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Description Start"
        />

        <div className="space-y-2">
          {content.heroDescriptionHighlight.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateField(
                    ["heroDescriptionHighlight", index],
                    e.target.value
                  )
                }
                className="w-full bg-neutral-800 p-2 rounded-lg"
                placeholder={`Highlight ${index + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeArrayItem(["heroDescriptionHighlight"], index)
                }
                className="text-red-500 font-bold px-2"
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem(["heroDescriptionHighlight"], "")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Add Highlight
          </button>
        </div>

        <input
          type="text"
          value={content.heroDescriptionEnd}
          onChange={(e) => updateField(["heroDescriptionEnd"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Description End"
        />

        <div className="space-y-2">
          {content.heroImages.map((img, index) => (
            <div key={index} className="flex flex-col gap-2">
              <input
                type="text"
                value={img.title}
                onChange={(e) =>
                  updateField(["heroImages", index, "title"], e.target.value)
                }
                className="w-full bg-neutral-800 p-2 rounded-lg"
                placeholder="Image Title"
              />

              <ImageUpload
                fileUrl={img.src}
                onChange={(url) =>
                  updateField(["heroImages", index, "src"], url)
                }
              />

              <button
                type="button"
                onClick={() => removeArrayItem(["heroImages"], index)}
                className="text-red-500 font-bold px-2"
              >
                Remove Image
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem<HeroImage>(["heroImages"], { title: "", src: "" })}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Add Image
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Mission & Vision
        </h2>

        {[
          ["missionTitle", "Mission Title"],
          ["missionText", "Mission Text"],
          ["missionHighlight", "Mission Highlight"],
          ["missionTextEnd", "Mission Text End"],
          ["visionTitle", "Vision Title"],
          ["visionText", "Vision Text"],
          ["visionHighlight", "Vision Highlight"],
          ["visionTextEnd", "Vision Text End"],
        ].map(([field, placeholder]) => (
          <input
            key={field}
            type="text"
            value={content[field as keyof AboutLanguageContent] as string}
            onChange={(e) => updateField([field], e.target.value)}
            className="w-full bg-neutral-900 p-3 rounded-lg"
            placeholder={placeholder}
          />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Story
        </h2>

        <input
          type="text"
          value={content.pageContent.title}
          onChange={(e) => updateField(["pageContent", "title"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Story Title"
        />

        {content.pageContent.paragraphs.map((p, index) => (
          <div key={index} className="space-y-2 ml-4">
            <textarea
              value={p.text}
              onChange={(e) =>
                updateField(
                  ["pageContent", "paragraphs", index, "text"],
                  e.target.value
                )
              }
              className="w-full bg-neutral-800 p-3 rounded-lg h-24"
              placeholder="Paragraph Text"
            />

            {p.highlight.map((h, hIdx) => (
              <input
                key={hIdx}
                type="text"
                value={h}
                onChange={(e) =>
                  updateField(
                    [
                      "pageContent",
                      "paragraphs",
                      index,
                      "highlight",
                      hIdx,
                    ],
                    e.target.value
                  )
                }
                className="w-full bg-neutral-700 p-2 rounded-lg"
                placeholder={`Highlight ${hIdx + 1}`}
              />
            ))}

            <button
              type="button"
              onClick={() =>
                removeArrayItem(["pageContent", "paragraphs"], index)
              }
              className="text-red-500 font-bold px-2"
            >
              Remove Paragraph
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addArrayItem<PageParagraph>(["pageContent", "paragraphs"], {
              text: "",
              highlight: [],
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Add Paragraph
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Meet Places
        </h2>

        <input
          type="text"
          value={content.meetPlaces.backgroundWord}
          onChange={(e) =>
            updateField(["meetPlaces", "backgroundWord"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Background Word"
        />

        <input
          type="text"
          value={content.meetPlaces.title}
          onChange={(e) =>
            updateField(["meetPlaces", "title"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Title"
        />

        <textarea
          value={content.meetPlaces.description}
          onChange={(e) =>
            updateField(["meetPlaces", "description"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg h-20"
          placeholder="Description"
        />

        {content.meetPlaces.places.map((place, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={place.name}
              onChange={(e) =>
                updateField(["meetPlaces", "places", index, "name"], e.target.value)
              }
              className="w-full bg-neutral-800 p-2 rounded-lg"
              placeholder="Place Name"
            />

            <input
              type="text"
              value={place.icon}
              onChange={(e) =>
                updateField(["meetPlaces", "places", index, "icon"], e.target.value)
              }
              className="w-full bg-neutral-800 p-2 rounded-lg"
              placeholder="Icon"
            />

            <button
              type="button"
              onClick={() => removeArrayItem(["meetPlaces", "places"], index)}
              className="text-red-500 font-bold px-2"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addArrayItem<MeetPlace>(["meetPlaces", "places"], {
              name: "",
              icon: "",
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Add Place
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Instagram Section
        </h2>

        <input
          type="text"
          value={content.instagramSection.backgroundWord}
          onChange={(e) =>
            updateField(["instagramSection", "backgroundWord"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Background Word"
        />

        <input
          type="text"
          value={content.instagramSection.title}
          onChange={(e) =>
            updateField(["instagramSection", "title"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Title"
        />

        <textarea
          value={content.instagramSection.description}
          onChange={(e) =>
            updateField(["instagramSection", "description"], e.target.value)
          }
          className="w-full bg-neutral-900 p-3 rounded-lg h-20"
          placeholder="Description"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          WhatsApp Section
        </h2>

        <input
          type="text"
          value={content.whatsappTitle}
          onChange={(e) => updateField(["whatsappTitle"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="WhatsApp Title"
        />

        <textarea
          value={content.whatsappText}
          onChange={(e) => updateField(["whatsappText"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg h-20"
          placeholder="WhatsApp Text"
        />

        <input
          type="text"
          value={content.whatsappButton}
          onChange={(e) => updateField(["whatsappButton"], e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="WhatsApp Button"
        />
      </section>
    </div>
  );
}