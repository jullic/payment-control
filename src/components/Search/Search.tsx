import React, { FC } from 'react';
import classNames from 'classnames';
import { ISearchProps } from './Search.props';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeSearch } from '../../redux/slices/search.slice';

export const Search: FC<ISearchProps> = ({
	className,
	placeholder,
	...props
}) => {
	const dispatch = useAppDispatch();
	const { search } = useAppSelector((state) => state.searchReducer);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<Input
				value={search}
				onChange={(e) => dispatch(changeSearch(e.target.value))}
				placeholder={placeholder}
			/>
		</div>
	);
};
