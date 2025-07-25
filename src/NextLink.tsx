import * as React from 'react';

import Link, { type LinkProps } from 'next/link.js';
import { useLinkStatusContext } from './context.js';
import { usePathname } from 'next/navigation.js';

export const NextLink: React.FC<LinkProps> = (props) => {
  const { setPendingPathName } = useLinkStatusContext();
  const pathname = usePathname();

  React.useEffect(() => {
    setPendingPathName(null);
  }, [pathname, setPendingPathName]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setPendingPathName(
      typeof props.href === 'string' ? props.href : props.href.toString(),
    );
    if (props.onClick) props.onClick(e);
  };

  return <Link.default {...props} onClick={handleClick}></Link.default>;
};
