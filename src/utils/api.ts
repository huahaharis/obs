import type { User } from '../types/user';

export async function fetchDefaultUsers(): Promise<User[]> {
  const res = await fetch('/JSON/user.json');
  if (!res.ok) throw new Error('Failed to load users.json');
  const data = (await res.json()) as User[];
  return data.map((u) => ({ ...u, image: `https://i.picsum.photos/id/${u.id}/100/100.jpg` }));
}
