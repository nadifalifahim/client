"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const ProjectsCreationFrom = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_description: "",
    project_status: "",
    telegram_chat_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here, for example, send data to the API.
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <div className="flex flex-col w-full">
        <div className="p-4">
          <form
            className="flex flex-col gap-6 outline-none max-w-md ml-10 min-h-[600px] bg-white p-8 shadow-md rounded-lg"
            onSubmit={handleSubmit}
            onReset={() =>
              setFormData({
                project_name: "",
                project_description: "",
                project_status: "",
                telegram_chat_id: "",
              })
            }
          >
            <h2 className="text-2xl font-bold mb-4"># New Project</h2>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="project_name"
              >
                Project Name
              </label>
              <input
                type="text"
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                className="w-full border-gray-300 text-sm rounded-md shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="project_description"
              >
                Project Description
              </label>
              <textarea
                id="project_description"
                name="project_description"
                value={formData.project_description}
                onChange={handleChange}
                className="w-full min-h-[100px] border-gray-300 outline-none rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="telegram_chat_id"
              >
                Telegram Chat ID
              </label>
              <input
                type="text"
                id="telegram_chat_id"
                name="telegram_chat_id"
                value={formData.telegram_chat_id}
                onChange={handleChange}
                className="w-full border-gray-300 outline-none rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4 flex gap-2">
              <Button
                type="reset"
                variant="secondary"
                className="w-full py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full bg-sky-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCreationFrom;
