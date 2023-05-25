import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ICreateModalProps } from './CreateModal.props';
import styles from './CreateModal.module.css';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import {
	getDateByNumber,
	getDateBySplit,
	getPlusTime,
} from '../../utils/date.utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeModal } from '../../redux/slices/modals.slice';
import { createInvoices } from '../../redux/slices/invoices.slice';
import { createSuppliers } from '../../redux/slices/suppliers.slice';

export const CreateModal: FC<ICreateModalProps> = ({
	className,
	supplier,
	...props
}) => {
	const isFirstRender = useRef(true);
	const today = getDateByNumber(new Date().getTime());

	const [name, setName] = useState(supplier?.name || '');
	const [inn, setInn] = useState(supplier?.inn || '');
	const [sum, setSum] = useState('');
	const [nds, setNds] = useState('');
	const [invoiceNumber, setInvoiceNumber] = useState('');
	const [startDate, setStartDate] = useState(today);
	const [timeout, setTimeout] = useState(supplier?.timeout || '');
	const [lastDate, setLastDate] = useState('');

	const dispatch = useAppDispatch();
	const { suppliers } = useAppSelector((state) => state.suppliersReducer);

	const onCreateInvoiceHandler = () => {
		if (
			!Number.isNaN(+sum) &&
			!Number.isNaN(nds) &&
			!Number.isNaN(timeout) &&
			name &&
			inn &&
			sum &&
			nds &&
			invoiceNumber &&
			startDate &&
			timeout &&
			lastDate
		) {
			dispatch(
				createInvoices({
					id: Math.floor(Math.random() * 10000000),
					inn,
					invoiceNumber,
					lastDate,
					name,
					nds,
					startDate,
					sum,
					status: 'invoice',
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
								e.target.value.replace(/[^a-zA-Zа-яА-Я]/gim, '')
							);
						}}
						placeholder='ИНН'
					/>
					<Input
						value={invoiceNumber}
						autoFocus
						onChange={(e) => setInvoiceNumber(e.target.value)}
						placeholder='Номер накладной'
					/>
					<Input
						value={sum}
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
					<Button onClick={onCreateInvoiceHandler}>Записать</Button>
				</div>
			</Modal>
		</Portal>
	);
};
