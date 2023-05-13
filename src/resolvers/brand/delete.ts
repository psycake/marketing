import { iContext } from "index";

export const deleteBrand = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
) => {
	const toDelete = await db.sequelize.models.Brand.findByPk(args.id);

	if (!toDelete) {
		throw new Error(`No entry with the id ${args.id} could be found`);
	} else {
		return toDelete.destroy();
	}
};
