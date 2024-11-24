import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthorName(user: User) {
  return user?.firstname || user?.lastname
    ? `${user.firstname} ${user.lastname}`
    : "Anonymous";
}
