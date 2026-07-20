"use client";
import React, { useState } from "react";
import { TextField, Label, InputGroup } from "@heroui/react";
import { Link2, MessageSquare, Send, Code2, Loader2 } from "lucide-react";
import { createApplication } from "@/app/lib/actions/applications";
import { toast, Zoom } from "react-toastify";

export default function ApplyPage({ job, user }) {
  const [formData, setFormData] = useState({
    resumeLink: "",
    githubLink: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const applicationPayload = {
      jobId: job?._id,
      applicantId: user?.id,
      applicantName: user?.name,
      applicantEmail: user?.email,
      resumeLink: formData.resumeLink,
      githubLink: formData.githubLink,
      message: formData.message,
    };

    try {
      const response = await createApplication(applicationPayload);

      if (response?.acknowledged || response?.insertedId) {
        toast.success("Application submitted successfully!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });

        setFormData({ resumeLink: "", githubLink: "", message: "" });
      } else {
        throw new Error(response?.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submission processing error:", error);

     toast.error(
       error.message || "Failed to submit application. Please try again.",
       {
         position: "top-center",
         theme: "dark",
         transition: Zoom,
       },
     );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-900 p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Job Application
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Applying as{" "}
            <span className="text-zinc-200 font-medium">{user?.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Link */}
          <TextField className="flex flex-col gap-1.5 w-full">
            <Label className="text-sm font-medium text-zinc-300">
              Resume Link
            </Label>
            <InputGroup className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-black focus-within:ring-1 focus-within:ring-white focus-within:border-white transition-all">
              <InputGroup.Prefix className="pl-3 pr-2 text-zinc-500 flex items-center justify-center">
                <Link2 size={18} />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="url"
                name="resumeLink"
                placeholder="https://drive.google.com/..."
                value={formData.resumeLink}
                onChange={handleChange}
                required
                className="w-full py-2.5 pr-3 text-sm text-zinc-200 placeholder:text-zinc-700 bg-transparent focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* GitHub Profile */}
          <TextField className="flex flex-col gap-1.5 w-full">
            <Label className="text-sm font-medium text-zinc-300">
              GitHub Profile
            </Label>
            <InputGroup className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-black focus-within:ring-1 focus-within:ring-white focus-within:border-white transition-all">
              <InputGroup.Prefix className="pl-3 pr-2 text-zinc-500 flex items-center justify-center">
                <Code2 size={18} />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="url"
                name="githubLink"
                placeholder="https://github.com/yourusername"
                value={formData.githubLink}
                onChange={handleChange}
                required
                className="w-full py-2.5 pr-3 text-sm text-zinc-200 placeholder:text-zinc-700 bg-transparent focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* Message / Cover Letter */}
          <TextField className="flex flex-col gap-1.5 w-full">
            <Label className="text-sm font-medium text-zinc-300">
              Message / Cover Letter
            </Label>
            <InputGroup className="flex items-start border border-zinc-800 rounded-lg overflow-hidden bg-black focus-within:ring-1 focus-within:ring-white focus-within:border-white transition-all">
              <InputGroup.Prefix className="pl-3 pr-2 pt-3 text-zinc-500 flex items-center justify-center">
                <MessageSquare size={18} />
              </InputGroup.Prefix>
              <InputGroup.TextArea
                name="message"
                placeholder="Tell the recruiter why you are a good fit..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full py-2.5 pr-3 text-sm text-zinc-200 placeholder:text-zinc-700 bg-transparent focus:outline-none resize-none min-h-[100px]"
              />
            </InputGroup>
          </TextField>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black font-semibold text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
