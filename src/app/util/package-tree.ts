export interface PackageNode {
  name: string;
  simpleName: string;
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
    for (const node of nodes.values()) {
      if (node.name !== '' && node.children.length === 1) {
        const onlyChild = node.children[0];
        const newNode: PackageNode = {
          name: onlyChild.name,
          simpleName: node.simpleName + '/' + onlyChild.simpleName,
          children: onlyChild.children
        };
        nodes.delete(node.name);
        nodes.set(onlyChild.name, newNode);
        let parent: PackageNode | undefined;
        let currentPkg = node.name;
        do {
          currentPkg = getParentPackage(currentPkg);
          parent = nodes.get(currentPkg);
        } while (parent == null && currentPkg !== '');
        if (parent != null) {
          const idx = parent.children.indexOf(node);
          if (idx !== -1) {
            parent.children[idx] = newNode;
          }
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
