
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { generateSlug } from "./utils";

import type {
  CreateWorldInput,
  UpdateWorldInput,
  World,
} from "@/types";

function requireDatabase() {
  if (!auth || !db) {
    throw new Error("Firebase is not configured.");
  }

  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in.");
  }

  return { db, user };
}

// CREATE WORLD
export async function createWorld(
  input: CreateWorldInput
): Promise<string> {
  const { db, user } = requireDatabase();

  const title = input.title.trim();

  if (!title) {
    throw new Error("World title is required.");
  }

  const worldRef = await addDoc(collection(db, "worlds"), {
    ownerId: user.uid,
    title,
    slug: generateSlug(title),
    description: input.description.trim(),
    genre: input.genre,
    tags: input.tags,
    visibility: input.visibility,
    coverPath: null,
    archived: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return worldRef.id;
}

// GET ONE WORLD
export async function getWorld(
  worldId: string
): Promise<World | null> {
  const { db } = requireDatabase();

  const worldRef = doc(db, "worlds", worldId);
  const snapshot = await getDoc(worldRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as World;
}

// GET ALL OWNED WORLDS
export async function getMyWorlds(): Promise<World[]> {
  const { db, user } = requireDatabase();

  const worldsQuery = query(
    collection(db, "worlds"),
    where("ownerId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(worldsQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as World[];
}

// UPDATE WORLD
export async function updateWorld(
  worldId: string,
  input: UpdateWorldInput
): Promise<void> {
  const { db } = requireDatabase();

  const worldRef = doc(db, "worlds", worldId);
  const snapshot = await getDoc(worldRef);

  if (!snapshot.exists()) {
    throw new Error("World not found.");
  }

  const data: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.title !== undefined) {
    const title = input.title.trim();

    if (!title) {
      throw new Error("World title cannot be empty.");
    }

    data.title = title;
    data.slug = generateSlug(title);
  }

  if (input.description !== undefined) {
    data.description = input.description.trim();
  }

  if (input.genre !== undefined) {
    data.genre = input.genre;
  }

  if (input.tags !== undefined) {
    data.tags = input.tags;
  }

  if (input.visibility !== undefined) {
    data.visibility = input.visibility;
  }

  if (input.coverPath !== undefined) {
    data.coverPath = input.coverPath;
  }

  await updateDoc(worldRef, data);
}

// ARCHIVE WORLD
export async function archiveWorld(
  worldId: string
): Promise<void> {
  const { db } = requireDatabase();

  await updateDoc(doc(db, "worlds", worldId), {
    archived: true,
    updatedAt: serverTimestamp(),
  });
}

// RESTORE WORLD
export async function restoreWorld(
  worldId: string
): Promise<void> {
  const { db } = requireDatabase();

  await updateDoc(doc(db, "worlds", worldId), {
    archived: false,
    updatedAt: serverTimestamp(),
  });
}

// PERMANENTLY DELETE WORLD
export async function deleteWorld(
  worldId: string
): Promise<void> {
  const { db } = requireDatabase();

  const worldRef = doc(db, "worlds", worldId);
  const snapshot = await getDoc(worldRef);

  if (!snapshot.exists()) {
    throw new Error("World not found.");
  }

  await deleteDoc(worldRef);
}
