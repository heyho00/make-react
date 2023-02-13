

export class Component {
    constructor(props) {
        this.props = props;
    }
}

export function createDOM(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.tag);
    Object.entries(node.props)
        .forEach(([name, value]) => element.setAttribute(name, value))
    node.children
        .map(createDOM)
        .forEach(element.appendChild.bind(element));
    return element;
}


function makeProps(props, children) {
    return {
        ...props,
        children: children.length === 1 ? children[0] : children,
    }
}

/**실제 node나 element를 만드는게 아니라 객체를 만드는 함수 */
export function createElement(tag, props, ...children) {
    props = props || {}

    if (typeof tag === 'function') {
        if (tag.prototype instanceof Component) {
            const instance = new tag(makeProps(props, children))
            return instance.render()
        } else {
            if (children.length) {
                return tag(makeProps(props, children))
            } else {
                return tag(props)
            }
        }
    } else {
        return { tag, props, children }
    }
}

export function render(vdom, container) {
    container.appendChild(createDOM(vdom));
}