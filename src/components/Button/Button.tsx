import React, { FC } from 'react';
import classNames from 'classnames';
import { IButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button: FC<IButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<button className={classNames(styles.root, className)} {...props}>
			{children}
		</button>
	);
};
