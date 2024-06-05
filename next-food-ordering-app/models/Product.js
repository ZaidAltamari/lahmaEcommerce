import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 200,
		},
		title_ar: {
			type: String,
			required: true,
			maxlength: 200,
		},
		desc: {
			type: String,
			maxlength: 600,
		},
		desc_ar: {
			type: String,
			maxlength: 600,
		},
		img: {
			type: String,
			required: true,
		},
		prices: {
			type: [Number],
			required: true,
		},
		category: {
			type: [String],
			required: true,
		},
		sizes: {
			type: [String],
			enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
			required: true,
		},
		colors: {
			type: [String],
			required: true,
		},
	},
	{ timestamps: true },
);
export default mongoose.models.Product ||
	mongoose.model('Product', ProductSchema);
