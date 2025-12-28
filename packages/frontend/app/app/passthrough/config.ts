import type { PrimeVueConfiguration } from 'primevue/config';

const CustomPT = {
  dialog: {
    transition: {
      enterActiveClass: 'ease-out duration-300',
      enterFromClass: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
      enterToClass: 'opacity-100 translate-y-0 sm:scale-100',
      leaveActiveClass: 'ease-out duration-300',
      leaveFromClass: 'opacity-100 translate-y-0 sm:scale-100',
      leaveToClass: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
    },
    mask: {
      class: 'bg-black/50'
    },
    root: {
      class:
        'bg-white rounded-lg shadow-xl transition-all sm:max-w-lg w-full overflow-hidden'
    },
    header: {
      class: 'flex items-start px-6 pt-6 pb-3'
    },
    headerActions: {
      class: 'ml-auto'
    },
    content: {
      class: 'px-4 px-6 pb-6'
    },
    footer: {
      class: 'bg-gray-50 px-4 py-3 flex flex-row-reverse'
    }
  }
} satisfies PrimeVueConfiguration['pt'];

export default CustomPT;
