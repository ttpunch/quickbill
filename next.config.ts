import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['cymbal-renovate-ruse.ngrok-free.dev'],
  // PDF templates load bundled TTFs from src/lib/pdf/fonts at runtime via
  // process.cwd(); include them in the serverless trace for the PDF routes.
  outputFileTracingIncludes: {
    '/api/invoices/**': ['./src/lib/pdf/fonts/**'],
    '/api/receipts/**': ['./src/lib/pdf/fonts/**'],
  },
};

export default nextConfig;
