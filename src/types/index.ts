
import type { Timestamp } from "firebase/firestore";

// WORLD VISIBILITY
export type WorldVisibility =
  | "private"
  | "unlisted"
  | "public";

// COLLABORATOR ROLES
export type WorldRole =
  | "owner"
  | "editor"
  | "contributor"
  | "viewer";

// USER PROFILE
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  bio: string;
  accountStatus: "active" | "suspended";
  preferences: {
    theme: "dark" | "light";
  };
  createdAt: Timestamp | null;
}

// WORLD
export interface World {
  id: string;
  ownerId: string;
  title: string;
  slug: string;
  description: string;
  coverPath: string | null;
  genre: string;
  tags: string[];
  visibility: WorldVisibility;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

// WORLD MEMBER
export interface WorldMember {
  uid: string;
  role: WorldRole;
  status: "pending" | "active" | "removed";
  invitedBy: string;
  joinedAt: Timestamp | null;
}

// WORLD CREATION INPUT
export interface CreateWorldInput {
  title: string;
  description: string;
  genre: string;
  tags: string[];
  visibility: WorldVisibility;
}

// WORLD UPDATE INPUT
export interface UpdateWorldInput {
  title?: string;
  description?: string;
  genre?: string;
  tags?: string[];
  visibility?: WorldVisibility;
  coverPath?: string | null;
}
