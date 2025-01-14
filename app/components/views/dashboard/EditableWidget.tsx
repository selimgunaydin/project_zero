import { useState, useEffect } from "react";
import { Alert } from "@nextui-org/react";
import { FormModal } from "@/app/components/FormModal";
import Image from "next/image";
import { LoaderSpinner } from "../../LoaderSpinner";

type EditableWidgetProps = {
  apiEndpoint: string;
  widgetComponent: React.ComponentType<any>;
  title: string;
};

interface ImageUploadResponse {
  secure_url: string;
  public_id: string;
}

export default function EditableWidget({
  apiEndpoint,
  widgetComponent: WidgetComponent,
  title,
}: EditableWidgetProps) {
  const [widgetBackup, setWidgetBackup] = useState<any | null>(null);
  const [widgetData, setWidgetData] = useState<any | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchWidgetData = async () => {
      const res = await fetch(
        `/api/widgets/get-widget-data?type=${apiEndpoint}`
      );
      const data = await res.json();
      setWidgetBackup(data);
      setWidgetData(data);
    };

    fetchWidgetData();
  }, [apiEndpoint]);

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

  const handleImageUpload = async (path: string, file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: ImageUploadResponse = await response.json();
      handleInputChange(path, data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const startEditing = (section: string) => {
    setModalOpen(true);
    setTempData({ ...widgetData });
    setEditing(section);
  };

  const handleSave = async (id: number) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      const res = await fetch(`/api/widgets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setWidgetData(updatedData);
        setEditing(null);
        setModalOpen(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        console.error("Failed to save data.");
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setTempData(null);
    setModalOpen(false);
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split(".").reduce((o, i) => o && o[i], obj);
  };

  const renderInputFields = (obj: any, path: string[] = []) => {
    return Object.keys(obj).map((key) => {
      const currentPath = [...path, key].join(".");
      const value = getValueByPath(tempData, currentPath);
      const nonRenderedInputs = ["_id", "__v", "type", "data", "order", "isActive", "createdAt", "updatedAt", "name"];
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <div key={currentPath} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            {renderInputFields(obj[key], [...path, key])}
          </div>
        );
      } else if (!nonRenderedInputs.includes(key)) {
        const isImageField =
          key.toLowerCase().includes("image") ||
          key.toLowerCase().includes("avatar") ||
          key.toLowerCase().includes("photo");

        return (
          <div key={currentPath} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key}
            </label>
            {isImageField ? (
              <div className="space-y-2">
                {value && (
                  <Image
                    width={128}
                    height={128}
                    src={value}
                    alt={`Current ${key}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(currentPath, file);
                    }
                  }}
                  className="w-full"
                />
              </div>
            ) : (
              <input
                type="text"
                value={value || ""}
                onChange={(e) => handleInputChange(currentPath, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        );
      }
    });
  };

  if (!widgetData) {
    return (
      <div className="flex-1">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => startEditing("global")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>

      {success && (
        <div className="absolute bottom-0 right-0 p-4">
          <Alert color="success" isVisible={success} title="Changes Saved!" />
        </div>
      )}

      <div className="relative overflow-hidden border rounded p-4">
        <WidgetComponent data={widgetData.data} />
      </div>

      <FormModal
        title={`Editing ${editing}`}
        portalId={`${title}-modal`}
        childrenClassName="flex flex-col px-4"
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <div className="space-y-4">
          {editing === "global"
            ? renderInputFields(widgetData)
            : editing
            ? renderInputFields(getValueByPath(widgetData, editing), [editing])
            : null}
        </div>
        <div className="space-x-4 sticky bottom-0 bg-white p-4 left-0 right-0">
          <button
            onClick={() => handleSave(widgetData?._id)}
            disabled={uploading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            disabled={uploading}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </FormModal>
    </div>
  );
}
