import './globals.css';

export const metadata = {
  title: 'PaperPilot — AI Research Briefing Agent',
  description: 'Evidence-backed research briefing agent with exact citation source grounding.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
