interface TopBannerProps {
  theme?: "dark" | "light";
}

export const TopBanner = ({ theme = "light" }: TopBannerProps) => {
  return (
    <div
      className={`py-2 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 text-center">Top Banner</div>
    </div>
  );
};
