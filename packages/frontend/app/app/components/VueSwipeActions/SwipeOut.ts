/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable vue/no-reserved-keys */
import touchPan, { type Pan } from './touch-horizontal-pan';
import type { VNode } from 'vue';

export interface RevealedEmit {
  side: 'left' | 'right';
  close: () => void;
}

export interface RightRevealedEmit {
  close: () => void;
}

export interface LeftRevealedEmit {
  close: () => void;
}

function translateX(x: number) {
  if (x === 0) return '';

  return `translate3d(${x}px, 0, 0)`;
}

function clientWidth(ref: HTMLElement) {
  return ref ? ref.clientWidth : 0;
}

function areEqual(a: unknown, b: unknown) {
  if (!a && !b) return true;
  return a === b;
}

export default defineComponent({
  name: 'SwipeOut',
  directives: {
    touchPan
  },
  props: {
    threshold: {
      type: Number,
      default: 45
    },
    revealed: {
      type: [String, Boolean],
      default: false
    },
    /**
     * Is the item disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    passiveListeners: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'active',
    'closed',
    'update:revealed',
    'revealed',
    'leftRevealed',
    'rightRevealed'
  ],
  data() {
    return {
      innerRevealed: this.revealed || false,
      _isActive: false,
      _timer: 0,
      _frame: 0,
      _leftActionsWidth: 0,
      _startLeft: 0,
      _rightActionsWidth: 0
    };
  },
  watch: {
    revealed(val) {
      if (this.innerRevealed === val) return;
      this._reveal(val, true);
    }
  },
  beforeUnmount() {
    clearTimeout(this._timer);
    cancelAnimationFrame(this._frame);
  },
  methods: {
    // public
    /**
     * @deprecated use ```close``` instead...
     */
    closeActions() {
      this.close();
    },
    close() {
      if (this._isActive) return;

      this._reveal(false, true);
    },
    revealLeft() {
      if (this._isActive || !this.$refs.left) return;

      this._reveal('left', true);
    },
    revealRight() {
      if (this._isActive || !this.$refs.right) return;

      this._reveal('right', true);
    },
    // private
    _distanceSwiped() {
      const contentRect = (
        this.$refs.content as HTMLElement
      ).getBoundingClientRect();
      const elementRect = this.$el.getBoundingClientRect();
      return contentRect.left - elementRect.left - this.$el.clientLeft;
    },
    _onPan(pan: Pan) {
      if (this.disabled) return null;

      if (pan.isFirst) return this._startListener(pan);

      if (!this._isActive) return null;

      if (pan.isFinal) return this._stopListener(pan);

      return this._swipeListener(pan);
    },
    _startListener({ distance }: Pan) {
      this.$el.classList.add('swipeout--no-transition');
      if (distance.y <= 5) {
        this._leftActionsWidth = this.$refs.left
          ? (this.$refs.left as HTMLElement).clientWidth
          : 0;
        this._rightActionsWidth = this.$refs.right
          ? (this.$refs.right as HTMLElement).clientWidth
          : 0;

        this._startLeft = this._distanceSwiped();
        this._isActive = true;
        this.$emit('active', true);
        clearTimeout(this._timer);
      }
    },
    _swipeListener({ offset }: { offset: { x: number } }) {
      const newX = offset.x + this._startLeft;
      if (!this.$slots.left && newX > 0) return this._animateSlide(0);

      if (!this.$slots.right && newX < 0) return this._animateSlide(0);

      return this._animateSlide(offset.x + this._startLeft);
    },
    _stopListener({ offset, distance }: Pan) {
      this.$el.classList.remove('swipeout--no-transition');
      this._isActive = false;
      this.$emit('active', false);
      const newX = this._startLeft + offset.x;

      if (
        (this._startLeft === 0 && Math.abs(newX) <= this.threshold) ||
        (distance.x >= this.threshold &&
          ((this._startLeft > 0 && distance.x < this._leftActionsWidth) ||
            (this._startLeft < 0 && distance.x < this._rightActionsWidth)))
      )
        // {
        return this._reveal(false);
      return this._reveal(newX > 0 ? 'left' : 'right');
    },
    _reveal(dir: boolean | 'left' | 'right', recalculateWidth?: boolean) {
      if (this._isActive && areEqual(this.innerRevealed, dir)) return;

      if (dir && typeof dir === 'string' && !this.$refs[dir]) dir = false;

      this.innerRevealed = dir;
      this.$emit('update:revealed', dir);

      // close
      if (!dir) {
        this._animateSlide(0);
        this.$emit('closed');
        return;
      }

      // left
      if (dir === 'left' && this.$refs.left) {
        this._leftActionsWidth = recalculateWidth
          ? clientWidth(this.$refs.left as HTMLElement)
          : this._leftActionsWidth;
        this._animateSlide(this._leftActionsWidth);
        this.$emit('revealed', { side: 'left', close: this.closeActions });
        this.$emit('leftRevealed', { close: this.closeActions });
        return;
      }

      // right
      if (dir === 'right' && this.$refs.right) {
        this._rightActionsWidth = recalculateWidth
          ? clientWidth(this.$refs.right as HTMLElement)
          : this._rightActionsWidth;
        this._animateSlide(-this._rightActionsWidth);
        this.$emit('revealed', { side: 'right', close: this.closeActions });
        this.$emit('rightRevealed', { close: this.closeActions });
      }
    },
    // shift actions
    _shiftLeftActions(newX: number) {
      if (!this.$slots.left) return;

      if (newX < 0) newX = 0;

      const actions = this.$refs.left as HTMLElement;
      const actionsWidth = this._leftActionsWidth;

      const progress = 1 - Math.min(newX / actionsWidth, 1);
      const deltaX = Math.min(newX, actionsWidth);

      const { children } = actions;
      const { length } = children;
      for (let i = 0; i < length; i++) {
        const child = children[i] as HTMLElement;
        const offsetLeft = actionsWidth - child.offsetLeft - child.offsetWidth;
        child.style.transform = translateX(deltaX + offsetLeft * progress);

        if (length > 1) child.style.zIndex = `${length - i}`;
      }
    },
    _shiftRightActions(newX: number) {
      if (!this.$slots.right) return;

      if (newX > 0) newX = 0;

      const actions = this.$refs.right as HTMLElement;
      const actionsWidth = this._rightActionsWidth;

      const progress = 1 + Math.max(newX / actionsWidth, -1);
      const deltaX = Math.max(newX, -actionsWidth);
      const { children } = actions;

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        child.style.transform = translateX(
          deltaX - child.offsetLeft * progress
        );
      }
    },
    _animateSlide(to: number) {
      cancelAnimationFrame(this._frame);
      this._frame = requestAnimationFrame(() => {
        (this.$refs.content as HTMLElement).style.transform = translateX(to);
        this._shiftLeftActions(to);
        this._shiftRightActions(to);
      });
    }
  },
  render() {
    const content: VNode[] = [];
    const { left, right, default: defaultScope } = this.$slots;

    if (left)
      content.push(
        h(
          'div',
          {
            ref: 'left',
            class: 'swipeout-left'
          },
          left({
            close: this.closeActions
          })
        )
      );

    if (right)
      content.push(
        h(
          'div',
          {
            ref: 'right',
            class: 'swipeout-right'
          },
          right({
            close: this.closeActions
          })
        )
      );

    const swipeContent = h(
      'div',
      {
        ref: 'content',
        class: 'swipeout-content'
      },
      defaultScope
        ? defaultScope({
            revealLeft: this.revealLeft,
            revealRight: this.revealRight,
            disabled: this.disabled,
            close: this.closeActions,
            revealed: this.innerRevealed
          })
        : undefined
    );

    content.push(
      !this.disabled && (left || right)
        ? withDirectives(swipeContent, [
            [
              touchPan,
              this._onPan,
              '',
              {
                horizontal: true,
                mouse: true,
                prevent: !this.passiveListeners,
                mousePrevent: true
              }
            ]
          ])
        : swipeContent
    );

    return h(
      'div',
      {
        class: ['swipeout', { 'swipeout--disabled': this.disabled }]
      },
      content
    );
  }
});
