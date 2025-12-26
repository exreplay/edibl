/* eslint-disable @typescript-eslint/no-unsafe-argument */
import SwipeOut, {
  type LeftRevealedEmit,
  type RevealedEmit,
  type RightRevealedEmit
} from './SwipeOut';
import type { PropType, VNode } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = any;

type SwipeOutInstance = InstanceType<typeof SwipeOut>;

type LeftRightSlot = ({
  close
}: {
  close: SwipeOutInstance['close'];
}) => VNode[];

type DefaultSlot = ({
  close,
  disabled,
  revealLeft,
  revealRight,
  revealed
}: {
  close: SwipeOutInstance['close'];
  disabled: boolean;
  revealLeft: () => void;
  revealRight: () => void;
  revealed: number;
}) => VNode;

type Revealed = { [index: number]: 'left' | 'right' };

interface ScopedSlots {
  left?: LeftRightSlot;
  right?: LeftRightSlot;
  default?: DefaultSlot;
}

export default defineComponent({
  name: 'SwipeList',
  props: {
    items: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<Item[]>,
      required: true
    },
    itemKey: {
      type: String,
      default: null
    },
    /**
     * @deprecated since version 2.0 - use itemKey instead
     */
    transitionKey: {
      type: String,
      default: null
    },
    threshold: {
      type: Number,
      default: 45
    },
    revealed: {
      type: Object as PropType<Revealed>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itemDisabled: {
      type: Function,
      default: () => false
    },
    passiveListeners: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'revealed',
    'closed',
    'update:revealed',
    'swipeout:click',
    'leftRevealed',
    'rightRevealed',
    'active'
  ],
  data() {
    return {
      innerRevealed: this.revealed || {},
      rev: this.items.map(() => null)
    };
  },
  computed: {
    refItems(): SwipeOutInstance[] {
      return this.$refs.items as SwipeOutInstance[];
    }
  },
  watch: {
    revealed(val) {
      this.innerRevealed = val;
    },
    items() {
      this._emitRevealed({});
    }
  },
  methods: {
    revealRight(index: number) {
      this.refItems[index]?.revealRight();
    },
    revealLeft(index: number) {
      this.refItems[index]?.revealLeft();
    },
    close(index: number) {
      if (!this.refItems) return;

      if (index === undefined) return this.refItems.forEach((i) => i.close());

      if (!this.refItems[index]) return;

      return this.refItems[index].close();
    },
    isRevealed(index: number) {
      return this.innerRevealed[index] || false;
    },
    /**
     * @deprecated use ```close``` instead
     */
    closeActions(index: number) {
      this.close(index);
    },
    // private
    /*
		_updateRevealed(item, index, side) {
			const key = this._getItemKey(item, index);
			if (side)
				return this.$set(this.innerRevealed, key, side);
			return this.$delete(this.innerRevealed, key);
		},
		*/
    _onReveal(item: Item, index: number, event: RevealedEmit) {
      this.$emit('revealed', {
        index,
        item,
        side: event.side,
        close: event.close
      });
      this._emitRevealed({
        ...this.innerRevealed,
        [index]: event.side
      });
    },
    _onClose(item: Item, index: number) {
      this.$emit('closed', {
        index,
        item
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [index]: omit, ...newRevealed } = this.innerRevealed;
      this._emitRevealed(newRevealed);
    },
    _getItemKey(item: Item, index: number) {
      const keyPropery = this.itemKey || this.transitionKey;
      if (keyPropery !== undefined)
        return item[this.itemKey || this.transitionKey];
      return index;
    },
    _emitRevealed(val: Revealed) {
      if (this.revealed !== undefined) {
        this.$emit('update:revealed', val);
        return;
      }
      this.innerRevealed = val;
    },
    __renderItem(item: Item, index: number) {
      const { left, right, default: defaultScope } = this.$slots;
      const scopedSlots: ScopedSlots = {};

      if (left) scopedSlots.left = ({ close }) => left({ item, close, index });

      if (right)
        scopedSlots.right = ({ close }) => right({ item, close, index });

      scopedSlots.default = ({
        close,
        disabled,
        revealLeft,
        revealRight,
        revealed
      }) =>
        h(
          'div',
          {
            ref: 'itemsContent',
            on: {
              click: () => this.$emit('swipeout:click', item)
            }
          },
          defaultScope?.({
            item,
            index,
            close,
            disabled,
            revealed,
            revealLeft,
            revealRight
          })
        );

      return h(SwipeOut, {
        key: index,
        ref: 'items',
        refInFor: true,
        staticClass: 'swipeout-list-item',
        props: {
          disabled: this.disabled || this.itemDisabled(item),
          threshold: this.threshold,
          revealed: this.innerRevealed[index],
          passiveListeners: this.passiveListeners
        },
        on: {
          revealed: ($event: RevealedEmit) =>
            this._onReveal(item, index, $event),
          leftRevealed: ($event: LeftRevealedEmit) =>
            this.$emit('leftRevealed', { index, item, close: $event.close }),
          rightRevealed: ($event: RightRevealedEmit) =>
            this.$emit('rightRevealed', { index, item, close: $event.close }),
          closed: () => this._onClose(item, index),
          active: ($event: boolean) => this.$emit('active', $event)
        },
        scopedSlots
      });
    }
  },
  render() {
    return h(
      'div',
      {
        staticClass: 'swipeout-list',
        class: { 'swipeout--disabled': this.disabled }
      },
      this.items.map((item, index) => this.__renderItem(item, index))
    );
  }
});
