interface BookmarkIconProps {
    width?: number;
    height?: number;
    className?: string;
    isFilled?: boolean;
}

export const BookmarkIcon = ({ 
    width = 14, 
    height = 18, 
    className = '',
    isFilled = false 
}: BookmarkIconProps) => {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 14 18" 
            fill={isFilled ? "currentColor" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path 
                d="M11.6608 1.76863C12.5775 1.87529 13.25 2.66613 13.25 3.58946V16.5003L7 13.3753L0.75 16.5003V3.58946C0.75 2.66613 1.42167 1.87529 2.33917 1.76863C5.43599 1.40916 8.56401 1.40916 11.6608 1.76863Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};