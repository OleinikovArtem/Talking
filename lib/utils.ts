import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserInitials = (name: string | null) => {
  const [firstName, lastName]: string[] = name?.split(' ') || ['A', 'V']
  return firstName[0] + lastName[0]
}
