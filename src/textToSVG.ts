export function textToSVG(svgText: string): SVGElement {
    const parser = new DOMParser()
    const docElem = parser.parseFromString(svgText, "text/xml").documentElement

    const node = docElem
    document.importNode(node, true)
    return node as unknown as SVGElement
}
