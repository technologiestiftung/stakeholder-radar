import React from "react";

export const ContactTooltip: React.FC<{ title: string }> = ({ title }) => {
	return (
		<div className="group-hover:opacity-100 group-hover:flex flex-col items-center drop-shadow-lg z-[9999] -translate-y-full transition-opacity hidden opacity-0 mx-2.5 absolute">
			<div className="max-h-7 text-nowrap bg-white px-2 text-sm text-sr-lighter-black rounded">
				{title}
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="7"
				viewBox="0 0 19 12"
				fill="none"
				className="-translate-y-0.5"
			>
				<path
					d="M10.2488 11.1542C9.85079 11.6037 9.14921 11.6037 8.75125 11.1542L1.01278 2.41285C0.441476 1.76751 0.899641 0.75 1.76153 0.75L17.2385 0.750002C18.1004 0.750002 18.5585 1.76751 17.9872 2.41285L10.2488 11.1542Z"
					fill="white"
				/>
			</svg>
		</div>
	);
};
