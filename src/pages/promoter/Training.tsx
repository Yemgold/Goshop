


import { useTrainingMaterials } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

type TrainingItem = {
  id: string;
  title: string;
  description?: string;
  type?: "video" | "article";
  url?: string;
};

export default function Training() {
  const { data, isLoading, isError } = useTrainingMaterials();

  const training: TrainingItem[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading training materials...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load training materials
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Training Center" />

      {/* INTRO SECTION */}
      <div className="p-4 border rounded-xl bg-gray-50">
        <h2 className="font-semibold text-lg">
          Learn how to maximize your earnings 🚀
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Watch tutorials, read guides, and improve your performance as a promoter.
        </p>
      </div>

      {/* TRAINING LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {training.length === 0 ? (
          <div className="text-gray-500">
            No training materials available
          </div>
        ) : (
          training.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 space-y-2 bg-white shadow-sm"
            >
              {/* TITLE */}
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              {/* TYPE BADGE */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.type === "video"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {(item.type ?? "article").toUpperCase()}
              </span>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600">
                {item.description ?? "No description available"}
              </p>

              {/* LINK */}
              {item.url ? (
                item.type === "video" ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                  >
                    ▶ Watch Video
                  </a>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm text-green-600 hover:underline"
                  >
                    📄 Read Article
                  </a>
                )
              ) : (
                <p className="text-xs text-gray-400 mt-2">
                  No link available
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}