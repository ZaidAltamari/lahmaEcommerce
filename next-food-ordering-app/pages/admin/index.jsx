import axios from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../styles/Admin.module.css';
import Swal from 'sweetalert2';
import Add from '../../components/Add';
import ProductCategoryDropdown from '../../components/ProductCategoryDropdown';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import {
	differenceInHours,
	differenceInMinutes,
	differenceInDays,
} from 'date-fns';
const status = ['preparing', 'on the way', 'delivered'];
const options = [
	{ value: 'Best Sellers', label: 'best sellers' },
	{ value: 'Home & Garden', label: 'Home & Garden' },
	{ value: 'Kitchen & Dining', label: 'Kitchen & Dining' },
	{ value: 'Kitchen Tools & Utensils', label: 'Kitchen Tools & Utensils' },
	{ value: 'Kitchen Slicers', label: 'Kitchen Slicers' },
	{ value: 'Kitchen Appliances', label: 'Kitchen Appliances' },
	{ value: 'Decor', label: 'Decor' },
	{ value: 'Electronics', label: 'Electronics' },
	{ value: 'Hardware', label: 'Hardware' },
	{ value: 'Tools', label: 'Tools' },
	{ value: 'Apparel & Accessories', label: 'Apparel & Accessories' },
	{ value: 'Office Supplies', label: 'Office Supplies' },
	{ value: 'Audio', label: 'Audio' },
	{ value: 'Jewelry', label: 'Jewelry' },
	{ value: 'Household Supplies', label: 'Household Supplies' },
	{ value: 'Storage & Organization', label: 'Storage & Organization' },
	{ value: 'Watches', label: 'Watches' },
	{ value: 'Grinders', label: 'Grinders' },
	{ value: 'Headphones & Headsets', label: 'Headphones & Headsets' },
	{ value: 'Headphones', label: 'Headphones' },
];
const messages = [
	'Your order is being prepared',
	'Your order is on the way',
	'Your order has been delivered',
];
const ProductsTab = ({ products, setProductList }) => {
	const [selectedCategory, setSelectedCategory] = useState(options[0].value);
	const [product, setProduct] = useState(products);
	const [editingId, setEditingId] = useState(null);
	const [close, setClose] = useState(true);
	const { t, lang } = useTranslation('common');
	const handleDelete = useCallback(
		async (id) => {
			try {
				const result = await Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
				});
				if (result.isConfirmed) {
					const res = await axios.delete(
						`http://194.195.86.67/api/products/` + id,
					);
					if (res.status >= 200 && res.status < 300) {
						const newProduct = products.filter(
							(product) => product._id !== id,
						);
						setProductList(newProduct);
						setClose(true);
						Swal.fire(
							'Deleted!',
							'Your product has been deleted.',
							'success',
						);
					}
				}
			} catch (err) {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Delete Failed',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			}
		},
		[setProductList, setClose, products],
	);
	const handleEdit = useCallback(
		(productId) => {
			const productToEdit = products.find((p) => p._id === productId);
			setEditingId(productId);
			setProduct({
				_id: productToEdit._id,
				title: productToEdit.title,
				title_ar: productToEdit.title_ar,
				desc: productToEdit.desc,
				desc_ar: productToEdit.desc_ar,
				img: productToEdit.img,
				prices: productToEdit.prices,
				category: productToEdit.category,
				sizes: productToEdit.sizes,
				colors: productToEdit.colors,
			});
		},
		[products],
	);
	const showSuccessMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
	}, []);
	const showErrorMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
	}, []);
	const uploadFile = async (file) => {
		const data = new FormData();
		data.append('file', file);
		const uploadRes = await axios.post('/api/upload', data);
		return uploadRes.data.data;
	};
	const handleUpdate = useCallback(async () => {
		try {
			let url;
			if (product.file) {
				url = await uploadFile(product.file);
			} else {
				url = product.img;
			}
			const updatedProduct = {
				_id: product._id,
				title: product.title,
				title_ar: product.title_ar,
				desc: product.desc,
				desc_ar: product.desc_ar,
				prices: product.prices,
				img: url,
				category: product.category,
				sizes: product.sizes,
				colors: product.colors,
			};
			await axios.put(
				`http://194.195.86.67/api/products/` + product._id,
				updatedProduct,
			);
			setClose(true);
			showSuccessMessage(
				lang === 'en' ? 'Product Updated' : 'تم تحديث المنتج',
			);
		} catch (err) {
			showErrorMessage(lang === 'en' ? 'Something went wrong' : 'حدث خطأ');
		}
	}, [product, setClose, showErrorMessage, showSuccessMessage, lang]);
	return (
		<div className={styles.container}>
			{editingId ? (
				<Add
					productToEdit={products.find((p) => p._id === editingId)}
					onUpdate={handleUpdate}
					onCancel={() => setEditingId(null)}
					setClose={setClose}
				/>
			) : (
				<>
					<div className={styles.item}>
						<ProductCategoryDropdown
							options={options}
							onCategoryChange={setSelectedCategory}
						/>
						<h1 className={styles.title}>Products</h1>
						<table className={styles.table}>
							<tbody>
								<tr className={styles.trTitle}>
									<th>Image</th>
									<th>Title</th>
									<th>Categories</th>
									<th>Prices</th>
									<th>Created at</th>
									<th>Updated at</th>
									<th>Action</th>
								</tr>
							</tbody>
							{products
								.filter((product) =>
									product.category.includes(selectedCategory),
								)
								.map((product) => (
									<tbody key={product._id}>
										<tr className={styles.trTitle}>
											<td>
												<img
													src={`http://194.195.86.67/images/${product.img}`}
													width={140}
													height={110}
													style={{ objectFit: 'cover' }}
													alt='product-image'
												/>
											</td>
											<td>{product.title}</td>
											<td>{product.category.join(', ')}</td>
											<td>
												{product.prices.map((price, index) =>
													index !== product.prices.length - 1
														? `${price} AED - `
														: `${price} AED`,
												)}
											</td>
											<td>
												{(() => {
													const diffInDays = differenceInDays(
														new Date(),
														new Date(product.createdAt),
													);
													if (diffInDays >= 1) {
														return `${diffInDays} day ago`;
													} else {
														const diffInHours = differenceInHours(
															new Date(),
															new Date(product.createdAt),
														);
														if (diffInHours < 1) {
															const diffInMinutes =
																differenceInMinutes(
																	new Date(),
																	new Date(product.createdAt),
																);
															return `${diffInMinutes} minutes ago`;
														} else {
															const remainingMinutes =
																differenceInMinutes(
																	new Date(),
																	new Date(product.createdAt),
																) % 60;
															return `${diffInHours} hr ${remainingMinutes} minutes ago`;
														}
													}
												})()}
											</td>
											<td>
												{(() => {
													const diffInDays = differenceInDays(
														new Date(),
														new Date(product.updatedAt),
													);
													if (diffInDays >= 1) {
														return `${diffInDays} day ago`;
													} else {
														const diffInHours = differenceInHours(
															new Date(),
															new Date(product.updatedAt),
														);
														if (diffInHours < 1) {
															const diffInMinutes =
																differenceInMinutes(
																	new Date(),
																	new Date(product.updatedAt),
																);
															return `${diffInMinutes} minutes ago`;
														} else {
															const remainingMinutes =
																differenceInMinutes(
																	new Date(),
																	new Date(product.updatedAt),
																) % 60;
															return `${diffInHours} hr ${remainingMinutes} minutes ago`;
														}
													}
												})()}
											</td>
											<td>
												<button
													className={styles.button}
													onClick={() => handleEdit(product._id)}>
													Edit
												</button>
												<button
													className={styles.button}
													onClick={() =>
														handleDelete(product._id)
													}>
													Delete
												</button>
											</td>
										</tr>
									</tbody>
								))}
						</table>
					</div>
				</>
			)}
		</div>
	);
};
const TodaysOrdersTab = ({
	orderList,
	handleSort,
	handleFilter,
	handleStatus,
}) => {
	const [sortValue, setSortValue] = useState('newest');
	const [sortOrder, setSortOrder] = useState();
	return (
		<div className={styles.item}>
			<h1 className={styles.title}>Filter</h1>
			<div>
				<Select
					value={sortValue}
					onChange={(e) => {
						handleSort(e.target.value);
						setSortValue(e.target.value);
					}}
					size='small'
					className={styles.filterOrders}>
					<MenuItem value='newest'>Sort by Newest</MenuItem>
					<MenuItem value='oldest'>Sort by Oldest</MenuItem>
					<MenuItem value='id'>Sort by ID</MenuItem>
					<MenuItem value='customer'>Sort by Customer</MenuItem>
					<MenuItem value='total'>Sort by Total</MenuItem>
					<MenuItem value='payment'>Sort by Payment Method</MenuItem>
					<MenuItem value='status'>Sort by Status</MenuItem>
				</Select>
				<TextField
					type='text'
					onChange={(e) => handleFilter('customer', e.target.value)}
					placeholder='Filter by customer'
					size='small'
				/>
				<FormControl
					component='fieldset'
					size='small'
					style={{ marginLeft: '10px' }}>
					<RadioGroup
						row
						value={sortOrder}
						onChange={(e) => {
							handleSort(sortValue, e.target.value);
							setSortOrder(e.target.value);
						}}>
						<FormControlLabel
							value='asc'
							control={<Radio />}
							label='Ascending'
						/>
						<FormControlLabel
							value='desc'
							control={<Radio />}
							label='Descending'
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<h1 className={styles.title}> Today&apos;s Orders</h1>
			<table className={styles.table}>
				<tbody>
					<tr className={styles.trTitle}>
						<th>Customer</th>
						<th>Total</th>
						<th>Address</th>
						<th>Payment Method</th>
						<th>Status</th>
						<th>Order Date</th>
						<th>Action</th>
					</tr>
				</tbody>
				{orderList.map((order) => (
					<tbody key={order._id}>
						<tr className={styles.trTitle}>
							<td>{order.customer}</td>
							<td>{order.total} AED</td>
							<td>{order.address}</td>
							<td>
								{order.method === 'Cash on Delivery' ? (
									<span>Cash on Delivery</span>
								) : (
									<span>Credit card</span>
								)}
							</td>
							<td>{status[order.status]}</td>
							<td>
								{(() => {
									const diffInDays = differenceInDays(
										new Date(),
										new Date(order.createdAt),
									);
									if (diffInDays >= 1) {
										return `${diffInDays} day ago`;
									} else {
										const diffInHours = differenceInHours(
											new Date(),
											new Date(order.createdAt),
										);
										if (diffInHours < 1) {
											const diffInMinutes = differenceInMinutes(
												new Date(),
												new Date(order.createdAt),
											);
											return `${diffInMinutes} minutes ago`;
										} else {
											const remainingMinutes =
												differenceInMinutes(
													new Date(),
													new Date(order.createdAt),
												) % 60;
											return `${diffInHours} hr ${remainingMinutes} minutes ago`;
										}
									}
								})()}
							</td>
							<td>
								<button
									className={styles.nextStepButton}
									disabled={order.status === 3}
									onClick={() => handleStatus(order._id)}
									style={{
										cursor:
											order.status >= 3 ? 'not-allowed' : 'pointer',
										opacity: order.status >= 3 ? '0.5' : '1',
										backgroundColor:
											order.status >= 3 ? 'grey' : 'green',
									}}>
									{order.status >= 3
										? 'Order Delivered'
										: 'Next Stage'}
								</button>
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};
const AllOrdersTab = ({
	orderList,
	handleSort,
	handleFilter,
	handleStatus,
}) => {
	const [sortValue, setSortValue] = useState('newest');
	const [sortOrder, setSortOrder] = useState('asc');
	const [orderLimit, setOrderLimit] = useState(100);
	return (
		<div className={styles.item}>
			<h1 className={styles.title}>Filter</h1>
			<div>
				<Select
					value={sortValue}
					onChange={(e) => {
						handleSort(e.target.value);
						setSortValue(e.target.value);
					}}
					size='small'
					className={styles.filterOrders}>
					<MenuItem value='newest'>Sort by Newest</MenuItem>
					<MenuItem value='oldest'>Sort by Oldest</MenuItem>
					<MenuItem value='id'>Sort by ID</MenuItem>
					<MenuItem value='customer'>Sort by Customer</MenuItem>
					<MenuItem value='total'>Sort by Total</MenuItem>
					<MenuItem value='payment'>Sort by Payment Method</MenuItem>
					<MenuItem value='status'>Sort by Status</MenuItem>
				</Select>
				<TextField
					type='text'
					onChange={(e) => handleFilter('customer', e.target.value)}
					placeholder='Filter by customer'
					size='small'
				/>
				<FormControl
					component='fieldset'
					size='small'
					style={{ marginLeft: '10px' }}>
					<RadioGroup
						row
						value={sortOrder}
						onChange={(e) => {
							handleSort(sortValue, e.target.value);
							setSortOrder(e.target.value);
						}}>
						<FormControlLabel
							value='asc'
							control={<Radio />}
							label='Ascending'
						/>
						<FormControlLabel
							value='desc'
							control={<Radio />}
							label='Descending'
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<h1 className={styles.title}> All Orders</h1>
			<table className={styles.table}>
				<tbody>
					<tr className={styles.trTitle}>
						<th>Customer</th>
						<th>Total</th>
						<th>Address</th>
						<th>Payment Method</th>
						<th>Status</th>
						<th>Order Date</th>
						<th>Action</th>
					</tr>
				</tbody>
				{orderList.slice(0, orderLimit).map((order) => (
					<tbody key={order._id}>
						<tr className={styles.trTitle}>
							<td>{order.customer}</td>
							<td>{order.total} AED</td>
							<td>{order.address}</td>
							<td>
								{order.method === 'Cash on Delivery' ? (
									<span>Cash on Delivery</span>
								) : (
									<span>Credit card</span>
								)}
							</td>
							<td>{status[order.status]}</td>
							<td>
								{(() => {
									const diffInDays = differenceInDays(
										new Date(),
										new Date(order.createdAt),
									);
									if (diffInDays >= 1) {
										return `${diffInDays} day ago`;
									} else {
										const diffInHours = differenceInHours(
											new Date(),
											new Date(order.createdAt),
										);
										if (diffInHours < 1) {
											const diffInMinutes = differenceInMinutes(
												new Date(),
												new Date(order.createdAt),
											);
											return `${diffInMinutes} minutes ago`;
										} else {
											const remainingMinutes =
												differenceInMinutes(
													new Date(),
													new Date(order.createdAt),
												) % 60;
											return `${diffInHours} hr ${remainingMinutes} minutes ago`;
										}
									}
								})()}
							</td>
							<td>
								<button
									className={styles.nextStepButton}
									disabled={order.status === 3}
									onClick={() => handleStatus(order._id)}
									style={{
										cursor:
											order.status >= 3 ? 'not-allowed' : 'pointer',
										opacity: order.status >= 3 ? '0.5' : '1',
										backgroundColor:
											order.status >= 3 ? 'grey' : 'green',
									}}>
									{order.status >= 3
										? 'Order Delivered'
										: 'Next Stage'}
								</button>
							</td>
						</tr>
					</tbody>
				))}
			</table>
			{orderList.length > orderLimit && (
				<div className={styles.showMoreOrders}>
					<Button
						variant='outlined'
						onClick={() => setOrderLimit(orderLimit + 50)}>
						Show More Orders
					</Button>
				</div>
			)}
		</div>
	);
};
const Index = ({ initialOrders, products }) => {
	const [orders, setOrders] = useState(initialOrders);
	const [orderList, setOrderList] = useState(orders);
	const originalOrderList = useRef(orders);
	const [value, setValue] = useState(0);
	const [product, setProductList] = useState(products);
	const [todaysOrders, setTodaysOrders] = useState([]);
	const [sortedAndFilteredTodaysOrders, setSortedAndFilteredTodaysOrders] =
		useState([]);
	const { t, lang } = useTranslation('common');
	useEffect(() => {
		const intervalId = setInterval(async () => {
			const orderRes = await axios.get(`http://194.195.86.67/api/orders`);
			setOrders(orderRes.data);
		}, 5000);
		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth() + 1;
		const currentYear = currentDate.getFullYear();
		const filteredOrders = orderList.filter((order) => {
			const orderDate = new Date(order.createdAt);
			return (
				orderDate.getDate() === currentDay &&
				orderDate.getMonth() + 1 === currentMonth &&
				orderDate.getFullYear() === currentYear
			);
		});
		setTodaysOrders(filteredOrders);
		return () => clearInterval(intervalId);
	}, [orderList]);
	useEffect(() => {
		setSortedAndFilteredTodaysOrders(todaysOrders);
	}, [todaysOrders]);
	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(`http://194.195.86.67/api/products`).then((res) => {
				setProductList(res.data);
			});
		}, 5000);
		return () => clearInterval(interval);
	}, []);
	let theme = useTheme();
	theme = createTheme(theme, {
		components: {
			MuiTab: {
				styleOverrides: {
					root: {
						'&.Mui-selected': {
							color: 'red',
						},
					},
				},
			},
		},
	});
	const handleChange = (e, newValue) => {
		setValue(newValue);
	};
	const handleStatus = useCallback(
		async (id) => {
			const item = orderList.filter((order) => order._id === id)[0];
			const currentStatus = item.status;
			if (currentStatus <= 3) {
				try {
					const res = await axios.put(
						`http://194.195.86.67/api/orders/` + id,
						{ status: currentStatus + 1 },
					);
					setOrderList([
						res.data,
						...orderList.filter((order) => order._id !== id),
					]);
					await axios.post('/api/twilio', {
						to: `${item.phone_number}`,
						body: `${messages[currentStatus]}`,
					});
				} catch (err) {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Status Change Failed',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
					});
				}
			}
		},
		[orderList],
	);
	const handleSort = (sortValue, sortOrder) => {
		let sortedList;
		switch (sortValue) {
			case 'newest':
				sortedList = [...orderList].sort((a, b) => {
					return sortOrder === 'desc'
						? new Date(b.createdAt) - new Date(a.createdAt)
						: new Date(a.createdAt) - new Date(b.createdAt);
				});
				break;
			case 'oldest':
				sortedList = [...orderList].sort((a, b) => {
					const dateA = new Date(a.date);
					const dateB = new Date(b.date);
					return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
				});
				break;
			case 'customer':
				sortedList = [...orderList].sort((a, b) => {
					const nameA = a.customer ? a.customer.toUpperCase() : '';
					const nameB = b.customer ? b.customer.toUpperCase() : '';
					return sortOrder === 'desc'
						? nameA.localeCompare(nameB)
						: nameB.localeCompare(nameA);
				});
				break;
			case 'total':
				sortedList = [...orderList].sort((a, b) => {
					return sortOrder === 'desc'
						? a.total - b.total
						: b.total - a.total;
				});
				break;
			case 'payment':
				sortedList = [...orderList].sort((a, b) => {
					const paymentA = a.method.toUpperCase();
					const paymentB = b.method.toUpperCase();
					return sortOrder === 'desc'
						? paymentA.localeCompare(paymentB)
						: paymentB.localeCompare(paymentA);
				});
				break;
			case 'status':
				sortedList = [...orderList].sort((a, b) => {
					return sortOrder === 'desc'
						? a.status - b.status
						: b.status - a.status;
				});
				break;
			default:
				sortedList = orderList;
		}
		setOrderList(sortedList);
		setSortedAndFilteredTodaysOrders(sortedList);
	};
	const handleFilter = (key, value) => {
		const filteredOrders = originalOrderList.current.filter((order) => {
			if (order[key] && typeof order[key] === 'string') {
				return order[key].toLowerCase().includes(value.toLowerCase());
			}
			return false;
		});
		setOrderList(filteredOrders);
		setSortedAndFilteredTodaysOrders(filteredOrders);
	};
	return (
		<>
			<Head>
				<title>{t('Lahmah&FahmahAdmin')}</title>
			</Head>
			<ThemeProvider theme={theme}>
				<Box className={styles.container}>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor='secondary'
						TabIndicatorProps={{ style: { background: 'red' } }}
						indicatorColor='secondary'
						variant='fullWidth'
						className={styles.tabs}
						classes={{ indicator: styles.indicator }}
						TabScrollButtonProps={{
							style: { background: 'red' },
							className: styles.scrollButton,
						}}>
						<Tab label='Products' />
						<Tab label="Today's Orders" />
						<Tab label='All Orders' />
					</Tabs>
					{value === 0 && (
						<ProductsTab
							products={product}
							setProductList={setProductList}
						/>
					)}
					{value === 1 && (
						<TodaysOrdersTab
							orderList={todaysOrders}
							handleSort={handleSort}
							handleFilter={handleFilter}
							handleStatus={handleStatus}
						/>
					)}
					{value === 2 && (
						<AllOrdersTab
							orderList={orderList}
							handleSort={handleSort}
							handleFilter={handleFilter}
							handleStatus={handleStatus}
						/>
					)}
				</Box>
			</ThemeProvider>
		</>
	);
};
export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || '';
	let admin = false;
	if (myCookie.token === process.env.TOKEN) {
		admin = true;
	}
	if (myCookie.token !== process.env.TOKEN) {
		return {
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}
	const productRes = await axios.get(`http://194.195.86.67/api/products`);
	const orderRes = await axios.get(`http://194.195.86.67/api/orders`);
	orderRes.data.sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});
	return {
		props: {
			initialOrders: orderRes.data,
			products: productRes.data,
			admin,
		},
	};
};
export default Index;
