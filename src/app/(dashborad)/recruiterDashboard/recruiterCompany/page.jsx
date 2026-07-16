"use client";

import React, { useState } from "react";
import {
  Modal,
  Button,
  useOverlayState,
  Input,
  Select,
  ListBox,
  Label,
  TextArea,
  Form,
} from "@heroui/react";
import {
  Building2,
  Plus,
  MapPin,
  Upload,
  Globe,
  ArrowRight,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

// ⚠️ In production, don't hardcode this — pull it from an env var
// (e.g. process.env.NEXT_PUBLIC_IMGBB_API_KEY). Since this key ships to the
// client either way, consider proxying uploads through your own backend if
// you want the key hidden entirely.
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function CompanyRegistration() {
  const state = useOverlayState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  // ---- Logo upload state ----
  const [preview, setPreview] = useState(null); // hosted imgbb URL once uploaded
  const [uploading, setUploading] = useState(false); // upload-in-progress flag
  const [error, setError] = useState(null); // upload/validation error message

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [description, setDescription] = useState("");

  // Converts a File object into a base64 data URL string.
  // imgbb's API accepts base64-encoded image data in the upload payload.
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Fires when the user picks a file from the hidden <input type="file" />.
  // Validates the file, uploads it to imgbb, and stores the resulting URL.
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // --- Client-side validation before wasting a network call ---
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Only PNG or JPG allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB");
      return;
    }

    setUploading(true);

    try {
      const base64 = await fileToBase64(file);

      // imgbb expects the image as base64 (without the "data:image/...;base64," prefix)
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", base64.split(",")[1]);

      const res = await fetch(`https://api.imgbb.com/1/upload?&key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Upload failed");
      }

      // Store the hosted image URL — this is what you'd save alongside
      // the rest of the company profile data.
      setPreview(data.data.url);
    } catch (err) {
      console.error(err);
      setError("Upload failed, try again");
    } finally {
      setUploading(false);
      // Reset the input value so selecting the same file again re-triggers onChange
      e.target.value = "";
    }
  };

  // Clears the uploaded logo, letting the user pick a new one.
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent the click from bubbling up to the file <label>
    setPreview(null);
    setError(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: companyName,
      industry: industry,
      website: website,
      location: location,
      employees: employeeCount,
      description: description,
      logoUrl: preview, // include the uploaded logo URL in the submitted payload
    };

    setRegisteredData(data);
    setIsRegistered(true);
    console.log(registeredData);
    state.close();
  };

  // 1. Success view shown AFTER successful registration
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6 transition-all duration-300">
        <div className="max-w-md w-full bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {registeredData?.name || "Company"} Registered!
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Your business profile has been created successfully. You can now
            begin posting job opportunities.
          </p>

          <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
            <div className="text-zinc-500 font-semibold uppercase tracking-wider mb-1">
              Profile Overview
            </div>
            <div>
              <span className="text-zinc-400">Industry:</span>{" "}
              {registeredData?.industry || "N/A"}
            </div>
            <div>
              <span className="text-zinc-400">Location:</span>{" "}
              {registeredData?.location || "N/A"}
            </div>
            <div>
              <span className="text-zinc-400">Team Size:</span>{" "}
              {registeredData?.employees || "N/A"}
            </div>
          </div>

          <Button
            className="w-full bg-white text-black font-semibold tracking-wide hover:bg-zinc-200 transition-colors"
            radius="md"
            endContent={<ArrowRight size={16} />}
          >
            Go to Recruiter Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // 2. Default state view ("Company not registered yet")
  return (
    <div className="min-h-screen bg-[#0f0f10] text-white flex flex-col items-center justify-center relative px-4 selection:bg-zinc-700">
      {/* Graphic / Placeholder Art */}
      <div className="relative mb-8 group">
        <div className="w-48 h-48 bg-[#18181b] border border-zinc-800/80 rounded-3xl flex items-center justify-center relative shadow-inner">
          <div className="w-36 h-36 border border-zinc-700/30 rounded-2xl bg-[#202024]/40 p-4 space-y-3 flex flex-col justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/50"></div>
              <div className="h-3 w-16 bg-zinc-800 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-zinc-800/60 rounded-full"></div>
              <div className="h-2 w-5/6 bg-zinc-800/60 rounded-full"></div>
            </div>
            <div className="flex justify-end opacity-20 group-hover:opacity-40 transition-opacity">
              <Building2 size={32} className="text-zinc-400" />
            </div>
          </div>
        </div>
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform">
          <Plus size={20} strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-3 text-center">
        Company not registered yet
      </h1>
      <p className="text-zinc-400 text-center max-w-sm text-sm leading-relaxed mb-8">
        Set up your business profile to start posting high-performance job
        listings and manage your talent loop.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none justify-center mb-16">
        <Button
          onPress={state.open}
          className="bg-white text-black font-medium px-6 hover:bg-zinc-200 transition-colors"
          radius="md"
          size="lg"
        >
          Register your company
        </Button>
        <Button
          variant="bordered"
          className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-6 transition-colors"
          radius="md"
          size="lg"
        >
          View FAQ
        </Button>
      </div>

      <span className="text-xs text-zinc-600 tracking-wide font-light absolute bottom-8">
        Need specialized assistance?{" "}
        <a href="#" className="hover:text-zinc-400 underline transition-colors">
          Contact our enterprise support team.
        </a>
      </span>

      {/* ================= HERO UI V3 MODAL ================= */}
      <Modal state={state}>
        <Modal.Backdrop variant="blur">
          <Modal.Container className="bg-[#121214] border border-zinc-800 text-white rounded-xl max-w-2xl w-full mx-4">
            <Modal.Dialog>
              {({ close }) => (
                <Form
                  onSubmit={handleRegisterSubmit}
                  validationBehavior="native"
                >
                  <div className="flex justify-between items-start border-b border-zinc-800/60 p-6 pb-4 relative">
                    <div className="flex flex-col gap-1">
                      <Modal.Header className="p-0 text-xl font-semibold text-zinc-100">
                        Register New Company
                      </Modal.Header>
                      <p className="text-xs text-zinc-400 font-normal">
                        Enter your business details to start hiring on HireLoop.
                      </p>
                    </div>
                    <Modal.CloseTrigger className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors absolute top-4 right-4" />
                  </div>

                  <Modal.Body className="p-6 py-6 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      {/* Company Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-zinc-300 tracking-wide">
                          Company Name
                        </label>
                        <Input
                          required
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full text-zinc-200 placeholder:text-zinc-600 text-sm bg-[#1c1c1f] hover:bg-[#242429] focus:bg-[#1c1c1f] border border-zinc-800 focus:border-zinc-700 rounded-md py-2 px-3 outline-none"
                        />
                      </div>

                      {/* Industry / Category */}
                      <div className="flex flex-col gap-1.5">
                        <Select
                          isRequired
                          placeholder="Select Industry"
                          value={industry}
                          onChange={setIndustry}
                          variant="primary"
                          className="w-full"
                        >
                          <Label className="text-xs font-medium text-zinc-300 tracking-wide mb-1.5 block">
                            Industry / Category
                          </Label>
                          <Select.Trigger className="bg-[#1c1c1f] data-[hovered=true]:bg-[#242429] border border-zinc-800 rounded-md py-2.5 px-3">
                            <Select.Value className="text-zinc-200 text-sm" />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-[#1c1c1f] border border-zinc-800 text-zinc-200 rounded-md">
                            <ListBox>
                              <ListBox.Item
                                id="Technology"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                Technology
                              </ListBox.Item>
                              <ListBox.Item
                                id="Healthcare"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                Healthcare
                              </ListBox.Item>
                              <ListBox.Item
                                id="Finance"
                                className="text-zinc-200 data-[hover=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                Finance
                              </ListBox.Item>
                              <ListBox.Item
                                id="Education"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                Education
                              </ListBox.Item>
                              <ListBox.Item
                                id="Design & Creative"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                Design & Creative
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      {/* Website URL */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-zinc-300 tracking-wide">
                          Website URL
                        </label>
                        <div className="w-full flex items-center bg-[#1c1c1f] hover:bg-[#242429] border border-zinc-800 focus-within:border-zinc-700 rounded-md px-3 py-2">
                          <div className="pointer-events-none flex items-center pr-2 text-zinc-600 border-r border-zinc-800/80 mr-2 text-xs select-none">
                            <Globe size={14} className="mr-1" />
                            <span>https://</span>
                          </div>
                          <Input
                            type="url"
                            placeholder="www.company.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="w-full bg-transparent text-zinc-200 placeholder:text-zinc-600 text-sm outline-none border-none p-0 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-zinc-300 tracking-wide">
                          Location
                        </label>
                        <div className="w-full flex items-center bg-[#1c1c1f] hover:bg-[#242429] border border-zinc-800 focus-within:border-zinc-700 rounded-md px-3 py-2">
                          <MapPin
                            size={16}
                            className="text-zinc-600 mr-2 flex-shrink-0"
                          />
                          <Input
                            required
                            type="text"
                            placeholder="City, Country"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent text-zinc-200 placeholder:text-zinc-600 text-sm outline-none border-none p-0 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Employee Count Range */}
                      <div className="flex flex-col gap-1.5">
                        <Select
                          isRequired
                          placeholder="Select range"
                          value={employeeCount}
                          onChange={setEmployeeCount}
                          variant="primary"
                          className="w-full"
                        >
                          <Label className="text-xs font-medium text-zinc-300 tracking-wide mb-1.5 block">
                            Employee Count Range
                          </Label>
                          <Select.Trigger className="bg-[#1c1c1f] data-[hovered=true]:bg-[#242429] border border-zinc-800 rounded-md py-2.5 px-3">
                            <Select.Value className="text-zinc-200 text-sm" />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-[#1c1c1f] border border-zinc-800 text-zinc-200 rounded-md">
                            <ListBox>
                              <ListBox.Item
                                id="1-10 employees"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                1-10 employees
                              </ListBox.Item>
                              <ListBox.Item
                                id="11-50 employees"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                11-50 employees
                              </ListBox.Item>
                              <ListBox.Item
                                id="51-200 employees"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                51-200 employees
                              </ListBox.Item>
                              <ListBox.Item
                                id="201-500 employees"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                201-500 employees
                              </ListBox.Item>
                              <ListBox.Item
                                id="500+ employees"
                                className="text-zinc-200 data-[hovered=true]:bg-zinc-800 data-[hovered=true]:text-white"
                              >
                                500+ employees
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      {/* Company Logo Upload Box */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-zinc-300 tracking-wide">
                          Company Logo
                        </label>
                        <div className="flex items-center gap-3">
                          {/* The <label> wraps the hidden file input so clicking
                              anywhere in the box opens the file picker */}
                          <label className="relative w-12 h-12 bg-[#1c1c1f] border-2 border-dashed border-zinc-700 hover:border-zinc-500 transition-colors rounded-xl flex items-center justify-center cursor-pointer group overflow-hidden">
                            {uploading ? (
                              // Spinner while the imgbb request is in flight
                              <Loader2
                                size={16}
                                className="text-zinc-400 animate-spin"
                              />
                            ) : preview ? (
                              // Once uploaded, show the hosted image as a thumbnail
                              // with a small "X" button to clear it
                              <>
                                <img
                                  src={preview}
                                  alt="Logo preview"
                                  className="w-full h-full object-cover rounded-[10px]"
                                />
                                <button
                                  type="button"
                                  onClick={handleRemove}
                                  className="absolute -top-1 -right-1 bg-zinc-800 border border-zinc-600 rounded-full p-0.5 hover:bg-zinc-700"
                                >
                                  <X size={10} className="text-zinc-300" />
                                </button>
                              </>
                            ) : (
                              // Default empty state
                              <Upload
                                size={16}
                                className="text-zinc-500 group-hover:text-zinc-300 transition-colors"
                              />
                            )}
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              className="hidden"
                              onChange={handleFileChange}
                              disabled={uploading}
                            />
                          </label>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-zinc-300">
                              {uploading ? "Uploading..." : "Upload image"}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {error ? (
                                <span className="text-red-400">{error}</span>
                              ) : (
                                "PNG, JPG up to 5MB"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brief Description Field */}
                    <div className="flex flex-col gap-1.5 w-full mt-1">
                      <label className="text-xs font-medium text-zinc-300 tracking-wide">
                        Brief Description
                      </label>
                      <TextArea
                        placeholder="Tell us about your company's mission and culture..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full text-zinc-200 placeholder:text-zinc-600 text-sm bg-[#1c1c1f] hover:bg-[#242429] focus:bg-[#1c1c1f] border border-zinc-800 focus:border-zinc-700 rounded-md py-2 px-3 outline-none resize-none"
                      />
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="border-t border-zinc-800/60 p-6 pt-4 flex justify-end gap-2">
                    <Button
                      variant="bordered"
                      className="border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                      radius="md"
                      onPress={close}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-white text-black font-medium hover:bg-zinc-200"
                      radius="md"
                      // Optional: block submit while an upload is still running
                      isDisabled={uploading}
                    >
                      Register Company
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
