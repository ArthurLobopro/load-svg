import { textToSVG } from "./textToSVG"

const styles = new CSSStyleSheet()

styles.replaceSync(`
  :host {
    display: inline-flex;
  }
  svg{
    width: 100%;
    height: 100%;
  }
`)

export class LoadSVG extends HTMLElement {
    static observedAttributes = ["src", "width", "height"];

    constructor() {
        super()

        this.attachShadow({ mode: "open" })
            .adoptedStyleSheets = [styles]
    }

    connectedCallback() {
        if (this.hasAttribute("src")) {
            this.build()
        }
    }

    updateSize() {
        if (this.hasAttribute("width")) {
            this.style.width = this.getAttribute("width") + "px"
        }

        if (this.hasAttribute("height")) {
            this.style.height = this.getAttribute("height") + "px"
        }
    }

    async build() {
        const svg_el = await this.getSvgElement()

        this.updateSize()

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

        if (
            name === "src" && oldValue !== newValue
        ) {
            this.build()
        }

        if (["width", "height"].includes(name)) {
            this.updateSize()
        }
    }
}