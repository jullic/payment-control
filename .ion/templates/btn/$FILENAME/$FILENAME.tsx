import React, { FC } from 'react';
import classNames from 'classnames';
import { I$FILENAMEProps } from './$FILENAME.props';
import styles from './$FILENAME.module.css';

export const FILENAME: FC<I$FILENAMEProps> = ({
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
