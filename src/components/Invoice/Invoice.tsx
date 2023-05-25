import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IInvoiceProps } from './Invoice.props';
import styles from './Invoice.module.css';
import { getDateBySplit } from '../../utils/date.utils';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch } from '../../hooks/redux.hooks';
import {
	changeInvoiceType,
	deleteInvoices,
	deletePaid,
} from '../../redux/slices/invoices.slice';
import { Button } from '../Button/Button';

export const Invoice: FC<IInvoiceProps> = ({
	className,
	invoice,
	...props
}) => {
	const [status, setStatus] = useState(invoice.status);
	const date = getDateBySplit(invoice.startDate)
		.toLocaleString('ru')
		.split(', ')[0];
	const updatedStatus = useDebounce(status, 1000);
	const dispatch = useAppDispatch();
	const isFirstRender = useRef(true);

	const onDeleteHandler = () => {
		if (invoice.status === 'invoice') {
			dispatch(deleteInvoices(invoice.id + ''));
		} else {
			dispatch(deletePaid(invoice.id + ''));
		}
	};

	useEffect(() => {
		if (!isFirstRender.current) {
			dispatch(changeInvoiceType(invoice));
		}
		isFirstRender.current = false;
	}, [updatedStatus]);

	return (
		<div className={classNames(styles.wrap)}>
			<div className={classNames(styles.root, className)} {...props}>
				<span>
					<input
						id={invoice.id + ''}
						name={invoice.id + ''}
						type='checkbox'
						checked={status === 'paid'}
						onChange={(e) => {
							if (status === 'paid') {
								setStatus('invoice');
							} else {
								setStatus('paid');
							}
						}}
					/>
					<label htmlFor={invoice.id + ''}>
						<b>{invoice.name}</b>
					</label>
				</span>
				<span>
					ИНН: <b>{invoice.inn}</b>
				</span>
				<span>
					от <b>{date}</b>
				</span>
				<span>
					№ <b>{invoice.invoiceNumber}</b>
				</span>
				<span>
					Сумма: <b>{Number(invoice.sum).toLocaleString('ru')}</b> руб
				</span>
				<span>
					НДС: <b>{Number(invoice.nds).toLocaleString('ru')} руб</b>
				</span>
			</div>
			<Button
				onDoubleClick={onDeleteHandler}
				className={classNames(styles.delete)}
			>
				Удалить
			</Button>
		</div>
	);
};
