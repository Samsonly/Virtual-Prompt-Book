export function saveProjectData(projectSaveFile: any) {
  return new Promise<void>((resolve, reject) => {
    if (!projectSaveFile) {
      console.error("No project data to save.");
      reject(new Error("No project data to save."));
      return;
    }

    try {
      const data = JSON.stringify(projectSaveFile, null, 2);
      const blob = new Blob([data], { type: "application/json" });

      const anchor = document.createElement("a");
      anchor.href = window.URL.createObjectURL(blob);
      anchor.download = "sm-project-file.thtr";

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
