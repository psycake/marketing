import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iBrandSocial } from "types"
import { readSocialNetwork } from "../socialNetwork/read"
import { readBrand } from "../brand/read"

export const readBrandSocial = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iBrandSocial[]> => {
	// Obtain the basic fields that are to be queried
	const fields = args.nest ? args.nest : getFields(info, "readBrandSocial")

	// Obtain the fields from the related tables
	const brandFields = fields.include.find((brand) => brand.name === "brand")
	const socialNetworkFields = fields.include.find(
		(social) => social.name === "socialNetwork"
	)
	// Query the fk so that we can match later
	if (brandFields) fields.attributes.push("fkBrand")
	if (socialNetworkFields) fields.attributes.push("fkSocialNetwork")

	// (obtains just the basic fields)
	const searchedId = args.id ? { id: args.id } : undefined
	let found = (await db.sequelize.models.BrandSocial.findAll({
		where: searchedId,
		attributes: fields.attributes
	})) as any[]

	// (adds the related fields)
	if (socialNetworkFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readSocialNetwork(
					this,
					{ id: entry.fkSocialNetwork, nest: socialNetworkFields },
					{ db },
					info
				)
				// read functions return an array
				entry.socialNetwork = related[0]

				return entry
			})
		)
	}
	if (brandFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readBrand(
					this,
					{ id: entry.fkBrand, nest: brandFields },
					{ db },
					info
				)
				entry.brand = related[0]

				return entry
			})
		)
	}

	return found
}
