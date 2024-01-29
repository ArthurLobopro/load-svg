function textToSVG(svgText: string): SVGElement {
    const parser = new DOMParser()
    const docElem = parser.parseFromString(svgText, "text/xml").documentElement

    const node = docElem
    document.importNode(node, true)
    return node as unknown as SVGElement
}

export class InsertSVG extends HTMLElement {
    static observedAttributes = ["src"];

    constructor() {
        super()
    }

    connectedCallback() {
        if (this.hasAttribute("src")) {
            this.build()
        }
    }

    async build() {
        const svg_el = await this.getSvgElement()

        this.replaceWith(svg_el)
    }

    async getSvgElement(): Promise<SVGElement> {
        const src = this.getAttribute("src") as string

        const svg_text = await fetch(src, { method: "GET" }).then((svg) =>
            svg.text(),
        )
        const svg_el = textToSVG(svg_text)

        return svg_el
    }
}