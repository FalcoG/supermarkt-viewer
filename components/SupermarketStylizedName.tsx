export function SupermarketStylizedName(
	{ supermarketId, supermarketName }: {
		supermarketId: string;
		supermarketName: string;
	},
) {
	const classNames = ["p-1"];

	// todo: move color codes to util or something else
	if (supermarketId === "ah") classNames.push("text-[#00ADE6]");
	else if (supermarketId === "jumbo") classNames.push("text-[#fdc513]");
	else if (supermarketId === "dirk") classNames.push("text-[#e30613]");
	else if (supermarketId === "coop") classNames.push("text-[#f79300]");
	else if (supermarketId === "hoogvliet") classNames.push("text-[#00ace7]");
	else if (supermarketId === "aldi") classNames.push("text-[#00b6ed]");
	else if (supermarketId === "vomar") classNames.push("text-[#fc0816]");
	else if (supermarketId === "dekamarkt") classNames.push("text-[#E1261D]");

	return (
		<span className={classNames.join(" ")}>
			{supermarketName}
		</span>
	);
}
