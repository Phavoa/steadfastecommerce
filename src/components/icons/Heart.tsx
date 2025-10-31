interface HeartIconProps {
  width?: number;
  height?: number;
  className?: string;
  isFilled?: boolean;
}

export const HeartIcon = ({
  width = 18,
  height = 16,
  className = "",
  isFilled = false,
}: HeartIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill={isFilled ? "#D46F77" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
        stroke="#D46F77"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
