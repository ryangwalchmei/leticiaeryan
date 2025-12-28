module.exports = {
  transpilePackages: ["@primer/react", "@tabnews/ui", "@tabnews/forms"],
  experimental: {
    scrollRestoration: true,
  },
  // Workaround: https://github.com/vercel/next.js/issues/51478#issuecomment-2095745187
  // pageExtensions: ["public.js", "workaround.js"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
};
