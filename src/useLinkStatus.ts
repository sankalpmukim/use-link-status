import { useLinkStatusContext } from './context.js';

interface UseLinkStatusOptions {
  prefix: string;
  root?: boolean;
}

export function useLinkStatus({ prefix, root }: UseLinkStatusOptions) {
  const { pendingPathName } = useLinkStatusContext();
  let isPending = false;
  if (pendingPathName) {
    if (root) {
      isPending = pendingPathName === prefix;
    } else {
      isPending = pendingPathName.startsWith(prefix);
    }
  }
  return { isPending };
}
