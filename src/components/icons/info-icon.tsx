import React from "react";

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="42"
			height="42"
			viewBox="0 0 42 42"
			fill="none"
			className={className ? className : "h-[42px]"}
		>
			<circle cx="21" cy="21" r="19.5" stroke="#393A60" strokeWidth="3" />
			<path
				d="M18.5581 13.0935C18.5581 11.5574 19.6301 10.7441 20.9702 10.7441C22.3698 10.7441 23.4418 11.5574 23.4418 13.0935C23.4418 14.5694 22.3698 15.3826 20.9702 15.3826C19.6301 15.3826 18.5581 14.5694 18.5581 13.0935ZM18.975 17.3404H22.9654V31.2558H18.975V17.3404Z"
				fill="#393A60"
			/>
		</svg>
	);
};
