"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Button, Input, Select, Textarea, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

const categoryOptions = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "design", label: "Design" },
  { value: "erp", label: "ERP/CRM" },
];

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: string;
  client: string | null;
  technologies: string[];
  coverImage: string;
  link: string | null;
  featured: boolean;
  isActive: boolean;
}

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDesc: "",
    category: "web",
    client: "",
    technologies: "",
    coverImage: "",
    link: "",
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("/api/admin/projects/" + params.id);
        if (res.ok) {
          const project: Project = await res.json();
          setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description,
            shortDesc: project.shortDesc || "",
            category: project.category,
            client: project.client || "",
            technologies: project.technologies.join(", "),
            coverImage: project.coverImage,
            link: project.link || "",
            featured: project.featured,
            isActive: project.isActive,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/projects/" + params.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        toast.success("Project updated");
        router.push("/admin/projects");
      } else {
        toast.error("Error");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <AdminHeader title="Loading..." />
        <div className="p-6">
          <Skeleton className="h-96" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title={"Editing: " + formData.title} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Main Info
                  </h2>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Title *"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Slug *"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Input
                      label="Short Description"
                      name="shortDesc"
                      value={formData.shortDesc}
                      onChange={handleChange}
                    />

                    <Textarea
                      label="Description *"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="min-h-[200px]"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Select
                        label="Category *"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={categoryOptions}
                      />
                      <Input
                        label="Client"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Tech & Links
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Technologies (comma separated)"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleChange}
                    />

                    <Input
                      label="Project Link"
                      name="link"
                      type="url"
                      value={formData.link}
                      onChange={handleChange}
                    />

                    <Input
                      label="Cover Image URL *"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Settings
                  </h2>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-white">Featured</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-5 h-5 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-white">Published</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full mt-6" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
