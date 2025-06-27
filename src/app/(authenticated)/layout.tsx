import { getAuthOrRedirect } from '@/auth/cookie';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
