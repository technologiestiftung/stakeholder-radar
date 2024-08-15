import React from "react";

export const XIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="46"
			height="46"
			viewBox="0 0 46 46"
			fill="none"
			className={className ?? "size-10"}
		>
			<path
				d="M34.686 11.3135L12.0586 33.9409"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				d="M34.686 33.9414L12.0586 11.314"
				stroke="currentColor"
				strokeWidth="4"
			/>
		</svg>
	);
};
