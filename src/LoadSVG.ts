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

const cacheStrings = ["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]

export const loadSvgDefaultBehavior = {
    __cache: "default" as RequestCache,

    get cache(): RequestCache {
        return this.__cache
    },

    set cache(cache: RequestCache) {
        if (cacheStrings.includes(cache)) {
            this.__cache = cache
        } else {
            console.warn(`${cache} is not a valid cache value, keeping atual behavior`)
        }
    }
}

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

        const cache = (() => {
            if (this.hasAttribute("cache")) {
                const cacheValue = this.getAttribute("cache") as string

                if (cacheStrings.includes(cacheValue)) {
                    return cacheValue
                }

                console.warn(`${cacheValue} is not a valid cache value, using default behavior`)
            }

            return loadSvgDefaultBehavior.cache
        })() as RequestCache

        const svg_text = await fetch(src, { method: "GET", cache })
            .then((svg) => svg.text())
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