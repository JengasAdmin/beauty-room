'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface ChatState {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ChatContext = createContext<ChatState>({ open: false, setOpen: () => {} });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ChatContext.Provider value={{ open, setOpen }}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);
