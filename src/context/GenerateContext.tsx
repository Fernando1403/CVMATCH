"use client";

import React, { createContext, useContext, useState } from "react";

interface GenerateState {
  file: File | null;
  jobDescription: string;
  extraInfo: string;
  isGenerating: boolean;
  result: any | null;
}

interface GenerateContextType {
  state: GenerateState;
  setFile: (file: File | null) => void;
  setJobDescription: (desc: string) => void;
  setExtraInfo: (info: string) => void;
  setIsGenerating: (val: boolean) => void;
  setResult: (res: any) => void;
  reset: () => void;
}

const GenerateContext = createContext<GenerateContextType | undefined>(undefined);

export function GenerateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GenerateState>({
    file: null,
    jobDescription: "",
    extraInfo: "",
    isGenerating: false,
    result: null,
  });

  const setFile = (file: File | null) => setState(prev => ({ ...prev, file }));
  const setJobDescription = (jobDescription: string) => setState(prev => ({ ...prev, jobDescription }));
  const setExtraInfo = (extraInfo: string) => setState(prev => ({ ...prev, extraInfo }));
  const setIsGenerating = (isGenerating: boolean) => setState(prev => ({ ...prev, isGenerating }));
  const setResult = (result: any) => setState(prev => ({ ...prev, result }));
  const reset = () => setState({ file: null, jobDescription: "", extraInfo: "", isGenerating: false, result: null });

  return (
    <GenerateContext.Provider value={{ state, setFile, setJobDescription, setExtraInfo, setIsGenerating, setResult, reset }}>
      {children}
    </GenerateContext.Provider>
  );
}

export function useGenerate() {
  const context = useContext(GenerateContext);
  if (context === undefined) {
    throw new Error("useGenerate must be used within a GenerateProvider");
  }
  return context;
}
