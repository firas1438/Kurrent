"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const [svg, setSvg] = useState(<MoonIcon />);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark"); setSvg( <MoonIcon/> );
    } else {
      setTheme("light"); setSvg( <SunIcon/> );
    }
  };

  return (
    <div>
      <Button size="icon" variant="ghost" onClick={handleClick}>
        {svg}
      </Button>
    </div>
  );
}