import { GoToTopButton, Box } from "@tabnews/ui";

export default function DefaultLayout({ children, containerWidth = "large" }) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "canvas.default" }}>
      <Box
        as="main"
        maxWidth={containerWidth}
        sx={{
          marginX: "auto",
          display: "flex",
          flexWrap: "wrap",
          padding: [2, null, null, 4],
          paddingTop: [3, null, null, 4],
        }}
      >
        {children}
      </Box>

      <GoToTopButton target="header" />
    </Box>
  );
}
