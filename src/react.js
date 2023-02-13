

// 리액트는 훅과 관련된 배열을 내부적으로 갖고있다고 예상함.
const hooks = []
// createElement 객체가 만들어지는 지점에 저 훅 배열을 세팅

//index를 관리할 값
let currentComponent = 0

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


function useState(initValue) {
    let position = currentComponent - 1

    if (!hooks[position]) {
        hooks[position] = initValue
    }
    const modifier = nextValue => {
        hooks[position] = nextValue
    }
    return [hooks[position], modifier]
}


/**실제 node나 element를 만드는게 아니라 객체를 만드는 함수 */
export function createElement(tag, props, ...children) {
    props = props || {}

    if (typeof tag === 'function') {
        if (tag.prototype instanceof Component) {
            const instance = new tag(makeProps(props, children))
            return instance.render()
        }

        hooks[currentComponent] = null
        // tag 가 실행되기전, (함수가 만들어지기 전에 실행되야하겠죠?)
        //그리고 createElement가 호출될 때마다 Component 하나가 만들어진다. 그래서
        currentComponent++
        // 여기서 ++를 해줬기 때문에 이 안에서 또 useState 불러야 하는데
        // 그래서 useState 안에서 position으로 -1을 준 값을 준다.

        //핵심.
        // tag 함수 컴포넌트가 호출된 다음에 훅이 함수 안에서 호출돼서 index가 맞아진다는 것!
        // 순서 보장이 너무 중요하다.
        // 순서 보장은 createElement로 만들어진 객체 순서 메커니즘과 맞물려있다.
        // 함수는 실제로 상태를 가질 수 없지만 index 위치값 기반의 외부 상태에 값을 저장해놓고
        // 마치 그 함수가 상태를 저장하는 것 처럼 효과를 내는 마법의 원리인 것이다.
        // 그래서 hook을 써야할 위치가 제약이 있는 것이다.

        if (children.length) {
            return tag(makeProps(props, children))
        } else {
            return tag(props)
        }
    }
    return { tag, props, children }
}

export function render(vdom, container) {
    container.appendChild(createDOM(vdom));
}