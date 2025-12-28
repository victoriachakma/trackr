import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    server: {
      host: "::",  // Makes the server accessible externally
      port: 8080,
    },
    plugins: [
      react(), // React plugin is always included
      // Add a development-specific plugin here if necessary
      isDevelopment && /* some-dev-plugin() */ null, 
    ].filter(Boolean), // Removes any null or undefined values
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Set up an alias for the "src" folder
      },
    },
  };
});
