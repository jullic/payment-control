import React, { FC } from 'react';
import classNames from 'classnames';
import { IInvoicesProps } from './Invoices.props';
import styles from './Invoices.module.css';
import { Invoice } from '../Invoice/Invoice';
import { Button } from '../Button/Button';
import { IInvoice } from '../../interfaces/invoice.interface';
import { useAppSelector } from '../../hooks/redux.hooks';

export const Invoices: FC<IInvoicesProps> = ({
	className,
	invoices,
	date,
	...props
}) => {
	const sum = invoices.reduce((prev, invoice) => prev + +invoice.sum, 0);
	const { myCompanies } = useAppSelector((state) => state.suppliersReducer);

	const companies = Array.from(
		new Set(invoices.map((invoice) => invoice.myCompany))
	);

	const [day, month, year] = date.split('.');
	const currentDate = new Date(+year, +month - 1, +day);
	const isToday =
		currentDate.toLocaleString('ru').split(', ')[0] ===
		new Date().toLocaleString('ru').split(', ')[0];

	const onCopyHandler = () => {
		const copyText = getInvoiceCopyText(invoices, date, myCompanies);
		navigator.clipboard.writeText(copyText);
	};

	return (
		<div
			className={classNames(styles.root, className, {
				[styles.today]: isToday,
			})}
			{...props}
		>
			<div className={classNames(styles.header)}>
				<h2>{isToday ? `Сегодня (${date})` : date}</h2>
				<Button onClick={onCopyHandler}>Скопировать</Button>
			</div>
			<div className={classNames(styles.invoices)}>
				{invoices.map((invoice) => (
					<Invoice key={invoice.id} invoice={invoice} />
				))}
			</div>
			<div className={classNames(styles.footer)}>
				<div className={classNames(styles.sum)}>
					<div className={classNames(styles.total)}>
						Общая сумма:{' '}
						<span>{Number(sum).toLocaleString('ru')}</span> руб
					</div>
					<div className={classNames(styles.companies)}>
						{companies.map((comp) => (
							<div
								key={comp}
								className={classNames(styles.company)}
							>
								{comp}:{' '}
								<span>
									{Number(
										invoices
											.filter(
												(invoice) =>
													invoice.myCompany === comp
											)
											.reduce<number>(
												(prev, invoice) =>
													prev + +invoice.sum,
												0
											)
									).toLocaleString('ru') + ''}{' '}
								</span>
								руб
							</div>
						))}
					</div>
				</div>
				<div className={classNames(styles.count)}>
					<div className={classNames(styles.total)}>
						Всего оплат: <span>{invoices.length}</span>
					</div>
					<div className={classNames(styles.companies)}>
						{companies.map((comp) => (
							<div
								key={comp}
								className={classNames(styles.company)}
							>
								{comp}:{' '}
								<span>
									{Number(
										invoices.filter(
											(invoice) =>
												invoice.myCompany === comp
										).length
									).toLocaleString('ru') + ''}{' '}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const getInvoiceCopyText = (
	invoices: IInvoice[],
	date: string,
	myCompanies: string[]
) => {
	let arrCompany = myCompanies.reduce<{ name: string; values: string[] }[]>(
		(prev, comp) => {
			console.log(prev, comp);
			prev.push({ name: comp, values: [] });
			return prev;
		},
		[]
	);

	invoices.forEach((invoice) => {
		for (let i = 0; i < arrCompany.length; i++) {
			if (invoice.myCompany === arrCompany[i].name) {
				const text = `${invoice.name}, ИНН: ${invoice.inn}, от ${
					// getDateBySplit(invoice.startDate)
					// 	.toLocaleString('ru')
					// 	.split(', ')[0]
					date
				}, № ${invoice.invoiceNumber}, Сумма: ${
					invoice.sum
				} руб, НДС: ${invoice.nds} руб`;
				arrCompany[i].values.push(text);
			}
		}
	});
	let text = '';

	for (const comp of arrCompany) {
		if (comp.values.length === 0) {
			continue;
		}
		text =
			text +
			`${comp.name}: \n\n\t${comp.values
				.map((val) => `- ${val}`)
				.join('\n\t')}`;
		text = text + '\n\n\n';
	}
	return text;
};
