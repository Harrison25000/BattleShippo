export const radarSVG = () => (
    <svg viewBox="0 0 100 100">
        <defs>
            <linearGradient id="grad" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#000" />
                <stop offset="50%" stop-color="#fff" />
            </linearGradient>
            <linearGradient id="grad2" gradientTransform="rotate(85)">
                <stop offset="0%" stop-color="rgba(80, 255, 0, 1)" />
                <stop offset="12%" stop-color="rgba(80, 255, 0 ,0)" />
            </linearGradient>
            <radialGradient id="grad3" cx="50%" cy="50%" r="55%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="rgba(255,255,255, 0.7)" stop-opacity="0" />
                <stop offset="100%" stop-color="rgba(0,0,0,0.7)" stop-opacity="1" />
            </radialGradient>
            <filter id="f1" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
            </filter>
            <mask id="bby">
                <path d="M 10 50 A 1 1 0 0 0 90 50 Z" mask="url(#bby)" fill="url(#grad)">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite" />
                </path>

            </mask>
        </defs>
        <circle cx="50" cy="50" r="40" fill="#000" />
        <g class="circleGraph" stroke="rgba(80, 255, 0, 0.35)" stroke-width="0.5">
            <circle cx="50" cy="50" r="37" />
            <circle cx="50" cy="50" r="34" />
            <circle cx="50" cy="50" r="31" />
            <circle cx="50" cy="50" r="28" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="22" />
            <circle cx="50" cy="50" r="19" />
            <circle cx="50" cy="50" r="16" />
            <circle cx="50" cy="50" r="13" />
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="7" />
            <circle cx="50" cy="50" r="4" />
            <path d="M 50 10 V 90 M 10 50 H 90" />
        </g>
        <path d="M 50 50 L 50 90 A 40 40 0 0 1 10 50 Z" maask="url(#bby)" fill="url(#grad2)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="7s" begin="-6.8s" repeatCount="indefinite" />
        </path>
        <g class="dots" filter="url(#f1)" fill="rgba(80, 255, 0, 1)">
            <circle cx="32" cy="32" mask="url(#bby)" r="1.4" />
            <circle cx="62" cy="62" mask="url(#bby)" r="1.5" />
            <circle cx="55" cy="72" mask="url(#bby)" r="1.2" />
            <circle cx="75" cy="32" mask="url(#bby)" r="1" />
            <circle cx="15" cy="57" mask="url(#bby)" r="1" />
        </g>
        <circle cx="50" cy="50" r="42" fill="url(#grad3)" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="silver" stroke-width="4" />
    </svg>
)