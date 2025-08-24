/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "ts9ua2aa19.ufs.sh", // 👈 Novo domínio do UploadThing
      },
    ],
  },
}

export default nextConfig
