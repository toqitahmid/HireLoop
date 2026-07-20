"use server";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData) => {
  try {
    // Double-check if the baseurl loaded correctly
    if (!baseurl) {
      throw new Error(
        "NEXT_PUBLIC_BASE_URL environment variable is not defined!",
      );
    }

    const res = await fetch(`${baseurl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJobData),
    });

    // IF THE SERVER FAILS (404/500), READ AS TEXT INSTEAD OF JSON
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server HTML Error Response:", errorText);
      throw new Error(`Server status ${res.status}: Check terminal logs.`);
    }

    return await res.json();
  } catch (error) {
    console.error("createJob error:", error.message);
    return { success: false, error: error.message };
  }
};
