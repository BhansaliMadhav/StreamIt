"use client";
import { Volume1, Volume2, VolumeX } from "lucide-react";

import { Hint } from "../hint";
import { Slider } from "../ui/slider";
import { useState, useEffect } from "react";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const [isMuted, setIsMuted] = useState(value === 0);
  useEffect(() => {
    setIsMuted(value === 0);
  }, [value]);
  const isAboveHalf = value > 50;
  let Icon = Volume1;
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }
  const [volume, setVolume] = useState(value);
  const label = isMuted ? "Unmute" : "Mute";
  useEffect(() => {
    setVolume(value);
  }, [value]);
  const handelChange = (value: number[]) => {
    // console.log(value[0]);
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label="label" asChild>
        <button onClick={onToggle} className="text-white hover:bg-white/10">
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={(volume: number[]) => {
          handelChange(volume);
          setVolume(volume[0]);
        }}
        value={[volume]}
        max={100}
        step={1}
      />
    </div>
  );
};
