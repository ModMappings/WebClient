export interface PackageNode {
  name: string;
  simpleName: string;
  depth: number;
  isLoading: boolean;
  children: PackageNode[];
}

function getSimpleName(pkg: string): string {
  const match = pkg.match(/\/([^/]+)$/);
  return match == null ? pkg : match[1];
}

function getParentPackage(pkg: string): string {
  const match = pkg.match(/^(.+)\/[^/]+$/);
  return match == null ? '' : match[1];
}

function getPackageDepth(pkg: string): number {
  return pkg.split('/').length - 1;
}

function* getPackageParts(pkg: string): Iterable<string> {
  const parts = pkg.split('/');
  let current = null;
  for (const part of parts) {
    if (current == null) {
      current = part;
    } else {
      current = `${current}/${part}`;
    }
    yield(current);
  }
}

export class PackageTree {
  private readonly nodes: Map<string, PackageNode>;
  readonly root: PackageNode;

  constructor(packages: string[]) {
    const rootNode: PackageNode = {
      simpleName: '',
      name: '',
      depth: 0,
      isLoading: false,
      children: []
    };
    const nodes = new Map<string, PackageNode>([['', rootNode]]);
    for (const pkg of packages.sort()) {
      for (const pkgPart of getPackageParts(pkg)) {
        const node = nodes.get(pkgPart);
        if (node == null) {
          const newNode: PackageNode = {
            name: pkgPart,
            simpleName: getSimpleName(pkgPart),
            depth: getPackageDepth(pkgPart),
            isLoading: false,
            children: []
          };
          nodes.set(pkgPart, newNode);
          const parentPkg = getParentPackage(pkgPart);
          const parentNode = nodes.get(parentPkg);
          if (parentNode == null) {
            throw new Error('Processing child package before parent. This should be impossible');
          }
          parentNode.children.push(newNode);
        }
      }
    }

    this.root = rootNode;
    this.nodes = nodes;
  }

  getNode(name: string): PackageNode | undefined {
    return this.nodes.get(name);
  }
}
