import classNames from 'classnames';
import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { useAppDispatch, useAppSelector } from './hooks/redux.hooks';
import {
	fetchInvoices,
	fetchPaid,
	invoicesActions,
} from './redux/slices/invoices.slice';
import { CreateModal } from './components/CreateModal/CreateModal';
import { ChoiceModal } from './components/ChoiceModal/ChoiceModal';
import { changeModal } from './redux/slices/modals.slice';
import { fetchMyCompanies, getSupplier } from './redux/slices/suppliers.slice';
import { changeSearch } from './redux/slices/search.slice';
import { getDateBySplit } from './utils/date.utils';
import { Invoices } from './components/Invoices/Invoices';
import { useEffect } from 'react';
import { UpdateModal } from './components/UpdateModal/UpdateModal';

function App() {
	const dispatch = useAppDispatch();
	const { type, invoice } = useAppSelector((state) => state.invoicesReducer);
	const { modal } = useAppSelector((state) => state.modalsReducer);
	const { supplier } = useAppSelector((state) => state.suppliersReducer);
	const invoices = useAppSelector((state) => {
		const { invoices, paid, type } = state.invoicesReducer;
		if (type === 'all') {
			return [...invoices, ...paid].sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				}
				return 1;
			});
		}
		if (type === 'invoices') {
			return [...invoices].sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				}
				return 1;
			});
		}
		return [...paid].sort((a, b) => {
			if (a.name.toLowerCase() < b.name.toLowerCase()) {
				return -1;
			}
			return 1;
		});
	});
	const companies = Array.from(
		new Set(invoices.map((invoice) => invoice.myCompany))
	);
	const sum = invoices.reduce((prev, invoice) => prev + +invoice.sum, 0);

	const dates = Array.from(
		new Set(invoices.map((invoice) => invoice.lastDate))
	).sort((a, b) => getDateBySplit(a).getTime() - getDateBySplit(b).getTime());

	const getDateInvoices = (date: string) => {
		return invoices.filter((invoice) => invoice.lastDate === date);
	};

	useEffect(() => {
		dispatch(fetchMyCompanies());
	}, []);

	useEffect(() => {
		dispatch(fetchInvoices());
		dispatch(fetchPaid());
	}, [type]);

	return (
		<div className={classNames(styles.app)}>
			<Button
				className={classNames(styles.create)}
				onClick={(e) => {
					dispatch(getSupplier({ supplier: null }));
					dispatch(changeModal('choice'));
					dispatch(changeSearch(''));
				}}
			>
				Создать
			</Button>
			<div className={classNames(styles.btns)}>
				<Button
					onClick={(e) =>
						dispatch(invoicesActions.changeType('invoices'))
					}
					className={classNames({
						[styles.active]: type === 'invoices',
					})}
				>
					Неоплаченные
				</Button>
				<Button
					onClick={(e) =>
						dispatch(invoicesActions.changeType('paid'))
					}
					className={classNames({ [styles.active]: type === 'paid' })}
				>
					Оплаченные
				</Button>
				<Button
					onClick={(e) => dispatch(invoicesActions.changeType('all'))}
					className={classNames({ [styles.active]: type === 'all' })}
				>
					Все
				</Button>
			</div>
			<div className={classNames(styles.header)}>
				<div className={classNames(styles.sum)}>
					<div className={classNames(styles.total)}>
						Всего: <b>{Number(sum).toLocaleString('ru')}</b> руб
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
			{dates.map((date) => (
				<Invoices
					key={date}
					date={
						getDateBySplit(date).toLocaleString('ru').split(', ')[0]
					}
					invoices={getDateInvoices(date)}
				/>
			))}
			{modal === 'choice' && <ChoiceModal />}
			{modal === 'create' && <CreateModal supplier={supplier} />}
			{modal === 'update' && invoice && <UpdateModal invoice={invoice} />}
		</div>
	);
}

export default App;
