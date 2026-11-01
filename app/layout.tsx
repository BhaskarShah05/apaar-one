import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth/authContext';
import { AppShell } from '@/components/ui/AppShell';

export const metadata: Metadata = {
  title: 'APAAR ONE | AICTE Student Data Management & Enrolment Intelligence',
  description: 'A unified student enrolment management and academic verification ecosystem for AICTE-approved institutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
