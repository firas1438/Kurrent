import { useTheme } from "next-themes";

export function useChartColors() {
  const { resolvedTheme } = useTheme();
  
  // light mode colors
  const lightColors = {
    primary: "#404040",     
    secondary: "#555555",   
    border: "#c9c9c9",
    background: "#ffffff",
    foreground: "#000000",
    mutedForeground: "#525252",
    card: "#ffffff",
    muted: "#f5f5f5",
  };

  // dark mode colors
  const darkColors = {
    primary: "#a3a3a3",      
    secondary: "#333333",    
    border: "#404040",
    background: "#171717",
    foreground: "#ffffff",
    mutedForeground: "#a3a3a3",
    card: "#262626",
    muted: "#404040",
  };

  return resolvedTheme === "dark" ? darkColors : lightColors;
}