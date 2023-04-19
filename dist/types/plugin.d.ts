import { type Plugin, type Ref } from 'vue';
export interface IPluginContext {
    /**
     * Reactive
     */
    activeSheet: Ref<number>;
    id(): number;
}
export declare function createBottomSheet(): Plugin;
export declare function useBottomSheet(): IPluginContext;
