import { SupermarketLogoAlbertHeijn } from "./SupermarketLogoAlbertHeijn.tsx";
import { SupermarketLogoJumbo } from "./SupermarketLogoJumbo.tsx";
import { SupermarketLogoAldi } from "./SupermarketLogoAldi.tsx";

export function SupermarketLogo(
	{ supermarketId, supermarketName }: {
		supermarketId: string;
		supermarketName: string;
	},
) {
	if (supermarketId === "ah") return <SupermarketLogoAlbertHeijn />;
	if (supermarketId === "jumbo") return <SupermarketLogoJumbo />;
	if (supermarketId === "aldi") return <SupermarketLogoAldi />;

	return <>{supermarketName}</>;
}
