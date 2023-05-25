import React, { FC } from 'react';
import classNames from 'classnames';
import { IInvoicesProps } from './Invoices.props';
import styles from './Invoices.module.css';
import { Invoice } from '../Invoice/Invoice';
import { Button } from '../Button/Button';
import { IInvoice } from '../../interfaces/invoice.interface';

export const Invoices: FC<IInvoicesProps> = ({
	className,
	invoices,
	date,
	...props
}) => {
	const sum = invoices.reduce((prev, invoice) => prev + +invoice.sum, 0);

	const copyText = getInvoiceCopyText(invoices, date);

	const onCopyHandler = () => {
		navigator.clipboard.writeText(copyText);
	};

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.header)}>
				<h2>{date}</h2>
				<Button onClick={onCopyHandler}>Скорпировать</Button>
			</div>
			<div className={classNames(styles.invoices)}>
				{invoices.map((invoice) => (
					<Invoice key={invoice.id} invoice={invoice} />
				))}
			</div>
			<div className={classNames(styles.footer)}>
				<div className={classNames(styles.sum)}>
					Общая сумма: <span>{Number(sum).toLocaleString('ru')}</span>{' '}
					руб
				</div>
				<div className={classNames(styles.count)}>
					Всего оплат: <span>{invoices.length}</span>
				</div>
			</div>
		</div>
	);
};

const getInvoiceCopyText = (invoices: IInvoice[], date: string) => {
	let text = '';
	invoices.forEach(
		(invoice) =>
			(text =
				text +
				'\n\n\n' +
				`${invoice.name}, ИНН: ${invoice.inn}, от ${date}, № ${invoice.invoiceNumber}, Сумма: ${invoice.sum} руб, НДС: ${invoice.nds} руб`)
	);

	return text;
};
