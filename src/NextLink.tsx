import * as React from 'react';

import NextLink, { LinkProps } from 'next/link';

import { useLinkStatusContext } from './context.js';
import { usePathname } from 'next/navigation';

export const Link: React.FC<LinkProps & { children: React.ReactNode }> = (
  props,
) => {
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

  return (
    <NextLink {...props} onClick={handleClick}>
      {props.children}
    </NextLink>
  );
};
