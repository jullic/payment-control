import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IUpdateModalProps } from './UpdateModal.props';
import styles from './UpdateModal.module.css';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeModal } from '../../redux/slices/modals.slice';
import {
	getDateByNumber,
	getDateBySplit,
	getPlusTime,
} from '../../utils/date.utils';
import { updateInvoice } from '../../redux/slices/invoices.slice';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { createSuppliers } from '../../redux/slices/suppliers.slice';

export const UpdateModal: FC<IUpdateModalProps> = ({
	className,
	invoice,
	...props
}) => {
	const isFirstRender = useRef(true);
	// const today = getDateByNumber(new Date().getTime());

	const [name, setName] = useState(invoice.name || '');
	const [myCompany, setMyCompany] = useState(
		invoice.myCompany ||
			window.localStorage.getItem('myCompany') ||
			'ООО Оптима'
	);
	const [inn, setInn] = useState(invoice.inn || '');
	const [sum, setSum] = useState(invoice.sum);
	const [nds, setNds] = useState(invoice.nds);
	const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoiceNumber);
	const [startDate, setStartDate] = useState(invoice.startDate);
	const [timeout, setTimeout] = useState(invoice.timeout || '');
	const [lastDate, setLastDate] = useState(invoice.lastDate);
	const { myCompanies } = useAppSelector((state) => state.suppliersReducer);

	const dispatch = useAppDispatch();
	const { suppliers } = useAppSelector((state) => state.suppliersReducer);

	const onUpdateInvoiceHandler = () => {
		console.log(myCompany);

		if (
			!Number.isNaN(+sum) &&
			!Number.isNaN(+nds) &&
			!Number.isNaN(+timeout) &&
			name &&
			inn &&
			myCompany &&
			sum &&
			nds &&
			invoiceNumber &&
			startDate &&
			timeout &&
			lastDate
		) {
			dispatch(
				updateInvoice({
					id: invoice.id,
					inn,
					invoiceNumber,
					lastDate,
					name,
					nds,
					myCompany,
					startDate,
					sum,
					status: invoice.status,
					timeout,
				})
			);
			onCreateSuppliersHandler();
			dispatch(changeModal('none'));
		}
	};

	const onCreateSuppliersHandler = () => {
		if (
			!suppliers.find(
				(supplier) =>
					supplier.inn === inn &&
					supplier.name === name &&
					supplier.timeout === timeout
			)
		) {
			dispatch(
				createSuppliers({
					id: Math.floor(Math.random() * 10000000),
					inn,
					name,
					timeout,
				})
			);
		}
	};

	const onChangeCompany = (e: ChangeEvent<HTMLSelectElement>) => {
		setMyCompany(e.target.value);
	};

	useEffect(() => {
		if (+timeout < 0) {
			setTimeout('0');
			return;
		}
		const sDate = getDateBySplit(startDate);
		setLastDate(getDateByNumber(sDate.getTime() + getPlusTime(+timeout)));
	}, [timeout]);

	useEffect(() => {
		if (!isFirstRender.current) {
			const lDate = getDateBySplit(lastDate);
			const sDate = getDateBySplit(startDate);
			const range =
				(lDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24;

			setTimeout(range + '');
		}
		if (lastDate) {
			isFirstRender.current = false;
		}
	}, [lastDate]);

	useEffect(() => {
		if (timeout) {
			const sDate = getDateBySplit(startDate);
			const lDate = getDateByNumber(
				sDate.getTime() + getPlusTime(+timeout)
			);
			setLastDate(lDate);
		}
	}, [startDate]);

	console.log(myCompany);

	return (
		<Portal className={classNames(styles.root, className)} {...props}>
			<Modal onClick={(e) => dispatch(changeModal('none'))}>
				<div
					onClick={(e) => e.stopPropagation()}
					className={classNames(styles.wrapper)}
				>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Фирма'
					/>
					<Input
						value={inn}
						onChange={(e) => {
							setInn(
								e.target.value.replace(/[a-zA-Zа-яА-Я]/gim, '')
							);
						}}
						placeholder='ИНН'
					/>
					<select
						onChange={onChangeCompany}
						value={myCompany}
						className={classNames(styles.select)}
					>
						{myCompanies.map((comp) => (
							<option key={comp} value={comp}>
								{comp}
							</option>
						))}
					</select>
					<Input
						value={invoiceNumber}
						onChange={(e) => setInvoiceNumber(e.target.value)}
						placeholder='Номер накладной'
					/>
					<Input
						value={sum}
						autoFocus
						onChange={(e) => setSum(e.target.value)}
						type='number'
						placeholder='Сумма'
					/>
					<Input
						value={nds}
						onChange={(e) => setNds(e.target.value)}
						type='number'
						placeholder='НДС'
					/>
					<Input
						value={startDate}
						onChange={(e) => {
							if (e.target.value) {
								setStartDate(e.target.value);
							}
						}}
						type='date'
						placeholder='Дата прихода'
					/>
					<Input
						value={timeout}
						onChange={(e) => {
							setTimeout(e.target.value);
						}}
						max={150}
						type='number'
						placeholder='Отсрочка (дней)'
					/>
					<Input
						value={lastDate}
						onChange={(e) => {
							if (e.target.value) {
								setLastDate(e.target.value);
							}
						}}
						type='date'
						placeholder='Дата'
					/>
					<Button onClick={onUpdateInvoiceHandler}>Обновить</Button>
				</div>
			</Modal>
		</Portal>
	);
};
