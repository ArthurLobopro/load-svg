import { textToSVG } from "./textToSVG"

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

        if (this.hasAttribute("width")) {
            svg_el.setAttribute("width", this.getAttribute("width") as string)
        }

        if (this.hasAttribute("height")) {
            svg_el.setAttribute("height", this.getAttribute("height") as string)
        }

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