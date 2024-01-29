import { textToSVG } from "./textToSVG"

export class LoadSVG extends HTMLElement {
    static observedAttributes = ["src"];

    constructor() {
        super()

        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        if (this.hasAttribute("src")) {
            this.build()
        }
    }

    async build() {
        const svg_el = await this.getSvgElement()

        //@ts-ignore
        this.style.width = this.getAttribute("width") || svg_el.width
        //@ts-ignore
        this.style.height = this.getAttribute("height") || svg_el.height

        if (this.shadowRoot?.firstChild) {
            this.shadowRoot.replaceChild(svg_el, this.shadowRoot.firstChild)
        } else {
            this.shadowRoot?.appendChild(svg_el)
        }
    }

    async getSvgElement(): Promise<SVGElement> {
        const src = this.getAttribute("src") as string

        const svg_text = await fetch(src, { method: "GET" }).then((svg) =>
            svg.text(),
        )
        const svg_el = textToSVG(svg_text)

        return svg_el
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log(`Attribute ${name} has changed.`)

        if (name === "src" && oldValue !== newValue) {
            this.build()
        }
    }
}