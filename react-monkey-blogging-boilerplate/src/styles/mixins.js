const lineClamp = ({ lineClamp = 1, size = 100 }) => `
    display: -webkit-box;
    -webkit-line-clamp: ${lineClamp};
    -webkit-box-orient: vertical;
    overflow: hidden ;
    text-overflow: ellipsis;
    width: ${size}%;
    max-width: $size;
    word-break: break-work;
    white-space: pre-wrap;
    `;

const gridLayout = ({ widthItem = 235, numberItem = 3, gap = 20 }) => `
    display: grid;
    grid-auto-columns: ${widthItem}px;
    gap: ${gap}px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(${numberItem}, minmax(0, 1fr));
        gap: 48px;
    }
    @media screen and (max-width: 1023.98px) {
        grid-auto-flow: column;
        scroll-snap-type: x mandatory;
        overflow-x: auto;
    }
    
    & > * {
        scroll-snap-align: start;
    }
    
    `;
export { lineClamp, gridLayout };
