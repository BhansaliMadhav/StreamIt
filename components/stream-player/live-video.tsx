"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";

import { useEventListener } from "usehooks-ts";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(value);
    console.log(volume);

    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
      // console.log(volume * 0.01);
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
      console.log(videoRef.current.volume);
    }
  };
  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const ToggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };
  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div ref={wrapperRef} className=" relative h-full flex">
      <video ref={videoRef} src="" width={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullScreen={isFullScreen}
            onToggle={ToggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
