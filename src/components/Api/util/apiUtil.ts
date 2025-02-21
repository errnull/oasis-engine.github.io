import config from '../../../siteconfig.json';
import { getEnv } from '../../../utils';

const { serverConfig } = config;
const serverAddress = serverConfig[getEnv() as keyof typeof serverConfig];

export interface PkgChild {
  id: number;
  name: string;
  kind: string;
}
export interface PkgChildDetail {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  flags: any;
  type: any;
  groups: {
    title: string;
    children: number[];
  }[];
  sources: {
    fileName: string;
    line: number;
    character: number;
    url: string;
  }[];
  children?: Array<PkgChildDetail>;
  comment?: { summary: Array<{ kind: string; text: string }> };
  extendedTypes?: any;
  signatures: any;
  getSignature: any;
  setSignature: any;
}

export async function fetchPkgList(version:string): Promise<string[]> {
  const searchQuery = new URLSearchParams({
    version,
  });
  return await fetch(`${serverAddress}/api2/doc/apis/package/list?${searchQuery}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}
export async function fetchPkgChildren(pkg: string, version: string): Promise<PkgChild[]> {
  const searchQuery = new URLSearchParams({
    version,
  });
  return await fetch(`${serverAddress}/api2/doc/apis/package/${pkg}/children?${searchQuery}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}
export async function fetchPkgChildrenDetail(
  pkg: string,
  id: number | undefined,
  version: string
): Promise<PkgChildDetail | null> {
  if (!id) {
    return new Promise((resolve) => resolve(null));
  }
  const searchQuery = new URLSearchParams({
    version,
  });
  return await fetch(`${serverAddress}/api2/doc/apis/${pkg}/child/detail/${id}?${searchQuery}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
        return res.data;
      } else {
        throw new Error('');
      }
    });
}
interface IOverwrite {
  id: number;
  name: string;
  type: string;
}

export interface ISource {
  fileName: string;
  line: number;
  character: number;
}

export interface ITag {
  tag: string;
  text: string;
}

export interface IComment {
  shortText?: string;
  text?: string;
  returns?: string;
  tags?: ITag[];
}

interface IExtendedType {
  type: string;
  id: number;
  name: string;
}

interface IFlag {
  isOptional?: boolean;
  isReadonly?: boolean;
}

export interface IParameter {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  comment: IComment;
  flags: IFlag;
  type: IType;
  index?: number;
}

interface ITarget {
  elementType: IType;
  type: string;
}

export interface IType {
  name: string;
  id?: number;
  type?: string;
  operator?: string;
  target?: ITarget;
  elementType?: IType;
}

export interface ISignature {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  overwrites: IOverwrite[];
  flags: IFlag;
  type: IType;
  parameters?: IParameter[];
  typeParameter?: IParameter[];
  comment?: IComment;
}

export interface IItem {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  comment?: IComment;
  inheritedFrom?: any;
  getSignature?: any;
  setSignature?: any;
  signatures?: ISignature[];
  overwrites?: IOverwrite[];
  sources?: ISource[];
  type?: IType;
  defaultValue?: any;
  flags?: IFlag;
  link?: string;
}

export interface IModule {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  children: IItem[];
  groups: any[];
  comment?: IComment;
  sources?: ISource[];
  extendedTypes?: IExtendedType[];
}

export interface IPackage {
  name: string;
  id: number;
  kind: number;
  kindString: string;
  children: IModule[];
  groups: any[];
  sources?: ISource[];
}
