import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IChoiceModalProps } from './ChoiceModal.props';
import styles from './ChoiceModal.module.css';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { Search } from '../Search/Search';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeModal } from '../../redux/slices/modals.slice';
import {
	fetchSuppliers,
	getSupplier,
} from '../../redux/slices/suppliers.slice';

export const ChoiceModal: FC<IChoiceModalProps> = ({ className, ...props }) => {
	const suppliers = useAppSelector((state) => {
		const { search } = state.searchReducer;
		const { suppliers } = state.suppliersReducer;
		return suppliers.filter(
			(supplier) =>
				supplier.name.match(new RegExp(search, 'gim')) ||
				supplier.inn.match(new RegExp(search, 'gim'))
		);
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchSuppliers());
	}, []);

	return (
		<Portal>
			<Modal onClick={(e) => dispatch(changeModal('none'))}>
				<div
					onClick={(e) => e.stopPropagation()}
					className={classNames(styles.wrap)}
				>
					<Search placeholder='Поиск по фирме или по ИНН' />
					<Button onClick={(e) => dispatch(changeModal('create'))}>
						Новый поставщик
					</Button>
					<div className={classNames(styles.suppliers)}>
						{suppliers.map((supplier) => (
							<div
								onClick={(e) => {
									dispatch(getSupplier({ supplier }));
									dispatch(changeModal('create'));
								}}
								key={supplier.id}
								className={classNames(styles.supplier)}
							>
								<div className={classNames(styles.info)}>
									<h3>{supplier.name}</h3>
									<span>
										ИНН: <b>{supplier.inn}</b>
									</span>
								</div>
								<span>
									Отсрочка: <b>{supplier.timeout}</b>
								</span>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</Portal>
	);
};
