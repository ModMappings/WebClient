export interface PackageNode {
  name: string;
  children?: Map<string, PackageNode>;
}

export function makeHierarchical(packages: string[]): PackageNode {
  const rootNode: PackageNode = {
    name: '',
    children: new Map()
  };

  for (const pkg of packages) {
    let node: PackageNode = rootNode;
    for (const part of pkg.split('.')) {
      if (node.children == null) {
        node.children = new Map();
      }
      let nextNode = node.children.get(part);
      if (nextNode == null) {
        node.children.set(part, (nextNode = {name: part}));
      }
      node = nextNode;
    }
  }
  return rootNode;
}

export function flatten(node: PackageNode): PackageNode {
  let name = '';
  let current = node;
  while (true) {
    name += name.length > 0 ? '.' + current.name : current.name;
    if (current.children == null || current.children.size === 0) {
      return {
        name
      };
    } else if (current.children.size > 1) {
      return {
        name,
        children: new Map(
          [...current.children.values()]
            .map(child => {
              const flat = flatten(child);
              return [flat.name, flat];
            })
        )
      };
    } else {
      current = current.children[Symbol.iterator]().next().value[1];
    }
  }
}
