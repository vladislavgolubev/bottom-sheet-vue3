import type { PropType } from 'vue';
export declare const STOP_ATTR = "data-bottom-sheet-stop";
export declare const SHEET_PROPS: {
    /** Minimum swipe down pixel count for sheet to close itself */
    readonly threshold: {
        readonly type: PropType<number>;
        readonly default: 100;
    };
    /** By default sheet listens swipe on screen, if this prop given it will listen only header */
    readonly onlyHeaderSwipe: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /** By default sheet stretches itself up on over swipe, this prop disables it */
    readonly noStretch: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /** If given Sheet won't close itself on click outside */
    readonly noClickOutside: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /** Removes header section, ignores #header slot */
    readonly noHeader: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
};
