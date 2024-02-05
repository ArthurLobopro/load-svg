import { InsertSVG } from "./InsertSVG"
import { LoadSVG } from "./LoadSVG"

export const registerLoadSVG = () => customElements.define("load-svg", LoadSVG)
export const registerInsertSVG = () => customElements.define("insert-svg", InsertSVG)
export { loadSvgDefaultBehavior } from "./LoadSVG"
