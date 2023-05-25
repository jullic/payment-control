import React, { FC } from 'react';
import classNames from 'classnames';
import { IFILENAMEProps } from './FILENAME.props';
import styles from './FILENAME.module.css';

export const FILENAME: FC<IFILENAMEProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<li className={classNames(styles.root, className)} {...props}>
			{children}
		</li>
	);
};
