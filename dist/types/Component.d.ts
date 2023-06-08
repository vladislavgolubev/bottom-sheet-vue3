import { type PropType } from 'vue';
export declare const Sheet: import("vue").DefineComponent<{
    visible: {
        type: BooleanConstructor;
        required: true;
    };
    threshold: {
        readonly type: PropType<number>;
        readonly default: 100;
    };
    onlyHeaderSwipe: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noStretch: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noClickOutside: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noHeader: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:visible': (visible: boolean) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    visible: {
        type: BooleanConstructor;
        required: true;
    };
    threshold: {
        readonly type: PropType<number>;
        readonly default: 100;
    };
    onlyHeaderSwipe: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noStretch: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noClickOutside: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    noHeader: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
}>> & {
    "onUpdate:visible"?: (visible: boolean) => any;
}, {
    threshold: number;
    onlyHeaderSwipe: boolean;
    noStretch: boolean;
    noClickOutside: boolean;
    noHeader: boolean;
}, {}>;
