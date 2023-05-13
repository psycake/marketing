import { createTier } from "./tier/create";
import { deleteTier } from "./tier/delete";
import { readTier } from "./tier/read";
import { updateTier } from "./tier/update";

import { createBrand } from "./brand/create";
import { deleteBrand } from "./brand/delete";
import { readBrand } from "./brand/read";
import { updateBrand } from "./brand/update";

import { createSocialNetwork } from "./socialNetwork/create";
import { deleteSocialNetwork } from "./socialNetwork/delete";
import { readSocialNetwork } from "./socialNetwork/read";
import { updateSocialNetwork } from "./socialNetwork/update";

export const resolvers = {
	Query: {
		readTier,
		readBrand,
		readSocialNetwork
	},

	Mutation: {
		createTier,
		deleteTier,
		updateTier,

		createBrand,
		deleteBrand,
		updateBrand,

		createSocialNetwork,
		deleteSocialNetwork,
		updateSocialNetwork
	},
};
