"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [heroBackup, setHeroBackup] = useState(null);
  const [heroData, setHeroData] = useState<any | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      const res = await fetch("/api/components/hero");
      const data = await res.json();
      setHeroBackup(data);
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  const handleInputChange = (path: string, value: string) => {
    const newData = { ...tempData };
    const keys = path.split(".");
    let current = newData;
    keys.slice(0, -1).forEach((key) => {
      if (!current[key]) current[key] = {};
      current = current[key];
    });
    current[keys[keys.length - 1]] = value;
    setTempData(newData);
  };

  const startEditing = (section: string) => {
    setTempData({ ...heroData });
    setEditing(section);
  };

  const handleSave = async () => {
    if (window.confirm("Are you sure you want to save changes?")) {
      const res = await fetch("/api/components/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setHeroData(updatedData);
        setEditing(null);
      } else {
        console.error("Failed to save data.");
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  if (!heroData) return <div>Loading...</div>;

  const renderInputFields = (obj: any, path: string[] = []) => {
    return Object.keys(obj).map((key) => {
      const currentPath = [...path, key].join(".");
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <div key={currentPath} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            {renderInputFields(obj[key], [...path, key])}
          </div>
        );
      } else if (key !== "_id" && key !== "__v") {
        let description;
        switch (key) {
          case "className":
            description = "CSS classes for styling this element.";
            break;
          case "text":
            description = "The content or text displayed in this element.";
            break;
          case "href":
            description = "The link URL for this element, if applicable.";
            break;
          case "clipPath":
            description =
              "Defines the clipping path for the background effect.";
            break;
          default:
            description = `Description for ${key}.`;
        }

        return (
          <div key={currentPath} className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key}
              <span className="ml-2 font-light text-gray-500 text-xs">
                {description}
              </span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={
                  tempData ? String(getValueByPath(tempData, currentPath)) : ""
                }
                onChange={(e) => handleInputChange(currentPath, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );
      }
    });
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split(".").reduce((o, i) => o && o[i], obj);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero</h1>
        <button
          onClick={() => startEditing("global")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div className={heroData.container.className}>
          <div className={heroData.innerContainer.className}>
            <div
              aria-hidden="true"
              className={heroData.blurEffectTop.className}
            >
              <div
                style={{ clipPath: heroData.blurEffectTop.div.clipPath }}
                className={heroData.blurEffectTop.div.className}
              />
            </div>

            <div className={heroData.content.className}>
              <div className={heroData.content.announcementContainer.className}>
                <div
                  className={
                    heroData.content.announcementContainer.announcement
                      .className
                  }
                >
                  {heroData.content.announcementContainer.announcement.text}{" "}
                  <a
                    href={
                      heroData.content.announcementContainer.announcement.link
                        .href
                    }
                    className={
                      heroData.content.announcementContainer.announcement.link
                        .className
                    }
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {
                      heroData.content.announcementContainer.announcement.link
                        .text
                    }{" "}
                    <span aria-hidden="true">
                      {
                        heroData.content.announcementContainer.announcement.link
                          .icon
                      }
                    </span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className={heroData.content.title.className}>
                  {heroData.content.title.text}
                </h1>
                <p className={heroData.content.description.className}>
                  {heroData.content.description.text}
                </p>
                <div className={heroData.content.actions.className}>
                  <a
                    href={heroData.content.actions.ctaButton.href}
                    className={heroData.content.actions.ctaButton.className}
                  >
                    {heroData.content.actions.ctaButton.text}
                  </a>
                  <a
                    href={heroData.content.actions.learnMore.href}
                    className={heroData.content.actions.learnMore.className}
                  >
                    {heroData.content.actions.learnMore.text}{" "}
                    <span aria-hidden="true">
                      {heroData.content.actions.learnMore.icon}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className={heroData.blurEffectBottom.className}
            >
              <div
                style={{ clipPath: heroData.blurEffectBottom.div.clipPath }}
                className={heroData.blurEffectBottom.div.className}
              />
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed right-0 top-16 bottom-0 w-1/4 bg-white shadow-lg p-6 pb-0 overflow-auto transition-transform transform translate-x-0">
          <h2 className="text-xl font-semibold mb-4">Editing {editing}</h2>
          <div className="space-y-4">
            {editing === "global"
              ? renderInputFields(heroData, [])
              : renderInputFields(getValueByPath(heroData, editing), [editing])}
          </div>
          <div className="space-x-4 sticky bottom-0 bg-white p-4 left-0 right-0">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
