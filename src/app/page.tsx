'use client'
import NoteBlock from "@/components/noteBlock";
import Navbar from "@/components/navBar";
import { UserContextProvider, useUserContext } from "@/context/notesContext";

export default function Home() {
  return (
    <UserContextProvider>
      <div>
        <Navbar />
      </div>
      <NoteBlock />
    </UserContextProvider>
    
  );
}