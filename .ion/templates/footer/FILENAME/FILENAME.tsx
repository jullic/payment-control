import React, { FC } from 'react';
import classNames from 'classnames';
import { IFILENAMEProps } from './FILENAME.props';
import styles from './FILENAME.module.css';

export const FILENAME: FC<IFILENAMEProps> = ({ className, ...props }) => {
	return (
		<footer
			className={classNames(styles.root, className)}
			{...props}
		></footer>
	);
};
