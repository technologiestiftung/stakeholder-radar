import React from "react";

export const ListViewIcon: React.FC<{ className?: string }> = ({
	className,
}) => {
	return (
		<svg
			width="58"
			height="42"
			viewBox="0 0 58 42"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className ? className : "h-[42px]"}
		>
			<rect
				x="1.5"
				y="1.5"
				width="55"
				height="39"
				rx="5.5"
				stroke="currentColor"
				strokeWidth="3"
			/>
			<rect x="13.5" y="12.5" width="3" height="3" fill="currentColor" />
			<path d="M22.5 14H44.5" stroke="currentColor" strokeWidth="3" />
			<rect x="13.5" y="19.5" width="3" height="3" fill="currentColor" />
			<path d="M22.5 21H44.5" stroke="currentColor" strokeWidth="3" />
			<rect x="13.5" y="26.5" width="3" height="3" fill="currentColor" />
			<path d="M22.5 28H44.5" stroke="currentColor" strokeWidth="3" />
		</svg>
	);
};
